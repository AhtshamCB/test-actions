import {useLazyQuery, useMutation} from '@apollo/client';
import {
  CHANGE_WATCHING_KID_QUERY,
  GET_KIDS_QUERY,
  DELETE_KIDS_QUERY,
} from '@app/apollo/query';
import {ActiveKidsInfo} from '@app/models';
//
import {selector, UserActions} from '@app/redux';
import {useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const useKids = (
  accessToken?: string,
  childId?: string,
  onCompletedDeleteKids?: () => void,
  onCompletedActiveChild?: () => void,
  onCompletedGetActiveKid?: () => void,
) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const [isGetNewChild, setIsGetNewChild] = useState<boolean>(false);
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [changeWatchingKid] = useMutation<ActiveKidsInfo>(
    CHANGE_WATCHING_KID_QUERY,
    {
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        },
      },
      variables: {
        childId: childId,
      },
      async onCompleted() {
        onCompletedActiveChild && onCompletedActiveChild();
        setIsGetNewChild(!isGetNewChild);
      },
      onError(err) {
        console.log('=>>>>> error active kids', err);
      },
    },
  );

  const [deleteKids] = useMutation(DELETE_KIDS_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      _id: childId,
    },
    async onCompleted() {
      onCompletedDeleteKids && onCompletedDeleteKids();
    },
    onError(err) {
      console.log('=>>>>> error delete kids', err);
    },
  });

  const [getActiveKids, {loading: loadingActiveKids}] =
    useLazyQuery<ActiveKidsInfo>(GET_KIDS_QUERY, {
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
        onCompletedGetActiveKid && onCompletedGetActiveKid();
        dispatch(UserActions.setActiveKids(data?.kids));
      },
      onError(err) {
        console.log('=>>> error get me kids', err);
      },
    });

  return {
    changeWatchingKid,
    deleteKids,
    isGetNewChild,
    getActiveKids,
    loadingActiveKids,
  };
};
