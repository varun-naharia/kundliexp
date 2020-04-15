import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class KPPlanets extends Component{

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
   this.getKpPlanets()
  }

  componentWillReceiveProps(){
    this.getKpPlanets()
  }

  getKpPlanets=()=>{
//    this.showLoading()
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
            "api-condition":"kp_planets",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//          console.log('fsdfsf--------'+JSON.stringify(responseJson))
  //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
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


  render(){
//    console.log('render SahamPoints')


    //bgcolor codes 56aef6, fed9e1, fff5d2, daebff, ffe2e4, e2fbe5, fff5d2, ffe4eb, e4e1fe, f1defe
    //planet name color code e91e63, 4caf50, ffeb3b, 3f51b5, 673ab7, 9c27b0, f44336,


    var first = this.state.response.map((item, index) =>{
    var getDegree = this.degreeMinSec(item.degree.toString())

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

    return(
    <View style={{flexDirection:'row', width:'100%', marginTop:5}}
    key={index}>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'18%',backgroundColor:'transparent', fontSize:14, color:dec_p_color, marginLeft:wp(0.5), textAlign:'left'}}>{item.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'30%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left'}}>{item.sign.slice(0,3)} {getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left',}}>{item.sign_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left',}}>{item.nakshatra_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left',}}>{item.sub_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginRight:wp(2.5)}}>{item.sub_sub_lord.slice(0,2)}</Text>
    </View>
    </View>     
    )})


    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>KP Planetary Positions</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Krishnamurty Paddhati planets are calculated based on KP ayanamsha. The sub lord and other details
    are based on your KP Kundli.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'18%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'30%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Degree</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'8%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>SL</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'8%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>NL</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'8%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>SB</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'8%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(2.5)}}>SS</Text>

    </View>

    {first}

    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:16,marginTop:5}}>Legends</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:10}}>SL - Sign Lord
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>NL - Nakshatra Lord
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>SB - Sub Lord
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>SS - Sub Sub Lord
    </Text>
    </View>



    </ScrollView>
    </View>
  )   
  }
 
}
