import React, {Component} from 'react';
import { StyleSheet,Text, View,ImageBackground,Animated,Easing,Image,Dimensions} from 'react-native';
const GLOBAL = require('./Global');
type Props = {};
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import TimeZone from 'react-native-timezone';
import Geolocation from '@react-native-community/geolocation';
var moment = require('moment-timezone');
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyCCT7vlingJBOvUgnWA_J4NMTwpXUtBEHI"); // use a valid API key

export default class Splash extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
    }
   this.RotateValueHolder = new Animated.Value(0);

  }


StartImageRotateFunction () {
 
  this.RotateValueHolder.setValue(0)
  
  Animated.timing(
    this.RotateValueHolder,
    {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear
    }
  ).start(() => this.StartImageRotateFunction())
 
}


  componentDidMount(){
     this.StartImageRotateFunction();
     this.getTimeZone()
  this.timeoutCheck = setTimeout(() => {
    this.proceed()
   }, 2000);
  Geolocation.getCurrentPosition(info => 
    {
      console.log(info)
// /AIzaSyCCT7vlingJBOvUgnWA_J4NMTwpXUtBEHI
      console.log(info.coords.latitude +'lon '+ info.coords.longitude)
    Geocoder.from(info.coords.latitude, info.coords.longitude)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
        })
        .catch(error => console.warn(error));
    });
  }


getTimeZone = async() => {
 const timeZone = await TimeZone.getTimeZone().then(zone => zone);
 console.log({ timeZone });

// alert(timeZone)
//  alert(moment.tz.guess())

var zone_name =  moment.tz.guess();
var timezone = moment.tz(zone_name).zoneAbbr() 
console.log(timezone);
}

  proceed=()=>{
     var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){
         this.props.navigation.replace('Slider')
    }else {
       GLOBAL.user_id = e
       this.props.navigation.replace('DrawerNavigator')
    }

    })

  }

  render() {

    const RotateData = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })    
    return (
      <View style={styles.container}>
       <ImageBackground style = {{width :wp('100%') ,height : hp('100%')}}
         source={require('./resources/splash.png')}>
         <Animated.Image style={{width:wp('50%'), height:hp('50%'),transform: [{rotate: RotateData}], resizeMode:'contain', alignSelf:'center', marginTop:hp('6%')}}
         source={require('./resources/logo.png')}
         />
         </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
