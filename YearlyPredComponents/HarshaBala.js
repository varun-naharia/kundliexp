import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class HarshaBala extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            sthana_bala:[],
            ucchaswachetri_bala:[],
            gender_bala:[],
            dinratri_bala:[],
            total_bala:[],
        }
//        console.log('--PanchvargiyaBala')
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
//        console.log(JSON.stringify(this.props.response))
  }

  componentWillReceiveProps(){
    this.getHarshBala()
  }

  getHarshBala=()=>{
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
            "api-condition":"varshaphal_harsha_bala",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//             console.log(JSON.stringify(responseJson))
  //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  sthana_bala: responseJson.responseData.sthana_bala,
                  ucchaswachetri_bala: responseJson.responseData.ucchaswachetri_bala,
                  gender_bala: responseJson.responseData.gender_bala,
                  total_bala: responseJson.responseData.total_bala,
                  dinratri_bala: responseJson.responseData.dinratri_bala,
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
    console.log('render HarshaBala')
//       console.log(JSON.stringify(this.props.response))
    var first = this.state.sthana_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var sec = this.state.ucchaswachetri_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}
    >{str}</Text>
    </>
    )})

    var third = this.state.gender_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)     
      return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var four = this.state.dinratri_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
      return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var five = this.state.total_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
      <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
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
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>Harsha Bala</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>Harsha literally means happiness.
    Planets are comfortable or happy in certain situations and hence they gain Bala or strength. To determine
    the strength, four points are considered: Position of a planet in a specific house. Placement in exaltation
    sign or it's own house.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>Bala</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Su</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Mo</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ma</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Me</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ju</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ve</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(0.5)}}>Sa</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Sthana</Text>
    {first}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Ucchaswachetri</Text>
    {sec}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Gender</Text>
    {third}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>


    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Dinratri</Text>
    {four}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>


    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Total</Text>
    {five}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    </ScrollView>
    </View>
  )   
  }
 
}
