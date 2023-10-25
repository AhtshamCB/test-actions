import {useState} from 'react';
//
import {useLazyQuery} from '@apollo/client';
import {LEVEL_CERTIFICATIONS_QUERY} from '@app/apollo/query';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

export const useGetLevelCertifications = (accessToken: string) => {
  const [levelCertifications, setLevelCertifications] =
    useState<Array<string>>();
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [getLevelCertifications, {loading: loadingCertifications}] =
    useLazyQuery(LEVEL_CERTIFICATIONS_QUERY, {
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
        setLevelCertifications(data?.levelCertifications);
      },
      onError(err) {
        console.log('onerror get level certifications', err);
      },
    });
  return {
    getLevelCertifications,
    loadingCertifications,
    levelCertifications,
  };
};
