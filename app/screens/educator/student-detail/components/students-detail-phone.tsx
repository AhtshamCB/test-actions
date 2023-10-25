/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ImageStyle,
  TextInput,
  Text as RNText,
  RefreshControl,
} from 'react-native';
import {Header, Text} from '@app/components';
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
  BanIcon,
  ClockIcon,
  DuplicateIcon,
  SearchIcon,
} from '@app/svg';

import {formatDayMonthYear, leftTrim} from '@app/utils/general';
//
import {useGrade} from '@app/hook';

import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {showToastMessage} from '@app/utils';
import {useIsFocused} from '@react-navigation/native';
import {goBack} from '@app/navigators';
import {debounce} from 'lodash';
import {InputObject} from '@app/models';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {TYPE} from '@app/utils/contants';
import {Platform} from 'react-native';

const PAGE_SIZE = 10;
const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');

export const StudentsDetailPhone = ({route}) => {
  const isFocused = useIsFocused();
  const {gradeIdDetail, gradeName} = route?.params || '';

  const scrollViewRef = useRef<any>(null);
  const isFocusSearchStudentNameRef = useRef<boolean>(false);

  const {userInfo} = useSelector(selector.user);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('desc');
  const [sort, setSort] = useState<string>('learningTime');
  const [isSortLearningTime, setIsSortLearningTime] = useState<boolean>(false);
  const [searchStudentName, setSearchStudentName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [isFocusSearchStudentName, setIsFocusSearchStudentName] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    isFocusSearchStudentNameRef.current = isFocusSearchStudentName;
  });

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
        gradeId: gradeIdDetail,
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
      <Header title={gradeName} onBackPress={() => goBack()} />
      <View style={BODY}>
        <View style={CONTAINER_SEARCH_VIEW}>
          <View style={CONTENT_SEARCH_VIEW}>
            <View style={SEARCH_ICON_VIEW}>
              <SearchIcon />
            </View>
            <TextInput
              style={INPUT_SEARCH_STUDENT_NAME}
              onChangeText={onChangeSearchStudentName}
              value={searchStudentName.value}
              placeholder={'Search Student Name ...'}
              keyboardType="default"
              placeholderTextColor={color.gray3}
              onBlur={onBlurSearchStudentName}
              onFocus={onFocusSearchStudentName}
              onEndEditing={onEndSearchStudentName}
            />
          </View>
          <View style={HEADER_CONTAINER_VIEW}>
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
            {userInfo?.me?.role === TYPE.GRADE
              ? 'Total Learning Hours Of Your Class:'
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
        <KeyboardAvoidingView behavior={'padding'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onContentSizeChange={() => {
              if (isScrollToTop) {
                scrollViewRef.current.scrollTo({y: 0, animated: true});
              }
            }}
            style={CONTAINER_VIEW}>
            <View>
              {dataListStudents?.data?.length > 0 ? (
                <View>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={dataListStudents?.data}
                    keyExtractor={item => item._id}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          key={index}
                          style={[
                            CONTENT_ITEM,
                            {
                              marginBottom: 10,
                              borderColor: color.white,
                              borderWidth: 0,
                            },
                            ELEVATION,
                          ]}>
                          <View style={BODY_ITEM}>
                            <Text
                              text={`#${item?.rank}`}
                              style={{padding: 15}}
                            />

                            <ImageBackground
                              source={
                                index % 2
                                  ? BACKGROUND_PURPLE
                                  : BACKGROUND_YELLOW
                              }
                              style={HEIGHT_COMMON}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: horizontalScale(30),
                                  transform: [{rotate: '90deg'}],
                                }}>
                                <View style={{marginLeft: horizontalScale(25)}}>
                                  <ClockIcon />
                                </View>
                                <Text
                                  text={item?.learningTime}
                                  style={LEARNING_HOUR_TEXT}
                                />
                              </View>
                            </ImageBackground>
                          </View>
                          <View style={BODY_CONTAINER}>
                            <FastImage
                              source={{uri: item?.avatar}}
                              style={PROFILE_PICTURE}
                            />
                            <View style={FLEX_DIRECTION_COMMON}>
                              <Text text={item?.name} style={TEXT_COMMON} />
                              {item?.birthday && (
                                <>
                                  <Text text={'-  '} style={TEXT_COMMON} />
                                  <Text
                                    text={formatDayMonthYear(item?.birthday)}
                                    style={[TEXT_COMMON, {marginTop: 1}]}
                                  />
                                </>
                              )}
                            </View>
                            <View style={FLEX_DIRECTION_COMMON}>
                              <Text
                                text={'Username: '}
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
                                  showToastMessage(
                                    'Username Copied',
                                    'success',
                                    {
                                      bottomOffset: 80,
                                    },
                                  );
                                }}>
                                <DuplicateIcon />
                              </TouchableOpacity>
                            </View>
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
                            dataListStudents?.page ===
                            dataListStudents?.totalPage
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
                    text={"Your teachers haven't added students yet"}
                    style={NO_STUDENTS_TEXT}
                  />
                </View>
              )}
            </View>
            <View style={{marginBottom: verticalScale(150)}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const BODY: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
  marginTop: verticalScale(15),
};
const CONTAINER_SEARCH_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const CONTENT_SEARCH_VIEW: ViewStyle = {
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
const TOTAL_LEARNING_TIME_CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
  marginTop: verticalScale(5),
};
const TOTAL_LEARNING_TIME_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.black1,
};
const CONTAINER_VIEW: ViewStyle = {
  backgroundColor: color.gray4,
  marginVertical: verticalScale(10),
};
const CONTENT_ITEM: ViewStyle = {
  backgroundColor: color.white,
  marginHorizontal: horizontalScale(15),
};
const BODY_ITEM: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const HEADER_CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  marginEnd: 20,
  marginStart: 20,
  paddingVertical: verticalScale(10),
};
const ARROW_BUTTON: ViewStyle = {marginLeft: moderateScale(5)};
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
  padding: 10,
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
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
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
const LEARNING_HOUR_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
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
  right: Platform.OS === 'android' ? horizontalScale(-5) : 0,
  transform: [{rotate: '270deg'}],
};
const INPUT_SEARCH_STUDENT_NAME: any = {
  height: 40,
  width: horizontalScale(180),
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(30),
  marginTop: 20,
  fontSize: moderateScale(11),
  borderRadius: 60,
};
