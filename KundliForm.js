import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Svg ,{SvgXml}  from 'react-native-svg';

type Props = {};
var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
 ];

export default class KundliForm extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: GLOBAL.userDetails.name,
            date:'',
            time:'',
            value:0,
        }
    }

    _keyExtractor = (item, index) => item.productID;



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
        console.log(this.props.navigation.state.params)

    }


    _handleStateChange= state=>{
        this.setState({pob : GLOBAL.glLocationName})      
    }

    getReviews= () =>{

    }





selectedFirst=(item,indexs)=>{
    this.props.navigation.navigate('ProductListIn')
}


setDate=(date)=>{
    this.setState({date: date})
    var d =  new Date(date);  // i assume your date as 01-11-1933
    GLOBAL.gldate = d.getDate(); // 11
    GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    GLOBAL.glyear =  d.getFullYear(); // 1933

}

setTime=(time)=>{
  this.setState({time: time})
  var times = new Date('1970-01-01T' + time + 'Z')
  console.warn(times)
  var dis = times.toLocaleTimeString();
  GLOBAL.glhour = times.getUTCHours();
  GLOBAL.glminute = times.getUTCMinutes();

}

buttonClickListener=()=>{
  console.warn(this.state.time)
  // var d =  new Date(this.state.date);  // i assume your date as 01-11-1933
  //   GLOBAL.gldate = d.getDate(); // 11
  //   GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
  //   GLOBAL.glyear =  d.getFullYear(); // 1933


  // var times = new Date('1970-01-01T' + this.state.time + 'Z')
  // console.warn(times)
  // var dis = times.toLocaleTimeString();
  // GLOBAL.glhour = times.getUTCHours();
  // GLOBAL.glminute = times.getUTCMinutes();

//  alert(GLOBAL.glhour + ': '+GLOBAL.glminute)
  GLOBAL.glzone ="5.5"

  var gender

  //
  if(this.state.value == 0){
    gender = 'Male'
  }else{
    gender = 'Female'
  }
//  alert(gender)
   GLOBAL.glgender = gender

  var navigation = this.props.navigation.state.params

  if(navigation.astroReportType == 'kundli'){
      this.props.navigation.navigate('KundliList')    
  }else if(navigation.astroReportType == 'medical_astro'){
        this.props.navigation.navigate('MedicalAstrology')
  }else if(navigation.astroReportType == 'lal_kitab'){
        this.props.navigation.navigate('LalKitab')
  }else if(navigation.astroReportType == 'sade_sati'){
       this.props.navigation.navigate('SadeSati')
  }else if(navigation.astroReportType == 'gemstone_sugges'){
       this.props.navigation.navigate('GemstoneSuggestion')
  }else if(navigation.astroReportType == 'chaughadive'){
       this.props.navigation.navigate('Chaughadive')
  }else if(navigation.astroReportType == 'year_pred'){
       this.props.navigation.navigate('YearlyPrediction')
  }else if(navigation.astroReportType == 'kp_system'){
       this.props.navigation.navigate('KpSystem')
  }




        // const url = GLOBAL.ASTRO_API_BASE_URL

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },


        //     body: JSON.stringify({
        //     "user_id":"10",
        //     "lang":"hi",
        //     "date":"10",
        //     "month":"05",
        //     "year":"2019",
        //     "hour":"19",
        //     "minute":"10",
        //     "latitude":"19.2056",
        //     "longitude":"25.2056",
        //     "timezone":"5.5",
        //     "api-condition":"basic_detail"
        //     }),
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //        alert(JSON.stringify(responseJson))
        //         if (responseJson.status == true) {

        //          this.props.navigation.navigate('KundliList')

        //         }else{

        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.hideLoading()
        //     });

 // var url = 
  // var a = "Basic " + btoa('606042'+":"+'10467f59d08e413501925cd9cb73f191');
//  var encr = GLOBAL.ASTRO_APIS_PACKAGE + btoa(GLOBAL.ASTRO_APIS_USERID + ":"+ GLOBAL.ASTRO_APIS_API_KEY)


//   var data = {
// "lang":"hi",
// "date":"10",
// "month":"05",
// "year":"2019",
// "hour":"19",
// "minute":"10",
// "latitude":"19.2056",
// "longitude":"25.2056",
// "timezone":"5.5",
// "api-condition":"basic_detail"
//   };

//   fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body:{
//     "user_id":"10",
//     "lang":"hi",
//     "date":"10",
//     "month":"05",
//     "year":"2019",
//     "hour":"19",
//     "minute":"10",
//     "latitude":"19.2056",
//     "longitude":"25.2056",
//     "timezone":"5.5",
//     "api-condition":"basic_detail"
//   },
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     alert(JSON.stringify(responseJson))
//     // GLOBAL.response = responseJson
//     // this.props.navigation.navigate('KundliForm')
//     // console.log('response object:',responseJson)
//   })
//   .catch((error) => {
//   console.error(error);
//   });    

}
    render() {
      var yeah = GLOBAL.response
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}
                                       size={50} color="#E9128B" />
                </View>
            )
        }
        // alert(GLOBAL.response.svg)
        // const xml = `${GLOBAL.response.svg}`;

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'KUNDLI FORM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


{/*      <SvgXml xml={xml} width="100%" height="100%" /> */}
          <KeyboardAwareScrollView>

          <View style={{width:wp(92),alignSelf:'center', marginTop:hp(2),backgroundColor:'transparent',flex:1}}>
         

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Name"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={true}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.name}
              onChangeText={(text) => this.setState({name:text})}
          />

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Date of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.date}
            mode="date"
            showIcon={false}
            placeholder={this.state.dob}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -102, borderWidth:0, color:'black'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:17
              }                            
            }}
            onDateChange={(date) => {
              this.setDate(date)
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Time of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            showIcon={false}
            is24Hour ={true}
            placeholder={this.state.time}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -150, borderWidth:0, color:'black'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:17
              }                            
            }}
            onDateChange={(time) => {
              this.setTime(time)
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('SelectPlace', {params:{previous_screen:'KundliForm'}})}>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Place of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.pob}
              onChangeText={(text) => this.setState({pob:text})}
          />

          </TouchableOpacity>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Gender</Text>
           <View style={{marginTop:hp(2)}}>
            <RadioForm
                radio_props={radio_props}
                initial={this.state.value}
                buttonSize={10}
                buttonColor={'#E60000'}
                formHorizontal={true}
                buttonOuterColor = {'#E60000'}
                selectedButtonColor = {'#E60000'}
                animation={false}
                labelColor={'grey'}
                buttonStyle={{marginTop:20}}
                buttonWrapStyle={{marginTop:20}}
                labelStyle = {{fontSize:16,fontFamily:'Nunito-Regular',paddingLeft:10, paddingRight:10,color:'grey'}}
                onPress={(value) => {this.setState({value:value})}}
            />
          </View>

          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1),marginBottom: hp(2) ,}}/>


{/*          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Country</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Country"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {'India'}
              onChangeText={(text) => this.setState({cuuntry:text})}
          />
*/}

            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(5)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            >
            SUBMIT
            </Button>

          </View>

          </KeyboardAwareScrollView>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

