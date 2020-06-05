import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class EmptyMessage extends Component {

	render(){
		return(
      <View style={{alignItems:'center',flex:1, justifyContent:'center',backgroundColor:'transparent', marginTop:hp(-5)}}>
      <Image style={{width:130, height:130, resizeMode:'contain',}}
      source={require('./resources/empty.png')}/>
        <Text style={{fontSize:20,alignSelf:'center',width:'80%',textAlign:'center', marginTop:20,fontFamily: 'Nunito-Regular'}}>{this.props.emptyMessage}</Text>
        </View>
			)
	}

}