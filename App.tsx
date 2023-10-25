// This is the first file that ReactNative will run when it starts up.
//
// We jump out of here immediately and into our main entry point instead.
//
// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.
import 'react-native-gesture-handler';
import App from './app/app';
import {AppRegistry} from 'react-native';
import './app/i18next/i18n.config';
import {LogBox} from 'react-native';

AppRegistry.registerComponent('teefiapp', () => App);
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default App;
