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
  ImageStyle,
  ImageBackground,
  TextInput,
  Text as RNText,
  Platform,
  RefreshControl,
} from 'react-native';
import {AlertComponent, Loading, SendMessagePopup, Text} from '@app/components';
//
import {useIsFocused, useNavigation} from '@react-navigation/native';
//
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
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
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpVectorIcon,
  ArrowDownVectorIcon,
  BanIcon,
  ClockIcon,
  DuplicateIcon,
  EditIcon,
  HintIcon,
  TrashIcon,
  SearchIcon,
  SendMessageIcon,
  DashboardIcon,
} from '@app/svg';
import {InputObject} from '@app/models';
import {
  formatDayMonthYear,
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
//
import {useGrade, useSchool} from '@app/hook';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {showToastMessage} from '@app/utils';
import {PopupUpdateStudent} from './popup-update-students';
import {TYPE} from '@app/utils/contants';
import {Dropdown} from 'react-native-element-dropdown';
import Tooltip from 'react-native-walkthrough-tooltip';
import {PopupAddStudent} from './popup-add-student';
import {debounce} from 'lodash';

const PAGE_SIZE = 10;
const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');

export const ManageStudentsPhone = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const navigation: any = useNavigation();

  const scrollViewRef = useRef<any>(null);
  const isFocusSearchStudentNameRef = useRef<boolean>(false);

  const {userInfo} = useSelector(selector.user);

  const [gradeNameFilter, setGradeNameFilter] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [passwordTextInput, setPasswordTextInput] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [searchStudentName, setSearchStudentName] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [gradeId, setGradeId] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);
  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);
  const [isVisibleUpdateStudent, setIsVisibleUpdateStudent] =
    useState<boolean>(false);
  const [isVisibleDeleteStudent, setIsVisibleDeleteStudent] =
    useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [isVisibleAddStudent, setIsVisibleAddStudent] =
    useState<boolean>(false);
  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isSortLearningTime, setIsSortLearningTime] = useState<boolean>(false);
  const [isFocusSearchStudentName, setIsFocusSearchStudentName] =
    useState<boolean>(false);
  const [isShowSendMessagePopup, setIsShowSendMessagePopup] =
    useState<boolean>(false);
  const [idStudent, setIdStudent] = useState<string[]>([]);
  const [isErrorValidDeleteStudent, setIsErrorValidDeleteStudent] =
    useState<boolean>(false);
  const [copiedStudentUsername, setCopiedStudentUsername] =
    useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    isFocusSearchStudentNameRef.current = isFocusSearchStudentName;
  });

  useEffect(() => {
    if (isFocused || isGetUser) {
      getListStudents({
        payload: {
          gradeId: gradeNameFilter?.value
            ? gradeNameFilter?.value
            : userInfo?.me?.grade?.gradeId,
          order: order,
          page: currentPage,
          pageSize: PAGE_SIZE,
          sort: sort,
        },
      });
    }
    return () => setCopiedStudentUsername('');
  }, [isFocused, isGetUser]);

  useEffect(() => {
    getListGrades({
      payload: {
        sort: 'createdAt',
      },
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListStudents({
      payload: {
        gradeId: gradeNameFilter?.value
          ? gradeNameFilter?.value
          : userInfo?.me?.grade?.gradeId,
        order: order,
        page: currentPage,
        pageSize: PAGE_SIZE,
        sort: sort,
      },
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, [isGetUser]);

  const onCompletedDeleteStudent = () => {
    setIsVisibleDeleteStudent(false);
    setIsGetUser(!isGetUser);
  };

  const onErrorDeleteStudent = () => {
    setIsVisibleLoading(false);
    setIsGetUser(!isGetUser);
  };

  const {deleteStudent, getListStudents, dataListStudents, isLoading} =
    useGrade();
  const {getListGrades, dataListGrades} = useSchool();

  const resGradeMap = dataListGrades?.data?.map(({_id, gradeName}) => ({
    value: _id,
    label: gradeName,
  }));
  resGradeMap?.unshift({
    label: 'All',
    value: null,
  });

  const dataPage = [...Array(dataListStudents?.totalPage).keys()].map(
    num => num + 1,
  );

  const onChangeText = text => {
    setIsErrorValidDeleteStudent(false);
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

  const isValidDataDeleteStudent = useMemo(() => {
    return passwordTextInput.value;
  }, [passwordTextInput]);

  const onConfirmDeleteStudent = async () => {
    setPasswordTextInput({value: '', error: ''});
    if (isValidDataDeleteStudent) {
      const res = await deleteStudent({
        payload: {studentId: gradeId, password: passwordTextInput.value},
      });
      if (res?.deleteStudent?.isSuccess) {
        await (onCompletedDeleteStudent && onCompletedDeleteStudent());
      } else {
        await (onErrorDeleteStudent && onErrorDeleteStudent());
      }
    } else {
      setIsErrorValidDeleteStudent(true);
    }
  };

  const debounceSearchStudentName = useCallback(
    debounce(text => {
      if (isFocusSearchStudentNameRef.current) {
        onCheckSearchStudentName(text);
      }
    }, 300),
    [],
  );

  const onCheckSearchStudentName = async text => {
    searchStudentName.value = text;
    getListStudents({
      payload: {
        gradeId: gradeId ? gradeId : null,
        order: 'asc',
        page: currentPage,
        pageSize: PAGE_SIZE,
        sort: 'createdAt',
        studentName: text,
      },
    });
  };

  const onFocusSearchStudentName = () => {
    setIsFocusSearchStudentName(true);
  };

  const onBlurSearchStudentName = () => {
    debounceSearchStudentName(searchStudentName.value);
    setIsFocusSearchStudentName(false);
  };

  const onEndSearchStudentName = () => {
    const value = searchStudentName.value;
    setSearchStudentName({value: value, error: ''});
    onCheckSearchStudentName(value);
  };

  const onChangeSearchStudentName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setSearchStudentName({value: onlyLetter, error: ''});
      }
    } else {
      setSearchStudentName({value: onlyLetter, error: ''});
    }
  };

  const renderItemDropdown = item => {
    return (
      <View style={{padding: 10}}>
        <Text text={item.label} style={ITEM_DROPDOWN_TEXT} numberOfLines={1} />
        <View style={SEPARATE} />
      </View>
    );
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
        <>
          {resGradeMap && resGradeMap?.length > 0 && (
            <View>
              <View style={SEARCH_VIEW_CONTAINER}>
                <Dropdown
                  style={INPUT_COMMON}
                  itemContainerStyle={{height: 40}}
                  selectedTextStyle={SELECTED_TEXT_STYLE}
                  data={resGradeMap}
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder={'All'}
                  placeholderStyle={PLACEHOLDER_STYLE}
                  value={gradeNameFilter.value}
                  onChange={item => {
                    setGradeNameFilter({value: item.value, error: ''});
                    setIsGetUser(!isGetUser);
                  }}
                  renderItem={renderItemDropdown}
                />
                <View style={SEARCH_VIEW_CONTENT}>
                  <View style={SEARCH_ICON_VIEW}>
                    <SearchIcon />
                  </View>
                  <TextInput
                    style={INPUT_SEARCH_STUDENT_NAME}
                    onChangeText={onChangeSearchStudentName}
                    value={searchStudentName.value}
                    placeholder={'Search Name ...'}
                    keyboardType="default"
                    placeholderTextColor={color.gray3}
                    onBlur={onBlurSearchStudentName}
                    onFocus={onFocusSearchStudentName}
                    onEndEditing={onEndSearchStudentName}
                  />
                </View>
                <View style={ACTION_SORT_LEARNING_TIME_CONTAINER}>
                  <View style={{left: horizontalScale(5)}}>
                    <ClockIcon />
                  </View>
                  <TouchableOpacity
                    style={ARROW_BUTTON}
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
                  {gradeNameFilter.value === null || !gradeNameFilter.value
                    ? 'Total Learning Hours Of Your School:'
                    : 'Total Learning Hours Of This Class:'}{' '}
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
                    {dataListStudents?.totalLearningTime}
                  </RNText>
                </RNText>
              </View>
            </View>
          )}
        </>

        {userInfo?.me?.role === 'grade' && (
          <View>
            <View style={ADD_STUDENT_CONTAINER}>
              <View style={ADD_STUDENT_VIEW}>
                <Text text={`${t('add_students')}`} style={ADD_KID_DATA_TEXT} />
                <Tooltip
                  topAdjustment={Platform.OS === 'android' ? -50 : 0}
                  isVisible={toolTipVisible}
                  showChildInTooltip={false}
                  content={
                    <Text style={TEXT_TOOLTIP}>
                      Please provide the{' '}
                      <Text style={[TEXT_TOOLTIP, {color: color.purple}]}>
                        username
                      </Text>{' '}
                      and{' '}
                      <Text style={[TEXT_TOOLTIP, {color: color.purple}]}>
                        password
                      </Text>{' '}
                      for your students to login and explore amazing lessons
                      with TeeFi. Your students can change the password and
                      update avatar on their dashboard.{' '}
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
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: horizontalScale(35),
                    height: verticalScale(35),
                  }}
                  onPress={() => setIsVisibleAddStudent(true)}>
                  <AddIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={[
                  SEARCH_VIEW_CONTAINER,
                  {
                    justifyContent: 'space-between',
                    marginTop: verticalScale(-25),
                  },
                ]}>
                <View style={SEARCH_VIEW_CONTENT}>
                  <View style={SEARCH_ICON_VIEW}>
                    <SearchIcon />
                  </View>
                  <TextInput
                    style={INPUT_SEARCH_STUDENT_NAME}
                    onChangeText={onChangeSearchStudentName}
                    value={searchStudentName.value}
                    placeholder={'Search Name ...'}
                    keyboardType="default"
                    placeholderTextColor={color.gray3}
                    onBlur={onBlurSearchStudentName}
                    onFocus={onFocusSearchStudentName}
                    onEndEditing={onEndSearchStudentName}
                  />
                </View>
                <View style={ACTION_SORT_LEARNING_TIME_CONTAINER}>
                  <View style={{left: horizontalScale(5)}}>
                    <ClockIcon />
                  </View>
                  <TouchableOpacity
                    style={ARROW_BUTTON}
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
                  Total Learning Hours Of Your Class:{' '}
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
                    {dataListStudents?.totalLearningTime}
                  </RNText>
                </RNText>
              </View>
            </View>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (isScrollToTop) {
              scrollViewRef.current.scrollTo({y: 0, animated: true});
            }
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={CONTAINER_VIEW}>
          <View>
            {dataListStudents?.data?.length > 0 ? (
              <View>
                <FlatList
                  scrollEnabled={false}
                  data={dataListStudents?.data}
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
                            borderWidth: 0,
                            height:
                              userInfo?.me?.role === TYPE.GRADE
                                ? verticalScale(200)
                                : 'auto',
                          },
                          ELEVATION,
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text text={`#${item?.rank}`} style={{padding: 15}} />
                          {userInfo?.me?.role === 'school' && (
                            <ImageBackground
                              source={
                                index % 2
                                  ? BACKGROUND_PURPLE
                                  : BACKGROUND_YELLOW
                              }
                              style={HEIGHT_COMMON}>
                              <View style={BACKGROUND_SCHOOL_VIEW}>
                                <View style={{marginLeft: horizontalScale(25)}}>
                                  <ClockIcon />
                                </View>
                                <Text
                                  text={item?.learningTime}
                                  style={LEARNING_HOUR_TEXT}
                                />
                              </View>
                            </ImageBackground>
                          )}
                          {userInfo?.me?.role === TYPE.GRADE && (
                            <View style={BUTTON_VIEW}>
                              <TouchableOpacity
                                onPress={() => {
                                  setIdStudent([item?._id]);
                                  setIsShowSendMessagePopup(true);
                                }}>
                                <SendMessageIcon
                                  width={20}
                                  height={20}
                                  fill={color.black1}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(
                                    UserActions.setInfoDashboardStudent(item),
                                  );
                                  navigation.navigate('viewStudentDashboard');
                                }}>
                                <DashboardIcon props={undefined} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setIsVisibleUpdateStudent(true);
                                  setGradeId(item?._id);
                                  setStudentName(item?.name);
                                }}>
                                <EditIcon fill={color.black1} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setGradeId(item?._id);
                                  setIsVisibleDeleteStudent(true);
                                }}>
                                <TrashIcon />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                        <View
                          style={[
                            BODY_CONTAINER,
                            {
                              padding:
                                userInfo?.me?.role === TYPE.GRADE ? 0 : 10,
                            },
                          ]}>
                          <FastImage
                            source={{uri: item?.avatar}}
                            style={PROFILE_PICTURE}
                          />
                          <View
                            style={[
                              FLEX_DIRECTION_COMMON,
                              {
                                width:
                                  userInfo?.me?.role === TYPE.GRADE
                                    ? horizontalScale(180)
                                    : 'auto',
                              },
                            ]}>
                            <RNText
                              style={[
                                TEXT_COMMON,
                                {
                                  fontSize:
                                    userInfo?.me?.role === TYPE.GRADE
                                      ? moderateScale(14)
                                      : moderateScale(18),
                                },
                              ]}
                              numberOfLines={2}>
                              {item?.name}
                              <RNText numberOfLines={2}>
                                {item?.birthday && (
                                  <>
                                    <Text text={' -  '} style={TEXT_COMMON} />
                                    <Text
                                      text={formatDayMonthYear(item?.birthday)}
                                      style={[
                                        TEXT_COMMON,
                                        {
                                          marginTop: 1,
                                          fontSize:
                                            userInfo?.me?.role === TYPE.GRADE
                                              ? moderateScale(14)
                                              : moderateScale(18),
                                        },
                                      ]}
                                    />
                                  </>
                                )}
                              </RNText>
                            </RNText>
                          </View>
                          {userInfo?.me?.role === TYPE.GRADE ? (
                            <View style={GRADE_VIEW_CONTAINER}>
                              <View
                                style={[
                                  FLEX_DIRECTION_COMMON,
                                  {
                                    top: verticalScale(55),
                                    left: horizontalScale(10),
                                  },
                                ]}>
                                <Text
                                  text={'Username: '}
                                  style={[
                                    USER_NAME_TEXT_COMMON,
                                    {
                                      color: color.gray3,
                                      fontSize: moderateScale(10),
                                    },
                                  ]}
                                />
                                <Text
                                  text={item?.username}
                                  style={[
                                    USER_NAME_TEXT_COMMON,
                                    {
                                      color: color.purple,
                                      fontSize: moderateScale(13),
                                    },
                                  ]}
                                />
                                <TouchableOpacity
                                  style={DUPLICATE_VIEW}
                                  onPress={() => {
                                    Clipboard.setString(item?.username);
                                    setCopiedStudentUsername(item?.username);
                                  }}>
                                  <DuplicateIcon
                                    fill={
                                      copiedStudentUsername === item?.username
                                        ? color.purple
                                        : color.black1
                                    }
                                  />
                                </TouchableOpacity>
                              </View>
                              <ImageBackground
                                source={
                                  index % 2
                                    ? BACKGROUND_PURPLE
                                    : BACKGROUND_YELLOW
                                }
                                style={BACKGROUND_GRADE_VIEW}>
                                <View style={CONTENT_GRADE_VIEW}>
                                  <View style={ICON_GRADE_VIEW}>
                                    <ClockIcon />
                                  </View>
                                  <Text
                                    text={item?.learningTime}
                                    style={LEARNING_HOUR_TEXT}
                                  />
                                </View>
                              </ImageBackground>
                            </View>
                          ) : (
                            <View style={FLEX_DIRECTION_COMMON}>
                              <Text
                                text={'Username: '}
                                style={[
                                  USER_NAME_TEXT_COMMON,
                                  {
                                    color: color.gray3,
                                  },
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
                                  setCopiedStudentUsername(item?.username);
                                }}>
                                <DuplicateIcon
                                  fill={
                                    copiedStudentUsername === item?.username
                                      ? color.purple
                                      : color.black1
                                  }
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  }}
                />
                {dataListStudents?.totalCount > 10 && (
                  <View style={PAGE_VIEW}>
                    <TouchableOpacity
                      onPress={async () => {
                        if (dataListStudents?.page === 1) {
                          await setCurrentPage(
                            parseInt(`${dataListStudents?.page}`, 10),
                          );
                        } else {
                          await setCurrentPage(
                            parseInt(`${dataListStudents?.page - 1}`, 10),
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
                              item === dataListStudents?.page
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
                                  item === dataListStudents?.page
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
                        setIsScrollToTop(true);
                        if (
                          dataListStudents?.page === dataListStudents?.totalPage
                        ) {
                          await setCurrentPage(
                            parseInt(`${dataListStudents?.page}`, 10),
                          );
                        } else {
                          await setCurrentPage(
                            parseInt(`${dataListStudents?.page + 1}`, 10),
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
                  text={"You haven't added students yet"}
                  style={NO_STUDENTS_TEXT}
                />
              </View>
            )}
          </View>
          <View
            style={{
              marginBottom:
                userInfo?.me?.role === TYPE.SCHOOL
                  ? verticalScale(150)
                  : verticalScale(220),
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <SendMessagePopup
        isVisible={isShowSendMessagePopup}
        backgroundStyle={{height: verticalScale(80)}}
        id={idStudent}
        title="Send A Message"
        titleStyle={{
          fontSize: moderateScale(26),
        }}
        onClose={() => setIsShowSendMessagePopup(false)}
      />
      <PopupAddStudent
        isVisible={isVisibleAddStudent}
        onClose={() => setIsVisibleAddStudent(false)}
        onCompleted={async () => {
          await setIsVisibleAddStudent(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Add Class Successfully', 'success', {
            bottomOffset: 80,
          });
        }}
        onError={async () => {
          await setIsVisibleAddStudent(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Add Class Failed', 'error', {
            bottomOffset: 80,
          });
        }}
      />
      <PopupUpdateStudent
        isVisible={isVisibleUpdateStudent}
        gradeId={gradeId}
        studentName={studentName}
        onClose={() => setIsVisibleUpdateStudent(false)}
        onCompleted={async () => {
          await setIsVisibleUpdateStudent(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Update Student Successfully', 'success', {
            bottomOffset: 80,
          });
        }}
        onError={async () => {
          await setIsVisibleUpdateStudent(false);
          await setIsGetUser(!isGetUser);
          showToastMessage('Update Student Failed', 'error', {
            bottomOffset: 80,
          });
        }}
      />
      <AlertComponent
        isVisible={isVisibleDeleteStudent}
        backgroundStyle={{height: verticalScale(65)}}
        isShowRightButton
        isShowWarningIcon
        title={'Warning!'}
        titleStyle={TITLE_POPUP}
        subtitle={
          "Please be aware that deleting this student will permanently remove the student's learning results. If you fully understand and wish to proceed with the deletion, please enter your password to confirm."
        }
        subtitleStyle={SUB_TITLE_MODAL}
        nextSubtitle={`${t('To confirm, type your password in the box below')}`}
        nextSubtitleStyle={NEXT_SUB_TITLE_MODAL}
        isShowTextInput={true}
        textInputPlaceholder={'Password'}
        valueTextInput={passwordTextInput?.value}
        onChangeText={onChangeText}
        error={isErrorValidDeleteStudent}
        confirmBtTitle={`${t('yes')}`}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        cancelBtTitle={`${t('no_thanks')}`}
        onConfirm={onConfirmDeleteStudent}
        onClose={() => {
          setIsVisibleDeleteStudent(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteStudent(false);
        }}
        onCancel={() => {
          setIsVisibleDeleteStudent(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteStudent(false);
        }}
      />
      <Loading isVisibleLoading={isVisibleLoading} />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const CONTAINER_VIEW: ViewStyle = {
  backgroundColor: color.gray2,
  marginTop: verticalScale(0),
};
const SEARCH_VIEW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
const SEARCH_VIEW_CONTENT: ViewStyle = {
  paddingHorizontal: horizontalScale(15),
  flexDirection: 'row',
  alignItems: 'center',
};
const SEARCH_ICON_VIEW: ViewStyle = {
  position: 'absolute',
  left: horizontalScale(25),
  top: 20,
  bottom: 0,
  zIndex: 100,
  justifyContent: 'center',
  alignItems: 'center',
};
const CONTENT: ViewStyle = {
  backgroundColor: color.white,
  marginHorizontal: horizontalScale(15),
  // marginVertical: verticalScale(10),
};
const ADD_KID_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(16),
  fontWeight: '500',
  color: color.black1,
};
const ADD_STUDENT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: horizontalScale(20),
  padding: 10,
};
const ADD_STUDENT_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const BACKGROUND_SCHOOL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: horizontalScale(30),
  transform: [{rotate: '90deg'}],
};
const TOTAL_LEARNING_TIME_CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
  marginVertical: verticalScale(10),
};
const TOTAL_LEARNING_TIME_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.black1,
};
const ACTION_SORT_LEARNING_TIME_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginEnd: 20,
  marginStart: 20,
  marginTop: verticalScale(20),
};
const ARROW_BUTTON: ViewStyle = {marginLeft: moderateScale(5)};
const BUTTON_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: horizontalScale(100),
};
const GRADE_VIEW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  position: 'absolute',
  zIndex: 2,
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: verticalScale(180),
};
const BACKGROUND_GRADE_VIEW: ImageStyle = {
  height: verticalScale(100),
  width: horizontalScale(100),
  justifyContent: 'center',
  alignItems: 'center',
  top: verticalScale(70),
};
const CONTENT_GRADE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(15),
};
const ICON_GRADE_VIEW: ViewStyle = {marginLeft: horizontalScale(25)};
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
  marginTop: verticalScale(-15),
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
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
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
const ITEM_DROPDOWN_TEXT: TextStyle = {
  fontSize: moderateScale(12),
  color: color.purple,
};
const SEPARATE: ViewStyle = {
  width: '100%',
  height: verticalScale(1),
  backgroundColor: color.gray2,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const INPUT_COMMON: any = {
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
  height: 40,
  width: '35%',
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
  marginStart: 20,
  marginTop: verticalScale(20),
  fontSize: moderateScale(11),
};
const INPUT_SEARCH_STUDENT_NAME: any = {
  height: 40,
  width: horizontalScale(140),
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(30),
  marginTop: 20,
  fontSize: moderateScale(11),
  borderRadius: 60,
};
const PLACEHOLDER_STYLE: TextStyle = {
  fontSize: moderateScale(11),
  color: color.black1,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(22),
  color: color.purple,
  paddingHorizontal: horizontalScale(10),
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(25),
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
const SELECTED_TEXT_STYLE: TextStyle = {
  fontSize: moderateScale(11),
  color: color.black1,
};
const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(11),
  fontWeight: '400',
  color: color.black1,
  textAlign: 'left',
};
const LEARNING_HOUR_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.black1,
  marginLeft: horizontalScale(30),
  textAlign: 'center',
  marginTop: verticalScale(5),
  fontSize: moderateScale(12),
};
const HEIGHT_COMMON: ImageStyle = {
  height: verticalScale(100),
  width: horizontalScale(100),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 2,
  right: Platform?.OS === 'android' ? horizontalScale(-5) : 0,
  top: Platform.OS === 'android' ? verticalScale(5) : 0,
  transform: [{rotate: '270deg'}],
};
