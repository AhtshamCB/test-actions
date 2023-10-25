import {useLazyQuery} from '@apollo/client';
import {MY_DASHBOARD_QUERY} from '@app/apollo/query';
import {DashboardActions, selector} from '@app/redux';
import {useState} from 'react';
import {Platform} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const useMyDashboard = (accessToken: string) => {
  const dispatch = useDispatch();
  const [dataDashboard, setDataDashboard] = useState<any>();
  const [dataSource, setDataSource] = useState<any>();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {i18n} = useTranslation();

  const [getMyDashboard, {loading: loadingDashboard}] = useLazyQuery(
    MY_DASHBOARD_QUERY,
    {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
          lang: i18n.language,
        },
      },
      async onCompleted(data) {
        const leaderboardInfo = data?.learningDashboard?.leaderBoard;
        const currentMapLevel = data?.learningDashboard?.currentLevel;
        const summaryDetail = data?.learningDashboard?.summary;
        const earningDetail = data?.learningDashboard?.earningDetails;
        const valueChartDetail = data?.learningDashboard?.weeklyActivities;
        dispatch(DashboardActions.setLeaderboardInfo(leaderboardInfo));
        dispatch(DashboardActions.setCurrentLevel(currentMapLevel));
        dispatch(DashboardActions.setSummary(summaryDetail));
        dispatch(DashboardActions.setEarning(earningDetail));
        dispatch(DashboardActions.setValueChart(valueChartDetail));
        setDataDashboard(data);
        setDataSource(valueChartDetail);
      },
      onError(err) {
        console.log('onerror=>>>>>>> 1', err);
      },
    },
  );
  return {
    getMyDashboard,
    loadingDashboard,
    dataDashboard,
    dataSource,
  };
};
