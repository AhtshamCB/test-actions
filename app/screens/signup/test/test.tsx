import {NavigatorParamList} from '../../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle, Dimensions, TouchableOpacity} from 'react-native';
import {Text} from '@app/components';
import Pdf from 'react-native-pdf';
import {color} from '@app/theme';
import {BackButtonIcon} from '@app/svg';
import {goBack} from '@app/navigators';

export const Test: FC<StackScreenProps<NavigatorParamList, 'test'>> = ({
  route,
}) => {
  const {fileUrl} = route?.params || '';
  return (
    <View style={CONTAINER}>
      <View style={CONTAINER_HEADER}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackButtonIcon />
        </TouchableOpacity>
        <Text style={HEADER_TITLE} text={'PDF'} />
        <TouchableOpacity onPress={() => {}} style={TITLE_RIGHT}>
          {/* <Text style={headerStyles} text={textRight} /> */}
        </TouchableOpacity>
      </View>
      <View style={CONTENT}>
        <Pdf source={{uri: `${fileUrl}`}} style={PDF} />
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const CONTENT: ViewStyle = {
  flex: 1,
  marginTop: 20,
};
const PDF: ViewStyle = {
  flex: 1,
  width: Dimensions.get('window').width,
  backgroundColor: color.white,
};
const CONTAINER_HEADER: ViewStyle = {
  width: '100%',
  top: 20,
};
const SUB_CONTAINER: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 15,
  paddingVertical: 6,
  paddingBottom: 15, // TODO
};
const BACK_IMAGE: ImageStyle = {
  width: 24,
  height: 24,
  tintColor: color.mainBlack,
};
const HEADER_TITLE: TextStyle = {
  maxWidth: '80%',
  color: color.mainBlack,
  // fontFamily: typography.bold,
  fontSize: 18,
  textAlign: 'center',
  marginLeft: 20,
  flex: 1,
  fontWeight: '700',
};
const TITLE_RIGHT: ViewStyle = {
  marginTop: 8,
  height: 25,
};
