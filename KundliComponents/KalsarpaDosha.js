import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity, Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import HTML from 'react-native-render-html';

export default class KalsarpaDosha extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:{},
            report:``
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getKalsarp()
  }


  getKalsarp=()=>{
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
            "api-condition":"kalsarpa_details",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                   // console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  report: responseJson.responseData.report.report
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
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Kalsarpa Dosha</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    If all the 7 planets are situated between Rahu and Ketu then Kalsarpa Yog is formed.
    </Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Analysis</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#d9d9f3', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',width:'99%',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.one_line}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>More Info</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#f4f0e6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Effect</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.type}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#fcebb6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Name</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.name}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Report</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#e2f2d5', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <HTML html={this.state.report} imagesMaxWidth={Dimensions.get('window').width} />
    </View>

    </ScrollView>
    </View>
  )   
  }
 
}

