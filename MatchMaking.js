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
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';

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
        var decTitle=''      
        navigation.state.params.matchReportType=='horo_match'? decTitle = 'HOROSCOPE MATCHING': decTitle ='MATCH MAKING'

        this.state = {
            name:'',
            names:'',
            pob:'',
            date: new Date(),
            time: moment().format("HH:mm"),
            dateN:'',
            dates: new Date(),
            dateNe:'',
            times: moment().format("HH:mm"),
            is_sel: 0,
            is_sels: 0,
            decTitle: decTitle
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

         // this.setDateTime()
    }

  setDateTime = () => {
    this.setState({
      date : GLOBAL.gldate +'-'+GLOBAL.glmonth+'-'+GLOBAL.glyear,
      dates : GLOBAL.gldate +'-'+GLOBAL.glmonth+'-'+GLOBAL.glyear,
      time: GLOBAL.glhour+':'+GLOBAL.glminute,
      times: GLOBAL.glhour+':'+GLOBAL.glminute
     })

  };



    buttonClickListener=()=>{
      // console.log(this.props.navigation.state.params)

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

    if(this.state.name==''){
      alert('Please enter Boy Name')
    }else if(this.state.is_sel==0){
      alert('Please select Boy Place of Birth')
    }else if(this.state.names==''){
      alert('Please enter Girl Name')
    }else if(this.state.is_sels==0){
      alert('Please select Girl Place of Birth')
    }else{

      if(this.props.navigation.state.params.matchReportType == 'horo_match'){
        const url = GLOBAL.ASTRO_API_BASE_URL

        console.log(JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
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
            }))

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
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
      else{
        var matchData={
          "boy_name": this.state.name,
          "girl_name": this.state.names,
          "m_date" : mDate,
          "m_month" : mMon,
          "m_year" : mYear,
          "m_hour" : mHour,
          "m_minute" : mMin,
          "m_latitude" : this.state.m_lat,
          "m_longitude" : this.state.m_lon,
          "m_timezone" : GLOBAL.glzone,          

          "f_date" : fDate,
          "f_month" : fMon,
          "f_year" : fYear,
          "f_hour" : fHour,
          "f_minute" : fMin,
          "f_latitude" : this.state.f_lat,
          "f_longitude" : this.state.f_lon,
          "f_timezone" : GLOBAL.glzone
        }
           this.props.navigation.navigate('MatchMakingExtra', { wholeMatchData: matchData })
      }

    }

    }


    returnDataMale(lat, lon, name) {
      console.log('Male--> lat'+lat+'lon'+lon )
      this.setState({m_lat: lat, m_lon: lon, pob: name, is_sel: 1});
    }

    returnDataFeMale(lat, lon, name) {
      console.log('FeMale--> lat'+lat+'lon'+lon )
      this.setState({f_lat: lat, f_lon: lon, pobs: name, is_sels: 1});
    }

    setDate=(getDate)=>{
      this.setState({ date : getDate,
        // dates : moment(getDate).format('DD-MM-YYYY')
       }) 
      console.log(getDate)
    }

    setDates=(getDate)=>{
      this.setState({ dates : getDate,
        // dates : moment(getDate).format('DD-MM-YYYY')
       }) 
      console.log(getDate)
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
                       headerName={this.state.decTitle}
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

          <TouchableOpacity 
          onPress={()=> this.dialogComponents.show()}>
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Date of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.dateN}
          />
          </TouchableOpacity>


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

          <TouchableOpacity 
          onPress={()=> this.dialogComponentsn.show()}>
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Date of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.dateNe}
          />
          </TouchableOpacity>



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
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(6), marginBottom:hp(3)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            >
            SUBMIT
            </Button>

        </KeyboardAwareScrollView>

           <DialogComponent
                dialogStyle = {{backgroundColor:'white', marginTop:hp(-13)}}
                dismissOnTouchOutside={true}
                dismissOnHardwareBackPress={true}
                width={wp(82)}
                height={hp(34)}
                ref={(dialogComponents) => { this.dialogComponents = dialogComponents; }}>

              <DialogContent>

            <View style={{flexDirection:'column', width:wp(82),alignSelf:'center',alignItems:'center',justifyContent:'center'
            ,backgroundColor:'white', height:hp(34),borderRadius:5, marginTop:hp(-2) }}>

              <DatePickers
                  date={this.state.date}
                  onDateChange={(date) => this.setDate(date)}
                  mode={'date'}
                  locale={'en'}
                />
            <View style={{width:'80%', flexDirection:'row', alignSelf:'center', marginTop:0, justifyContent:'space-between'}}>
            <DialogButton text="Cancel" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60,  }}
            onPress={()=>{this.dialogComponents.dismiss()
              if(this.state.dateN!=''){

              }else{
                this.setState({dateN:''})
              }

            }}/>

            <DialogButton text="Confirm" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60, }}
            onPress={()=>{
              if(this.state.date == ''){
                this.setState({ dateN: moment().format('DD-MM-YYYY') })
                this.dialogComponents.dismiss()                
              }else{
                this.setState({ dateN: moment(this.state.date).format('DD-MM-YYYY'),

              })
                this.dialogComponents.dismiss()

              }

            }}/>
            </View>
            </View>

            </DialogContent>
            </DialogComponent>



           <DialogComponent
                dialogStyle = {{backgroundColor:'white', marginTop:hp(-13)}}
                dismissOnTouchOutside={true}
                dismissOnHardwareBackPress={true}
                width={wp(82)}
                height={hp(34)}
                ref={(dialogComponentsn) => { this.dialogComponentsn = dialogComponentsn; }}>

              <DialogContent>

            <View style={{flexDirection:'column', width:wp(82),alignSelf:'center',alignItems:'center',justifyContent:'center'
            ,backgroundColor:'white', height:hp(34),borderRadius:5, marginTop:hp(-2) }}>

              <DatePickers
                  date={this.state.dates}
                  onDateChange={(date) => this.setDates(date)}
                  mode={'date'}
                  locale={'en'}
                />
            <View style={{width:'80%', flexDirection:'row', alignSelf:'center', marginTop:0, justifyContent:'space-between'}}>
            <DialogButton text="Cancel" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60,  }}
            onPress={()=>{this.dialogComponentsn.dismiss()
              if(this.state.dateNe!=''){

              }else{
                this.setState({dateNe:''})
              }

            }}/>

            <DialogButton text="Confirm" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60, }}
            onPress={()=>{
              if(this.state.dates == ''){
                this.setState({ dateNe: moment().format('DD-MM-YYYY') })
                this.dialogComponentsn.dismiss()                
              }else{
                this.setState({ dateNe: moment(this.state.dates).format('DD-MM-YYYY'),

              })
                this.dialogComponentsn.dismiss()

              }

            }}/>
            </View>
            </View>

            </DialogContent>

            </DialogComponent>

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