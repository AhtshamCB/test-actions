/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextStyle,
} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, selector} from '@app/redux';
import {useIsFocused} from '@react-navigation/native';
//
import {ButtonBorder, Header, Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {
  useDeleteNotificationMessage,
  useGetNotificationList,
  useReadNotificationMessage,
} from '@app/hook';
import {formatDayMonthYear} from '@app/utils';
//
import FastImage from 'react-native-fast-image';
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from 'react-native-gesture-handler';
import {BanIcon, TrashIcon} from '@app/svg';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';

export const NotificationDrawer: FC<
  StackScreenProps<NavigatorParamList, 'notificationDrawer'>
> = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {accessToken, userInfo} = useSelector(selector.user);
  const {notificationsList, orientationOpenApp} = useSelector(selector.config);
  const {isFromTabbar} = route?.params || '';
  const [notificationId, setNotificationId] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastNotificationTime, setLastNotificationTime] = useState<any>(null);

  useEffect(() => {
    getNotificationList();
    dispatch(ConfigActions.setNotificationList([]));
  }, []);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        await getNotificationList();
      }
    })();
  }, [isFocused]);

  const {getNotificationList, loadingNotificationList, dataNotiLength} =
    useGetNotificationList(accessToken, lastNotificationTime);
  const {readNotificationMessage} = useReadNotificationMessage(
    accessToken,
    notificationId,
  );

  const onCompletedDelete = () => {
    getNotificationList();
  };

  const {deleteNotificationMessage} = useDeleteNotificationMessage(
    accessToken,
    notificationId,
    onCompletedDelete,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotificationList();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const renderRightActions = item => () => {
    return (
      <RectButton
        style={[
          RIGHT_ACTION,
          {
            backgroundColor: item?.isRead ? color.purple1 : color.gray2,
          },
        ]}
        onPress={async () => {
          await setNotificationId(item?._id);
          await deleteNotificationMessage();
          await (onCompletedDelete && onCompletedDelete());
        }}>
        <TrashIcon />
      </RectButton>
    );
  };

  if (loadingNotificationList) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  const renderItem = ({item, index}) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          friction={2}
          leftThreshold={80}
          rightThreshold={60}
          renderRightActions={renderRightActions(item)}>
          <TouchableOpacity
            key={index}
            style={[
              CONTAINER_ITEM,
              {
                backgroundColor: item?.isRead ? color.white : color.purple1,
              },
            ]}
            onPress={async () => {
              await setNotificationId(item?._id);
              await readNotificationMessage();
              navigation.navigate('notificationMessageDetail', {
                data: item,
                notificationId: item?._id,
              });
            }}>
            <View style={LOGO_VIEW}>
              <FastImage
                source={{uri: item?.imageUrl}}
                style={LOGO}
                resizeMode="cover"
              />
            </View>
            <View style={CONTENT}>
              <Text
                text={item?.title}
                style={[
                  TITLE,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(12)
                        : moderateScale(15),
                  },
                ]}
                numberOfLines={1}
              />
              <Text
                text={item?.body}
                style={[
                  BODY,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(13),
                  },
                ]}
                numberOfLines={2}
              />
            </View>
            <View style={DATE_VIEW}>
              <Text
                text={formatDayMonthYear(item?.createdAt)}
                style={[
                  DATE_TEXT,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(13),
                  },
                ]}
              />
              <View
                style={[
                  ICON_READ,
                  {
                    backgroundColor: item?.isRead ? color.white : color.purple,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={CONTAINER}>
      {!isFromTabbar && (
        <Header
          title={
            userInfo?.me?.role === 'parent'
              ? `${t('notifications')}`
              : 'Notifications'
          }
          onBackPress={() => navigation.goBack()}
        />
      )}

      <View style={FLATLIST_VIEW}>
        {notificationsList?.length > 0 ? (
          <FlatList
            keyExtractor={item => item?._id?.toString()}
            data={notificationsList}
            renderItem={renderItem}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={NO_DATA_VIEW}>
            <BanIcon width={20} height={20} />
            <Text
              text={'No Data Available'}
              style={[
                NO_DATA_TEXT,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(14)
                    : moderateScale(14),
                },
              ]}
            />
          </View>
        )}
      </View>
      {dataNotiLength?.length >= 10 && (
        <ButtonBorder
          containerStyle={[
            BUTTON_SAVE_VIEW,
            {
              justifyContent: 'space-around',
              backgroundColor: color.white,
              borderColor: color.purple,
            },
          ]}
          textStyle={{color: color.purple}}
          text={
            userInfo?.me?.role === 'parent' ? `${t('load_more')}` : 'Load More'
          }
          onPress={async () => {
            const lastItemNotificationMessage =
              notificationsList[notificationsList?.length - 1];
            await setLastNotificationTime(
              lastItemNotificationMessage?.createdAt,
            );
            getNotificationList();
          }}
        />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const BUTTON_SAVE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: 38,
  marginLeft: horizontalScale(100),
  marginRight: horizontalScale(100),
  marginTop: verticalScale(20),
};
const CONTAINER_ITEM: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  height: 'auto',
  paddingVertical: verticalScale(13),
};
const LOGO_VIEW: ViewStyle = {
  marginLeft: horizontalScale(10),
  marginTop: verticalScale(5),
  justifyContent: 'center',
};
const LOGO: any = {
  width: 30,
  height: 30,
};
const CONTENT: ViewStyle = {
  flexDirection: 'column',
  paddingHorizontal: horizontalScale(10),
  flex: 1,
  justifyContent: 'center',
};
const TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.black1,
  width: '60%',
};
const BODY: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  marginTop: verticalScale(3),
};
const DATE_VIEW: ViewStyle = {
  marginRight: horizontalScale(10),
  flexDirection: 'column',
  height: 'auto',
  justifyContent: 'space-around',
};
const DATE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray3,
};
const ICON_READ: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 20 / 2,
  alignSelf: 'flex-end',
};
const FLATLIST_VIEW: ViewStyle = {
  flex: 0.95,
  marginTop: verticalScale(15),
};
const RIGHT_ACTION: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  width: '15%',
  justifyContent: 'center',
  paddingHorizontal: horizontalScale(20),
};
const NO_DATA_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(50),
  flexDirection: 'row',
};
const NO_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',

  color: color.black1,
  textAlign: 'center',
  paddingHorizontal: horizontalScale(10),
};
