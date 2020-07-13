import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Container,
  Linking,
  TextInput,
  Dimensions,
} from 'react-native';
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import IndicatorCustom from './IndicatorCustom.js';
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';

type Props = {};
class HoroscopeMatching extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      name:'',
      names:'',
      pob:'',
      date: new Date(),
      dateN: '',
      time: moment().format("HH:mm"),
      dates: new Date(),
      dateNe: '',
      times: moment().format("HH:mm"),
      is_sel: 0,
      is_sels: 0,
    };
  }

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    this.setState({loading: false});
  }

  componentDidMount() {
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

  returnDataMale(lat, lon, name) {
    console.log('Male--> lat' + lat + 'lon' + lon);
    this.setState({m_lat: lat, m_lon: lon, pob: name, is_sel: 1});
  }

  returnDataFeMale(lat, lon, name) {
    console.log('FeMale--> lat' + lat + 'lon' + lon);
    this.setState({f_lat: lat, f_lon: lon, pobs: name, is_sels: 1});
  }

  buttonClickListener = () => {
    if(this.state.name==''){
      alert('Please enter Boy Name')
    }else if(this.state.is_sel==0){
      alert('Please select Boy Place of Birth')
    }else if(this.state.names==''){
      alert('Please enter Girl Name')
    }else if(this.state.is_sels==0){
      alert('Please select Girl Place of Birth')
    }else{
    var finalData = {
      boy_name: this.state.name,
      boy_dob: this.state.dateN,
      boy_tob: this.state.time,
      boy_pob: this.state.pob,
      boy_country: '',
      boy_lat: this.state.m_lat,
      boy_long: this.state.m_lon,
      boy_lat_long_address: this.state.pob,

      girl_name: this.state.names,
      girl_dob: this.state.dateNe,
      girl_tob: this.state.times,
      girl_pob: this.state.pobs,
      girl_country: '',
      girl_lat: this.state.f_lat,
      girl_long: this.state.f_lon,
      girl_lat_long_address: this.state.pobs


    };

    console.log(JSON.stringify(finalData))
    this.props.navigation.navigate('Payment', {
      params: {previous_screen: 'horo_matching', finalData},
    });

    }
  };


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
    if (this.state.loading) {
      return <IndicatorCustom />;
    }
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Header
          navigation={this.props.navigation}
          showHeaderImage={false}
          headerColor={'#E60000'}
          backImagePath={require('./resources/back.png')}
          headerName={'HOROSCOPE MATCHING'}
          headerTextStyle={{
            fontFamily: 'Nunito-SemiBold',
            color: 'white',
            marginLeft: 10,
          }}
        />

        <KeyboardAwareScrollView>
          <View
            style={{
              width: wp('100%'),
              backgroundColor: 'white',
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: hp(4),
                backgroundColor: '#00000040',
                paddingLeft: 15,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'black',
                }}>
                Boy Details
              </Text>
            </View>

            <View
              style={{
                width: wp('93%'),
                backgroundColor: 'white',
                flexDirection: 'column',
                alignSelf: 'center',
                marginTop: hp(2),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                }}>
                Name
              </Text>

              <TextInput
                style={{
                  height: hp(6),
                  borderColor: '#f3f3f4',
                  fontSize: 17,
                  paddingLeft: -0.5,
                  borderBottomWidth: 1,
                  marginTop: 0,
                  marginBottom: hp(2),
                  width: '99%',
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Enter Name"
                placeholderTextColor="black"
                maxLength={35}
                editable={true}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                value={this.state.name}
                onChangeText={text => this.setState({name: text})}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Date of Birth
              </Text>

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

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Time of Birth
              </Text>

              <DatePicker
                style={{width: 200}}
                date={this.state.time}
                mode="time"
                showIcon={false}
                placeholder={this.state.time}
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    marginLeft: -150,
                    borderWidth: 0,
                    color: 'black',
                  },
                  dateText: {
                    fontFamily: 'Nunito-Regular',
                    fontSize: 17,
                  },
                }}
                onDateChange={time => {
                  this.setState({time: time});
                }}
              />
              <View
                style={{
                  width: wp(92),
                  height: hp(0.15),
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  alignSelf: 'center',
                  marginTop: hp(0.4),
                  marginBottom: hp(2),
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Place of Birth
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SelectPlace', {
                    params: {
                      previous_screen: 'male_horo_match',
                      returnDataMale: this.returnDataMale.bind(this),
                    },
                  });
                }}>
                <TextInput
                  style={{
                    height: hp(6),
                    borderColor: '#f3f3f4',
                    fontSize: 17,
                    paddingLeft: 0,
                    borderBottomWidth: 1,
                    marginTop: 0,
                    marginBottom: hp(2),
                    width: wp(92),
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                  }}
                  // Adding hint in TextInput using Placeholder option.
                  placeholder="Select Place of Birth"
                  placeholderTextColor="grey"
                  maxLength={35}
                  editable={false}
                  // Making the Under line Transparent.
                  underlineColorAndroid="transparent"
                  value={this.state.pob}
                  onChangeText={text => this.setState({pob: text})}
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

            <View
              style={{
                width: '100%',
                height: hp(4),
                backgroundColor: '#00000040',
                paddingLeft: 15,
                paddingTop: 5,
                marginTop: hp(2),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'black',
                }}>
                Girl Details
              </Text>
            </View>

            <View
              style={{
                width: wp('93%'),
                backgroundColor: 'white',
                flexDirection: 'column',
                alignSelf: 'center',
                marginTop: hp(2),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                }}>
                Name
              </Text>

              <TextInput
                style={{
                  height: hp(6),
                  borderColor: '#f3f3f4',
                  fontSize: 17,
                  paddingLeft: -0.5,
                  borderBottomWidth: 1,
                  marginTop: 0,
                  marginBottom: hp(2),
                  width: '99%',
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Enter Name"
                placeholderTextColor="black"
                maxLength={35}
                editable={true}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                value={this.state.names}
                onChangeText={text => this.setState({names: text})}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Date of Birth
              </Text>


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

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Time of Birth
              </Text>

              <DatePicker
                style={{width: 200}}
                date={this.state.times}
                mode="time"
                showIcon={false}
                placeholder={this.state.times}
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    marginLeft: -150,
                    borderWidth: 0,
                    color: 'black',
                  },
                  dateText: {
                    fontFamily: 'Nunito-Regular',
                    fontSize: 17,
                  },
                }}
                onDateChange={time => {
                  this.setState({times: time});
                }}
              />
              <View
                style={{
                  width: wp(92),
                  height: hp(0.15),
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  alignSelf: 'center',
                  marginTop: hp(0.4),
                  marginBottom: hp(2),
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-SemiBold',
                  color: 'lightgrey',
                  marginTop: hp(1),
                }}>
                Place of Birth
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SelectPlace', {
                    params: {
                      previous_screen: 'female_horo_match',
                      returnDataFeMale: this.returnDataFeMale.bind(this),
                    },
                  });
                }}>
                <TextInput
                  style={{
                    height: hp(6),
                    borderColor: '#f3f3f4',
                    fontSize: 17,
                    paddingLeft: 0,
                    borderBottomWidth: 1,
                    marginTop: 0,
                    marginBottom: hp(2),
                    width: wp(92),
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                  }}
                  // Adding hint in TextInput using Placeholder option.
                  placeholder="Select Place of Birth"
                  placeholderTextColor="grey"
                  maxLength={35}
                  editable={false}
                  // Making the Under line Transparent.
                  underlineColorAndroid="transparent"
                  value={this.state.pobs}
                  onChangeText={text => this.setState({pobs: text})}
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
            containerStyle={{
              width: wp('70%'),
              padding: 16,
              height: hp(7.5),
              overflow: 'hidden',
              borderRadius: 40,
              backgroundColor: '#e60000',
              elevation: 5,
              alignSelf: 'center',
              marginTop: hp(8),
              marginBottom: hp(3),
            }}
            style={{
              fontSize: 18,
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'Nunito-Bold',
            }}
            onPress={this.buttonClickListener}>
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
    flexDirection: 'column',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HoroscopeMatching;
