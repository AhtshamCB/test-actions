/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ActivityIndicator,
  Image,
  ImageStyle,
  ScrollView,
  RefreshControl,
} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {Text} from '@app/components';
import {FinishIcon} from '@app/svg';
import {color, moderateScale, typography, verticalScale} from '@app/theme';
import {useGetLevelCertifications} from '@app/hook/useGetLevelCertifications';
import {isTablet} from 'react-native-device-info';
import {useOrientation} from '@app/hook';
import {useNavigation} from '@react-navigation/native';

export const LevelCertificate: FC<
  StackScreenProps<NavigatorParamList, 'levelCertificate'>
> = ({route}) => {
  const {isFromTabbar} = route?.params || '';
  const orientation = useOrientation();
  const navigation: any = useNavigation();
  const {accessToken, childId} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const [refreshing, setRefreshing] = useState(false);

  const {getLevelCertifications, loadingCertifications, levelCertifications} =
    useGetLevelCertifications(accessToken);
  useEffect(() => {
    getLevelCertifications();
  }, []);

  useEffect(() => {
    getLevelCertifications();
  }, [childId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getLevelCertifications();
    setRefreshing(false);
  };

  const renderItem = (item, index) => {
    return (
      <View style={FLIST_CONTAINER} key={index}>
        <View style={BODY}>
          <Image
            source={{uri: item.image}}
            style={IMAGE}
            resizeMode="contain"
          />
          <View style={CONTENT_VIEW}>
            <Text
              text={item.keyName}
              style={[
                LEVEL_TEXT,
                {
                  fontSize: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(12),
                },
              ]}
            />
            <Text
              text={item.name}
              style={[
                NAME_TEXT,
                {
                  fontSize: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(14)
                        : moderateScale(16)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(14)
                      : moderateScale(16)
                    : moderateScale(14),
                },
              ]}
            />
            <View style={TITLE_VIEW}>
              <FinishIcon
                fill={item.status === 'done' ? color.purple : color.gray3}
                props={undefined}
              />
              <Text
                text={item.note}
                style={[
                  TITLE,
                  {
                    fontSize: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10)
                      : moderateScale(12),
                  },
                ]}
              />
            </View>
            <View style={BUTTON_CONTAINER}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('pdfScreen', {
                    fileUrl: item?.fileUrl,
                  });
                }}
                style={[
                  BUTTON,
                  BUTTON_VIEW,
                  {
                    backgroundColor:
                      item.status === 'done' ? color.purple : color.gray3,

                    height: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40)
                      : 31,
                  },
                ]}>
                <Text
                  text={
                    item.status === 'done'
                      ? 'PDF Certificate'
                      : 'Certificate Not Available!'
                  }
                  style={[
                    DOWNLOAD_TEXT,
                    {
                      fontSize: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(7)
                            : moderateScale(9)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(7)
                          : moderateScale(9)
                        : moderateScale(8),
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loadingCertifications) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={CONTAINER}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={[CONTENT, {marginBottom: isFromTabbar ? verticalScale(70) : 0}]}>
        {levelCertifications?.map((item, index) => {
          return renderItem(item, index);
        })}
      </View>
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTENT: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const BODY: ViewStyle = {
  flexDirection: 'row',
};
const FLIST_CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  marginTop: 20,
};
const IMAGE: ImageStyle = {
  width: isTablet() ? 130 : 93,
  height: isTablet() ? 120 : 91,
  padding: 5,
  marginStart: 10,
  marginTop: isTablet() ? 0 : 10,
};
const LEVEL_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  color: color.gray3,
  fontWeight: '400',
};
const NAME_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  color: color.black1,
  fontWeight: '500',
};
const CONTENT_VIEW: ViewStyle = {
  padding: 5,
  flex: 1,
};
const TITLE_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.gray3,
  fontWeight: '400',
  marginStart: 5,
};

const BUTTON: ViewStyle = {
  width: isTablet() ? 200 : 135,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
  backgroundColor: color.purple,
  marginTop: isTablet() ? -30 : 0,
};
const DOWNLOAD_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,

  color: color.white,
  fontWeight: '500',
  textAlign: 'center',
};
const BUTTON_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'flex-end',
  marginTop: isTablet() ? -20 : 10,
  padding: 5,
};
const BUTTON_VIEW: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
