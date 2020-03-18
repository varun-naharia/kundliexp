import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
import IndicatorCustom from './IndicatorCustom';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

type Props = {};
class MatchMaking extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false,
            b_name:'',
            f_name:'',

        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }

    getReviews= () =>{

    }



    buttonClickListener=()=>{

        var d = new Date(this.state.date)
        var mDate = d.getDate()
        var mMon = d.getMonth() + 1
        var mYear = d.getFullYear()

        console.warn('male->'+'date-'+ mDate +'mon-'+ mMon +'year-'+mYear)

        var fd = new Date(this.state.dates)
        var fDate = fd.getDate()
        var fMon = fd.getMonth() + 1
        var fYear = fd.getFullYear()

        console.warn('female->'+'date-'+ fDate +'mon-'+ fMon +'year-'+fYear)


        var t = new Date('1970-01-01T' + this.state.time + 'Z')
        
        console.log(t)
        var mHour = t.getUTCHours()
        var mMin = t.getUTCMinutes()
        console.warn('mhour '+mHour +'mmin' +mMin)


        var ft = new Date('1970-01-01T' + this.state.times + 'Z')
        
        console.log(ft)
        var fHour = ft.getUTCHours()
        var fMin = ft.getUTCMinutes()
        console.warn('fhour '+fHour +'fmin' +fMin)


        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "b_name": this.state.name,
            "f_name": this.state.names,
            "m_date": mDate,
            "m_month": mMon,
            "m_year": mYear,
            "m_hour": mHour,
            "m_minute": mMin,
            "m_latitude": this.state.m_lat,
            "m_longitude": this.state.m_lon,
            "m_timezone":GLOBAL.glzone,

            "f_date": fDate,
            "f_month": fMon,
            "f_year": fYear,
            "f_hour": fHour,
            "f_minute": fMin,
            "f_latitude": this.state.f_lat,
            "f_longitude": this.state.f_lon,
            "f_timezone":GLOBAL.glzone,

            "api-condition":"match_ashtakoot_points"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {
              // this.setState({response: responseJson },() => {
              //         alert('gdsd'+JSON.stringify(this.state.response));
              //     });                
                 this.props.navigation.navigate('MatchMakingIn' , {matchMakingResponse: responseJson.responseData})
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    returnDataMale(lat, lon, name) {
      console.log('Male--> lat'+lat+'lon'+lon )
      this.setState({m_lat: lat, m_lon: lon, pob: name});
    }

    returnDataFeMale(lat, lon, name) {
      console.log('FeMale--> lat'+lat+'lon'+lon )
      this.setState({f_lat: lat, f_lon: lon, pobs: name});
    }

    render() {
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'MATCH MATCHING'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />



        <KeyboardAwareScrollView>
        <View style={{width:wp('100%'), backgroundColor:'white',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#00000040', paddingLeft:15, paddingTop:5}}>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black'}}>Boy Details</Text>
        </View>

        <View style={{width:wp('93%'),backgroundColor:'white',flexDirection:'column', alignSelf:'center', marginTop:hp(2)}}>
        

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Name"
              placeholderTextColor = 'black'
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
            maxDate= {moment()}
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
              this.setState({date: date})
            }}
          />

          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Time of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.time}
            mode="time"
            showIcon={false}
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
              this.setState({time: time})
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>



          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>
          <TouchableOpacity onPress={()=> {
            this.props.navigation.navigate('SelectPlace' ,{params:{previous_screen: 'MaleMatchMaking',returnDataMale: this.returnDataMale.bind(this)}})}
          }
          >
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Place of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.pob}
              onChangeText={(text) => this.setState({pob:text})}
          />
          </TouchableOpacity>


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
              onChangeText={(text) => this.setState({country:text})}
          />
*/}

          </View>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#00000040', paddingLeft:15, paddingTop:5, marginTop:hp(2)}}>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black'}}>Girl Details</Text>
        </View>

        <View style={{width:wp('93%'),backgroundColor:'white',flexDirection:'column', alignSelf:'center', marginTop:hp(2)}}>


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Name"
              placeholderTextColor = 'black'
              maxLength={35}
              editable={true}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.names}
              onChangeText={(text) => this.setState({names:text})}
          />


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Date of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.dates}
            mode="date"
            showIcon={false}
            placeholder={this.state.dobs}
            maxDate= {moment()}
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
              this.setState({dates: date})
            }}
          />

          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Time of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.times}
            mode="time"
            showIcon={false}
            placeholder={this.state.times}
            format="HH:mm"
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
              this.setState({times: time})
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>



          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>
          <TouchableOpacity onPress={()=> {
            this.props.navigation.navigate('SelectPlace' ,{params:{previous_screen: 'FemaleMatchMaking',returnDataFeMale: this.returnDataFeMale.bind(this)}})}}
        >
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Place of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.pobs}
              onChangeText={(text) => this.setState({pobs:text})}
          />
          </TouchableOpacity>


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
              onChangeText={(text) => this.setState({countrys:text})}
          />
*/}

        </View>


        </View>

            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(3)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            >
            SUBMIT
            </Button>

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

export default MatchMaking;