import {useMutation} from '@apollo/client';
import {VERIFY_PASSWORD_QUERY} from '@app/apollo/query';

export const useVerifyPassword = password => {
  const [verifyPassword] = useMutation(VERIFY_PASSWORD_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      password: password,
    },
    async onCompleted(data) {
      console.log('data', data);
    },
    async onError(err) {
      console.log('onerror', err);
    },
  });

  return {
    verifyPassword,
  };
};
