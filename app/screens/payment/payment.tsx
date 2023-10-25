import React, {FC, useState} from 'react';
import {ViewStyle, View} from 'react-native';
//
import {StackScreenProps} from '@react-navigation/stack';
//
import {color, moderateScale, verticalScale} from '@app/theme';
import {AlertComponent, Header} from '@app/components';
import {NavigatorParamList} from '@app/navigators';
import {WebView} from 'react-native-webview';
import {PopupPayment} from './components/popup-payment';
import Config from 'react-native-config';
import {WEB} from '@app/utils/contants';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const FAILED_IMAGE = require('./images/failed.png');

export const Payment: FC<StackScreenProps<NavigatorParamList, 'payment'>> = ({
  route,
  navigation,
}) => {
  const {data, accessToken} = route?.params || {};
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalFailure, setShowModalFailure] = useState<boolean>(false);
  const [isCloseWebview, setIsCloseWebview] = useState<boolean>(false);
  const [msgFail, setMsgFail] = useState('');

  const webDev = `${WEB.WEB_DEV}/${
    i18n.language
  }/checkout/mobile?token=${encodeURIComponent(
    accessToken,
  )}&type=${encodeURIComponent(data)}&isMobile=${1}`;
  const webProd = `${WEB.WEB_PROD}/${
    i18n.language
  }/checkout/mobile?token=${encodeURIComponent(
    accessToken,
  )}&type=${encodeURIComponent(data)}&isMobile=${1}`;
  const web = Config.ENV === 'dev' ? webDev : webProd;

  return (
    <View style={CONTAINER}>
      <Header title={`${t('payment_methods')}`} />
      {!isCloseWebview && (
        <WebView
          source={{
            uri: web,
          }}
          containerStyle={WEBVIEW}
          useWebKit
          bounces={false}
          overScrollMode={'never'}
          startInLoadingState={true}
          onNavigationStateChange={request => {
            const {url = ''} = request;
            if (url.includes('success')) {
              setShowModalSuccess(true);
            } else if (url.includes('fail')) {
              setShowModalFailure(true);
              setMsgFail(decodeURIComponent(request?.url.split('=')[1]));
            } else if (url.includes('cancel')) {
              setIsCloseWebview(true);
              navigation.goBack();
            }
          }}
        />
      )}
      <PopupPayment
        isVisible={showModalSuccess}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigation.navigate('parentDrawer');
        }}
        title={'Thank you!'}
        subtitle={"Let's make the financial future you've always dreamt of!"}
        buttonTitle={'Move to Dashboard'}
        titleStyle={{
          fontSize: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(20)
              : moderateScale(24)
            : moderateScale(22),
        }}
        subtitleStyle={{
          fontSize: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12)
            : moderateScale(14),
        }}
        onClose={undefined}
      />
      <AlertComponent
        isVisible={showModalFailure}
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(100)
              : verticalScale(80),
        }}
        isShowIcon={false}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigation.navigate('parentDrawer');
        }}
        imageCode={FAILED_IMAGE}
        title={'Payment Fail'}
        confirmBtTitle={'Move to Dashboard'}
        confirmTextStyle={{
          fontSize:
            orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12),
        }}
        subtitle={decodeURIComponent(msgFail)}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const WEBVIEW: ViewStyle = {
  marginTop: 15,
};
