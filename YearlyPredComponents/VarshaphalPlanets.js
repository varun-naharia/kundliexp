import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class VarshaphalPlanets extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
        }
        console.log('--varshaphal_planets')
    }

  componentDidMount(){
        console.log(JSON.stringify(this.props.response))
//    this.getVarshphalPlanets()

   // this.props.navigation.addListener('willFocus',this._handleStateChange);
   //  this.getVarshphalPlanets()
  }

//   static getDerivedStateFromProps(props, state){
// //    this.getVarshphalPlanets()    
//   }

  componentDidUpdate(prevProps, prevState){
    //     if(this.constructor.name == 'VarshaphalPlanets'){
    // console.log(JSON.stringify(prevProps))
    //     console.log(this.constructor.name);  // "Demo"

    //     }
    // if(prevProps.navigation.state.routeName==)
//    this.getVarshphalPlanets()
  // alert('hi')
  }

  componentWillReceiveProps(){
    this.getVarshphalPlanets()
  }

  // _handleStateChange= state=>{
  //   alert('hi')
  //   console.log('ads')
  // }

  getVarshphalPlanets=()=>{
    console.log('-----> varshaphal_planets')
      // console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
      //       "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": GLOBAL.gl_currYear})
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
            "api-condition":"varshaphal_planets",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
           //   console.log(JSON.stringify(responseJson))
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
        console.log($vars[1]);
        if($deg < 10)
         $deg = '0'+$deg; 
        if($min < 10) 
         $min = '0'+$min;
        if($sec < 10) 
         $sec = '0'+$sec;
        return {hour:$deg, min: $min,sec:$sec};
    }

  _renderPlanets=({item, index})=>{
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
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:15, color: dec_p_color, marginLeft:wp(1.5), textAlign:'left'}}>{item.name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:15, color:'grey', textAlign:'left', marginTop:hp(2), marginBottom:hp(2)}}>{item.sign.slice(0,3)}{`\n`}{getDegree.hour}°{getDegree.min}'{getDegree.sec}"</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'7%',backgroundColor:'transparent', fontSize:15, color:'grey', textAlign:'left'}}>{item.signLord.slice(0,2)}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:15, color:'grey', textAlign:'left' }}>{item.nakshatra}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'5%',backgroundColor:'transparent', fontSize:15, color:'grey', textAlign:'left', marginRight:wp(6)}}>{item.house}</Text>
    </View>

      </>
      )
  }

  render(){
//        console.log(JSON.stringify(this.props.response))

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>Varshphal Planet Degrees</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>The Varshaphal or Vedic Solar Return system makes
    a progressed yearly kundali for you. The Varshaphala predicts how the your year is going to be.
    This is also known as birthday forecase as it is mainly from one birthday to next birthday.</Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(1.5), textAlign:'left'}}>Planets</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Degree</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>SL</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left' }}>Nakshatra</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(6)}}>H</Text>
    </View>

    <FlatList
    data={this.state.response}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    />

    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:16,marginTop:5}}>Legends</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:10}}>H - House
    </Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:14,color:'#838383', marginTop:2}}>SL - Sign Lord
    </Text>
    </View>

    </ScrollView>
    </View>
  )   
  }
 
}
