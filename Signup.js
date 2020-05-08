import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import PhoneInput from 'react-native-phone-input'

var randomString = require('random-string');
type Props = {};


export default class Signup extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      elevations:3,
      name:'',
      email:'',
      date:'',
      dob:'Date of Birth',
      tob:'Time of Birth',
      pob:'',
      gender:'',
      refercode:'',
      isverifyrefer: "0",
      applied:'',
    }

     this._handlePressSignup = this._handlePressSignup.bind(this);

  }



  componentDidMount(){

  }




updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getCountryCode(),
      value: this.phone.getValue()
    });
  }


    _handlePressSignup=()=>{
//  alert(this.phone.isValidNumber())
//        this.props.navigation.replace('Otp', {params: 'SignupOtp'})

      var genOtp = randomString({
          length: 6,
          numeric: true,
          letters: false,
          special: false,
      });

      if(this.state.name==''){
        alert('Please enter name')
      }else if(this.state.email == ''){
        alert('Please enter email')
      }else if(this.phone.isValidNumber() ==false){
        alert('Invalid phone number')
      }else{

        const countryCode = this.phone.getCountryCode()
        let phoneNumber = this.phone.getValue()
        phoneNumber = phoneNumber.replace('+','')
        phoneNumber = phoneNumber.replace(countryCode, '')

        GLOBAL.signupName = this.state.name
        GLOBAL.signupEmail = this.state.email
        GLOBAL.signupMobile= phoneNumber
        GLOBAL.signupCountryCode = this.phone.getCountryCode()
        GLOBAL.signupDob = this.state.dob
        GLOBAL.signupTob = this.state.tob
        GLOBAL.signupPob = this.state.pob
        GLOBAL.signupGender = this.state.gender
        GLOBAL.signupReferCode =  this.state.refercode
        GLOBAL.signupOtp = genOtp
        GLOBAL.signupVerifyRefer = this.state.isverifyrefer
        GLOBAL.signupApplyRefer = this.state.applied


          const url = GLOBAL.BASE_URL +  'otp'
        //  this.showLoading()
          fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        mobile: this.phone.getValue(),
        otp: genOtp,
        country_code: this.phone.getCountryCode()

      }),
    }).then((response) => response.json())
        .then((responseJson) => {

            console.log(JSON.stringify(responseJson))
      //       this.hideLoading()
           if (responseJson.status == true) {
            alert('OTP sent to your entered mobile number.')
    //      this.setState({ results: responseJson.user_detail })
            this.props.navigation.replace('Otp', {params: 'SignupOtp'})
           }
           else{
            alert('This mobile number is already registered with us.')
           }
        })
        .catch((error) => {
          console.error(error);
        });

      }



  }


  verifyReferralCode=()=>{
    if(this.state.email == ''){
      alert('Please enter email')
    }else if(this.phone.isValidNumber() ==false){
      alert('Invalid mobile number')      
    }else if (this.state.refercode == ''){
      alert('Please enter referral code')
    }else{
    const countryCode = this.phone.getCountryCode()
    let phoneNumber = this.phone.getValue()
    phoneNumber = phoneNumber.replace('+','')
    phoneNumber = phoneNumber.replace(countryCode, '')

     const url = GLOBAL.BASE_URL + "verify_referral";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        mobile: phoneNumber,
        referral_code: this.state.refercode,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        //       this.hideLoading()
        if (responseJson.status == true) {
          this.setState({isverifyrefer : '1',
            applied : responseJson.apply_to
        })
  //        GLOBAL.signupVerifyRefer = this.state.isverifyrefer
          alert('Referral code applied successfully!')
        } else {
          this.setState({isverifyrefer : '0'})
//          GLOBAL.signupVerifyRefer = this.state.isverifyrefer

          alert("Invalid referral code");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }
  }



  render() {
    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>


         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('7%'),}}>



          <Text style = {{color:'#262626',fontSize: 28,fontFamily:'Nunito-Bold',textAlign:'center', lineHeight:35, marginLeft:wp(-3)}}>
          Create Your Account</Text>

{/*          <Text style = {{width:wp('75%'),color:'#909090',fontSize: 18,fontFamily:'Nunito-Regular',textAlign:'left', marginLeft:wp('8%'),marginTop:wp('3%')}}>
          Enter your details
          </Text>
*/}
          <View style = {{flexDirection:'row',marginTop:hp('7%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5)}}
                         placeholder = {'Name'}
                         placeholderTextColor = "#909090"
                         onChangeText={(text) => this.setState({name:text})}
                         value={this.state.name}
              />
          </View>

          <View style = {{flexDirection:'row',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5)}}
                         placeholder = {'Email'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         onChangeText={(text) => this.setState({email:text})}
                         value={this.state.email}
              />
          </View>


          <View style = {{flexDirection:'row',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
        <PhoneInput style={{width:wp('75%'), height:hp('7%'), color:'#909090',marginLeft:wp('4%')}}
          ref={ref => {
            this.phone = ref;
          }}
          offset={20}
          initialCountry={'in'}          
          onPressFlag={()=> {}}
          textProps={{placeholder: 'Mobile no.'}}
          textStyle = {{ fontSize:18, fontFamily:'Nunito-Regular',}}
//          onChangePhoneNumber={(text)=> {this.setState({mobile: text.replace(/[^0-9]/g, '')})}}

        />



{/*              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5)}}
                         placeholder = {'Mobile No.'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         keyboardType={'numeric'}
                         maxLength={10}
                         onChangeText={(text) => this.setState({mobile:text.replace(/[^0-9]/g, '')})}
                         value={this.state.mobile}

              />
            */}
          </View>


{/*          <View style = {{flexDirection:'column',marginTop:hp('4%'),justifyContent:'center',width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
          <DatePicker
            style={{width: 200,}}
            date={this.state.date}
            mode="date"
            showIcon={false}
            placeholder={this.state.dob}
            format="DD-MM-YYYY"
            minDate="01-01-1950"
            maxDate= {moment().format('DD-MM-YYYY')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft:-60, borderWidth:0, color:'#909090', alignSelf:'center'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:18, alignSelf:'center',color:'#909090',
              },
              placeholderText:{
                  fontFamily:'Nunito-Regular', fontSize:18, alignSelf:'center',color:'#909090',                
              }                       
            }}
            onDateChange={(date) => {
              this.setState({dob: date})
            }}
          />
          </View>



          <View style = {{flexDirection:'column',justifyContent:'center',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:30, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
          <DatePicker
            style={{width: 200,}}
            date={this.state.time}
            mode="time"
            showIcon={false}
            placeholder={this.state.tob}
            format="hh:mm A"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft:-60, borderWidth:0, color:'#909090', alignSelf:'center'
              },
              dateText:{
                marginLeft:-60, fontFamily:'Nunito-Regular', fontSize:18, alignSelf:'center',color:'#909090',
              },
              placeholderText:{
                marginLeft:-5,  fontFamily:'Nunito-Regular', fontSize:18, alignSelf:'center',color:'#909090',                
              }                                     
            }}
            onDateChange={(time) => {
              this.setState({tob: time})
            }}
          />
          </View>


          <View style = {{flexDirection:'row',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:30, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5)}}
                         placeholder = {'Place of Birth'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         onChangeText={(text) => this.setState({pob:text})}
                         value={this.state.pob}
              />
          </View>


          <View style = {{flexDirection:'column',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:30, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
        <RNPickerSelect style = {{width:wp('75%'),color:'#909090', height:hp('7%'), marginLeft:30}}
            onValueChange={(value) => {console.log(value);this.setState({gender : value})}}
            placeholder={{
            label: 'Select Gender',
            value: null,
            color: '#909090',
        }}
            items={[
                { label: 'Male', value: 'male', color: '#909090' },
                { label: 'Female', value: 'female', color: '#909090' },
            ]}
            useNativeAndroidPickerStyle={true}
           />

          </View>

        */}

{/*              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5)}}
                         placeholder = {'Select Gender'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         editable={false}
                         onChangeText={(text) => this.setState({pob:text})}
                         value={this.state.pob}
              />
*/}
          <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('60%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(5),}}
                         placeholder = {'Referral Code (if any)'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         editable={true}
                         onChangeText={(text) => this.setState({refercode:text})}
                         value={this.state.refercode}
              />

          <TouchableOpacity onPress={()=> this.verifyReferralCode()}>
          <Text style = {{color:'#E60000',fontSize: 18,fontFamily:'Nunito-Regular',textAlign:'left', marginRight:wp('3%'),marginTop:wp('3%')}}>
          Verify
          </Text>
          </TouchableOpacity>

          </View>



          <TouchableOpacity style={{width:wp('82%'),borderRadius:5, marginTop:hp('5%'),
           backgroundColor:'#E60000',height:hp('7%'),alignSelf:'center',marginRight:wp('2%')}}
           onPress={this._handlePressSignup}>
          
          <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'Nunito-ExtraBold',
          alignSelf:'center'}}>
          Signup
          </Text>
          </View>
          </TouchableOpacity>


         </View>

        <TouchableOpacity style={{width:wp('100%'),alignSelf:'center', alignItems:'center',marginTop:hp('18%'), marginBottom:hp('2%')}}
        onPress={()=> this.props.navigation.navigate('Login')}>
        <View style={{width:wp('100%'),  alignSelf:'center', alignItems:'center',}}>
        <Text style = {{width:wp('90%'),color:'black',fontSize: 18,textAlign:'center',fontFamily:'Nunito-Regular'}}>
        Already have an account? 
        <Text style = {{color:'#E60000',fontSize: 18,textAlign:'center',fontFamily:'Nunito-Regular', textDecorationLine:'underline'}}>
        {' '}Login Now
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
