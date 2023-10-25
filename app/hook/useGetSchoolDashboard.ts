import client from '@app/apollo';
import {
  LEARNING_HOURS_QUERY,
  ONLINE_STUDENTS_QUERY,
  SCHOOL_DASHBOARD_QUERY,
  SCHOOL_LEADERBOARD_QUERY,
  STUDENT_PERFORMANCE_QUERY,
  UPDATE_SCHOOL_DASHBOARD_QUERY,
} from '@app/apollo/query';
import {
  DataSchoolLeaderboard,
  DataUpdateSchoolSettings,
  GetLearningHour,
  GetSchoolDashboard,
  GetStudentPerformance,
  OnlineStudent,
  UpdateSchoolSettings,
} from '@app/models';
import {DashboardActions, selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useGetSchoolDashboard = () => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const {accessToken} = useSelector(selector.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSchoolDashboard, setDataSchoolDashboard] = useState<any>();
  const [dataSource, setDataSource] = useState<any>();
  const [dataStudentsOnline, setDataStudentsOnline] = useState<any>();
  const [dataLearningHour, setDataLearningHour] = useState<any>();

  const getSchoolDashboard = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<GetSchoolDashboard>({
        query: SCHOOL_DASHBOARD_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setDataSchoolDashboard(data?.schoolDashboard);
      dispatch(
        DashboardActions.setCurrentLevel(data?.schoolDashboard?.currentLevel),
      );
      setIsLoading(false);
    } catch (error) {
      console.log('Error get school dashboard', error);
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
    } catch (error) {
      console.log('Error get list grades', error);
    }
  };

  const getListStudentOnline = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<OnlineStudent>({
        query: ONLINE_STUDENTS_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setDataStudentsOnline(data?.onlineStudents);
      setIsLoading(false);
    } catch (error) {
      console.log('Error get list student online', error);
    }
  };

  const updateSchoolSettings = async ({
    payload,
  }: {
    payload: UpdateSchoolSettings;
  }) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<DataUpdateSchoolSettings>({
        query: UPDATE_SCHOOL_DASHBOARD_QUERY,
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
      setDataStudentsOnline(data?.updateSchool);
      setIsLoading(false);
    } catch (error) {
      console.log('Error update school settings', error);
    }
  };

  const getStudentPerformance = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<GetStudentPerformance>({
        query: STUDENT_PERFORMANCE_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      const valueChartDetail = data?.schoolDashboard?.studentPerformance;
      dispatch(DashboardActions.setValueChart(valueChartDetail));
      setDataSource(data?.schoolDashboard?.studentPerformance);
      setIsLoading(false);
    } catch (error) {
      console.log('Error get student performance', error);
    }
  };

  const getLearningHours = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<GetLearningHour>({
        query: LEARNING_HOURS_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      const valueChartDetail = data?.schoolDashboard?.learningHours;
      setDataLearningHour(valueChartDetail);
      dispatch(DashboardActions.setSchoolValueChart(valueChartDetail));
      setIsLoading(false);
    } catch (error) {
      console.log('Error get student performance', error);
    }
  };

  return {
    getSchoolDashboard,
    dataSchoolDashboard,
    dataSource,
    isLoading,
    getListLeaderboard,
    getListStudentOnline,
    dataStudentsOnline,
    updateSchoolSettings,
    getStudentPerformance,
    getLearningHours,
    dataLearningHour,
  };
};
