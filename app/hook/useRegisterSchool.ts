import {useMutation} from '@apollo/client';
import {REGISTER_SCHOOL_QUERY} from '@app/apollo/query';
import {useState} from 'react';

export const useRegisterSchool = (
  address,
  country,
  educatorRole,
  email,
  firstName,
  lastName,
  otpCode,
  title,
  password,
  schoolName,
  studentLimit,
) => {
  const [error, setError] = useState<string>('');
  const [registerSchool] = useMutation(REGISTER_SCHOOL_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      address: address,
      country: country,
      educatorRole: educatorRole,
      email: email,
      firstName: firstName,
      lastName: lastName,
      otpCode: otpCode,
      title: title,
      password: password,
      schoolName: schoolName,
      studentLimit: studentLimit,
    },
    async onCompleted(data) {
      console.log('data', data);
    },
    async onError(err) {
      await setError(`${err.message}`);
      console.log('onerror', err);
    },
  });

  return {
    registerSchool,
    error,
  };
};
