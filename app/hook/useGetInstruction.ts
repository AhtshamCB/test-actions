import {useState} from 'react';
//
import {useLazyQuery} from '@apollo/client';
import {INSTRUCTION_QUERY} from '@app/apollo/query';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {Platform} from 'react-native';

export const useGetInstruction = (accessToken: string) => {
  const [instruction, setInstruction] = useState<string>('');
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const {i18n} = useTranslation();

  const [getInstruction, {loading: loadingInstruction}] = useLazyQuery(
    INSTRUCTION_QUERY,
    {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
          lang: i18n.language,
        },
      },
      async onCompleted(data) {
        setInstruction(data?.instruction);
      },
      onError(err) {
        console.log('onerror get instruction', err);
      },
    },
  );
  return {
    getInstruction,
    loadingInstruction,
    instruction,
  };
};
