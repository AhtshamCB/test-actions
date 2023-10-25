/* eslint-disable react/no-unstable-nested-components */
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
  ArrowDownVectorIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpVectorIcon,
  BanIcon,
  DashboardIcon,
  DuplicateIcon,
  EditIcon,
  HintIcon,
  SearchIcon,
  SendMessageIcon,
  TrashIcon,
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

import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import {DataTable} from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import {debounce} from 'lodash';
import {TYPE} from '@app/utils/contants';
import {PopupAddStudent} from './popup-add-student';
import {PopupUpdateStudent} from './popup-update-students';
import {Dropdown} from 'react-native-element-dropdown';

const PAGE_SIZE = 10;

export const ManageStudentsPortraitTablet = () => {
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const isFocusSearchStudentNameRef = useRef<boolean>(false);

  const {userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

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

  const [isVisibleUpdateStudent, setIsVisibleUpdateStudent] =
    useState<boolean>(false);
  const [isVisibleDeleteStudent, setIsVisibleDeleteStudent] =
    useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [isVisibleAddStudent, setIsVisibleAddStudent] =
    useState<boolean>(false);
  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isFocusSearchStudentName, setIsFocusSearchStudentName] =
    useState<boolean>(false);
  const [isShowSendMessagePopup, setIsShowSendMessagePopup] =
    useState<boolean>(false);
  const [idStudent, setIdStudent] = useState<string[]>([]);
  const [isSortStudentName, setIsSortStudentName] = useState<boolean>(false);
  const [isSortClassName, setIsSortClassName] = useState<boolean>(false);
  const [isSortAddedDate, setIsSortAddedDate] = useState<boolean>(false);
  const [isSortLearningTimeHour, setIsSortLearningTimeHour] =
    useState<boolean>(true);
  const [isVisibleContactTeeFiExpired, setIsVisibleContactTeeFiExpired] =
    useState<boolean>(false);
  const [isErrorValidDeleteStudent, setIsErrorValidDeleteStudent] =
    useState<boolean>(false);
  const [copiedStudentUsername, setCopiedStudentUsername] =
    useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    isFocusSearchStudentNameRef.current = isFocusSearchStudentName;
  }, []);

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
        sort: sort,
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
    setIsGetUser(!isGetUser);
  };

  const {deleteStudent, getListStudents, dataListStudents, isLoading} =
    useGrade();
  const {getListGrades, dataListGrades, checkGradeIsExpired} = useSchool();

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

  const renderStudentFromTeacher = () => {
    return (
      <>
        {dataListStudents?.data?.length > 0 ? (
          <DataTable>
            <DataTable.Header
              style={{
                backgroundColor: '#DCDCDC',
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(320)
                    : horizontalScale(420),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(50)
                    : verticalScale(35),
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                }}>
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
                style={{flex: 1.5}}
                onPress={() => {
                  setIsSortStudentName(true);
                  setIsSortAddedDate(false);
                  setIsSortClassName(false);
                  setIsSortLearningTimeHour(false);
                  if (order === 'asc') {
                    setOrder('desc');
                    setSort('name');
                    setIsGetUser(!isGetUser);
                  } else {
                    setOrder('asc');
                    setSort('name');
                    setIsGetUser(!isGetUser);
                  }
                }}>
                <DataTable.Title
                  textStyle={[
                    TITLE_TEXT,
                    {
                      left: horizontalScale(10),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                      color: isSortStudentName ? color.purple : color.black1,
                    },
                  ]}>
                  Student Name
                  {isSortStudentName ? (
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
                  setIsSortStudentName(false);
                  setIsSortClassName(true);
                  setIsSortAddedDate(false);
                  setIsSortLearningTimeHour(false);
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
                      right: horizontalScale(10),
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
                  setIsSortStudentName(false);
                  setIsSortClassName(false);
                  setIsSortAddedDate(false);
                  setIsSortLearningTimeHour(true);
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
                      right: horizontalScale(5),
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
                      ? horizontalScale(300)
                      : horizontalScale(380),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(480)
                      : verticalScale(410),
                },
              ]}>
              <FlatList
                data={dataListStudents?.data}
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
                          flex: orientationOpenApp === 'LANDSCAPE' ? 0.5 : 0.5,
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'flex-start',
                          flex: 1,
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
                          flex: 0.7,
                        }}>
                        <Text
                          text={item.learningTime}
                          style={[
                            TITLE_CELL_TEXT,
                            {fontSize: moderateScale(8), top: verticalScale(2)},
                          ]}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          flex: 0.6,
                          marginRight:
                            orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(10)
                              : 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkGradeIsExpired(userInfo)) {
                              setIsVisibleContactTeeFiExpired(true);
                            } else {
                              setIdStudent([item?._id]);
                              setIsShowSendMessagePopup(true);
                            }
                          }}>
                          <SendMessageIcon />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(UserActions.setInfoDashboardStudent(item));
                            navigation.navigate('viewStudentDashboard');
                          }}>
                          <DashboardIcon props={undefined} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkGradeIsExpired(userInfo)) {
                              setIsVisibleContactTeeFiExpired(true);
                            } else {
                              setIsVisibleUpdateStudent(true);
                              setGradeId(item?._id);
                              setStudentName(item?.name);
                            }
                          }}>
                          <EditIcon fill={color.black1} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkGradeIsExpired(userInfo)) {
                              setIsVisibleContactTeeFiExpired(true);
                            } else {
                              setGradeId(item?._id);
                              setIsVisibleDeleteStudent(true);
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
              text={"You haven't added students yet"}
              style={NO_STUDENTS_TEXT}
            />
          </View>
        )}
      </>
    );
  };

  const renderStudentFromSchool = () => {
    return (
      <>
        {dataListStudents?.data?.length > 0 ? (
          <DataTable>
            <DataTable.Header
              style={{
                backgroundColor: '#DCDCDC',
                width: 'auto',
              }}>
              <TouchableOpacity
                style={{
                  flex: orientationOpenApp === 'LANDSCAPE' ? 0.5 : 0.6,
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(35),
                }}>
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
                style={{
                  flex: 1,
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(35),
                }}
                onPress={() => {
                  setIsSortStudentName(true);
                  setIsSortAddedDate(false);
                  setIsSortClassName(false);
                  setIsSortLearningTimeHour(false);
                  if (order === 'asc') {
                    setOrder('desc');
                    setSort('name');
                    setIsGetUser(!isGetUser);
                  } else {
                    setOrder('asc');
                    setSort('name');
                    setIsGetUser(!isGetUser);
                  }
                }}>
                <DataTable.Title
                  textStyle={[
                    TITLE_TEXT,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                      color: isSortStudentName ? color.purple : color.black1,
                    },
                  ]}>
                  Student Name
                  {isSortStudentName ? (
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
                style={{
                  flex: 1.5,
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(35),
                }}
                onPress={() => {
                  setIsSortStudentName(false);
                  setIsSortClassName(true);
                  setIsSortAddedDate(false);
                  setIsSortLearningTimeHour(false);
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
                          ? horizontalScale(5)
                          : horizontalScale(15),
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
                style={{
                  flex: 1,
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(35),
                }}
                onPress={() => {
                  setIsSortStudentName(false);
                  setIsSortClassName(false);
                  setIsSortAddedDate(true);
                  setIsSortLearningTimeHour(false);
                  if (order === 'asc') {
                    setOrder('desc');
                    setSort('createdAt');
                    setIsGetUser(!isGetUser);
                  } else {
                    setOrder('asc');
                    setSort('createdAt');
                    setIsGetUser(!isGetUser);
                  }
                }}>
                <DataTable.Title
                  textStyle={[
                    TITLE_TEXT,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                      color: isSortAddedDate ? color.purple : color.black1,
                    },
                  ]}>
                  Added Date
                  {isSortAddedDate ? (
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
                style={{
                  flex: 1,
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(35),
                }}
                onPress={() => {
                  setIsSortStudentName(false);
                  setIsSortClassName(false);
                  setIsSortAddedDate(false);
                  setIsSortLearningTimeHour(true);
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
            </DataTable.Header>
            <DataTable.Row
              style={[
                BODY_ROW,
                {
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(300)
                      : horizontalScale(380),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(480)
                      : verticalScale(410),
                },
              ]}>
              <FlatList
                data={dataListStudents?.data}
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
                          flex: orientationOpenApp === 'LANDSCAPE' ? 0.3 : 0.5,
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
                          flex: 1,
                          left:
                            orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(5)
                              : 0,
                        }}>
                        <Text
                          text={item.name}
                          style={[
                            TITLE_CELL_TEXT,
                            {fontSize: moderateScale(8)},
                          ]}
                        />
                        <TouchableOpacity
                          style={DUPLICATE_VIEW}
                          onPress={() => {
                            Clipboard.setString(item?.name);
                            showToastMessage('Username Copied', 'success', {
                              bottomOffset: 80,
                            });
                          }}>
                          <DuplicateIcon />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          right: horizontalScale(10),
                        }}>
                        <FastImage
                          source={{uri: item.avatar}}
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 100,
                            marginHorizontal:
                              orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(2)
                                : horizontalScale(5),
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
                          justifyContent: 'flex-start',
                          flex: 0.9,
                        }}>
                        <Text
                          text={formatDayMonthYear(item.createdAt)}
                          style={[
                            TITLE_CELL_TEXT,
                            {fontSize: moderateScale(8)},
                          ]}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          flex: orientationOpenApp === 'LANDSCAPE' ? 0.9 : 0.7,
                        }}>
                        <Text
                          text={item.learningTime}
                          style={[
                            TITLE_CELL_TEXT,
                            {fontSize: moderateScale(8)},
                          ]}
                        />
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
              text={"You haven't added students yet"}
              style={NO_STUDENTS_TEXT}
            />
          </View>
        )}
      </>
    );
  };

  const renderItemDropdown = item => {
    return (
      <View style={{padding: 10}}>
        <Text
          text={item.label}
          style={[
            ITEM_DROPDOWN_TEXT,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(9)
                  : moderateScale(10),
            },
          ]}
          numberOfLines={1}
        />
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
        {userInfo?.me?.role === TYPE.SCHOOL ? (
          <View
            style={{
              paddingHorizontal: horizontalScale(10),
              marginTop: verticalScale(10),
            }}>
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
              {gradeNameFilter.value === null || !gradeNameFilter.value
                ? 'Total Learning Hours Of Your School:'
                : 'Total Learning Hours Of This Class:'}{' '}
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
                {dataListStudents?.totalLearningTime}
              </RNText>
            </RNText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(10),
                alignItems: 'center',
              }}>
              <View
                style={[
                  SEARCH_CONTENT,
                  {
                    width: orientationOpenApp === 'LANDSCAPE' ? '35%' : '20%',
                  },
                ]}>
                <View style={SEARCH_IMAGE_VIEW}>
                  <SearchIcon />
                </View>
                <TextInput
                  style={[
                    INPUT_SEARCH_CLASS_NAME,
                    {
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(110)
                          : horizontalScale(120),
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(45)
                          : verticalScale(35),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    },
                  ]}
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
              {resGradeMap && resGradeMap?.length > 0 && (
                <Dropdown
                  style={[
                    INPUT_COMMON,
                    {
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(80)
                          : horizontalScale(90),
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(45)
                          : verticalScale(35),
                      marginLeft:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(30)
                          : horizontalScale(60),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(11),
                    },
                  ]}
                  itemContainerStyle={{height: 40}}
                  selectedTextStyle={{
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(11),
                  }}
                  data={resGradeMap}
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder={'All'}
                  placeholderStyle={{
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  }}
                  value={gradeNameFilter.value}
                  onChange={item => {
                    setGradeNameFilter({value: item.value, error: ''});
                    setIsGetUser(!isGetUser);
                  }}
                  renderItem={renderItemDropdown}
                />
              )}
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(10),
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(10),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  text={'Add Student'}
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
                      for your students to login and explore amazing lessons
                      with TeeFi. Your students can change the password and
                      update avatar on their dashboard.{' '}
                    </Text>
                  }
                  placement="bottom"
                  onClose={() => setToolTipVisible(false)}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: horizontalScale(10),
                      right: horizontalScale(5),
                    }}
                    onPress={() => setToolTipVisible(true)}>
                    <HintIcon width={20} height={20} />
                  </TouchableOpacity>
                </Tooltip>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    SEARCH_CONTENT,
                    {width: orientationOpenApp === 'LANDSCAPE' ? '42%' : '38%'},
                  ]}>
                  <View style={SEARCH_IMAGE_VIEW}>
                    <SearchIcon />
                  </View>
                  <TextInput
                    style={[
                      INPUT_SEARCH_CLASS_NAME,
                      {
                        width:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(105)
                            : horizontalScale(125),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(45)
                            : verticalScale(35),
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      },
                    ]}
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
                <TouchableOpacity
                  onPress={() => {
                    if (checkGradeIsExpired(userInfo)) {
                      setIsVisibleContactTeeFiExpired(true);
                    } else {
                      setIsVisibleAddStudent(true);
                    }
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
                Total Learning Hours Of Your Class:{' '}
                <RNText
                  style={[
                    TOTAL_LEARNING_TIME_TEXT,
                    {
                      color: color.purple,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(13),
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
        <View style={{marginTop: verticalScale(20)}}>
          {userInfo?.me?.role === TYPE.GRADE
            ? renderStudentFromTeacher()
            : renderStudentFromSchool()}
          {dataListStudents?.totalCount > 10 && (
            <View style={PAGE_VIEW}>
              <TouchableOpacity
                style={{marginHorizontal: horizontalScale(5)}}
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
                  if (dataListStudents?.page === dataListStudents?.totalPage) {
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
      </KeyboardAvoidingView>
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
      <SendMessagePopup
        isVisible={isShowSendMessagePopup}
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(100)
              : verticalScale(80),
        }}
        id={idStudent}
        title="Send A Message"
        titleStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(20)
              : moderateScale(26),
        }}
        onClose={() => setIsShowSendMessagePopup(false)}
      />
      <AlertComponent
        isVisible={isVisibleDeleteStudent}
        isShowWarningIcon
        isShowRightButton
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(85)
              : verticalScale(80),
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
        subtitle={
          "Please be aware that deleting this student will permanently remove the student's learning results. If you fully understand and wish to proceed with the deletion, please enter your password to confirm."
        }
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
        error={isErrorValidDeleteStudent}
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
        confirmTextStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
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
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const BODY_ROW: ViewStyle = {
  width: horizontalScale(300),
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
const TOTAL_LEARNING_TIME_CONTAINER: ViewStyle = {
  paddingHorizontal: horizontalScale(10),
  marginTop: verticalScale(5),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const TOTAL_LEARNING_TIME_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
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
const SEPARATOR: ViewStyle = {
  height: 1,
  width: '100%',
  backgroundColor: color.gray9,
  marginTop: verticalScale(10),
};
const DUPLICATE_VIEW: ViewStyle = {
  paddingHorizontal: horizontalScale(5),
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(26),
  color: color.black1,
};
const PAGE_VIEW: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: verticalScale(10),
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
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const SEARCH_IMAGE_VIEW: ViewStyle = {
  position: 'absolute',
  left: horizontalScale(10),
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
  fontSize: moderateScale(10),
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(15),
  alignSelf: 'flex-start',
};
const NEXT_SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(10),
  fontWeight: '700',
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  alignSelf: 'flex-start',
};
const ITEM_DROPDOWN_TEXT: TextStyle = {
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
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginHorizontal: horizontalScale(20),
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
