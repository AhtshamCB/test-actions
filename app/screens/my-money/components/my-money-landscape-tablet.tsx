/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  FlatList,
  TextStyle,
} from 'react-native';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useLessons} from '@app/hook';
import FastImage from 'react-native-fast-image';
import {AlertComponent} from '@app/components';

export const MyMoneyLandscapeTablet = ({navigation}) => {
  const {orientationOpenApp} = useSelector(selector.config);
  useEffect(() => {
    getListGame();
  }, []);
  const {getListGame, listGame} = useLessons();
  const {userInfo} = useSelector(selector.user);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={[
          CONTAINER_LIST,
          {
            padding: orientationOpenApp === 'LANDSCAPE' ? 20 : 10,
          },
        ]}>
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
            style={{
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(180)
                  : horizontalScale(240),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(260)
                  : verticalScale(200),
            }}
          />
        </TouchableOpacity>
        <AlertComponent
          isVisible={isShowPopup}
          backgroundStyle={{
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(70)
                : verticalScale(50),
          }}
          title={`Hey, ${userInfo?.me?.kid?.name}!`}
          titleStyle={[
            TITLE_POPUP,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(12)
                  : moderateScale(16),
            },
          ]}
          subtitle={
            userInfo?.me?.isSubscribed
              ? 'Please complete lessons first before you are able to play this game 🤔'
              : 'Oops! Please ask your parents for subscription first! Amazing games are waiting for you here! 😍'
          }
          subtitleStyle={[
            SUB_TITLE_MODAL,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(9.5)
                  : moderateScale(10),
            },
          ]}
          confirmBtTitle={'Close'}
          containerButtonStyle={CONTAINER_BUTTON_POPUP}
          confirmButtonStyle={{
            width:
              orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(70)
                : horizontalScale(120),
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(45)
                : verticalScale(35),
          }}
          onConfirm={() => setIsShowPopup(false)}
        />
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
