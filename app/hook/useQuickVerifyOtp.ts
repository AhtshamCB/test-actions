import {useMutation} from '@apollo/client';
import {QUICK_VERIFY_OTP_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const useQuickVerifyOtp = (
  email?: string,
  type?: string,
  code?: string,
  onCompletedQuicVerifyOtp?: () => void,
) => {
  const {deviceId} = useSelector(selector.user);
  const [error, setError] = useState<any>();
  const [quickVerifyOtp] = useMutation(QUICK_VERIFY_OTP_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        deviceId: deviceId,
      },
    },
    variables: {
      email: email,
      type: type,
      code: code,
    },
    async onCompleted() {
      onCompletedQuicVerifyOtp && onCompletedQuicVerifyOtp();
    },
    onError(err) {
      setError(err.message);
      console.log('=>>>> error quick verify otp', err);
    },
  });
  return {
    quickVerifyOtp,
    error,
    setError,
  };
};
