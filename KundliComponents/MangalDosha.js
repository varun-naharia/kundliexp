import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity, Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'


export default class MangalDosha extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:{},
            report:``,
            based_on_aspect:[],
            based_on_house:[]
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getMangalDosh()
  }


  getMangalDosh=()=>{
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
            "api-condition":"mangal_dosha",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                   // console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  based_on_aspect: responseJson.responseData.manglik_present_rule.based_on_aspect,
                  based_on_house: responseJson.responseData.manglik_present_rule.based_on_house
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

    _renderPlanets=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#EFF1F3'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(6), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'98%',backgroundColor:'transparent', fontSize:14, color: 'grey', marginLeft:wp(1.5), textAlign:'left'}}>{item}</Text>
    </View>

      </>
      )
  }


  render(){


    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Mangal Dosha</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    In the boy or girl horoscope when Mars is in ascendant, fourth house, seventh house, eighth house or
    twelvth house then it is called Mangalik Dosh.
    </Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Analysis</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#d9d9f3', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',width:'99%',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.manglik_report}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Overview</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#f4f0e6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Status</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.manglik_status}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#fcebb6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Percentage</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.percentage_manglik_present}%</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Mangalik Present Rule</Text>
    </View>

    <Text style={{fontFamily:'Nunito-Black',width:'80%',backgroundColor:'transparent', fontSize:15, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Based on Aspect</Text>

    <FlatList style={{width:'100%', marginTop:5,}}
    data={this.state.based_on_aspect}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />

    <Text style={{fontFamily:'Nunito-Black',width:'80%',backgroundColor:'transparent', fontSize:15, color:'black', marginLeft:wp(2.5), textAlign:'left',marginTop:10}}>Based on House</Text>

   <FlatList style={{width:'100%', marginTop:5}}
    data={this.state.based_on_house}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />

    </ScrollView>
    </View>
  )   
  }
 
}

