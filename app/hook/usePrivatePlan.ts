import {useLazyQuery} from '@apollo/client';
import {PRIVATE_PLAN_QUERY} from '@app/apollo/query';
import {GetPrivatePlanResType} from '@app/models';
import {selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const usePrivatePlan = () => {
  const {i18n} = useTranslation();
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [dataPrivatePlan, setDataPrivatePlan] =
    useState<GetPrivatePlanResType>();

  const [getPrivatePlan, {loading: loadingGetPrivatePlan}] =
    useLazyQuery<GetPrivatePlanResType>(PRIVATE_PLAN_QUERY, {
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
        setDataPrivatePlan(data);
      },
      onError(err) {
        console.log('=>>> error get private plan', err);
      },
    });
  return {
    getPrivatePlan,
    loadingGetPrivatePlan,
    dataPrivatePlan,
  };
};
