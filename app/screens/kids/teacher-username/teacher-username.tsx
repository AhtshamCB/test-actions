import {NavigatorParamList} from '../../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useMemo, useState} from 'react';
import {View, ViewStyle, TextStyle, TextInput} from 'react-native';
import {ButtonLinearGradient, Text, Header} from '../../../components';
import {color, typography} from '../../../theme';
import {convertToLetterAndSpaceOnly, leftTrim} from '../../../utils/general';
import {InputObject} from '../../../models';
import {useTranslation} from 'react-i18next';

export const TeacherUsername: FC<
  StackScreenProps<NavigatorParamList, 'teacherUsername'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const [name, setName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const onChangeName = text => {
    const onlyLetter = convertToLetterAndSpaceOnly(leftTrim(text));
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setName({value: onlyLetter, error: ''});
      }
    } else {
      setName({value: onlyLetter, error: ''});
    }
  };
  const isValidData = useMemo(() => name.value, [name]);

  const onPressNext = async () => {
    if (isValidData) {
      navigation.navigate('listKidsOfTeacher');
    } else {
      if (!name.value) {
        setName({value: name.value, error: `${t('REQUIRED')}`});
      }
    }
  };

  return (
    <View style={CONTAINER_VIEW}>
      <Header title={'Kids'} onBackPress={() => navigation.goBack()} />
      <View style={CONTAINER}>
        <View style={BODY}>
          <Text text={"Your Teacher's Username"} style={CREATE_ACCOUNT_TITLE} />
          <TextInput
            style={INPUT_NAME}
            onChangeText={onChangeName}
            value={name.value}
            placeholder={`${t('NAME')}`}
            keyboardType="default"
            placeholderTextColor={color.dark4}
          />
          {name.error === `${t('REQUIRED')}` ? (
            <Text text={name.error} style={TEXT_ERROR} />
          ) : null}
          <ButtonLinearGradient
            text={'Go'}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={onPressNext}
          />
        </View>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  padding: 15,
  marginTop: 20,
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: 30,
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const INPUT_NAME: ViewStyle = {
  width: 358,
  height: 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: 358,
  height: 46,
  marginTop: 20,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const TEXT_ERROR: TextStyle = {
  fontSize: 15,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
};
