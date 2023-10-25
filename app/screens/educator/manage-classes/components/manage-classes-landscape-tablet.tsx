/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text as RNText,
  RefreshControl,
} from 'react-native';
import {
  AlertComponent,
  ContactPopupConfirm,
  SendMessagePopup,
  Text,
} from '@app/components';
//
import {useIsFocused, useNavigation} from '@react-navigation/native';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {
  AddIcon,
  ArrowDownVectorIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpVectorIcon,
  BanIcon,
  ClassesIcon,
  DuplicateIcon,
  EditIcon,
  HintIcon,
  SearchIcon,
  SendMessageIcon,
  TrashIcon,
} from '@app/svg';
import {InputObject} from '@app/models';
import {
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
//
import {PopupUpdateClasses} from './popup-update-classes';
import {useSchool} from '@app/hook';

import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import {DataTable} from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import {PopupAddClasses} from './popup-add-classes';
import {debounce} from 'lodash';

const PAGE_SIZE = 10;

export const ManageClassesLandscapeTablet = ({route}) => {
  const {isFromTabbar} = route?.params || '';
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const navigation: any = useNavigation();

  const {orientationOpenApp} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);

  const isFocusSearchClassNameRef = useRef<boolean>(false);
  const [passwordTextInput, setPasswordTextInput] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [searchClassName, setSearchClassName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [gradeId, setGradeId] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  const [isVisibleUpdateClasses, setIsVisibleUpdateClasses] =
    useState<boolean>(false);
  const [isVisibleDeleteClass, setIsVisibleDeleteClass] =
    useState<boolean>(false);

  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [isVisibleContactTeeFi, setIsVisibleContactTeeFi] =
    useState<boolean>(false);
  const [isVisibleContactTeeFiExpired, setIsVisibleContactTeeFiExpired] =
    useState<boolean>(false);
  const [isVisibleAddClass, setIsVisibleAddClass] = useState<boolean>(false);
  const [isShowSendMessagePopup, setIsShowSendMessagePopup] =
    useState<boolean>(false);
  const [idGrade, setIdGrade] = useState<string[]>([]);
  const [isFocusSearchClassName, setIsFocusSearchClassName] =
    useState<boolean>(false);
  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isSortClassUsername, setIsSortClassUsername] =
    useState<boolean>(false);
  const [isSortClassName, setIsSortClassName] = useState<boolean>(false);
  const [isSortLearningTimeHour, setIsSortLearningTimeHour] =
    useState<boolean>(true);
  const [isErrorValidDeleteClass, setIsErrorValidDeleteClass] =
    useState<boolean>(false);
  const [copiedClassUsername, setCopiedClassUsername] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    isFocusSearchClassNameRef.current = isFocusSearchClassName;
  });

  useEffect(() => {
    if (isFocused || isGetUser) {
      getListGrades({
        payload: {
          order: order,
          page: currentPage,
          pageSize: PAGE_SIZE,
          sort: sort,
        },
      });
    }
    return () => {
      setCopiedClassUsername('');
    };
  }, [isFocused, isGetUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListGrades({
      payload: {
        order: order,
        page: currentPage,
        pageSize: PAGE_SIZE,
        sort: sort,
      },
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const onCompletedDeleteClass = () => {
    setIsVisibleDeleteClass(false);
    setIsGetUser(!isGetUser);
  };

  const onErrorDeleteClass = () => {
    setIsVisibleDeleteClass(false);
    setIsGetUser(!isGetUser);
  };

  const {
    deleteGrade,
    getListGrades,
    checkSchoolIsNotVerify,
    checkSchoolIsExpired,
    isLoading,
    dataListGrades,
  } = useSchool();

  const onChangeText = text => {
    setIsErrorValidDeleteClass(false);
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setPasswordTextInput({value: onlyLetter, error: ''});
      }
    } else {
      setPasswordTextInput({value: onlyLetter, error: ''});
    }
  };

  const isValidDataDeleteClass = useMemo(() => {
    return passwordTextInput.value;
  }, [passwordTextInput]);

  const onConfirmDeleteClass = async () => {
    if (isValidDataDeleteClass) {
      setPasswordTextInput({value: '', error: ''});
      const res = await deleteGrade({
        payload: {
          gradeId: gradeId,
          password: passwordTextInput.value,
        },
      });
      if (res?.isSuccess) {
        await (onCompletedDeleteClass && onCompletedDeleteClass());
      } else {
        await (onErrorDeleteClass && onErrorDeleteClass());
      }
    } else {
      setIsErrorValidDeleteClass(true);
    }
  };

  const debounceSearchClassName = useCallback(
    debounce(text => {
      if (isFocusSearchClassNameRef.current) {
        onCheckSearchClassName(text);
      }
    }, 300),
    [],
  );

  const onCheckSearchClassName = async text => {
    searchClassName.value = text;
    getListGrades({
      payload: {
        order: order,
        page: currentPage,
        pageSize: PAGE_SIZE,
        sort: sort,
        gradeName: text,
      },
    });
  };

  const onFocusSearchClassName = () => {
    setIsFocusSearchClassName(true);
  };

  const onBlurSearchClassName = () => {
    debounceSearchClassName(searchClassName.value);
    setIsFocusSearchClassName(false);
  };

  const onEndSearchClassName = () => {
    const value = searchClassName.value;
    setSearchClassName({value: value, error: ''});
    onCheckSearchClassName(value);
  };

  const onChangeSearchClassName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setSearchClassName({value: onlyLetter, error: ''});
      }
    } else {
      setSearchClassName({value: onlyLetter, error: ''});
    }
  };

  const dataPage = [...Array(dataListGrades?.totalPage).keys()].map(
    num => num + 1,
  );

  if (isLoading) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER}>
      <KeyboardAvoidingView behavior={'padding'}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: verticalScale(10),
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(10),
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              text={'Add Class'}
              style={[
                ADD_KID_DATA_TEXT,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(13)
                      : moderateScale(15),
                },
              ]}
            />
            <Tooltip
              contentStyle={{height: 'auto', width: 'auto'}}
              isVisible={toolTipVisible}
              content={
                <Text
                  style={[
                    TEXT_TOOLTIP,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}>
                  Please provide the{' '}
                  <Text
                    style={[
                      TEXT_TOOLTIP,
                      {
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}>
                    class username
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={[
                      TEXT_TOOLTIP,
                      {
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}>
                    password
                  </Text>{' '}
                  for your teacher to login and manage students. The teacher can
                  add students, change password, and update avatar on their
                  dashboard.{' '}
                </Text>
              }
              placement="bottom"
              onClose={() => setToolTipVisible(false)}>
              <TouchableOpacity
                style={{paddingHorizontal: horizontalScale(10)}}
                onPress={() => setToolTipVisible(true)}>
                <HintIcon width={20} height={20} />
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '85%',
            }}>
            <View style={SEARCH_CONTENT}>
              <View style={SEARCH_IMAGE_VIEW}>
                <SearchIcon />
              </View>
              <TextInput
                style={[
                  INPUT_SEARCH_CLASS_NAME,
                  {
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(150),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(45)
                        : verticalScale(35),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onChangeText={onChangeSearchClassName}
                value={searchClassName.value}
                placeholder={'Search Class Name ...'}
                keyboardType="default"
                placeholderTextColor={color.gray3}
                onBlur={onBlurSearchClassName}
                onFocus={onFocusSearchClassName}
                onEndEditing={onEndSearchClassName}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (checkSchoolIsNotVerify(userInfo)) {
                  setIsVisibleContactTeeFi(true);
                } else if (checkSchoolIsExpired(userInfo)) {
                  setIsVisibleContactTeeFiExpired(true);
                } else {
                  setIsVisibleAddClass(true);
                }
              }}
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingHorizontal: horizontalScale(20),
              }}>
              <AddIcon width={45} height={45} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={TOTAL_LEARNING_TIME_CONTAINER}>
          <RNText
            style={[
              TOTAL_LEARNING_TIME_TEXT,
              {
                fontSize:
                  orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(10),
              },
            ]}>
            Total Learning Hours Of Your School:{' '}
            <RNText
              style={[
                TOTAL_LEARNING_TIME_TEXT,
                {
                  color: color.purple,
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(12)
                      : moderateScale(13),
                  fontFamily: typography.promptBold,
                  fontWeight: '700',
                },
              ]}>
              {dataListGrades?.totalLearningTime}
            </RNText>
          </RNText>
        </View>
        <View style={{marginTop: verticalScale(10)}}>
          {dataListGrades?.data?.length > 0 ? (
            <DataTable>
              <DataTable.Header
                style={{
                  backgroundColor: '#DCDCDC',
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(400)
                      : horizontalScale(500),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(47)
                      : verticalScale(35),
                }}>
                <TouchableOpacity style={{flex: 0.7}}>
                  <DataTable.Title
                    textStyle={[
                      TITLE_TEXT,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}>
                    Number
                  </DataTable.Title>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    setIsSortClassUsername(true);
                    setIsSortLearningTimeHour(false);
                    setIsSortClassName(false);
                    if (order === 'asc') {
                      setOrder('desc');
                      setSort('username');
                      setIsGetUser(!isGetUser);
                    } else {
                      setOrder('asc');
                      setSort('username');
                      setIsGetUser(!isGetUser);
                    }
                  }}>
                  <DataTable.Title
                    textStyle={[
                      TITLE_TEXT,
                      {
                        right: horizontalScale(10),
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                        color: isSortClassUsername
                          ? color.purple
                          : color.black1,
                      },
                    ]}>
                    Class Username
                    {isSortClassUsername ? (
                      <>
                        {order === 'asc' ? (
                          <ArrowUpVectorIcon />
                        ) : (
                          <ArrowDownVectorIcon />
                        )}
                      </>
                    ) : (
                      <View style={{width: horizontalScale(10)}} />
                    )}
                  </DataTable.Title>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1.5}}
                  onPress={() => {
                    setIsSortClassUsername(false);
                    setIsSortLearningTimeHour(false);
                    setIsSortClassName(true);
                    if (order === 'asc') {
                      setOrder('desc');
                      setSort('gradeName');
                      setIsGetUser(!isGetUser);
                    } else {
                      setOrder('asc');
                      setSort('gradeName');
                      setIsGetUser(!isGetUser);
                    }
                  }}>
                  <DataTable.Title
                    textStyle={[
                      TITLE_TEXT,
                      {
                        left:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(0)
                            : horizontalScale(10),
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                        color: isSortClassName ? color.purple : color.black1,
                      },
                    ]}>
                    Class Name
                    {isSortClassName ? (
                      <>
                        {order === 'asc' ? (
                          <ArrowUpVectorIcon />
                        ) : (
                          <ArrowDownVectorIcon />
                        )}
                      </>
                    ) : (
                      <View style={{width: horizontalScale(10)}} />
                    )}
                  </DataTable.Title>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    setIsSortClassUsername(false);
                    setIsSortLearningTimeHour(true);
                    setIsSortClassName(false);
                    if (order === 'asc') {
                      setOrder('desc');
                      setSort('learningTime');
                      setIsGetUser(!isGetUser);
                    } else {
                      setOrder('asc');
                      setSort('learningTime');
                      setIsGetUser(!isGetUser);
                    }
                  }}>
                  <DataTable.Title
                    textStyle={[
                      TITLE_TEXT,
                      {
                        left:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(-5)
                            : horizontalScale(15),
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                        color: isSortLearningTimeHour
                          ? color.purple
                          : color.black1,
                      },
                    ]}>
                    Learning Hours
                    {isSortLearningTimeHour ? (
                      <>
                        {order === 'asc' ? (
                          <ArrowUpVectorIcon />
                        ) : (
                          <ArrowDownVectorIcon />
                        )}
                      </>
                    ) : (
                      <View style={{width: horizontalScale(10)}} />
                    )}
                  </DataTable.Title>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                  <DataTable.Title
                    textStyle={[
                      TITLE_TEXT,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                        left:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(0)
                            : horizontalScale(30),
                      },
                    ]}>
                    Action
                  </DataTable.Title>
                </TouchableOpacity>
              </DataTable.Header>
              <DataTable.Row
                style={[
                  BODY_ROW,
                  {
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(400)
                        : horizontalScale(540),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? isFromTabbar
                          ? verticalScale(380)
                          : verticalScale(470)
                        : isFromTabbar
                        ? verticalScale(280)
                        : verticalScale(320),
                  },
                ]}>
                <FlatList
                  data={dataListGrades?.data}
                  keyExtractor={item => item._id}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={FLALIST_CONTENT}>
                        <View
                          style={{
                            flex:
                              orientationOpenApp === 'LANDSCAPE' ? 0.5 : 0.5,
                          }}>
                          <Text
                            text={`#${item.rank}`}
                            style={[
                              TITLE_CELL_TEXT,
                              {fontSize: moderateScale(8)},
                            ]}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            alignSelf: 'center',
                            flex: 1,
                          }}>
                          <Text
                            text={item.username}
                            style={[
                              TITLE_CELL_TEXT,
                              {fontSize: moderateScale(8)},
                            ]}
                          />
                          <TouchableOpacity
                            style={DUPLICATE_VIEW}
                            onPress={() => {
                              Clipboard.setString(item?.username);
                              setCopiedClassUsername(item?.username);
                            }}>
                            <DuplicateIcon
                              fill={
                                copiedClassUsername === item?.username
                                  ? color.purple
                                  : color.black1
                              }
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            flex: 1.5,
                          }}>
                          <FastImage
                            source={{uri: item.avatar}}
                            style={{
                              width: 25,
                              height: 25,
                              borderRadius: 100,
                              marginHorizontal: horizontalScale(5),
                            }}
                          />
                          <Text
                            text={item.gradeName}
                            style={[
                              TITLE_CELL_TEXT,
                              {width: 'auto', fontSize: moderateScale(8)},
                            ]}
                            numberOfLines={1}
                          />
                        </View>

                        <View
                          style={{
                            alignSelf: 'flex-start',
                            flex: 1,
                          }}>
                          <Text
                            text={item.learningTime}
                            style={[
                              TITLE_CELL_TEXT,
                              {fontSize: moderateScale(8)},
                            ]}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flex: 0.7,
                            marginRight:
                              orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(20)
                                : horizontalScale(30),
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                setIdGrade([item?._id]);
                                setIsShowSendMessagePopup(true);
                              }
                            }}>
                            <SendMessageIcon />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                navigation.navigate('studentsDetail', {
                                  gradeIdDetail: item._id,
                                  gradeName: item?.gradeName,
                                });
                              }
                            }}>
                            <ClassesIcon
                              width={20}
                              height={20}
                              fill={color.black1}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                setIsVisibleUpdateClasses(true);
                                setGradeId(item?._id);
                                setClassName(item?.gradeName);
                              }
                            }}>
                            <EditIcon fill={color.black1} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                setGradeId(item?._id);
                                setIsVisibleDeleteClass(true);
                              }
                            }}>
                            <TrashIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={SEPARATOR} />}
                />
              </DataTable.Row>
            </DataTable>
          ) : (
            <View style={NO_STUDENTS_VIEW}>
              <BanIcon width={15} height={15} fill={color.gray3} />
              <Text
                text={"You haven't added class yet"}
                style={NO_STUDENTS_TEXT}
              />
            </View>
          )}
          {dataListGrades?.totalCount > 10 && (
            <View style={PAGE_VIEW}>
              <TouchableOpacity
                style={{marginHorizontal: horizontalScale(5)}}
                onPress={async () => {
                  if (dataListGrades?.page === 1) {
                    await setCurrentPage(
                      parseInt(`${dataListGrades?.page}`, 10),
                    );
                  } else {
                    await setCurrentPage(
                      parseInt(`${dataListGrades?.page - 1}`, 10),
                    );
                    setIsGetUser(!isGetUser);
                  }
                }}>
                <ArrowLeftIcon />
              </TouchableOpacity>
              {dataPage?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCurrentPage(item);
                      setIsGetUser(!isGetUser);
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor:
                        item === dataListGrades?.page
                          ? color.purple
                          : color.transparent,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      text={`${item}`}
                      style={[
                        PAGE_TEXT,
                        {
                          color:
                            item === dataListGrades?.page
                              ? color.white
                              : color.black1,
                          fontSize:
                            orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(10)
                              : moderateScale(12),
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={{marginHorizontal: horizontalScale(5)}}
                onPress={async () => {
                  if (dataListGrades?.page === dataListGrades?.totalPage) {
                    await setCurrentPage(
                      parseInt(`${dataListGrades?.page}`, 10),
                    );
                  } else {
                    await setCurrentPage(
                      parseInt(`${dataListGrades?.page + 1}`, 10),
                    );
                    setIsGetUser(!isGetUser);
                  }
                }}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      <PopupAddClasses
        isVisible={isVisibleAddClass}
        onClose={() => setIsVisibleAddClass(false)}
        onCompleted={async () => {
          await setIsVisibleAddClass(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Add Class Successfully', 'success', {
            bottomOffset: 80,
          });
        }}
        onError={async () => {
          await setIsVisibleAddClass(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Add Class Failed', 'error', {
            bottomOffset: 80,
          });
        }}
      />
      <ContactPopupConfirm
        isVisible={isVisibleContactTeeFi}
        backgroundStyle={{
          height: verticalScale(150),
        }}
        title="Your Account Has Not Activited By TeeFi!"
        titleStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(20)
              : moderateScale(21),
        }}
        subtitle="We Are Processing And Will Inform You Via Email"
        subtitleStyle={{fontSize: moderateScale(12)}}
        description="Our support:"
        descriptionStyle={{marginTop: verticalScale(20)}}
        onClose={() => setIsVisibleContactTeeFi(false)}
      />
      <SendMessagePopup
        isVisible={isShowSendMessagePopup}
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(100)
              : verticalScale(80),
        }}
        id={idGrade}
        title="Send A Message"
        titleStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(20)
              : moderateScale(26),
        }}
        onClose={() => setIsShowSendMessagePopup(false)}
      />
      <ContactPopupConfirm
        isVisible={isVisibleContactTeeFiExpired}
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(140)
              : verticalScale(100),
        }}
        title="Your Account Has Expired!"
        titleStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(18)
              : moderateScale(21),
        }}
        subtitle="Please Contact School For Subscription Renewal"
        subtitleStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
        description="Our support:"
        descriptionStyle={{marginTop: verticalScale(20)}}
        onClose={() => setIsVisibleContactTeeFiExpired(false)}
      />
      <AlertComponent
        isVisible={isVisibleDeleteClass}
        isShowWarningIcon
        isShowRightButton
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(90)
              : verticalScale(70),
        }}
        title={'Warning!'}
        titleStyle={[
          TITLE_POPUP,
          {
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(20)
                : moderateScale(26),
          },
        ]}
        subtitle={`${t(
          'Please be aware that deleting this class will permanently remove the class and all student accounts associated with it. If you fully understand and wish to proceed with the deletion, please enter your password to confirm.',
        )}`}
        subtitleStyle={[
          SUB_TITLE_MODAL,
          {
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(9)
                : moderateScale(10),
          },
        ]}
        nextSubtitle={`${t('To confirm, type your password in the box below')}`}
        nextSubtitleStyle={[
          NEXT_SUB_TITLE_MODAL,
          {
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(9)
                : moderateScale(10),
          },
        ]}
        isShowTextInput={true}
        textInputPlaceholder={'Password'}
        valueTextInput={passwordTextInput?.value}
        error={isErrorValidDeleteClass}
        onChangeText={onChangeText}
        confirmBtTitle={`${t('yes')}`}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        confirmButtonStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(50)
              : verticalScale(40),
          width: horizontalScale(80),
        }}
        cancelButtonStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(50)
              : verticalScale(40),
          width: horizontalScale(80),
        }}
        cancelTextStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
        cancelBtTitle={`${t('no_thanks')}`}
        onConfirm={onConfirmDeleteClass}
        confirmTextStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
        onClose={() => {
          setIsVisibleDeleteClass(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteClass(false);
        }}
        onCancel={() => {
          setIsVisibleDeleteClass(false);
          setPasswordTextInput({value: '', error: ''});
        }}
      />
      <PopupUpdateClasses
        isVisible={isVisibleUpdateClasses}
        gradeId={gradeId}
        className={className}
        onClose={() => setIsVisibleUpdateClasses(false)}
        onCompleted={async () => {
          await setIsVisibleUpdateClasses(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Update Class Successfully', 'success', {
            bottomOffset: 80,
          });
        }}
        onError={async () => {
          await setIsVisibleUpdateClasses(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Update Class Failed', 'error', {
            bottomOffset: 80,
          });
        }}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const ADD_KID_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,

  fontWeight: '500',
  color: color.black1,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const DUPLICATE_VIEW: ViewStyle = {
  paddingHorizontal: horizontalScale(5),
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.purple,
};
const TOTAL_LEARNING_TIME_CONTAINER: ViewStyle = {
  paddingHorizontal: horizontalScale(10),
};
const TOTAL_LEARNING_TIME_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',

  color: color.black1,
};
const PAGE_VIEW: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'flex-end',
  alignItems: 'center',
};
const PAGE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  color: color.purple,
  fontWeight: '400',
  textAlign: 'center',
};
const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'left',
};
const SEARCH_CONTENT: ViewStyle = {
  paddingHorizontal: horizontalScale(15),
  flexDirection: 'row',
  alignItems: 'center',
  left: horizontalScale(25),
};
const SEARCH_IMAGE_VIEW: ViewStyle = {
  position: 'absolute',
  left: horizontalScale(25),
  top: 0,
  bottom: 0,
  zIndex: 100,
  justifyContent: 'center',
  alignItems: 'center',
};
const INPUT_SEARCH_CLASS_NAME: ViewStyle = {
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(30),
  borderRadius: 60,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(15),
  alignSelf: 'flex-start',
};
const NEXT_SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  alignSelf: 'flex-start',
};
const TITLE_CELL_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const FLALIST_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  marginTop: verticalScale(10),
  alignItems: 'center',
  width: '100%',
};
const BODY_ROW: ViewStyle = {
  width: horizontalScale(300),
};
const SEPARATOR: ViewStyle = {
  height: 1,
  width: '100%',
  backgroundColor: color.gray9,
  marginTop: verticalScale(10),
};
const NO_STUDENTS_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  flexDirection: 'row',
  marginVertical: verticalScale(20),
};
const NO_STUDENTS_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(14),
  color: color.gray3,
  textAlign: 'center',
  paddingHorizontal: horizontalScale(10),
};
