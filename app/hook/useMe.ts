import {useLazyQuery, useMutation} from '@apollo/client';
import {ME_QUERY, UPDATE_ME_QUERY} from '@app/apollo/query';
import {MeInfo} from '@app/models';
import {selector, UserActions} from '@app/redux';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';

export const useMe = (
  accessToken: any,
  firstName?: string,
  lastName?: string,
  address?: string,
  country?: string,
  onCompletedUpdateMeProfile?: () => void,
  onCompletedGetMeInfo?: () => void,
) => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [getMeInfo, {loading: loadingMeInfo}] = useLazyQuery<MeInfo>(ME_QUERY, {
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
      onCompletedGetMeInfo && onCompletedGetMeInfo();
      dispatch(UserActions.setUserInfo(data));
    },
    onError(err) {
      console.log('=>>> error get me parents', err);
    },
  });

  const [updateMeProfile] = useMutation(UPDATE_ME_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      country: country,
    },
    async onCompleted() {
      onCompletedUpdateMeProfile && onCompletedUpdateMeProfile();
    },
    onError(err) {
      console.log('=>>> error update me profile', err);
    },
  });
  return {
    getMeInfo,
    loadingMeInfo,
    updateMeProfile,
  };
};
