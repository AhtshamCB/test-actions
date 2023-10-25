import client from '@app/apollo';
import {
  ADD_STUDENTS_QUERY,
  DELETE_STUDENT_QUERY,
  GET_LIST_STUDENTS_QUERY,
  LEARNING_DASHBOARD_QUERY,
  UPDATE_KIDS_QUERY,
} from '@app/apollo/query';
import {
  AddStudents,
  DataAddStudents,
  DataUpdateStudent,
  DeleteStudent,
  GetDataLearningDashboardStudent,
  GetIdStudent,
  GetStudentList,
  LearningDashboardStudent,
  StudentList,
  UpdateStudent,
} from '@app/models';
import {DashboardActions, selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
//
import {useDispatch, useSelector} from 'react-redux';

export const useGrade = () => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataAddStudents, setDataAddStudents] = useState<Object>();
  const [dataListStudents, setDataListStudents] = useState<any>();
  const [dataValueChartStudent, setDataValueChartStudent] = useState<any>();

  const addStudent = async ({payload}: {payload: AddStudents}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataAddStudents>({
        mutation: ADD_STUDENTS_QUERY,
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
      setDataAddStudents(data?.addStudent);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('=>>>>> error add students', error);
    }
  };

  const deleteStudent = async ({payload}: {payload: GetIdStudent}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DeleteStudent>({
        mutation: DELETE_STUDENT_QUERY,
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
      console.log('Error deleting student', error);
    }
  };

  const updateStudent = async ({payload}: {payload: UpdateStudent}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<DataUpdateStudent>({
        mutation: UPDATE_KIDS_QUERY,
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
      console.log('Error update student', error);
    }
  };

  const getListStudents = async ({payload}: {payload: GetStudentList}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<StudentList>({
        query: GET_LIST_STUDENTS_QUERY,
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
      setDataListStudents(data?.listStudent);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('Error get list student', error);
    }
  };

  const getLearningDashboardStudent = async ({
    payload,
  }: {
    payload: LearningDashboardStudent;
  }) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<GetDataLearningDashboardStudent>({
        query: LEARNING_DASHBOARD_QUERY,
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
      const currentMapLevel = data?.learningDashboard?.currentLevel;
      const summaryDetail = data?.learningDashboard?.summary;
      const earningDetail = data?.learningDashboard?.earningDetails;
      const valueChartDetail = data?.learningDashboard?.weeklyActivities;
      dispatch(
        DashboardActions.setDashboardStudentCurrentLevel(currentMapLevel),
      );
      dispatch(DashboardActions.setDashboardStudentSummary(summaryDetail));
      dispatch(DashboardActions.setDashboardStudentEarning(earningDetail));
      dispatch(
        DashboardActions.setDashboardStudentValueChart(valueChartDetail),
      );
      setDataValueChartStudent(valueChartDetail);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log('Error get learning dashboard student', error);
    }
  };

  return {
    addStudent,
    deleteStudent,
    getListStudents,
    dataListStudents,
    dataAddStudents,
    updateStudent,
    getLearningDashboardStudent,
    dataValueChartStudent,
    isLoading,
  };
};
