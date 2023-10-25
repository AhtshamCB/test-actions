/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Platform,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  AlertComponent,
  CountDownTimeFix,
  PopupFeedback,
  Text,
} from '@app/components';
import {
  LogoDashboard,
  CloseMenu,
  LeaderBoardIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  SettingIcon,
  LogoutIcon,
  CupIcon,
  TranslationIcon,
  FeedbackIcon,
  DeleteAccountIcon,
} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {
  convertFormatString,
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils';
import {useDeleteKidsAccount, useLogout} from '@app/hook';
import {isTablet} from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import {TYPE} from '@app/utils/contants';
import {InputObject} from '@app/models';

const AVATAR_DEFAULT = require('../images/avatar-default.png');

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const {i18n, t} = useTranslation(); //i18n instance

  const {userInfo, accessToken} = useSelector(selector.user);
  const {leaderboardInfo} = useSelector(selector.dashboard);
  const {isBetaVersion, endBetaDate, orientationOpenApp} = useSelector(
    selector.config,
  );

  const [onPressLeaderboard, setOnPressLeaderboard] = useState<boolean>(false);

  const [isShowPopupFeedback, setIsShowPopupFeedback] =
    useState<boolean>(false);
  const [passwordTextInput, setPasswordTextInput] = useState<InputObject>({
    value: '',
    error: '',
  });

  const kidName = userInfo?.me?.name || '';
  const parentName = userInfo?.me?.firstName || '';
  const schoolName = userInfo?.me?.school?.schoolName || '';
  const teacherName = userInfo?.me?.grade?.gradeName || '';

  const {logout} = useLogout(accessToken);

  const date1 = moment(convertFormatString(endBetaDate), 'YYYY-MM-DD');
  const date2 = moment();

  const differenceInSeconds = date1.diff(date2, 'seconds');

  const [isVisibleDeleteAccount, setIsVisibleDeleteAccount] =
    useState<boolean>(false);
  const [isErrorValidDeleteClass, setIsErrorValidDeleteClass] =
    useState<boolean>(false);

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

  const isValidDataDeleteAccount = useMemo(() => {
    return passwordTextInput.value;
  }, [passwordTextInput]);

  const onCompletedDeleteUser = async () => {
    await logout();
    props.navigation.navigate('login');
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
    } else {
      await AsyncStorage.multiRemove(asyncStorageKeys);
      await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
    }
    dispatch(UserActions.signOut());
  };

  const {deleteKidsAccount, errors} = useDeleteKidsAccount();
  const onConfirmDeleteClass = async () => {
    setPasswordTextInput({value: '', error: ''});
    if (isValidDataDeleteAccount) {
      const res = await deleteKidsAccount({
        payload: {
          password: passwordTextInput.value,
        },
      });
      if (res?.isSuccess) {
        setIsVisibleDeleteAccount(false);
        props.navigation.closeDrawer();
        onCompletedDeleteUser();
      }
    } else {
      setIsErrorValidDeleteClass(true);
    }
  };

  const renderName = () => {
    switch (userInfo?.me?.role) {
      case TYPE.PARENT: {
        return parentName;
      }
      case TYPE.KID: {
        return kidName;
      }
      case TYPE.STUDENT: {
        return kidName;
      }
      case TYPE.SCHOOL: {
        return schoolName;
      }
      case TYPE.GRADE: {
        return teacherName;
      }
    }
  };

  return (
    <View style={CONTAINER}>
      <DrawerContentScrollView {...props}>
        <View style={HEADER_VIEW}>
          <LogoDashboard />
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <CloseMenu />
          </TouchableOpacity>
        </View>
        {userInfo?.me?.role === TYPE.STUDENT && (
          <View style={SCHOOL_NAME_VIEW}>
            <Text
              text={userInfo?.me?.student?.schoolName}
              style={SCHOOL_NAME_TEXT}
            />
          </View>
        )}
        {userInfo?.me?.role === TYPE.GRADE && (
          <View style={SCHOOL_NAME_VIEW}>
            <Text
              text={userInfo?.me?.grade?.schoolName}
              style={SCHOOL_NAME_TEXT}
            />
          </View>
        )}
        {isBetaVersion && (
          <View style={CONTAINER_COUNT_DOWN_TIME}>
            <CountDownTimeFix secondsFinish={differenceInSeconds} />
            <Text text={'Beta Version'} style={BETA_VERSION_TEXT} />
          </View>
        )}

        <DrawerItemList {...props} />
        {!isBetaVersion && (
          <TouchableOpacity
            style={FEEDBACK_VIEW}
            onPress={() => {
              setIsShowPopupFeedback(true);
            }}>
            <FeedbackIcon fill={color.gray3} />
            <Text
              text={'Feedback'}
              style={[
                TEXT_LEADERBOARD,
                {
                  color: color.gray3,
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : 16,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={LEADERBOARD_VIEW}
          onPress={() => setOnPressLeaderboard(!onPressLeaderboard)}>
          <LeaderBoardIcon
            fill={onPressLeaderboard ? color.primary : color.gray3}
            props={undefined}
          />
          <Text
            text={
              userInfo?.me?.role === 'parent'
                ? `${t('leaderboard')}`
                : 'Leaderboard'
            }
            style={[
              TEXT_LEADERBOARD,
              {
                color: onPressLeaderboard ? color.primary : color.gray3,
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12)
                  : 16,
              },
            ]}
          />
          {onPressLeaderboard ? (
            <ArrowUpIcon
              fill={onPressLeaderboard ? color.primary : color.dark2}
              props={undefined}
            />
          ) : (
            <ArrowDownIcon
              fill={onPressLeaderboard ? color.primary : color.dark2}
              props={undefined}
            />
          )}
        </TouchableOpacity>
        {onPressLeaderboard ? (
          <View style={VIEW}>
            {leaderboardInfo?.map((item, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <LinearGradient
                    colors={['#F300FF', '#FFBA00']}
                    start={{x: 0.1, y: 0.1}}
                    locations={[0, 1]}
                    style={[
                      CONTAINER_ITEM,
                      {
                        marginTop: verticalScale(5),
                      },
                    ]}>
                    <View style={CUP_VIEW}>
                      <CupIcon />
                    </View>
                    <FastImage
                      source={
                        item?.avatar ? {uri: item?.avatar} : AVATAR_DEFAULT
                      }
                      style={AVATAR}
                    />
                    <Text
                      text={item.name}
                      style={NAME_TEXT}
                      numberOfLines={1}
                    />
                    <Text
                      text={`${item.balance}`}
                      style={[
                        MONEY_TEXT,
                        {
                          color: color.white,
                        },
                      ]}
                    />
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      CONTAINER_ITEM,
                      {
                        backgroundColor:
                          index === 1
                            ? color.purple
                            : index === 2
                            ? color.yellow
                            : index === 3
                            ? color.purple1
                            : index === 4
                            ? color.yellow2
                            : color.white,
                        marginTop: verticalScale(5),
                      },
                    ]}
                    key={index}>
                    <Text text={`${index + 1}`} style={NUMBER_TEXT} />
                    <FastImage
                      source={
                        item?.avatar ? {uri: item?.avatar} : AVATAR_DEFAULT
                      }
                      style={AVATAR}
                    />
                    <Text
                      text={item.name}
                      style={NAME_TEXT}
                      numberOfLines={1}
                    />
                    <Text
                      text={`${item.balance}`}
                      style={[
                        MONEY_TEXT,
                        {
                          color:
                            index === 1
                              ? color.white
                              : index === 2
                              ? color.white
                              : color.black1,
                        },
                      ]}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        ) : null}
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity
          style={[
            SETTING_VIEW,
            {flexDirection: 'row', marginBottom: verticalScale(10)},
          ]}
          onPress={() => {
            if (i18n.language === 'en') {
              i18n.changeLanguage('vi');
            } else {
              i18n.changeLanguage('en');
            }
          }}>
          <TranslationIcon fill={color.gray3} props={undefined} />

          <Text
            text={i18n?.language?.toLocaleUpperCase()}
            style={[
              SETTINGS_TEXT,
              {
                marginStart: 35,
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12)
                  : 16,
              },
            ]}
          />
        </TouchableOpacity>
        {userInfo?.me?.role === 'parent' && (
          <TouchableOpacity
            style={SETTING_VIEW}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('accountSettings');
            }}>
            <SettingIcon />
            <Text
              text={`${t('settings')}`}
              style={[
                SETTINGS_TEXT,
                {
                  marginStart: 35,
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : 16,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {userInfo?.me?.role === 'school' && (
          <TouchableOpacity
            style={SETTING_VIEW}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('accountSchoolSettings');
            }}>
            <SettingIcon />
            <Text
              text={`${t('settings')}`}
              style={[
                SETTINGS_TEXT,
                {
                  marginStart: 35,
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : 16,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {(userInfo?.me?.role === TYPE.KID ||
          userInfo?.me?.role === TYPE.STUDENT) && (
          <TouchableOpacity
            style={SETTING_VIEW}
            onPress={() => {
              setIsVisibleDeleteAccount(true);
            }}>
            <DeleteAccountIcon />
            <Text
              text={'Delete Account'}
              style={[
                SETTINGS_TEXT,
                {
                  marginStart: 35,
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : 16,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={LOG_OUT_VIEW}
          onPress={async () => {
            await logout();
            const asyncStorageKeys = await AsyncStorage.getAllKeys();
            if (Platform.OS === 'android') {
              await AsyncStorage.clear();
              await AsyncStorage.setItem(
                'isFinishOnboarding',
                JSON.stringify(true),
              );
            } else {
              await AsyncStorage.multiRemove(asyncStorageKeys);
              await AsyncStorage.setItem(
                'isFinishOnboarding',
                JSON.stringify(true),
              );
            }
            dispatch(UserActions.signOut());
            props.navigation.closeDrawer();
            if (
              userInfo?.me?.role === 'parent' ||
              userInfo?.me?.role === 'kid'
            ) {
              props.navigation.replace('login');
            } else {
              props.navigation.replace('loginEducator');
            }
          }}>
          <LogoutIcon />
          <Text
            text={userInfo?.me?.role === 'parent' ? `${t('logout')}` : 'Logout'}
            style={[
              SETTINGS_TEXT,
              {
                marginStart: 35,
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12)
                  : 16,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <PopupFeedback
        isVisible={isShowPopupFeedback}
        title={`${t('hi')}, ${renderName()}!`}
        subtitle="YOUR FEEDBACK WILL HELP US SERVE YOU BETTER"
        onClose={() => setIsShowPopupFeedback(false)}
      />
      <AlertComponent
        isVisible={isVisibleDeleteAccount}
        isShowWarningIcon
        isShowRightButton
        backgroundStyle={{
          height: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(85)
              : verticalScale(65)
            : verticalScale(65),
        }}
        title={'Warning!'}
        titleStyle={[
          TITLE_POPUP,
          {
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(20)
                : moderateScale(26)
              : moderateScale(30),
          },
        ]}
        subtitle={`${t(
          "Please be aware that deleting this account will permanently remove the kid's account data. If you fully understand and wish to proceed with the deletion, please enter the Parent's password to confirm.",
        )}`}
        subtitleStyle={[
          SUB_TITLE_MODAL,
          {
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(9)
                : moderateScale(10)
              : moderateScale(12),
          },
        ]}
        nextSubtitle={`${t(
          "To confirm, type Parent's password in the box below",
        )}`}
        nextSubtitleStyle={[
          NEXT_SUB_TITLE_MODAL,
          {
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(9)
                : moderateScale(10)
              : moderateScale(12),
          },
        ]}
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
          setIsVisibleDeleteAccount(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteClass(false);
        }}
        onCancel={() => {
          setIsVisibleDeleteAccount(false);
          setPasswordTextInput({value: '', error: ''});
          setIsErrorValidDeleteClass(false);
        }}
        confirmButtonStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(50)
              : verticalScale(40),
          width: isTablet() ? horizontalScale(80) : horizontalScale(120),
        }}
        cancelButtonStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(50)
              : verticalScale(40),
          width: isTablet() ? horizontalScale(80) : horizontalScale(120),
        }}
        cancelTextStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
        errorText={errors}
      />
      {/* <PopupEnterYourPin
        isVisible={isVisiblePopupPin}
        title="ENTER YOUR PIN"
        error={error.split(':')[1]}
        onCodeFilled={onCodeFilled}
        onCodeChanged={onCodeChanged}
        onClose={() => {
          setIsVisiblePopupPin(false);
        }}
      /> */}
    </View>
  );
}
const VIEW: ViewStyle = {backgroundColor: color.gray2};
const CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER_COUNT_DOWN_TIME: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  marginBottom: verticalScale(20),
};
const SCHOOL_NAME_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  bottom: verticalScale(10),
};
const SCHOOL_NAME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
  color: color.black1,
  top: isTablet() ? verticalScale(5) : 0,
};
const BETA_VERSION_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(8) : moderateScale(10),
  color: color.black1,
  top: isTablet() ? verticalScale(5) : 0,
};
const HEADER_VIEW: ViewStyle = {
  flexDirection: 'row',
  padding: 20,
  justifyContent: 'space-around',
  alignItems: 'center',
};
const FEEDBACK_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  paddingHorizontal: 15,
};
const LEADERBOARD_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  paddingHorizontal: 20,
  marginTop: verticalScale(5),
};
const TEXT_LEADERBOARD: TextStyle = {
  fontSize: isTablet() ? moderateScale(12) : 16,
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  marginStart: 35,
  marginEnd: 35,
};
const CONTAINER_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 7,
  paddingHorizontal: 10,
};
const NUMBER_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  flex: 0.1,
  color: color.gray3,
};
const NAME_TEXT: TextStyle = {
  fontSize: 14,
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  marginStart: 5,
  color: color.black1,
  flex: 1,
};
const MONEY_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(16),
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
};
const SETTINGS_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(12) : 16,
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
  marginStart: 30,
  color: color.gray3,
};
const AVATAR: any = {
  width: 30,
  height: 30,
  borderRadius: 60,
  marginStart: 5,
};
const SETTING_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginLeft: horizontalScale(15),
  marginTop: 10,
};
const LOG_OUT_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginLeft: horizontalScale(15),
  marginBottom:
    Platform.OS === 'android' ? 20 : isTablet() ? verticalScale(45) : 30,
  marginTop: 20,
};
const CUP_VIEW: ViewStyle = {
  flex: 0.12,
  marginStart: -3,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(30),
  color: color.purple,
  paddingHorizontal: horizontalScale(10),
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
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
