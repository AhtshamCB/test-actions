import {useLazyQuery} from '@apollo/client';
import {SYSTEM_SETTINGS_QUERY} from '@app/apollo/query';
import {SystemSettings} from '@app/models';
import {ConfigActions, selector} from '@app/redux';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';

export const useGetSystemSettings = () => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [getSystemSettings, {loading: loadingGetSystemSettings}] =
    useLazyQuery<SystemSettings>(SYSTEM_SETTINGS_QUERY, {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
      context: {
        headers: {
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
          lang: i18n.language,
        },
      },
      async onCompleted(data) {
        dispatch(ConfigActions.setIsBetaVersion(data?.systemSettings?.isBeta));
        dispatch(
          ConfigActions.setEndBetaDate(data?.systemSettings?.endBetaDate),
        );
      },
      onError(err) {
        console.log('=>>> error get system', err);
      },
    });

  return {
    getSystemSettings,
    loadingGetSystemSettings,
  };
};
