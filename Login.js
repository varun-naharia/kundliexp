import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var randomString = require('random-string');
type Props = {};
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input'
import {
  BarIndicator,
} from 'react-native-indicators';

export default class Login extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      mobile:'',
      elevations:10,
    }
   this.login = this.login.bind(this);

  }


  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


  updateInfo() {
      this.setState({
        valid: this.phone.isValidNumber(),
        type: this.phone.getCountryCode(),
        value: this.phone.getValue()
      });
    }

  login=()=>{
//  alert(this.phone.getValue() + ' adsdasds ' + this.phone.getCountryCode())
//        this.props.navigation.replace('Otp', {params:'LoginOtp'})

      var genOtp = randomString({
          length: 6,
          numeric: true,
          letters: false,
          special: false,
      });

    if(this.phone.isValidNumber()){
      this.showLoading()
    const countryCode = this.phone.getCountryCode()
    let phoneNumber = this.phone.getValue()
    phoneNumber = phoneNumber.replace('+','')
    phoneNumber = phoneNumber.replace(countryCode, '')

    GLOBAL.loginmobile= phoneNumber
    GLOBAL.loginOTP = genOtp
    GLOBAL.loginCtryCode = this.phone.getCountryCode()

      const url = GLOBAL.BASE_URL +  'otp_for_login'
    //  this.showLoading()
    
    console.log(JSON.stringify({
    mobile: phoneNumber,
    otp: genOtp,
    country_code: this.phone.getCountryCode()

  }))
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobile: phoneNumber,
    otp: genOtp,
    country_code: this.phone.getCountryCode()

  }),
}).then((response) => response.json())
    .then((responseJson) => {

        console.log(JSON.stringify(responseJson))
         this.hideLoading()
       if (responseJson.status == true) {

//      this.setState({ results: responseJson.user_detail })
        this.props.navigation.navigate('Otp', {params:'LoginOtp'})
       }
       else{
        alert('It seems you are not registered with us. Please signup to continue.')
       }
    })
    .catch((error) => {
      this.hideLoading()
      console.error(error);

    });


    }else{

      alert('Invalid Mobile Number')
    }

  }

  componentDidMount(){




  }


  _handlePress=()=>{
    if(this.state.mobiles == this.state.mobile){
      alert('An OTP has been sent to your registered mobile number!')
      this.props.navigation.navigate('Otp')      
    }else{
      alert('It seems you are not registered with us!')
    }
  }



  _handleSkip = ()=>{
//    alert('skip')
      GLOBAL.user_id =  '0'
      this.props.navigation.replace('DrawerNavigator')
  }

  onPressFlag(){
    alert("Enter mobile number starting with + followed by country code")
    // this.countryPicker.openModal();
  }


  render() {

    if(this.state.loading){
      return(
        <View style={{flex: 1, backgroundColor:'transparent'}}>
        <BarIndicator count= {5}
         size={40} color="#E60000" />
        </View>
      )
    }

    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
    >

{/*    <Button
        containerStyle = {{position:'absolute', right:wp(10), top:hp(18), }}
        style={{fontSize: 18, color: '#909090', fontFamily:'Nunito-SemiBold'}}
        styleDisabled={{color: 'black'}}
        onPress={() => this._handleSkip()}>
        SKIP
      </Button>
*/}

         <View style={{flexDirection:'column',alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('0%'),}}>


         <Image style = {{width:wp('50%'), height:hp('50%'), resizeMode:'contain', marginTop:hp('-8%'), alignSelf:'center'}} source={require('./resources/kundli_logo.png')}/>
          <Text style = {{width:wp('70%'),color:'black',fontSize: 32,fontFamily:'Nunito-Bold',textAlign:'left',marginTop:hp('-11%'), marginLeft:wp('8%'), lineHeight:45}}>
          Login into your account</Text>

          <Text style = {{width:wp('75%'),color:'#909090',fontSize: 18,fontFamily:'Nunito-Regular',textAlign:'left', marginLeft:wp('8%'),marginTop:wp('2%')}}>
          Enter your mobile number to {'\n'}continue
          </Text>


          <View style = {{flexDirection:'row',marginTop:hp('7%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
        
        <PhoneInput style={{width:wp('78%'), height:hp('7%'), color:'#909090',marginLeft:wp('2%')}}
          ref={ref => {
            this.phone = ref;
          }}
          offset={20}
          initialCountry={'in'}
          onPressFlag={this.onPressFlag}
          textProps={{placeholder: '+91'}}
          textStyle = {{ fontSize:18, fontFamily:'Nunito-Regular',}}
//          onChangePhoneNumber={(text)=> {this.setState({mobile: text.replace(/[^0-9]/g, '')})}}

        />


          </View>

          <Text style = {{width:wp('83%'),color:'grey',fontSize: 14,fontFamily:'Nunito-SemiBoldItalic'
          ,textAlign:'left',marginTop:hp('2%'), marginLeft:wp('8%'), lineHeight:17,}}>
          * for NRI users please type '+' followed by your country code and then mobile number for eg: USA user +1xxxxxx
          </Text>

{/*        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref;
          }}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}
      />
*/}

          <TouchableOpacity style={{width:wp('82%'),borderRadius:5, marginTop:hp('4.5%'),
           backgroundColor:'#E60000',height:hp('7%'),alignSelf:'center', marginRight:wp('2%')}}
           onPress={this.login}>
          
          <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'Nunito-ExtraBold',
          alignSelf:'center'}}>
          Login
          </Text>
          </View>
          
          </TouchableOpacity>


         </View>

        <TouchableOpacity style={{width:wp('100%'),alignSelf:'center', alignItems:'center',marginTop:hp('6%'), marginBottom:hp(2)}}
        onPress={()=> this.props.navigation.navigate('Signup')}>
        <View style={{width:wp('100%'),  alignSelf:'center', alignItems:'center',}}>
        <Text style = {{width:wp('90%'),color:'black',fontSize: 18,textAlign:'center',fontFamily:'Nunito-Regular',}}>
        Don't have an account?
        <Text style = {{width:wp('90%'),color:'#E60000',fontSize: 18,textAlign:'center',fontFamily:'Nunito-Regular', textDecorationLine:'underline'}}>
         {' '}Sign up        
        </Text>
        </Text>
        </View>
        </TouchableOpacity>


         </View>


         </KeyboardAwareScrollView>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
