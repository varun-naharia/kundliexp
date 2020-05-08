import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class PersonalityReport extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            spiritual_lesson:'',
            report:[],
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
            "api-condition":"personality_report",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  spiritual_lesson: responseJson.responseData.spiritual_lesson,
                  report: responseJson.responseData.report
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

  _renderItem=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }
    return(
    <View style={{width:'100%', backgroundColor:dec_color, height:'auto', 
     justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'95%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left', marginLeft:wp(2.5)}}>{item}</Text>
    </View>      
      )
  }

  render(){
  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center', marginTop:10}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Personality Report</Text>
    </View>

    <Text style={{fontFamily:'Nunito-ExtraBold',padding:5,width:'95%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left', marginLeft:wp(2)}}>{this.state.spiritual_lesson}</Text>

    <FlatList
    data={this.state.report}
    horizontal={false}
    renderItem={this._renderItem}
    keyExtractor = { (item, index) => index.toString() }
    />

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
    <Text style={{fontSize:16, color:'#595959',width:'30%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'65%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
  }
}
