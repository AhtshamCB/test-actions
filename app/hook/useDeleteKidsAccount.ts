import client from '@app/apollo';
import {DELETE_ACCOUNT_KIDS_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useDeleteKidsAccount = () => {
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [dataDelete, setDataDelete] = useState<any>();

  const {accessToken} = useSelector(selector.user);
  const [errors, setErrors] = useState<any>();

  const deleteKidsAccount = async ({payload}: {payload: any}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<any>({
        mutation: DELETE_ACCOUNT_KIDS_QUERY,
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
      console.log('data', data);

      setDataDelete(data?.kidDeleteAccount);
      setIsLoading(false);

      return data?.kidDeleteAccount;
    } catch (error: any) {
      setErrors(error.message);
      console.log('=>>>>> error delete account', error);
    }
  };

  return {
    deleteKidsAccount,
    dataDelete,
    isLoading,
    errors,
  };
};
