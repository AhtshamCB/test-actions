/**
 * @format
 */
import codePush from 'react-native-code-push';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => codePush(App));
