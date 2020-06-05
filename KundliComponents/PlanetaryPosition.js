import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'


export default class PlanetaryPosition extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getPlanetary()
  }

  // componentWillReceiveProps(){
  //   this.getPlanetary()
  // }

  // componentDidUpdate(prevProps, prevState){
  // console.log(JSON.stringify(this.state))
  //   // if(prevProps.compType =){
  //   //     alert('hi')
  //   // }
  // }

  getPlanetary=()=>{
//    this.showLoading()
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lat_long_address": GLOBAL.glLocationName,            
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"planets",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                  console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,

                },()=>{

                })
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
     //           this.hideLoading()
            });

  }
degreeMinSec=(dec)=>{
        let $vars = dec.split('.');
        if($vars[1] === undefined) {
          $vars[1] = '0';        
        }
        let $deg = $vars[0],
        $tempma = '0.'+$vars[1];
        $tempma = $tempma * 3600; 
        let $min = Math.floor($tempma / 60), 
        $sec =Math.round($tempma - ($min*60));  
//        console.log($vars[1]);
        if($deg < 10)
         $deg = '0'+$deg; 
        if($min < 10) 
         $min = '0'+$min;
        if($sec < 10) 
         $sec = '0'+$sec;
        return {hour:$deg, min: $min,sec:$sec};
    }


  _renderPlanets=({item, index})=>{
    var decRetro=''
    item.isRetro=="false" ? decRetro='' :  decRetro = '(R)'

    var nak_pad=''
    nak_pad = item.nakshatra_pad.toString()

    var is_curr = ''
    item.is_planet_set==false ? is_curr = '' : is_curr = '(C)'

   var getDegree = this.degreeMinSec(item.fullDegree.toString())
    var dec_color, dec_p_color
    if(index==0){
      dec_color = '#fed9e1'
      dec_p_color = '#e91e63'
    }else if(index ==1){
      dec_color = '#fff5d2' 
      dec_p_color = '#4caf50'
    }else if(index ==2){
      dec_color = '#daebff' 
      dec_p_color = '#e91e63'
    }else if(index ==3){
      dec_color = '#ffe2e4' 
      dec_p_color = '#3f51b5'      
    }else if(index ==4){
      dec_color = '#e2fbe5' 
      dec_p_color = '#e91e63'      
    }else if(index ==5){
      dec_color = '#fff5d2' 
      dec_p_color = '#9c27b0'      
    }else if(index ==6){
      dec_color = '#ffe4eb' 
      dec_p_color = '#f44336'      
    }else if(index ==7){
      dec_color = '#e4e1fe' 
      dec_p_color = '#e91e63'      
    }else if(index ==8){
      dec_color = '#f1defe' 
      dec_p_color = '#009688'      
    }else if(index ==9){
      dec_color = '#fcd9e1' 
      dec_p_color = '#673ab7'
    }

    //bgcolor codes 56aef6, fed9e1, fff5d2, daebff, ffe2e4, e2fbe5, fff5d2, ffe4eb, e4e1fe, f1defe
    //planet name color code e91e63, 4caf50, ffeb3b, 3f51b5, 673ab7, 9c27b0, f44336,
    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(9), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color: dec_p_color, marginLeft:wp(1.5), textAlign:'left'}}>{item.name} {decRetro} {is_curr}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginTop:hp(2), marginBottom:hp(2)}}>{item.sign.slice(0,3)}{`\n`}{getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left',}}>{item.nakshatra}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'12%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginRight:wp(1.5)}}>({nak_pad})</Text>
    </View>

      </>
      )
  }

  render(){
    var yeah = this.state
    // var getDegree = this.degreeMinSec(yeah.atma_karaka .degree.toString())

    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Planetary Positions and Details</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Planetary degrees, speed, nakshatra, sign and houses along with awastha are listed at the time of your birth.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(1.5), textAlign:'left'}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Sign/Degree</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>Nak</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'12%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(2.0)}}>Rel</Text>
    </View>

    <FlatList
    data={this.state.response}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />

    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:16,marginTop:5}}>Legends</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:10}}>H - House
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>SL - Sign Lord
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>NL - Nakshatra Lord
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>Nak - Nakshatra
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>NP - Nakshatra Pad
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>PA - Planet Awastha
    </Text>

    </View>


    </ScrollView>
    </View>
  )   
  }
 
}

