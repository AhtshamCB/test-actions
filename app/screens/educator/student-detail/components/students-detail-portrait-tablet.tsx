/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useRef} from 'react';
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
import {Header, Text} from '@app/components';
//
import {useIsFocused} from '@react-navigation/native';
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
  ArrowDownVectorIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpVectorIcon,
  SearchIcon,
} from '@app/svg';
import {InputObject} from '@app/models';
import {formatDayMonthYear, leftTrim} from '@app/utils/general';
//
import {useGrade} from '@app/hook';

import FastImage from 'react-native-fast-image';
import {DataTable} from 'react-native-paper';
import {debounce} from 'lodash';
import {goBack} from '@app/navigators';

const PAGE_SIZE = 10;

export const StudentsDetailPortraitTablet = ({route}) => {
  const {gradeIdDetail, gradeName} = route?.params || '';
  const isFocused = useIsFocused();

  const isFocusSearchStudentNameRef = useRef<boolean>(false);
  const {orientationOpenApp} = useSelector(selector.config);

  const [searchStudentName, setSearchStudentName] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isFocusSearchStudentName, setIsFocusSearchStudentName] =
    useState<boolean>(false);

  const [isSortStudentName, setIsSortStudentName] = useState<boolean>(false);
  const [isSortClassName, setIsSortClassName] = useState<boolean>(false);
  const [isSortAddedDate, setIsSortAddedDate] = useState<boolean>(false);
  const [isSortLearningTimeHour, setIsSortLearningTimeHour] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    isFocusSearchStudentNameRef.current = isFocusSearchStudentName;
  }, []);

  useEffect(() => {
    if (isFocused || isGetUser) {
      getListStudents({
        payload: {
          gradeId: gradeIdDetail ? gradeIdDetail : null,
          order: order,
          page: currentPage,
          pageSize: PAGE_SIZE,
          sort: sort,
        },
      });
    }
  }, [isFocused, isGetUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListStudents({
      payload: {
        gradeId: gradeIdDetail ? gradeIdDetail : null,
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

  const {getListStudents, dataListStudents, isLoading} = useGrade();

  const dataPage = [...Array(dataListStudents?.totalPage).keys()].map(
    num => num + 1,
  );

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
        gradeId: gradeIdDetail ? gradeIdDetail : null,
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

  const renderStudentFromSchool = () => {
    return (
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: '#DCDCDC',
            width: 'auto',
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(47)
                : verticalScale(35),
          }}>
          <TouchableOpacity style={{flex: 0.5}}>
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
            style={{flex: orientationOpenApp === 'LANDSCAPE' ? 1.5 : 1}}
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
                  left: horizontalScale(5),
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
                  left:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(0)
                      : horizontalScale(20),
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
                  left:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(15)
                      : horizontalScale(30),
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
                  left:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(10)
                      : horizontalScale(20),
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10),
                  color: isSortLearningTimeHour ? color.purple : color.black1,
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return (
                <View key={index} style={FLALIST_CONTENT}>
                  <View
                    style={{
                      flex: orientationOpenApp === 'LANDSCAPE' ? 0.4 : 0.4,
                    }}>
                    <Text
                      text={`#${item.rank}`}
                      style={[TITLE_CELL_TEXT, {fontSize: moderateScale(8)}]}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: orientationOpenApp === 'LANDSCAPE' ? 1.6 : 1.5,
                      left:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(5)
                          : 0,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
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
                      text={item.name}
                      style={[TITLE_CELL_TEXT, {fontSize: moderateScale(8)}]}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      right: horizontalScale(10),
                    }}>
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
                      style={[TITLE_CELL_TEXT, {fontSize: moderateScale(8)}]}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flex: orientationOpenApp === 'LANDSCAPE' ? 0.9 : 0.7,
                    }}>
                    <Text
                      text={item.learningTime}
                      style={[TITLE_CELL_TEXT, {fontSize: moderateScale(8)}]}
                    />
                  </View>
                </View>
              );
            }}
            ItemSeparatorComponent={() => <View style={SEPARATOR} />}
          />
        </DataTable.Row>
      </DataTable>
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
        <Header
          headerStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(12)
                : moderateScale(14),
          }}
          title={gradeName}
          onBackPress={() => goBack()}
        />
        <View
          style={{
            paddingHorizontal: horizontalScale(10),
            marginTop: verticalScale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              top: verticalScale(5),
              right:
                orientationOpenApp === 'LANDSCAPE' ? horizontalScale(5) : 0,
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
              Total Learning Hours Of This Class:{' '}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={[
                SEARCH_CONTENT,
                {
                  width: orientationOpenApp === 'LANDSCAPE' ? '35%' : '35%',
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
                        ? horizontalScale(90)
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
          </View>
        </View>
        <View style={{marginTop: verticalScale(20)}}>
          {renderStudentFromSchool()}
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
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
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
  paddingHorizontal: horizontalScale(20),
  borderRadius: 60,
};
