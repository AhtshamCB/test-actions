import {useMutation} from '@apollo/client';
import {
  CANCEL_SUBSCRIPTION_QUERY,
  SUBSCRIBE_QUERY,
  UPDATE_CHILD_MEMBERSHIP_QUERY,
} from '@app/apollo/query';
import {selector, UserActions} from '@app/redux';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useMembership = (
  accessToken?: string,
  membershipId?: string,
  onCompletedUpdateChildMembership?: () => void,
  onCompletedCancelSubscription?: () => void,
  onCompletedSubscribeAgain?: () => void,
) => {
  const dispatch = useDispatch();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const [subscribeAgain, {loading: loadingSubscribeAgain}] = useMutation(
    SUBSCRIBE_QUERY,
    {
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        },
      },
      variables: {
        membershipId: membershipId,
      },
      async onCompleted() {
        onCompletedSubscribeAgain && onCompletedSubscribeAgain();
      },
      onError(err) {
        console.log('=>>>> error subscribe again', err);
      },
    },
  );
  const [updateChildMembership, {loading: loadingUpdateChildMembership}] =
    useMutation(UPDATE_CHILD_MEMBERSHIP_QUERY, {
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
        },
      },
      variables: {
        membershipId: membershipId,
      },
      async onCompleted(dataCompleted) {
        dispatch(UserActions.setActiveKids(dataCompleted?.updateMembership));
        onCompletedUpdateChildMembership && onCompletedUpdateChildMembership();
      },
      onError(err) {
        console.log('onerror', err);
      },
    });
  const [cancelSubscription, {loading: loadingCancelSubscription}] =
    useMutation(CANCEL_SUBSCRIPTION_QUERY, {
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        },
      },
      async onCompleted(data) {
        console.log('data cancel', data);
        onCompletedCancelSubscription && onCompletedCancelSubscription();
      },
      onError(err) {
        console.log('onerror', err);
      },
    });
  return {
    subscribeAgain,
    updateChildMembership,
    cancelSubscription,
    loadingSubscribeAgain,
    loadingUpdateChildMembership,
    loadingCancelSubscription,
  };
};
