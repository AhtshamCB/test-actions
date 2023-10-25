import client from '@app/apollo';
import {
  CREATE_CLASS_QUERY,
  DELETE_CLASS_QUERY,
  EDUCATOR_SUBSCRIPTION_PLANS_QUERY,
  GET_GRADES_CLASS_QUERY,
  SCHOOL_LEADERBOARD_QUERY,
  SEND_NOTIFICATIONS_QUERY,
  UPDATE_CLASS_QUERY,
} from '@app/apollo/query';
import {
  CreateGrade,
  DataCreateGrade,
  DataDeleteGrade,
  DataSchoolLeaderboard,
  DataSendNotification,
  DeleteGrade,
  EducatorSubscriptionPlans,
  GetDataUpdateGrade,
  GetGradeList,
  GradeList,
  MeInfo,
  SendNotification,
  UpdateGrade,
} from '@app/models';
import {DashboardActions, selector} from '@app/redux';
import {SCHOOL_ACCESS_STATUS} from '@app/utils/contants';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
//
import {useDispatch, useSelector} from 'react-redux';

export const useSchool = () => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataCreateGrade, setDataCreateGrade] = useState<Object>();
  const [dataListGrades, setDataListGrades] = useState<any>();
  const [dataEducatorSubscriptionPlans, setDataEducatorSubsriptionPlans] =
    useState<any>();

  const createGrade = async ({payload}: {payload: CreateGrade}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataCreateGrade>({
        mutation: CREATE_CLASS_QUERY,
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
      setDataCreateGrade(data?.createGrade);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('=>>>>> error add students', error);
    }
  };

  const deleteGrade = async ({payload}: {payload: DeleteGrade}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataDeleteGrade>({
        mutation: DELETE_CLASS_QUERY,
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
      return data?.deleteGrade;
    } catch (error) {
      console.log('Error deleting grade', error);
    }
  };

  const updateGrade = async ({payload}: {payload: UpdateGrade}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<GetDataUpdateGrade>({
        mutation: UPDATE_CLASS_QUERY,
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
      console.log('Error update grade', error);
    }
  };

  const getListGrades = async ({payload}: {payload: GetGradeList}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<GradeList>({
        query: GET_GRADES_CLASS_QUERY,
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
      setDataListGrades(data?.grades);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('Error get list grades', error);
    }
  };

  const getListLeaderboard = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<DataSchoolLeaderboard>({
        query: SCHOOL_LEADERBOARD_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(DashboardActions.setLeaderboardInfo(data?.schoolLeaderBoard));
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('Error get list grades', error);
    }
  };

  const getEducatorSubscriptionPlans = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<EducatorSubscriptionPlans>({
        query: EDUCATOR_SUBSCRIPTION_PLANS_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setDataEducatorSubsriptionPlans(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('Error get educator subscription plans', error);
    }
  };

  const sendNotification = async ({payload}: {payload: SendNotification}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataSendNotification>({
        mutation: SEND_NOTIFICATIONS_QUERY,
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
      console.log('Error send notification', error);
    }
  };

  const checkSchoolIsNotVerify = (auth: MeInfo) => {
    return (
      auth?.me?.school?.accessStatus === SCHOOL_ACCESS_STATUS.NOT_ACTIVATED
    );
  };
  const checkSchoolIsExpired = (auth: MeInfo) => {
    return auth?.me?.school?.accessStatus === SCHOOL_ACCESS_STATUS.EXPIRED;
  };
  const checkGradeIsExpired = (auth: MeInfo) => {
    return auth?.me?.grade?.accessStatus === SCHOOL_ACCESS_STATUS.EXPIRED;
  };

  return {
    createGrade,
    deleteGrade,
    getListGrades,
    dataListGrades,
    dataCreateGrade,
    updateGrade,
    isLoading,
    getListLeaderboard,
    getEducatorSubscriptionPlans,
    dataEducatorSubscriptionPlans,
    sendNotification,
    checkSchoolIsNotVerify,
    checkSchoolIsExpired,
    checkGradeIsExpired,
  };
};
