/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {View, ViewStyle, ActivityIndicator, TextStyle} from 'react-native';
//
import {Header, Text} from '@app/components';
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
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
import {formatDayMonthYear} from '@app/utils';
import {useGetNotificationDetail, useReadNotificationMessage} from '@app/hook';
//
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

export const NotificationMessageDetail: FC<
  StackScreenProps<NavigatorParamList, 'notificationMessageDetail'>
> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {notificationId} = route?.params || '';
  const {accessToken} = useSelector(selector.user);
  const {readNotificationMessage} = useReadNotificationMessage(
    accessToken,
    notificationId,
  );

  useEffect(() => {
    if (notificationId) {
      getNotificationDetail();
      readNotificationMessage();
    }
  }, [notificationId]);

  const {getNotificationDetail, loadingNotificationDetail, notificationDetail} =
    useGetNotificationDetail(accessToken, notificationId);

  if (loadingNotificationDetail) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER}>
      <Header
        title={`${t('messages')}`}
        onBackPress={() => navigation.goBack()}
      />
      <View style={BODY}>
        <View style={TITLE_VIEW}>
          <Text text={notificationDetail?.title} style={TITLE_TEXT} />
        </View>
        <View style={IMAGE_VIEW}>
          <FastImage
            source={{uri: notificationDetail?.imageUrl}}
            style={LOGO}
            resizeMode="contain"
          />
        </View>
        <View style={DATE_VIEW}>
          <Text
            text={formatDayMonthYear(notificationDetail?.createdAt)}
            style={DATE_TEXT}
          />
        </View>
        <View style={BODY_VIEW}>
          <Text text={notificationDetail?.body} style={BODY_TEXT} />
        </View>
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
  marginTop: verticalScale(20),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const TITLE_VIEW: ViewStyle = {
  padding: 10,
  height: 'auto',
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(16),
  color: color.black1,
};
const IMAGE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  width: '100%',
  height: '25%',
};
const LOGO: any = {
  width: '100%',
  height: '100%',
};
const DATE_VIEW: ViewStyle = {
  marginRight: horizontalScale(10),
  flexDirection: 'column',
  justifyContent: 'flex-end',
};
const DATE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(16),
  color: color.gray3,
  textAlign: 'right',
};
const BODY_VIEW: ViewStyle = {
  padding: 20,
};
const BODY_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(15),
  color: color.black1,
  marginTop: verticalScale(3),
};
