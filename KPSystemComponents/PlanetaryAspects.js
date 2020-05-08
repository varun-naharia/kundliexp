import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class PlanetaryAspects extends Component{

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
    this.getPlanetaryAspects()
  }

  componentWillReceiveProps(){
    this.getPlanetaryAspects()
  }

  getPlanetaryAspects=()=>{
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
            "api-condition":"kp_house_significator",
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



  render(){

    var first = this.state.response.map((item, index) =>{

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
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>Planetary Aspects</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Aspects on KP uses both Indian Drishti as well as Western Astrology aspects.
    Here, Western aspects are displaced based on degrees and aspect names.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Type</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'22%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'18%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(0.5)}}>Orb</Text>

    </View>


    </ScrollView>
    </View>
  )   
  }
 
}
