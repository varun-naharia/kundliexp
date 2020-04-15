import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom.js';
type Props = {};
export default class BasicDetailsNew extends Component<Props> {

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
            response_panchang:'',
            tithi:'',
            nakshatra:'',
            yog:'',
            karan:'',
            amanta:'',
            purnimanta:'',
            vikram:'',
            shaka:''
        }
    }





    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

    componentWillReceiveProps(){
      this.getBasicDetails()
      this.getPanchangDetails()
    }

    componentDidMount(){
     this.getBasicDetails()
     this.getPanchangDetails()
    }

    getPanchangDetails= () =>{
      this.showLoading()
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
//              console.log(JSON.stringify(responseJson))
              this.hideLoading()
                if (responseJson.status == true) {
              this.setState({response_panchang: responseJson,
              tithi: responseJson.tithi.details.tithi_name,
              nakshatra: responseJson.nakshatra.details.nak_name,
              yog: responseJson.yog.details.yog_name,
              karan: responseJson.karan.details.karan_name,
              amanta: responseJson.hindu_maah.amanta,
              purnimanta: responseJson.hindu_maah.purnimanta,
              vikram: responseJson.vkram_samvat_name,
              shaka: responseJson.shaka_samvat_name
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


    getBasicDetails= () =>{
 //     this.showLoading()
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
            "api-condition":"basic_detail"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson))
               // this.hideLoading()
                if (responseJson.status == true) {
              this.setState({response: responseJson },() => {
                  //    alert('gdsd'+JSON.stringify(this.state.response));
                  });                
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
   //             this.hideLoading()
            });

    }

    render() {
      var yeah = this.state.response
      var yeah_panchang = this.state.response_panchang

        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (


    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>What is KP?</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    KP or Krishnamurti Paddhati is an excellent system of astrological predictions, conceived and
    created by the great Indian astrology master late Prof. K.S. Krishnamurti. KP System is based on
    finer points of Indian and Western astrology and borrows important concepts from many branches of
    astrology.
    </Text>
    
    </View>

    <DataFields
    title={'Name'}
    value={GLOBAL.userDetails.name}/>

    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Birth Date'}
    value={yeah.day+'/'+yeah.month+'/'+yeah.year}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Birth Time'}
    value={yeah.hour+':'+yeah.minute}/>
    </View>

    <DataFields
    title={'Birth Place'}
    value={GLOBAL.glLocationName}/>


    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'33%'}}
    title={'Latitude'}
    value={yeah.latitude}/>

    <DataFields giveStyle={{width:'33%'}}
    title={'Longitude'}
    value={yeah.longitude}/>

    <DataFields giveStyle={{width:'33%'}}
    title={'TimeZone'}
    value={yeah.timezone}/>
    </View>



    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center',marginTop:hp(2), flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:18, color:'white', marginLeft:wp(3.5), textAlign:'left'}}>Panchang at Birth</Text>
    </View>

    <DataFields
    title={'Tithi'}
    value={this.state.tithi}/>

    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Day'}
    value={yeah_panchang.day}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Nakshatra'}
    value={this.state.nakshatra}/>
    </View>


    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Karan'}
    value={this.state.karan}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Yog'}
    value={this.state.yog}/>
    </View>

    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Sunrise'}
    value={yeah.sunrise}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Sunset'}
    value={yeah.sunset}/>
    </View>

    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Amanta'}
    value={this.state.amanta}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Purnimanta'}
    value={this.state.purnimanta}/>
    </View>

    <View style={{flexDirection:'row', width:'100%'}}>
    <DataFields giveStyle={{width:'50%'}}
    title={'Vikram'}
    value={this.state.vikram}/>

    <DataFields giveStyle={{width:'50%'}}
    title={'Skak'}
    value={this.state.shaka}/>
    </View>

    </ScrollView>
    </View>



        );
    }
}

class DataFields extends Component{
  render(){
    return(
      <View style={[{backgroundColor:'transparent', width:'100%', flexDirection:'column', borderColor:'#bfbfbf'
      , borderWidth:0.5}
      ,...[this.props.giveStyle]]}>
    <Text style={{fontSize:15, color:'#595959',marginLeft:10,marginTop:10,
     fontFamily:'Nunito-Regular'}}>{this.props.title}</Text>   
    <Text style={{fontFamily:'Nunito-SemiBold', fontSize:17,marginLeft:10,marginTop:3, marginBottom:5}}>
    {this.props.value}</Text>

      </View>

      )
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
