import {useLazyQuery} from '@apollo/client';
import {DAILY_INSPIRING_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
//
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useGetDailyInspiring = (accessToken: string) => {
  const [dailyInspiring, setDailyInspiring] = useState<any>([]);
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {i18n} = useTranslation();

  const [getDailyInspiring, {loading: loadingGetDailyInspiring}] = useLazyQuery(
    DAILY_INSPIRING_QUERY,
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
        setDailyInspiring(data?.dailyInspiring);
      },
      onError(err) {
        console.log('=>>> error get daily inspiring', err);
      },
    },
  );
  return {
    getDailyInspiring,
    loadingGetDailyInspiring,
    dailyInspiring,
  };
};
