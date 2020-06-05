import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Platform,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import OTPInput from 'react-native-otp';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NetInfo, {NetInfoSubscription} from "@react-native-community/netinfo";
import * as RNLocalize from "react-native-localize";
// import SmsListener from 'react-native-android-sms-listener'
import IndicatorCustom from './IndicatorCustom'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import CodeInput from 'react-native-confirmation-code-input';

// get all required values of device
let uniqueId = DeviceInfo.getUniqueId();
let hasNotch = DeviceInfo.hasNotch();
console.log(RNLocalize.getCountry());

var deviceNetinfo = NetInfo.fetch().then(state => {
  GLOBAL.deviceIp = state.details.ipAddress
  console.log(JSON.stringify(state))
  console.log("Connection type", state.details.ipAddress);
  console.log("Is connected?", state.isConnected);
});

//alert(GLOBAL.deviceIp)
DeviceInfo.getManufacturer().then(manufacturer => {
  GLOBAL.deviceManuf = manufacturer
});

DeviceInfo.getCarrier().then(carrier => {
  GLOBAL.deviceCarrier = carrier
});

let model = DeviceInfo.getModel();

type Props = {};
export default class Otp extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      otp:'',
      elevations:10,
      results:''
    }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


  componentDidMount(){
    console.log('otp--->'+GLOBAL.loginOTP)
    console.log('otp--->'+GLOBAL.signupOtp)
    
    // SmsListener.addListener(message => {
    //   console.log(message)
    // })
  }

  _onFulfill=(code)=>{
   // this.setState({otp : code})
    this._handlePress(code) 
  }


  _handlePress=(code)=>{
//    alert(this.props.navigation.getParam('params'))
//alert(this.state.otp)
  var code= code
    var otpType = this.props.navigation.getParam('params')
    if(otpType == 'LoginOtp'){

      if(code == GLOBAL.loginOTP){
//        alert('user_detail_after_otp')
      //this.props.navigation.replace('DrawerNavigator')
     const url = GLOBAL.BASE_URL +  'user_detail_after_otp'

      this.showLoading()
   fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },


  body: JSON.stringify({
    mobile: GLOBAL.loginmobile,
    ip_address : GLOBAL.deviceIp,
    deviceID: uniqueId,
    deviceType: Platform.OS,
    deviceToken: GLOBAL.firebaseToken,
    model_name: model,
    carrier_name: GLOBAL.deviceCarrier,
    device_country: 'India',
    device_memory: '',
    has_notch: hasNotch,
    manufacture: GLOBAL.deviceManuf,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      console.log(JSON.stringify(responseJson))
      this.hideLoading()
     if (responseJson.status == true) {
      
        this.setState({ results: responseJson.user_detail })

        GLOBAL.user_id = responseJson.user_detail.user_id

         AsyncStorage.setItem('userID', this.state.results.user_id);
         AsyncStorage.setItem('image', this.state.results.image);
         AsyncStorage.setItem('name', this.state.results.name);
         AsyncStorage.setItem('email', this.state.results.email);
         AsyncStorage.setItem('mobile', this.state.results.mobile);
        this.props.navigation.replace('DrawerNavigator')
       }else{
        alert(responseJson.msg)
      }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });

      }else{
        alert('Invalid OTP')
      }

    }else if(otpType == 'SignupOtp'){

      if(code ==  GLOBAL.signupOtp){
            const url = GLOBAL.BASE_URL +  'Signup'
  //          console.log(url)
//            console.log(GLOBAL.myname+'--' + GLOBAL.myemail+'--'+GLOBAL.mymobile+'--' +DeviceInfo.getUniqueId())
    //  this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },


  body: JSON.stringify({
    name: GLOBAL.signupName,
    mobile: GLOBAL.signupMobile,
    email: GLOBAL.signupEmail,
    auth : 'normal',
    gender: '',
    dob: '',
    birth_time : '',
    place_of_birth: '',
    latitude:'',
    longitude:'',
    deviceID: uniqueId,
    deviceType: Platform.OS,
    deviceToken: GLOBAL.firebaseToken,
    model_name: model,
    carrier_name: GLOBAL.deviceCarrier,
    device_country: 'India',
    device_memory: '',
    country_code: GLOBAL.signupCountryCode,
    has_notch: hasNotch,
    manufacture: GLOBAL.deviceManuf,
    ip_address: GLOBAL.deviceIp,
    is_refer_verify: GLOBAL.signupVerifyRefer,
    apply_to: GLOBAL.signupApplyRefer,
    referral_code_other: GLOBAL.signupReferCode


  }),
}).then((response) => response.json())
    .then((responseJson) => {
      console.log(JSON.stringify(responseJson))
      //this.hideLoading()
     if (responseJson.status == true) {
      
      this.setState({ results: responseJson.user_detail })

        GLOBAL.user_id = responseJson.user_detail.user_id


         AsyncStorage.setItem('userID', this.state.results.user_id);
         AsyncStorage.setItem('image', this.state.results.image);
         AsyncStorage.setItem('name', this.state.results.name);
         AsyncStorage.setItem('email', this.state.results.email);
         AsyncStorage.setItem('mobile', this.state.results.mobile);
        this.props.navigation.replace('DrawerNavigator')
       }else{
        alert(responseJson.msg)
      }
    })
    .catch((error) => {
      console.error(error);
       //this.hideLoading()
    });


      }else{
        alert('Invalid OTP')        
      }

    }
  }
  
  handleOTPChange = (otp) => {
    this.setState({ otp })
  }
 
  clearOTP = () => {
    this.setState({ otp: undefined })
  }
 
  autoFill = () => {
    this.setState({ otp: '221198' })
  }





  render() {

        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }

    return (
      <View style={styles.container}>
       <ImageBackground style = {{width :wp('100%') ,height : hp('100%'), flex:1,}}
         source={require('./resources/background_image.png')}>


      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>



         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('10%'),}}>


         <Image style = {{width:wp('50%'), height:hp('50%'), resizeMode:'contain', marginTop:hp('-8%'), alignSelf:'center'}} source={require('./resources/kundli_logo.png')}/>
          <Text style = {{width:wp('70%'),color:'#262626',fontSize: 32,fontFamily:'Nunito-Bold',textAlign:'left',marginTop:hp('-15%'), marginLeft:wp('8%'), lineHeight:35}}>
          Phone Verification</Text>

          <Text style = {{width:wp('75%'),color:'#909090',fontSize: 18,fontFamily:'Nunito-Regular',textAlign:'left', marginLeft:wp('8%'),marginTop:wp('2%')}}>
          Enter your OTP code here
          </Text>


             <CodeInput
                 containerStyle={{alignSelf:'flex-start', marginLeft:wp('3%'), marginTop:hp('2%')}}
                 ref="codeInputRef1"
                 keyboardType="numeric"
                 secureTextEntry={false}
                 className={'border-box'}
                 space={6}
                 codeInputStyle={{width:wp(11), height:hp(7), marginLeft:wp(3.5),marginTop:hp(5), color:'#909090', fontSize:26, alignSelf:'center'}}
                 size={30}
                 codeLength={6}
                 inputPosition='center'
                 activeColor = '#E60000'
                 inactiveColor =  '#EAECEF'
                 onFulfill={(code) => this._onFulfill(code)}
               />


{/*
            <OTPInputView
                style={{width: '80%', height: 200,marginLeft:wp('0%'),alignSelf:'center'}}
                pinCount={6}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => {
            //        console.log(`Code is ${code}, you are good to go!`)
                      this._onFulfill(code)
                })}
            />

           <TextInput style = {{width:wp('80%'),color:'#909090', height:hp('7%'),
            fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(1),
            borderBottomColor:'#909090', borderBottomWidth:1, alignSelf:'center'}}
                         placeholder = {'OTP'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         keyboardType={'numeric'}
                         editable={true}
                         maxLength={6}
                         onChangeText={(text) => this.setState({otp:text})}
                         value={this.state.otp}
              />



          <OTPInput 
          containerStyle={{alignSelf:'flex-start', marginLeft:wp('3%'), marginTop:hp('2%'),}}
          value={this.state.otp}
          onChange={this.handleOTPChange}
          tintColor="#E60000"
          cellStyle={{width:wp(11), height:hp(7), marginLeft:wp(3), color:'#909090', fontSize:26, alignSelf:'center'}}
          offTintColor="#EAECEF"
          otpLength={6}
          />
*/}

          <View style={{width:wp('80%'), backgroundColor:'transparent', marginTop:hp(8), justifyContent:'space-between', alignSelf:'center', flexDirection:'row', alignItems:'center'}}>

          <TouchableOpacity>
          <Text style = {{width:wp('35%'),color:'#000000',fontSize: 16,fontFamily:'Nunito-SemiBold',textAlign:'left', marginTop:hp(4)}}>
          Resend Code?
          </Text>
          </TouchableOpacity>

         <TouchableOpacity style={{alignSelf:'flex-end'}}
          onPress={()=> this._handlePress()}>
          <View style={{width:wp('24%'), height:hp('7%'), backgroundColor:'#E60000',justifyContent:'center',  borderRadius:50, alignSelf:'flex-end', marginTop:hp('4%'),marginRight:wp('1%')}}>
          <Image style={{width:wp(40), height:hp(3.5), resizeMode:'contain',alignSelf:'center'}} source={require('./resources/rightArrow.png')}
          />
          </View>
          </TouchableOpacity>


          </View>


         </View>

         </View>

         </KeyboardAwareScrollView>
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
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#E60000",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    fontSize:20,
    color:'black',
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#E60000",
  },
});
