import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class PanchvargiyaBala extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            kshetra_bala:[],
            uccha_bala:[],
            hadda_bala:[],
            drekkana_bala:[],
            navmansha_bala:[],
            total_bala:[],
            final_bala:[]
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
    this.getBala()
  }

  getBala=()=>{
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
            "api-condition":"varshaphal_panchavargeeya_bala",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log('Panchvargiya Bala--->'+JSON.stringify(responseJson))
  //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  kshetra_bala: responseJson.responseData.kshetra_bala,
                  uccha_bala: responseJson.responseData.uccha_bala,
                  hadda_bala: responseJson.responseData.hadda_bala,
                  total_bala: responseJson.responseData.total_bala,
                  drekkana_bala: responseJson.responseData.drekkana_bala,
                  navmansha_bala: responseJson.responseData.navmansha_bala,
                  final_bala: responseJson.responseData.final_bala
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

  _renderBala=({item, index})=>{

    return(
      <>
    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>Bala</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Su</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Mo</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ma</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Me</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ju</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ve</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'7.5%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(0.5)}}>Sa</Text>
    </View>

      </>
      )
  }

  render(){
   // console.log('render PanchvargiyaBala')
//       console.log(JSON.stringify(this.props.response))
    var first = this.state.kshetra_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var sec = this.state.uccha_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}
    >{str}</Text>
    </>
    )})

    var third = this.state.hadda_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)     
      return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var four = this.state.drekkana_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
      return(
    <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var five = this.state.navmansha_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
    return(
      <>
    <Text style={{fontFamily:'Nunito-Regular',width:'9%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var six = this.state.total_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)
      return(
    <>
    <Text style={{fontFamily:'Nunito-Bold',width:'9%',backgroundColor:'transparent', fontSize:13, color:'black', textAlign:'left'}}>{str}</Text>
    </>     
    )})

    var seven = this.state.final_bala.map(id =>{
      var str= id.toString()
      str = str.substring(0,5)    
    return(
    <>
    <Text style={{fontFamily:'Nunito-Bold',width:'9%',backgroundColor:'transparent', fontSize:13, color:'black', textAlign:'left'}}>{str}</Text>
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
    <View style={{width: wp(92), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Panchvargiya Bala</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>Of the various methods of computing
    the strength of planets in an annual chart, the method of Panchvargiya Bala is of primary importance.
    In this method, five different sources of strength of planets are considered, hence the same Panchvargiya, 
    'of five divisions'.</Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'18%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>Bala</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Su</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Mo</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ma</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Me</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ju</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Ve</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'9%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(0.5)}}>Sa</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Kshetra</Text>
    {first}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Uccha</Text>
    {sec}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Hadda</Text>
    {third}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>


    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Drekkana</Text>
    {four}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>


    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Navmansha</Text>
    {five}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Total</Text>
    {six}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-SemiBold',width:'18%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Final</Text>
    {seven}
    </View> 

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>

    </ScrollView>
    </View>
  )   
  }
 
}
