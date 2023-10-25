import client from '@app/apollo';
import {SELF_CHANGE_PASSWORD_QUERY} from '@app/apollo/query';
import {DataSelfChangePassword, SelfChangePassword} from '@app/models';
import {selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useSelfChangePassword = () => {
  const {i18n} = useTranslation();
  const [errorParentChangePassword, setErrorParentChangePassword] =
    useState<any>();
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selfChangePassword = async ({
    payload,
  }: {
    payload: SelfChangePassword;
  }) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataSelfChangePassword>({
        mutation: SELF_CHANGE_PASSWORD_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      setErrorParentChangePassword(error);
      console.log('=>>>>> error change password', error);
    }
  };

  return {
    isLoading,
    selfChangePassword,
    errorParentChangePassword,
    setErrorParentChangePassword,
  };
};
