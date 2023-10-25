import {useState} from 'react';
import axios from 'axios';
import {showToastMessage} from '@app/utils';
import Config from 'react-native-config';
import {UPLOAD_FILE_URL} from '@app/utils/contants';

export const useUploadFile = accessToken => {
  const [fileData, setFileData] = useState<any>();

  const upLoadUrl =
    Config.ENV === 'dev' ? UPLOAD_FILE_URL.DEV : UPLOAD_FILE_URL.PROD;

  const uploadFile = async data => {
    await axios
      .post(upLoadUrl, data, {
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'multipart/form-data; boundary=——file',
        },
      })
      .then(res => {
        if (res.data.url) {
          setFileData(res.data.url);
          showToastMessage('Change Avatar Successfully', 'success', {
            bottomOffset: 80,
          });
        } else {
          showToastMessage('Change Avatar Failed', 'error', {
            bottomOffset: 80,
          });
        }
      });
  };
  return {
    uploadFile,
    fileData,
  };
};
