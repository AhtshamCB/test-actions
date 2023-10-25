/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
  TextStyle,
  Linking,
  Text as RNText,
} from 'react-native';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, selector} from '@app/redux';
import {useGetInstruction} from '@app/hook/useGetInstruction';
import {Text} from '@app/components';
import Pdf from 'react-native-pdf';
import {SettingDotHorizontalIcon} from '@app/svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {ShareIcon} from '@app/svg';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import {isTablet} from 'react-native-device-info';
import {useOrientation} from '@app/hook';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const LINK = 'https://www.teefi.io';

export const Instruction: FC<
  StackScreenProps<NavigatorParamList, 'instruction'>
> = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const {accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const orientation = useOrientation();

  useEffect(() => {
    getInstruction();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(ConfigActions.setOrientation('all'));
    }
    return () => {
      dispatch(ConfigActions.setOrientation('portrait'));
    };
  }, [isFocused]);

  const {getInstruction, loadingInstruction, instruction} =
    useGetInstruction(accessToken);
  const saveTempPDF = async () => {
    const {dirs} = ReactNativeBlobUtil.fs;
    const response = await ReactNativeBlobUtil.config({
      path: `${dirs.DocumentDir}/TeeFi-Instruction.pdf`,
    }).fetch('GET', instruction);
    const localFilePath = response.path();
    return localFilePath;
  };

  const sharePDF = async () => {
    const uri = await saveTempPDF();
    const shareOptions = {
      title: 'Share PDF',
      url: uri,
      failOnCancel: false,
      activityItemSources: Platform.OS === 'ios' && [
        {
          item: {
            defaultContentType: 'public.jpeg',
            filename: 'TeeFi-Instruction.pdf',
            type: 'com.TeeFi.pdf',
            url: uri,
          },
          thumbnailImage: 'file:///some/image.png',
          subject: 'Sample PDF',
        },
      ],
    };

    // Share PDF using Share module
    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  if (loadingInstruction) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }
  return (
    <View style={CONTAINER}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={TITLE_RIGHT}>
        <SettingDotHorizontalIcon />
      </TouchableOpacity>
      <View style={NOTE_VIEW}>
        <RNText style={NOTE_TEXT}>
          {`${t('note_instruction')}`}{' '}
          <RNText
            style={[
              NOTE_TEXT,
              {color: color.blue1, textDecorationLine: 'underline'},
            ]}
            onPress={() => Linking.openURL(LINK)}>
            {'www.teefi.io'}{' '}
          </RNText>
          {i18n.language === 'en' && <RNText style={NOTE_TEXT}>only</RNText>}
        </RNText>
      </View>
      <View style={CONTENT}>
        <Pdf
          source={{uri: `${instruction}`}}
          style={[
            PDF,
            {
              width:
                orientation === 'PORTRAIT'
                  ? Dimensions.get('window').width
                  : Dimensions.get('window').width + 5,
            },
          ]}
          trustAllCerts={false}
        />
      </View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropColor={color.palette.mineShaft}
        backdropOpacity={0}
        animationInTiming={150}
        animationOutTiming={150}
        backdropTransitionOutTiming={0}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={[
          MODAL,
          SHADOWN,
          {
            top: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(10)
                  : verticalScale(0)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(10)
                : verticalScale(0)
              : verticalScale(80),
            left: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(180)
                  : horizontalScale(250)
                : orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(280)
                : horizontalScale(380)
              : 230,
          },
        ]}
        deviceHeight={2000}
        deviceWidth={isTablet() ? 2000 : 0}
        statusBarTranslucent>
        <TouchableOpacity
          style={[BUTTON_COMMON, {marginBottom: 10, marginRight: 10}]}
          onPress={async () => {
            await sharePDF();
          }}>
          <View style={SHARE_VIEW}>
            <ShareIcon
              fill={color.purple}
              props={undefined}
              width={14}
              height={15}
            />
          </View>
          <Text text={'Share'} style={SHARE_TEXT} />
        </TouchableOpacity>
      </Modal>
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
const CONTENT: ViewStyle = {
  flex: 1,
  marginTop: verticalScale(5),
};
const PDF: ViewStyle = {
  flex: 1,

  backgroundColor: color.white,
};
const TITLE_RIGHT: ViewStyle = {
  justifyContent: 'center',
  alignSelf: 'flex-end',
  marginRight: horizontalScale(10),
};
const MODAL: ViewStyle = {
  backgroundColor: color.white,
  flex: 0.05,
  width: 130,

  bottom: 0,
  justifyContent: 'center',
};
const SHADOWN: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};
const SHARE_VIEW: ViewStyle = {
  width: 30,
  height: 30,
  backgroundColor: color.purple1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
};
const SHARE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 10,
  fontWeight: '400',
  color: color.black1,
};
const BUTTON_COMMON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 10,
};
const NOTE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 50,
};
const NOTE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.black1,
  textAlign: 'center',
};
