import {createStore, compose} from 'redux';
// import logger from "redux-logger"

// creates the store
export default rootReducer => {
  /* ------------- Redux Configuration ------------- */

  const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  // middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  // middleware.push(ScreenTracking)
  // __DEV__ && middleware.push(logger)
  // if (__DEV__) {
  //   // const createFlipper = require("redux-flipper").default
  //   // middleware.push(createFlipper())
  // }

  /* ------------- Assemble Middleware ------------- */

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;
  // if (Config.useReactotron) {
  //   enhancers.push(Reactotron.createEnhancer())
  // }
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  // if (ReduxPersist.active) {
  //   Rehydration.updateReducers(store)
  // }

  // kick off root saga

  return {
    store,
  };
};
