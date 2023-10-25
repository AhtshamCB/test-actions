import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import configureStore from './create-store';
import ReduxPersist from '../config/redux-persist';

//
import UserActions, {UserState} from './user-redux';
import StartupActions, {StartupState} from './startup-redux';
import DashboardActions, {DashboardState} from './dashboard-redux';
import ConfigActions, {ConfigState} from './config-redux';
import LessonActions, {LessonState} from './lessons-redux';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  user: require('./user-redux').reducer,
  startup: require('./startup-redux').reducer,
  dashboard: require('./dashboard-redux').reducer,
  config: require('./config-redux').reducer,
  lessons: require('./lessons-redux').reducer,
});

export type RootState = ReturnType<typeof reducers>;
/// create Store instance
export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let {store} = configureStore(finalReducers);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
/* -------------Export Selector -------------------------------- */
export const selector = {
  user: (state: RootState) => state.user as UserState,
  startup: (state: RootState) => state.startup as StartupState,
  dashboard: (state: RootState) => state.dashboard as DashboardState,
  config: (state: RootState) => state.config as ConfigState,
  lessons: (state: RootState) => state.lessons as LessonState,
};

export {
  UserActions,
  StartupActions,
  DashboardActions,
  ConfigActions,
  LessonActions,
};
