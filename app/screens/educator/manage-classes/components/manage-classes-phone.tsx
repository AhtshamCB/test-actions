/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  Text as RNText,
  ImageBackground,
  ImageStyle,
  Platform,
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
  ClockIcon,
  DuplicateIcon,
  EditIcon,
  HintIcon,
  SearchIcon,
  SendMessageIcon,
  TrashIcon,
} from '@app/svg';
import {TextInput} from 'react-native-gesture-handler';
import {InputObject} from '@app/models';
import {
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
//
import {isIPhone8PlusOrBelow, useSchool} from '@app/hook';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {showToastMessage} from '@app/utils';
import {PopupUpdateClasses} from './popup-update-classes';
import {debounce} from 'lodash';
import Tooltip from 'react-native-walkthrough-tooltip';
import {PopupAddClasses} from './popup-add-classes';

const PAGE_SIZE = 10;
const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');

export const ManageClassesPhone = () => {
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const navigation: any = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const isFocusSearchClassNameRef = useRef<boolean>(false);
  const {orientationOpenApp} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);

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

  const [isScrollToEnd, setIsScrollToEnd] = useState<boolean>(false);
  const [isVisibleUpdateClasses, setIsVisibleUpdateClasses] =
    useState<boolean>(false);
  const [isVisibleDeleteClass, setIsVisibleDeleteClass] =
    useState<boolean>(false);

  const [isFocusSearchClassName, setIsFocusSearchClassName] =
    useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [isVisibleContactTeeFi, setIsVisibleContactTeeFi] =
    useState<boolean>(false);
  const [isVisibleAddClass, setIsVisibleAddClass] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isSortLearningTime, setIsSortLearningTime] = useState<boolean>(false);
  const [isShowSendMessagePopup, setIsShowSendMessagePopup] =
    useState<boolean>(false);
  const [idGrade, setIdGrade] = useState<string[]>([]);
  const [isVisibleContactTeeFiExpired, setIsVisibleContactTeeFiExpired] =
    useState<boolean>(false);
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
    showToastMessage('Delete Successfully', 'success', {
      bottomOffset: 80,
    });
  };

  const onErrorDeleteClass = () => {
    setIsVisibleDeleteClass(false);
    setIsGetUser(!isGetUser);
    showToastMessage('Delete Class Failed', 'error', {
      bottomOffset: 80,
    });
  };

  const {
    deleteGrade,
    getListGrades,
    isLoading,
    dataListGrades,
    checkSchoolIsNotVerify,
    checkSchoolIsExpired,
  } = useSchool();
  // Use the spread operator to create an array from 1 to the numberToRender
  const dataPage = [...Array(dataListGrades?.totalPage).keys()].map(
    num => num + 1,
  );
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
    setPasswordTextInput({value: '', error: ''});
    if (isValidDataDeleteClass) {
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
        <View style={CONTAINER_ADD_CLASS_VIEW}>
          <View style={CONTENT_ADD_CLASS_VIEW}>
            <Text text={`${t('add_class')}`} style={ADD_KID_DATA_TEXT} />
            <Tooltip
              topAdjustment={Platform.OS === 'android' ? -50 : 0}
              isVisible={toolTipVisible}
              showChildInTooltip={false}
              content={
                <Text style={TEXT_TOOLTIP}>
                  Please provide the{' '}
                  <Text style={[TEXT_TOOLTIP, {color: color.purple}]}>
                    class username
                  </Text>{' '}
                  and{' '}
                  <Text style={[TEXT_TOOLTIP, {color: color.purple}]}>
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
          <View>
            <TouchableOpacity
              onPress={() => {
                if (checkSchoolIsNotVerify(userInfo)) {
                  setIsVisibleContactTeeFi(true);
                } else if (checkSchoolIsExpired(userInfo)) {
                  setIsVisibleContactTeeFiExpired(true);
                } else {
                  setIsVisibleAddClass(true);
                }
              }}>
              <AddIcon />
            </TouchableOpacity>
          </View>
        </View>
        {dataListGrades?.data?.length > 0 && (
          <View style={{marginTop: verticalScale(-10)}}>
            <View style={SEARCH_CONTAINER}>
              <View style={SEARCH_CONTENT}>
                <View style={SEARCH_IMAGE_VIEW}>
                  <SearchIcon />
                </View>
                <TextInput
                  style={INPUT_SEARCH_CLASS_NAME}
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
              <View style={CLOCK_CONTAINER}>
                <View style={{left: horizontalScale(5)}}>
                  <ClockIcon />
                </View>
                <TouchableOpacity
                  style={ARROW_BUTTON_CONTAINER}
                  onPress={() => {
                    if (isSortLearningTime) {
                      setOrder('desc');
                      setSort('learningTime');
                      setIsGetUser(!isGetUser);
                      setIsSortLearningTime(!isSortLearningTime);
                    } else {
                      setOrder('asc');
                      setSort('learningTime');
                      setIsGetUser(!isGetUser);
                      setIsSortLearningTime(!isSortLearningTime);
                    }
                  }}>
                  {order === 'asc' ? (
                    <ArrowUpVectorIcon />
                  ) : (
                    <ArrowDownVectorIcon />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={TOTAL_LEARNING_TIME_CONTAINER}>
              <RNText style={TOTAL_LEARNING_TIME_TEXT}>
                Total Learning Hours Of Your School:{' '}
                <RNText
                  style={[
                    TOTAL_LEARNING_TIME_TEXT,
                    {
                      color: color.purple,
                      fontSize: moderateScale(18),
                      fontFamily: typography.promptBold,
                      fontWeight: '700',
                    },
                  ]}>
                  {dataListGrades?.totalLearningTime}
                </RNText>
              </RNText>
            </View>
          </View>
        )}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (isScrollToEnd) {
              scrollViewRef?.current?.scrollTo({y: 0, animated: true});
            }
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={CONTAINER_VIEW}>
          <View>
            {dataListGrades?.data?.length > 0 ? (
              <View>
                <FlatList
                  scrollEnabled={false}
                  data={dataListGrades?.data}
                  keyExtractor={item => item._id}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        key={index}
                        style={[
                          CONTENT,
                          {
                            marginBottom: 10,
                            borderColor: color.white,
                          },
                          ELEVATION,
                        ]}>
                        <ImageBackground
                          source={
                            index % 2 ? BACKGROUND_PURPLE : BACKGROUND_YELLOW
                          }
                          style={HEIGHT_COMMON}>
                          <Text text={`#${item?.rank}`} style={RANK_TEXT} />
                        </ImageBackground>

                        <View style={BUTTON_VIEW}>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                setIdGrade([item?._id]);
                                setIsShowSendMessagePopup(true);
                              }
                            }}>
                            <SendMessageIcon
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
                                navigation.navigate('studentsDetail', {
                                  gradeIdDetail: item._id,
                                  gradeName: item?.gradeName,
                                });
                              }
                            }}>
                            <ClassesIcon
                              width={18}
                              height={18}
                              fill={color.black1}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (checkSchoolIsExpired(userInfo)) {
                                setIsVisibleContactTeeFiExpired(true);
                              } else {
                                setClassName(item?.gradeName);
                                setGradeId(item?._id);
                                setIsVisibleUpdateClasses(true);
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
                        <View style={BODY_CONTAINER}>
                          <FastImage
                            source={{uri: item?.avatar}}
                            style={PROFILE_PICTURE}
                          />
                          <View
                            style={[
                              FLEX_DIRECTION_COMMON,
                              {width: horizontalScale(200)},
                            ]}>
                            <Text
                              text={item?.gradeName}
                              style={TEXT_COMMON}
                              numberOfLines={1}
                            />
                            <Text text={' -'} style={TEXT_COMMON} />
                            <View
                              style={{marginHorizontal: horizontalScale(5)}}>
                              <ClockIcon />
                            </View>
                            <Text
                              text={item?.learningTime}
                              style={TEXT_COMMON}
                            />
                          </View>
                          <View style={FLEX_DIRECTION_COMMON}>
                            <Text
                              text={'Class Username: '}
                              style={[
                                USER_NAME_TEXT_COMMON,
                                {color: color.gray3},
                              ]}
                            />
                            <Text
                              text={item?.username}
                              style={[
                                USER_NAME_TEXT_COMMON,
                                {
                                  color: color.purple,
                                  fontSize: moderateScale(14),
                                },
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
                        </View>
                      </View>
                    );
                  }}
                />
                {dataListGrades?.totalCount > 10 && (
                  <View style={PAGE_VIEW}>
                    <TouchableOpacity
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
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <TouchableOpacity
                      onPress={async () => {
                        setIsScrollToEnd(true);
                        if (
                          dataListGrades?.page === dataListGrades?.totalPage
                        ) {
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
            ) : (
              <View style={NO_STUDENTS_VIEW}>
                <BanIcon width={15} height={15} fill={color.gray3} />
                <Text
                  text={"You haven't added class yet"}
                  style={NO_STUDENTS_TEXT}
                />
              </View>
            )}
          </View>
          <View style={{marginBottom: verticalScale(240)}} />
        </ScrollView>
      </KeyboardAvoidingView>
      <SendMessagePopup
        isVisible={isShowSendMessagePopup}
        backgroundStyle={{height: verticalScale(80)}}
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
        isVisible={isVisibleContactTeeFi}
        backgroundStyle={{
          height: isIPhone8PlusOrBelow()
            ? verticalScale(150)
            : verticalScale(120),
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
      <ContactPopupConfirm
        isVisible={isVisibleContactTeeFiExpired}
        backgroundStyle={{
          height: isIPhone8PlusOrBelow()
            ? verticalScale(110)
            : verticalScale(100),
        }}
        title="Your Account Has Expired!"
        titleStyle={{
          fontSize: moderateScale(21),
        }}
        subtitle="Please Contact School For Subscription Renewal"
        subtitleStyle={{fontSize: moderateScale(12)}}
        description="Our support:"
        descriptionStyle={{marginTop: verticalScale(20)}}
        onClose={() => setIsVisibleContactTeeFiExpired(false)}
      />
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
      <PopupUpdateClasses
        className={className}
        isVisible={isVisibleUpdateClasses}
        gradeId={gradeId}
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
      <AlertComponent
        isVisible={isVisibleDeleteClass}
        isShowWarningIcon
        isShowRightButton
        backgroundStyle={{height: verticalScale(65)}}
        title={'Warning!'}
        titleStyle={TITLE_POPUP}
        subtitle={`${t(
          'Please be aware that deleting this class will permanently remove the class and all student accounts associated with it. If you fully understand and wish to proceed with the deletion, please enter your password to confirm.',
        )}`}
        subtitleStyle={SUB_TITLE_MODAL}
        nextSubtitle={`${t('To confirm, type your password in the box below')}`}
        nextSubtitleStyle={NEXT_SUB_TITLE_MODAL}
        isShowTextInput={true}
        textInputPlaceholder={'Password'}
        valueTextInput={passwordTextInput?.value}
        error={isErrorValidDeleteClass}
        onChangeText={onChangeText}
        confirmBtTitle={`${t('yes')}`}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        cancelBtTitle={`${t('no_thanks')}`}
        onConfirm={onConfirmDeleteClass}
        onClose={() => {
          setIsVisibleDeleteClass(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteClass(false);
        }}
        onCancel={() => {
          setIsVisibleDeleteClass(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteClass(false);
        }}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const CONTAINER_VIEW: ViewStyle = {
  backgroundColor: color.gray2,
  marginVertical: verticalScale(10),
};
const CONTAINER_ADD_CLASS_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: horizontalScale(20),
  padding: 10,
};
const CONTENT_ADD_CLASS_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const SEARCH_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const SEARCH_CONTENT: ViewStyle = {
  paddingHorizontal: horizontalScale(15),
  flexDirection: 'row',
  alignItems: 'center',
};
const SEARCH_IMAGE_VIEW: ViewStyle = {
  position: 'absolute',
  left: horizontalScale(25),
  top: 10,
  bottom: 0,
  zIndex: 100,
  justifyContent: 'center',
  alignItems: 'center',
};
const CLOCK_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginEnd: 20,
  marginStart: 20,
  marginTop: verticalScale(10),
};
const ARROW_BUTTON_CONTAINER: ViewStyle = {marginLeft: moderateScale(5)};
const CONTENT: ViewStyle = {
  backgroundColor: color.white,
  marginHorizontal: horizontalScale(15),
  padding: 15,
  marginEnd: 20,
  marginStart: 20,
};
const ADD_KID_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(16),
  fontWeight: '500',
  color: color.black1,
};
const INPUT_SEARCH_CLASS_NAME: any = {
  height: 40,
  width: '70%',
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(30),
  marginTop: 10,
  fontSize: moderateScale(11),
  borderRadius: 60,
};
const TOTAL_LEARNING_TIME_CONTAINER: ViewStyle = {
  paddingHorizontal: horizontalScale(15),
  marginTop: verticalScale(5),
};
const TOTAL_LEARNING_TIME_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.black1,
};
const BUTTON_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignSelf: 'flex-end',
  width: horizontalScale(100),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
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
  fontSize: moderateScale(14),
  color: color.purple,
  fontWeight: '400',
  textAlign: 'center',
  paddingHorizontal: horizontalScale(10),
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const BODY_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};
const PROFILE_PICTURE: any = {
  width: 88,
  height: 88,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: color.white,
};
const FLEX_DIRECTION_COMMON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(18),
  fontWeight: '500',
  color: color.black1,
  textAlign: 'center',
};
const USER_NAME_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  color: color.gray3,
  fontWeight: '400',
};
const DUPLICATE_VIEW: ViewStyle = {
  paddingHorizontal: horizontalScale(10),
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(30),
  color: color.purple,
  paddingHorizontal: horizontalScale(10),
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(15),
  alignSelf: 'flex-start',
};
const NEXT_SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(12),
  fontWeight: '700',
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  alignSelf: 'flex-start',
};
const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(11),
  fontWeight: '400',
  color: color.black1,
  textAlign: 'left',
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
const HEIGHT_COMMON: ImageStyle = {
  height: verticalScale(75),
  width: horizontalScale(70),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 2,
  transform: [{rotate: '180deg'}],
};
const RANK_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray1,
  fontSize: moderateScale(13),
  transform: [{rotate: '180deg'}],
  left: horizontalScale(10),
  top: verticalScale(10),
};
