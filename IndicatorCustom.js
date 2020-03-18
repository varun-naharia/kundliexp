import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';


const GLOBAL = require('./Global');

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class IndicatorCustom extends Component {

	render(){
		return(
        <View style={{flex: 1, backgroundColor:'transparent'}}>
        <BarIndicator count= {5}
         size={40} color="#E60000" />
        </View>

			)
	}

}