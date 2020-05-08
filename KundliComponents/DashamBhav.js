import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import LinearGradient from 'react-native-linear-gradient';

export default class DashamBhav extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
            bhav_sandhi:[]
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getDashamBhav()
  }

  // componentWillReceiveProps(){
  //   this.getDashamBhav()
  // }

  // componentDidUpdate(prevProps, prevState){
  // console.log(JSON.stringify(this.state))
  //   // if(prevProps.compType =){
  //   //     alert('hi')
  //   // }
  // }

  getDashamBhav=()=>{
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
            "api-condition":"bhav_madhya",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                   // console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData.bhav_madhya,
                  bhav_sandhi: responseJson.responseData.bhav_sandhi
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
   var getDegree = this.degreeMinSec(item.norm_degree.toString())
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
    }else if(index ==10){
      dec_color = '#e2fbe5' 
      dec_p_color = '#3f51b5'
    }else if(index ==11){
      dec_color = '#daebff' 
      dec_p_color = '#9c27b0'
    }

    //bgcolor codes 56aef6, fed9e1, fff5d2, daebff, ffe2e4, e2fbe5, fff5d2, ffe4eb, e4e1fe, f1defe
    //planet name color code e91e63, 4caf50, ffeb3b, 3f51b5, 673ab7, 9c27b0, f44336,
    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(9), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color: dec_p_color, marginLeft:wp(1.5), textAlign:'left'}}>{item.house}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginTop:hp(2), marginBottom:hp(2)}}>{item.sign.slice(0,3)}{`\n`}{getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginRight:wp(1.5)}}>{item.planet_awastha}</Text>
    </View>

      </>
      )
  }


  _renderPlanetss=({item, index})=>{
   var getDegree = this.degreeMinSec(item.norm_degree.toString())
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
    }else if(index ==10){
      dec_color = '#e2fbe5' 
      dec_p_color = '#e4e1fe'
    }else if(index ==11){
      dec_color = '#daebff' 
      dec_p_color = '#daebff'
    }

    //bgcolor codes 56aef6, fed9e1, fff5d2, daebff, ffe2e4, e2fbe5, fff5d2, ffe4eb, e4e1fe, f1defe
    //planet name color code e91e63, 4caf50, ffeb3b, 3f51b5, 673ab7, 9c27b0, f44336,
    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(9), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginTop:hp(2), marginBottom:hp(2)}}>{item.sign.slice(0,3)}{`\n`}{getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginRight:wp(1.5)}}>{item.planet_awastha}</Text>
    </View>

      </>
      )
  }

  render(){
    var yeah = this.state
    // var getDegree = this.degreeMinSec(yeah.atma_karaka.degree.toString())

    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Dasham Bhav Madhya</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    The house cusps calculation or dasham bhav madhya is calculated using Sripati Paddhati which is most popular
    in Vedic Astrology
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(1.5), textAlign:'left'}}>House</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'32%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Bhav Madhya</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'32%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(1.5)}}>Bhav Sandhi</Text>
    </View>

    <View style={{width:'100%', flexDirection:'row'}}>
    <FlatList style={{width:'60%'}}
    data={this.state.response}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />

    <FlatList style={{width:'28%'}}
    data={this.state.bhav_sandhi}
    renderItem={this._renderPlanetss}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />
    </View>


    </ScrollView>
    </View>
  )   
  }
 
}

