import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class PlanetNature extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            good:[],
            bad:[],
            killer:[],
            yogakaraka:[]

        }
    }

  componentDidMount(){
//    console.warn(moment().format('YYYY'))
    this.getDetails()
  }

  getDetails=()=>{
     // console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
     //       "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": sel_year})
 //     this.showLoading()
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"planet_nature",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  good: responseJson.responseData.GOOD,
                  bad: responseJson.responseData.BAD,
                  killer: responseJson.responseData.KILLER,
                  yogakaraka: responseJson.responseData.YOGAKARAKA
                },()=>{
//                  alert('zsdd')
                })
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
     //           this.hideLoading()
            });

  }

  render(){
    var good_a, bad_a, killer_a, yogakaraka_a
    this.state.good.length==0 ? good_a = 'No Data' : good_a = this.state.good.toString()
    this.state.bad.length==0 ? bad_a = 'No Data' : bad_a = this.state.bad.toString()
    this.state.killer.length==0 ? killer_a = 'No Data' : killer_a = this.state.killer.toString()
    this.state.yogakaraka.length==0 ? yogakaraka_a = 'No Data' : yogakaraka_a = this.state.yogakaraka.toString()

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center', marginTop:10}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Planet Nature</Text>
    </View>

    <DataColumn
    name={'Good Planets'}
    value={good_a}/>

    <DataColumn
    name={'Bad Planets'}
    value={bad_a}/>
    <DataColumn
    name={'Killer Planets'}
    value={killer_a}/>
    <DataColumn
    name={'Yogakaraka Planets'}
    value={yogakaraka_a}/>


    </ScrollView>
    </View>
  )   
  }
 
}

class DataColumn extends Component{
  render(){
   return(
   <>
    <View style={{width:wp(100), backgroundColor:'white',flexDirection:'row',alignSelf:'center',
      alignItems:'center', marginTop:hp(1) }}>
    <Text style={{fontSize:16, color:'#595959',width:'50%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'45%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
  }
}
