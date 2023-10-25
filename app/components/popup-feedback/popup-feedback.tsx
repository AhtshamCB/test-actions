/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Text as RNText,
} from 'react-native';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {Text, ButtonLinearGradient, ButtonBorder} from '@app/components';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
//
import {useTranslation} from 'react-i18next';
import {
  isIPhone8PlusOrBelow,
  useGetFeedbackQuestions,
  useOrientation,
  usePushFeedback,
} from '@app/hook';
//
import Modal from 'react-native-modal';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import Slider from '@react-native-community/slider';
//
import {PopupFeedbackProps} from './popup-feedback.props';
import {isTablet} from 'react-native-device-info';
import {HeartBrokenIcon, HeartIcon} from '@app/svg';
import {InputObject} from '@app/models';
import {Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const PopupFeedback: FC<PopupFeedbackProps> = ({
  isVisible,
  title,
  subtitle,
  subtitleStyle,
  onClose,
}) => {
  const {t} = useTranslation();
  const orientation = useOrientation();

  const {accessToken, userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const {getFeedbackQuestions, feedbackQuestions} =
    useGetFeedbackQuestions(accessToken);

  const [feedback, setFeedback] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [inputOther, setInputOther] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [valueSlider, setValueSlider] = useState<number>(8);
  const [showPopupThankyou, setShowPopupThankyou] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isFocusFeedbackTextInput, setIsFocusFeedbackTextInput] =
    useState<boolean>(false);
  const [isFocusOtherTextInput, setIsFocusOtherTextInput] =
    useState<boolean>(false);
  const isFocusFeedbackTextInputRef = useRef<boolean>(false);
  const isFocusOtherTextInputRef = useRef<boolean>(false);
  const [isRequireSelectedAnswer, setIsRequireSelectedAnswer] =
    useState<boolean>(false);

  useEffect(() => {
    if (isVisible === true) {
      getFeedbackQuestions();
    }
  }, [isVisible]);

  useEffect(() => {
    isFocusFeedbackTextInputRef.current = isFocusFeedbackTextInput;
    isFocusOtherTextInputRef.current = isFocusOtherTextInput;
  });

  const filterAnswers = feedbackQuestions?.feedbackQuestions?.find(
    item => item?.answerType === 'radio',
  );

  const result = filterAnswers?.answers.map((value, index) => {
    return {
      id: index + 1,
      value: value,
      selected: false,
    };
  });

  const [options, setOptions] = useState(result);

  useEffect(() => {
    if (result !== undefined) {
      setOptions(result);
    }
  }, [feedbackQuestions?.feedbackQuestions]);

  const handleOptionSelect = optionId => {
    setIsRequireSelectedAnswer(false);
    const updatedOptions = options.map(option => {
      if (option.id === optionId) {
        return {...option, selected: true};
      } else {
        return {...option, selected: false};
      }
    });
    setOptions(updatedOptions);
  };

  const onChangeFeedback = text => {
    setFeedback({value: text.trim(), error: ''});
  };

  const onChangeInputOther = text => {
    setInputOther({value: text.trim(), error: ''});
  };

  const onFocusFeedback = () => {
    if (isFocusOtherTextInput === true) {
      setIsFocusOtherTextInput(false);
    }
    setIsFocusFeedbackTextInput(true);
  };

  const onFocusOther = () => {
    if (isFocusFeedbackTextInput === true) {
      setIsFocusFeedbackTextInput(false);
    }
    setIsFocusOtherTextInput(true);
  };

  const resulstAnswer = options?.find(item => item?.selected === true);

  const {pushFeedback} = usePushFeedback(
    accessToken,
    `${valueSlider}`,
    feedback.value,
    resulstAnswer?.value === 'Other' ? inputOther.value : resulstAnswer?.value,
  );

  const isValidData = useMemo(
    () => feedback.value && (inputOther.value || resulstAnswer?.value),
    [feedback, inputOther, resulstAnswer],
  );

  const send = async () => {
    if (isValidData) {
      await pushFeedback();
      await setShowPopupThankyou(true);
      setDisabled(true);
      setTimeout(() => {
        onClose && onClose();
        setFeedback({value: '', error: ''});
        setInputOther({value: '', error: ''});
        setShowPopupThankyou(false);
        setDisabled(false);
      }, 5000);
    } else {
      if (feedback.value === '') {
        setFeedback({value: feedback.value, error: '*Require'});
      } else if (inputOther.value === '') {
        setInputOther({
          value: inputOther.value,
          error: '*Require',
        });
      }
      if (resulstAnswer === undefined) {
        setIsRequireSelectedAnswer(true);
      }
    }
  };

  const cancel = () => {
    onClose && onClose();
    setFeedback({value: '', error: ''});
    setInputOther({value: '', error: ''});
    setIsFocusFeedbackTextInput(false);
    setIsFocusOtherTextInput(false);
    setIsRequireSelectedAnswer(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          CONTAINER_ITEM,
          {
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(15)
                  : verticalScale(15)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(15)
                : verticalScale(0)
              : isIPhone8PlusOrBelow()
              ? verticalScale(0)
              : verticalScale(15),
          },
        ]}
        key={index}>
        <View style={ICON_VIEW_CONTAINER}>
          <View style={VIEW_ICON} />
          <RNText
            style={[
              LABEL_QUESTION_TEXT,
              {
                fontSize:
                  orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(11),
              },
            ]}>
            {item.question}
          </RNText>
        </View>
        {item?.answerType === 'slider' && (
          <View style={CONTENT}>
            <View style={DIRECTION_VIEW}>
              <Text text={`${valueSlider}`} style={TEXT_SLIDER} />
              <View
                style={[
                  ICON_VIEW_CONTENT,
                  {
                    marginTop: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(13)
                        : verticalScale(6)
                      : verticalScale(2),
                  },
                ]}>
                {valueSlider < 5 ? <HeartBrokenIcon /> : <HeartIcon />}
              </View>
            </View>

            <Slider
              style={SLIDER}
              minimumValue={item?.min}
              maximumValue={item?.max}
              minimumTrackTintColor={color.purple}
              maximumTrackTintColor={color.purple}
              onValueChange={value => setValueSlider(value)}
              value={valueSlider || 8}
              step={1}
              thumbTintColor={color.purple}
            />
          </View>
        )}
        {item?.answerType === 'text' && (
          <>
            <TextInput
              style={[
                INPUT_FEEDBACK_COMMON,
                {
                  borderColor: isFocusFeedbackTextInput
                    ? color.purple
                    : feedback.error
                    ? color.red
                    : color.black1,
                },
              ]}
              onChangeText={onChangeFeedback}
              value={feedback.value}
              placeholder=""
              keyboardType="default"
              placeholderTextColor={color.dark4}
              multiline
              onFocus={onFocusFeedback}
            />
            {feedback.error && (
              <Text
                text={feedback.error}
                style={[
                  TEXT_ERROR,
                  {
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10)
                      : moderateScale(12),
                  },
                ]}
              />
            )}
          </>
        )}
        {item?.answerType === 'radio' && (
          <View style={{marginTop: verticalScale(5)}}>
            {options?.map((answer, indexAnswer) => (
              <View key={indexAnswer}>
                <View style={RADIO_BUTTON_CONTAINER}>
                  <TouchableOpacity
                    style={RADIO_BUTTON}
                    key={answer?.id}
                    onPress={() => handleOptionSelect(answer?.id)}>
                    {answer?.selected ? (
                      <View style={RADIO_BUTTON_ICON} />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect(answer?.id)}>
                    <Text
                      style={[
                        RADIO_BUTTON_TEXT,
                        {
                          fontSize:
                            orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(10)
                              : moderateScale(11),
                        },
                      ]}
                      text={answer?.value}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {isRequireSelectedAnswer && (
              <View style={{marginTop: verticalScale(10)}}>
                <Text
                  text={'*Require'}
                  style={[
                    TEXT_ERROR,
                    {
                      fontSize: isTablet()
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10)
                        : moderateScale(12),
                    },
                  ]}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View
        style={[
          CONTENT_VIEW,
          {
            width: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'auto'
                  : 'auto'
                : 'auto'
              : horizontalScale(320),
          },
        ]}>
        <FastImage
          source={BACKGROUND}
          style={[
            IMAGE_BACKGROUND_VIEW,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(130)
                    : verticalScale(100)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(130)
                  : verticalScale(100)
                : Platform.OS === 'android'
                ? verticalScale(150)
                : isIPhone8PlusOrBelow()
                ? verticalScale(130)
                : verticalScale(130),
            },
          ]}
          resizeMode={'stretch'}
        />
        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text={`${title}`}
          start={{x: 0.0, y: 0.9}}
          textStyle={{
            fontFamily: typography.promptBold,
            fontWeight: '700',
            textAlign: 'center',
            marginTop:
              Platform.OS === 'android' ? verticalScale(25) : verticalScale(10),
            padding: 10,
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(20)
                : moderateScale(23),
          }}
        />
        <Text
          text={subtitle}
          style={[
            SUB_TITLE_MODAL,
            subtitleStyle,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(12),
            },
          ]}
        />
        <View style={BODY}>
          <FlatList
            keyExtractor={item => item.label.toString()}
            data={feedbackQuestions?.feedbackQuestions}
            renderItem={renderItem}
          />
        </View>
        <View style={INPUT_ORDER_CONTAINER}>
          {resulstAnswer?.value === 'Other' && (
            <>
              <TextInput
                style={[
                  INPUT_OTHER,
                  {
                    borderColor: isFocusOtherTextInput
                      ? color.purple
                      : inputOther.error
                      ? color.red
                      : color.black1,
                  },
                ]}
                onChangeText={onChangeInputOther}
                value={inputOther.value}
                placeholder=""
                keyboardType="default"
                placeholderTextColor={color.dark4}
                multiline
                onFocus={onFocusOther}
              />
              {inputOther.error && (
                <Text
                  text={inputOther.error}
                  style={[
                    TEXT_ERROR,
                    {
                      paddingHorizontal: 0,
                      marginTop: 2,
                      alignItems: 'flex-start',
                      fontSize: isTablet()
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10)
                        : moderateScale(12),
                    },
                  ]}
                />
              )}
            </>
          )}
        </View>
        <View
          style={[
            CONTAINER_BUTTON,
            {
              flexDirection: isTablet() ? 'row' : 'column',
              paddingVertical: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(10)
                  : verticalScale(10)
                : verticalScale(20),
            },
          ]}>
          <ButtonLinearGradient
            disabled={disabled}
            text={`${t('send')}`}
            style={[
              BUTTON_LOGIN_MODAL_VIEW,
              {
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(90)
                      : horizontalScale(120)
                    : horizontalScale(140)
                  : horizontalScale(200),

                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(55)
                    : verticalScale(40)
                  : 46,
              },
            ]}
            textStyle={TEXT_MODAL_SUBMIT}
            onPress={send}
          />
          <ButtonBorder
            text={`${t('cancel')}`}
            containerStyle={[
              BUTTON_BORDER_CONTAINER,
              {
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(90)
                      : horizontalScale(120)
                    : horizontalScale(140)
                  : horizontalScale(200),

                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(55)
                    : verticalScale(40)
                  : 46,
              },
            ]}
            onPress={cancel}
            textStyle={TEXT_MODAL_CANCEL}
          />
        </View>
        <View>
          {showPopupThankyou && (
            <Text
              text={
                userInfo?.me?.role === 'parent'
                  ? `${t('thankyou_parent')}`
                  : `${t('thankyou_kid')}`
              }
              style={THANKYOU_TEXT}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionOutTiming={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={MODAL}
      deviceHeight={2000}
      deviceWidth={isTablet() ? 2000 : 0}
      statusBarTranslucent>
      <>
        {isTablet() ? (
          <KeyboardAwareScrollView>{renderContent()}</KeyboardAwareScrollView>
        ) : (
          <KeyboardAvoidingView behavior="padding" style={CONTAINER}>
            {renderContent()}
          </KeyboardAvoidingView>
        )}
      </>
    </Modal>
  );
};

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  maxHeight: 20000,
};
const MODAL: ViewStyle = {
  margin: 40,
  // flex: 0,
  marginTop: verticalScale(100),
};
const CONTENT_VIEW: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  borderRadius: 10,
  overflow: 'hidden',
  // width: isTablet() ? 0 : horizontalScale(320),
};
const IMAGE_BACKGROUND_VIEW: any = {
  width: horizontalScale(1000),
  position: 'absolute',
  top: 0,
  transform: [{rotate: '180deg'}],
};
const ICON_VIEW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const ICON_VIEW_CONTENT: ViewStyle = {
  marginLeft: horizontalScale(2),
};
const BODY: ViewStyle = {
  padding: 20,
  width: '100%',
};
const CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(5),
};
const SLIDER: ViewStyle = {
  width: horizontalScale(250),
  height: verticalScale(30),
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,

  color: color.black1,
  textAlign: 'center',
  fontWeight: '400',
  paddingHorizontal: 60,
  marginTop: isTablet() ? 0 : verticalScale(5),
};
const LABEL_QUESTION_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  color: color.black1,
  fontWeight: '400',
  flex: 1,
};
const TEXT_SLIDER: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(14),
  fontWeight: '400',
  color: color.purple,
};
const CONTAINER_ITEM: ViewStyle = {
  flex: 1,
};
const CONTAINER_BUTTON: ViewStyle = {
  width: '100%',
  marginTop: isTablet() ? verticalScale(0) : verticalScale(-10),
  justifyContent: 'space-between',
  alignItems: 'center',
};
const BUTTON_LOGIN_MODAL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
};
const BUTTON_BORDER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
};
const TEXT_MODAL_SUBMIT: TextStyle = {
  textAlign: 'center',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(12),
};
const TEXT_MODAL_CANCEL: TextStyle = {
  textAlign: 'center',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(12),
};
const INPUT_FEEDBACK_COMMON: ViewStyle = {
  width: '100%',
  height:
    Platform.OS === 'android'
      ? verticalScale(50)
      : isTablet()
      ? verticalScale(50)
      : verticalScale(35),
  backgroundColor: color.white,
  paddingHorizontal: 15,
  borderRadius: 10,
  borderColor: color.black1,
  borderWidth: 1,
  marginTop: verticalScale(10),
  marginBottom: verticalScale(10),
};
const INPUT_ORDER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  marginTop: verticalScale(-10),
  paddingHorizontal: 20,
};
const INPUT_OTHER: ViewStyle = {
  width: '100%',
  height:
    Platform.OS === 'android'
      ? verticalScale(50)
      : isTablet()
      ? verticalScale(50)
      : verticalScale(35),
  backgroundColor: color.white,
  paddingHorizontal: 15,
  borderRadius: 10,
  borderColor: color.black1,
  borderWidth: 1,
};
const RADIO_BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 45,
  paddingVertical: 5,
};
const RADIO_BUTTON: ViewStyle = {
  height: 20,
  width: 20,
  backgroundColor: '#F8F8F8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: color.gray7,
  alignItems: 'center',
  justifyContent: 'center',
};
const RADIO_BUTTON_ICON: ViewStyle = {
  height: 14,
  width: 14,
  borderRadius: 7,
  backgroundColor: color.gray3,
};
const RADIO_BUTTON_TEXT: TextStyle = {
  marginLeft: 16,
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const THANKYOU_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(10),
};
const VIEW_ICON: ViewStyle = {
  width: 15,
  height: 15,
  backgroundColor: color.purple,
  borderRadius: 40,
  marginEnd: 10,
  marginTop: isTablet() ? verticalScale(5) : 0,
};
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: verticalScale(-10),
  paddingHorizontal: 30,
};
