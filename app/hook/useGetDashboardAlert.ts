import {useLazyQuery} from '@apollo/client';
import {DASHBOARD_ALERT_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
//
import {useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {IDashboardAlert} from '../models';

export const useGetDashboardAlert = (accessToken: string) => {
  const [dashboardAlert, setDashboardAlert] = useState<IDashboardAlert>();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {i18n} = useTranslation();

  const [getDashboardAlert, {loading: loadingGetDashboardAlert}] = useLazyQuery(
    DASHBOARD_ALERT_QUERY,
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
        setDashboardAlert(data?.dashboardAlert);
      },
      onError(err) {
        console.log('=>>> error get dashboard alert', err);
      },
    },
  );
  return {
    getDashboardAlert,
    loadingGetDashboardAlert,
    dashboardAlert,
  };
};
