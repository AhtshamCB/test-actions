import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
//
import {Provider} from 'react-redux';
import createStore from './redux';
//
import {useBackButtonHandler, AppNavigator, canExit} from './navigators';
import {navigate} from '@app/navigators';
//
import messaging from '@react-native-firebase/messaging';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const store = createStore();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const {data} = remoteMessage || {};
  if (data) {
    // const {notificationId} = remoteMessage?.data || {};
    // console.log("notificationId")
    navigate('notificationDrawer');
  }
});
/**
 * This is the root component of our app.
 */
function App() {
  useBackButtonHandler(canExit);
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
