/**
 * @format
 */

import {AppRegistry} from 'react-native';
const GLOBAL = require('./Global');
import 'react-native-get-random-values';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
