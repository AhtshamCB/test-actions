import {NavigatorParamList} from '../../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  FlatList,
} from 'react-native';
import {Text, Header, Button} from '../../../components';
import {color, typography} from '../../../theme';
// import {useTranslation} from 'react-i18next';

const DEFAULT_AVATAR = require('../images/imageMeDefault.png');

export const ListKidsOfTeacher: FC<
  StackScreenProps<NavigatorParamList, 'listKidsOfTeacher'>
> = ({navigation}) => {
  //   const {t} = useTranslation();

  const listStudentData = [
    {
      id: 1,
      name: 'Tran Mai',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 2,
      name: 'Kiet Nguyen Minh',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 3,
      name: 'Minh Tran',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 4,
      name: 'To Truong Tran San',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 5,
      name: 'Anh Mai Tu',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 6,
      name: 'Mai Trung',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 7,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 8,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },

    {
      id: 9,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 10,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 11,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },
    {
      id: 12,
      name: 'Tran Viet Duc',
      image: require('../images/imageChildDefault.png'),
    },
  ];

  const onChangeTeacher = () => {
    navigation.goBack();
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image source={item.image} style={{width: 50, height: 50}} />
        <Text
          text={item.name}
          numberOfLines={2}
          style={{width: 100, height: 'auto', textAlign: 'center', flex: 1}}
        />
      </View>
    );
  };
  return (
    <View style={CONTAINER_VIEW}>
      <Header title={'Kids'} onBackPress={() => navigation.goBack()} />
      <View style={CONTAINER}>
        <View style={BODY}>
          <View style={CONTENT}>
            <Image
              source={DEFAULT_AVATAR}
              style={IMAGE_TEACHER}
              resizeMode="cover"
            />
            <Text text={'Anh Dao Mai'} style={TEACHER_NAME_TITLE} />
            <Text text={'eSchool05'} style={TEACHER_NAME_DESCRIPTION} />
            <Button
              text="Change Teacher"
              style={BUTTON_CHANGE_VIEW}
              textStyle={{color: color.white}}
              onPress={onChangeTeacher}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={listStudentData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
          style={{flex: 1}}
          columnWrapperStyle={{
            marginTop: 10,
            justifyContent: 'center',
            // paddingHorizontal: 20,
            // backgroundColor: 'red',
          }}
        />
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
const CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_CHANGE_VIEW: ViewStyle = {
  width: 200,
  height: 'auto',
  backgroundColor: color.secondary,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginTop: 10,
};

const TEACHER_NAME_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
  marginTop: 10,
};
const TEACHER_NAME_DESCRIPTION: TextStyle = {
  fontSize: 18,
  fontWeight: '400',
  color: color.dark1,
  fontFamily: typography.promptRegular,
  marginTop: 10,
};
const BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
};
const IMAGE_TEACHER: ImageStyle = {
  width: 100,
  height: 100,
};
