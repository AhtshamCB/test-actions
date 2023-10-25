import {useLazyQuery} from '@apollo/client';
import {VERIFY_PIN_CODE_QUERY} from '@app/apollo/query';
import {UserActions} from '@app/redux';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const useVerifyPinCode = (accessToken, pinCode) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const [getVerifyPinCode] = useLazyQuery(VERIFY_PIN_CODE_QUERY, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        lang: i18n.language,
      },
    },
    variables: {
      pinCode: pinCode,
    },
    async onCompleted(data) {
      dispatch(UserActions.setUserVerifyPin(pinCode));
      dispatch(UserActions.setStatusVerifyPin(data));
    },
    onError(err) {
      dispatch(UserActions.setStatusVerifyPin(err));
      console.log('onerror', err);
    },
  });
  return {
    getVerifyPinCode,
  };
};
