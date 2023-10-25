import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle, Dimensions, Platform} from 'react-native';
import {color, verticalScale} from '@app/theme';
import Share from 'react-native-share';
import {HeaderPDF} from './components/header-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';

export const PDFScreen: FC<
  StackScreenProps<NavigatorParamList, 'pdfScreen'>
> = ({route}) => {
  const {fileUrl} = route?.params || '';

  const saveTempPDF = async () => {
    const {dirs} = ReactNativeBlobUtil.fs;
    const response = await ReactNativeBlobUtil.config({
      path: `${dirs.DocumentDir}/TeeFi.pdf`,
    }).fetch('GET', fileUrl);
    const localFilePath = response.path();
    console.log('Local file path:', localFilePath);
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
            filename: 'Teefi.pdf',
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

  return (
    <View style={CONTAINER}>
      <HeaderPDF
        title="PDF"
        isShowLeft
        isShowRight
        onRightPress={async () => {
          await sharePDF();
        }}
      />
      <View style={CONTENT}>
        <Pdf source={{uri: `${fileUrl}`}} style={PDF} trustAllCerts={false} />
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
  marginTop: verticalScale(50),
};
const PDF: ViewStyle = {
  flex: 1,
  width: Dimensions.get('window').width,
  marginBottom: 80,
  backgroundColor: color.white,
};
