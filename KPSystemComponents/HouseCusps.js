import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class HouseCusps extends Component{

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
   this.getHouseCusps()
  }

  componentWillReceiveProps(){
    this.getHouseCusps()
  }

  getHouseCusps=()=>{
//    this.showLoading()
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
            "api-condition":"kp_house_cusps",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//           console.log(JSON.stringify(responseJson))
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

    var first = this.state.response.map((item, index) =>{
    var getDegree = this.degreeMinSec(item.cusp_full_degree.toString())

    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    return(
    <View style={{flexDirection:'row', width:'100%'}}
    key={index}>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Bold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(1.5), textAlign:'left'}}>{item.house_id}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'30%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{item.sign}{`\n`}{getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{item.sign_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{item.nakshatra_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{item.sub_lord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'8%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{item.sub_sub_lord.slice(0,2)}</Text>
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
    <View style={{width: wp(92), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>KP House Cusps</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    The point at which two houses meet is called a Cusp. Starting point of a house is called the cusp of that
    house. The planet that owns the sign that falling on the cusp of a house is called the owner or the lord
    of the house. Placidus house system is used.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'18%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>House</Text>
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
