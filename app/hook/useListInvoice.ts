import {useLazyQuery} from '@apollo/client';
import {LIST_INVOICE_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const useListInvoice = accessToken => {
  const {i18n} = useTranslation();
  const [dataListInvoice, setDataListInvoice] = useState<any>([]);
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [getListInvoice] = useLazyQuery(LIST_INVOICE_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        lang: i18n.language,
      },
    },
    async onCompleted(data) {
      setDataListInvoice(data?.listInvoice);
    },
    onError(err) {
      console.log('=>>>>> error list invoice', err);
    },
  });

  return {
    getListInvoice,
    dataListInvoice,
  };
};
