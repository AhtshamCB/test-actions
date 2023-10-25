/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect} from 'react';
import {View, ViewStyle, FlatList, TextStyle} from 'react-native';
//
import {ButtonLinearGradient, Header, Text} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useListInvoice} from '@app/hook';
import {BanIcon} from '@app/svg';

export const Invoices: FC<StackScreenProps<NavigatorParamList, 'invoices'>> = ({
  navigation,
}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    getListInvoice();
  }, []);
  useEffect(() => {
    if (isFocused) {
      getListInvoice();
    }
  }, [isFocused]);
  const {accessToken} = useSelector(selector.user);
  const {getListInvoice, dataListInvoice} = useListInvoice(accessToken);

  return (
    <View style={CONTAINER}>
      <Header title={'Invoices'} onBackPress={() => navigation.goBack()} />
      <View style={CONTENT}>
        <View style={BODY}>
          {dataListInvoice?.length > 0 ? (
            <>
              <View
                style={[
                  BODY_CONTENT,
                  {justifyContent: 'space-between', paddingHorizontal: 20},
                ]}>
                <Text text={'Date'} style={TITLE_TEXT} />
                <Text text={'Amount'} style={TITLE_TEXT} />
                <Text text={'Download'} style={TITLE_TEXT} />
              </View>
              <View style={FLALIST_CONTAINER}>
                <FlatList
                  data={dataListInvoice}
                  keyExtractor={item => item._id}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={FLALIST_CONTENT}>
                        <Text text={item.createdAt} style={SUBTITLE_TEXT} />
                        <Text
                          text={item.amount}
                          style={[SUBTITLE_TEXT, {marginLeft: 20}]}
                        />
                        <ButtonLinearGradient
                          onPress={() => {
                            navigation.navigate('pdfScreen', {
                              fileUrl: item?.fileUrl,
                            });
                          }}
                          text="PDF"
                          style={BUTTON_CONTAINER}
                        />
                      </View>
                    );
                  }}
                  ItemSeparatorComponent={() => {
                    return <View style={SEPARATOR} />;
                  }}
                />
              </View>
            </>
          ) : (
            <View style={NO_DATA_VIEW}>
              <BanIcon width={15} height={15} />
              <Text text={'No Data Available'} style={NO_DATA_TEXT} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTENT: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
  marginTop: 20,
};
const BODY: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const BODY_CONTENT: ViewStyle = {
  backgroundColor: color.white,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  marginTop: 10,
  height: 50,
  alignItems: 'center',
};
const FLALIST_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const FLALIST_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10,
  marginTop: 10,
  alignItems: 'center',
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 12,
  color: color.gray3,
  fontWeight: '400',
};
const SUBTITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 10,
  color: color.black1,
  fontWeight: '400',
  flex: 1,
};
const SEPARATOR: ViewStyle = {
  height: 3,
  width: '100%',
  backgroundColor: color.gray9,
};
const BUTTON_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 28,
  width: 76,
  borderRadius: 40,
};
const NO_DATA_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(50),
  flexDirection: 'row',
};
const NO_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(16),
  color: color.black1,
  textAlign: 'center',
  paddingHorizontal: horizontalScale(10),
};
