/**
 * @format
 */

import {AppRegistry} from 'react-native';
const GLOBAL = require('./Global');
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
