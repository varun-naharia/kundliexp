import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom.js';

type Props = {};
export default class PanchangDetails extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: '',
            response:'',
            tithi:'',
            tithi_end_time:'',
            nakshatra:'',
            nakshatra_end_time:'',
            yog:'',
            yog_end_time:'',
            karan:'',
            karan_end_time:'',
            hindu_maah:'',
            nak_shool:'',
            abhijit_muhurta:'',
            rahukaal:'',
            guliKaal:'',
            yamghant_kaal:''
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

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

      this.getPanchangDetails()
    }

    getPanchangDetails= () =>{
      this.showLoading()
        console.log({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"advanced_panchang"
            })
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"advanced_panchang"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson))
               this.hideLoading()
                if (responseJson.status == true) {
              this.setState({response: responseJson,
              tithi: responseJson.tithi.details,
              tithi_end_time: responseJson.tithi.end_time,
              nakshatra: responseJson.nakshatra.details,
              nakshatra_end_time: responseJson.nakshatra.end_time,
              yog: responseJson.yog.details,
              yog_end_time: responseJson.yog.end_time,
              karan: responseJson.karan.details,
              karan_end_time: responseJson.karan.end_time,
              hindu_maah: responseJson.hindu_maah,
              nak_shool: responseJson.nak_shool,
              abhijit_muhurta: responseJson.abhijit_muhurta,
              rahukaal: responseJson.rahukaal,
              guliKaal: responseJson.guliKaal,
              yamghant_kaal: responseJson.yamghant_kaal
              })


                }else{
                  alert('Something went wrong! Please try again after sometime.')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    render() {
      var yeah = this.state.response
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'PANCHANG DETAILS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <ScrollView>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Day</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.day}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sunrise</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.sunrise}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sunset</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.sunset}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Moonrise</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.moonrise}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>



          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Moonset</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.moonset}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vedic Sunrise</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.vedic_sunrise}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vedic Sunset</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.vedic_sunset}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Tithi
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Tithi Number
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.tithi.tithi_number}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Tithi Name
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.tithi.tithi_name}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Special
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.tithi.special}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Summary
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.tithi.summary}
          </Text>
        </View>



          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Deity
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.tithi.deity}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Tithi End Time
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.tithi_end_time.hour}:{this.state.tithi_end_time.minute}:{this.state.tithi_end_time.second}
          </Text>
        </View>

        </View>


        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Nakshatra
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Number
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.nakshatra.nak_number}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Name
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.nakshatra.nak_name}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Ruler
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.nakshatra.ruler}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Deity
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.nakshatra.deity}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Special
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.nakshatra.special}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Summary
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.nakshatra.summary}
          </Text>
        </View>





          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Tithi End Time
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.nakshatra_end_time.hour}:{this.state.nakshatra_end_time.minute}:{this.state.nakshatra_end_time.second}
          </Text>
        </View>

        </View>



        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Yog
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Number
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.yog.yog_number}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Name
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.yog.yog_name}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Special
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.yog.special}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Meaning
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.yog.meaning}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Yog End Time
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.yog_end_time.hour}:{this.state.yog_end_time.minute}:{this.state.yog_end_time.second}
          </Text>
        </View>

        </View>



        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Karan
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Number
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.karan.karan_number}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Name
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.karan.karan_name}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Special
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.karan.special}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Deity
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.karan.deity}
          </Text>
        </View>


          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Karan End Time
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', }}>
          {this.state.karan_end_time.hour}:{this.state.karan_end_time.minute}:{this.state.karan_end_time.second}
          </Text>
        </View>

        </View>



        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Hindu Maah
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Adhik Status
          </Text>


          {this.state.hindu_maah.adhik_status == false && (
          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          No
          </Text>
            )}
          {this.state.hindu_maah.adhik_status != false && (
          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Yes
          </Text>
            )}

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Purnimanta
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.hindu_maah.purnimanta}
          </Text>
        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Amanta
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000', width:'75%', textAlign:'right'}}>
          {this.state.hindu_maah.amanta}
          </Text>
        </View>
        </View>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Paksha</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.paksha}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Ritu</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.ritu}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sun Sign</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.sun_sign}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Moon Sign</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.moon_sign}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Ayana</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.ayana}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Panchang Yog</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.panchang_yog}</Text>
          </View>


          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vikram Samvat</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.vikram_samvat}</Text>
          </View>


          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Shaka Samvat</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.shaka_samvat}</Text>
          </View>


          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vkram Samvat Name</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.vkram_samvat_name}</Text>
          </View>


          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Shaka Samvat Name</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.shaka_samvat_name}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Disha Shool</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.disha_shool}</Text>
          </View>


          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Disha Shool Remedies</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.disha_shool_remedies}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Nakshatra Shool
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Directions
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.nak_shool.direction}
          </Text>

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Remedies
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.nak_shool.remedies}
          </Text>
        </View>
        </View>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Moon Nivas</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.moon_nivas}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Abhijit Muhurta
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Start
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.abhijit_muhurta.start}
          </Text>

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          End
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.abhijit_muhurta.end}
          </Text>
        </View>
        </View>


        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Rahukaal
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Start
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.rahukaal.start}
          </Text>

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          End
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.rahukaal.end}
          </Text>
        </View>
        </View>


        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Gulikaal
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Start
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.guliKaal.start}
          </Text>

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          End
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.guliKaal.end}
          </Text>
        </View>
        </View>



        <View   style  = {{width:wp(92), height:'auto',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },alignSelf:'center',
            shadowOpacity: 0.25,borderRadius:8,marginTop:hp(1.5),marginBottom:hp(1),
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:15,marginBottom:0,fontFamily:'Nunito-Regular',color:'#A3B8CB',}}>
          Yamghant Kaal
          </Text>


          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(1)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Start
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.yamghant_kaal.start}
          </Text>

        </View>

          <View style={{width:'100%', height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}/>

          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(0.5)}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          End
          </Text>

          <Text style = {{fontSize:16,marginTop:3,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          {this.state.yamghant_kaal.end}
          </Text>
        </View>
        </View>
          </ScrollView>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },


});

