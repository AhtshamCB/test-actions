/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ImageStyle,
  View,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {color, horizontalScale, typography, verticalScale} from '@app/theme';
import {useLessons} from '@app/hook';
import FastImage from 'react-native-fast-image';
import {AlertComponent} from '@app/components';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export const MyMoneyByPhone = ({navigation}) => {
  useEffect(() => {
    getListGame();
  }, []);

  const {userInfo} = useSelector(selector.user);
  const {getListGame, listGame} = useLessons();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={[CONTAINER_LIST]}>
        <TouchableOpacity
          style={{opacity: item.isEnabled ? 1 : 0.5}}
          onPress={() => {
            if (item.isEnabled) {
              navigation.navigate('gameDetails', {sourceGame: item.src});
            } else {
              setIsShowPopup(true);
            }
          }}>
          <FastImage
            resizeMode="stretch"
            source={{uri: item.thumbnail}}
            style={{width: horizontalScale(180), height: verticalScale(130)}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={CONTAINER}>
      <FlatList
        data={listGame}
        keyExtractor={item => item.thumbnail}
        renderItem={renderItem}
        numColumns={2}
      />
      <AlertComponent
        isVisible={isShowPopup}
        backgroundStyle={{height: verticalScale(55)}}
        title={`Hey, ${userInfo?.me?.kid?.name}!`}
        titleStyle={TITLE_POPUP}
        subtitle={
          userInfo?.me?.isSubscribed
            ? 'Please complete lessons first before you are able to play this game 🤔'
            : 'Oops! Please ask your parents for subscription first! Amazing games are waiting for you here! 😍'
        }
        subtitleStyle={SUB_TITLE_MODAL}
        confirmBtTitle={'Close'}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        confirmButtonStyle={CONFIRM_BUTTON_POPUP}
        onConfirm={() => setIsShowPopup(false)}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER_LIST: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: 10,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.purple,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(15),
  alignSelf: 'flex-start',
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const CONFIRM_BUTTON_POPUP: ViewStyle = {
  width: horizontalScale(120),
  height: verticalScale(35),
};
