import {useMutation} from '@apollo/client';
import {UPSERT_PIN_CODE_QUERY} from '@app/apollo/query';
import {UserActions} from '@app/redux';
import {useDispatch} from 'react-redux';

export const useUpsertPinCode = (accessToken, pinCode, newPinCode) => {
  const dispatch = useDispatch();
  const [upsertPinCode] = useMutation(UPSERT_PIN_CODE_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
      },
    },
    variables: {
      pinCode: pinCode,
      newPinCode: '',
    },
    async onCompleted(data) {
      if (data?.upsertPinCode) {
        dispatch(UserActions.setUserPin(pinCode));
      }
    },
    onError(err) {
      //   setError(`${err}`);
      console.log('onerror', err);
    },
  });
  const [upsertWithNewPinCode] = useMutation(UPSERT_PIN_CODE_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
      },
    },
    variables: {
      pinCode: pinCode,
      newPinCode: newPinCode,
    },
    async onCompleted(data) {
      if (data?.upsertPinCode) {
        dispatch(UserActions.setUserPin(newPinCode));
      }
    },
    onError(err) {
      //   setError(`${err}`);
      console.log('onerror', err);
    },
  });
  return {
    upsertPinCode,
    upsertWithNewPinCode,
  };
};
