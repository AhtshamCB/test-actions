import React, {FC, useState} from 'react';
import {ViewStyle, View} from 'react-native';
//
import {StackScreenProps} from '@react-navigation/stack';
import {NavigatorParamList} from '@app/navigators';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {color} from '@app/theme';
import {Header} from '@app/components';
//
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';
import {WEB} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';

export const AddCard: FC<StackScreenProps<NavigatorParamList, 'addCard'>> = ({
  navigation,
}) => {
  const {t, i18n} = useTranslation();
  const {accessToken} = useSelector(selector.user) || '';

  const [isCloseWebview, setIsCloseWebview] = useState<boolean>(false);
  const webDev = `${WEB.WEB_DEV}/${
    i18n.language
  }/parents/setting/payment-methods-mobile?token=${encodeURIComponent(
    accessToken,
  )}&isMobile=${true}`;
  const webProd = `${WEB.WEB_PROD}/${
    i18n.language
  }/parents/setting/payment-methods-mobile?token=${encodeURIComponent(
    accessToken,
  )}&isMobile=${true}`;
  const web = Config.ENV === 'dev' ? webDev : webProd;
  return (
    <View style={CONTAINER}>
      <Header title={`${t('payment_methods')}`} />
      {!isCloseWebview && (
        <WebView
          source={{
            uri: web,
          }}
          useWebKit
          bounces={false}
          overScrollMode={'never'}
          containerStyle={WEBVIEW}
          startInLoadingState={true}
          onNavigationStateChange={request => {
            const {url = ''} = request;
            if (url.includes('cancel')) {
              setIsCloseWebview(true);
              navigation.goBack();
            }
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
const WEBVIEW: ViewStyle = {
  marginTop: 15,
};
