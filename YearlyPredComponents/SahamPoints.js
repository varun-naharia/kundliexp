import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class SahamPoints extends Component{

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
            "api-condition":"varshaphal_saham_points",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//            console.log(JSON.stringify(responseJson))
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
//    console.log('render SahamPoints')
    var first = this.state.response.map((item, i) =>{
    return(
    <>
    <View style={{width:wp(100), backgroundColor:'transparent', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}
    key={i}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'grey', marginLeft:wp(3), textAlign:'left'}}>{item.saham_id}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'30%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left'}}>{item.saham_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'30%',backgroundColor:'transparent', fontSize:13, color:'grey', textAlign:'left', marginRight:wp(3)}}>{item.saham_degree}</Text>
    </View>
    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center',}}/>
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
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>Saham Degrees for year</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Sahamas are the significant points in the zodiac related to specific matters. For example,
    "raajya" means kingdom and "raajya sahama" is a significant point in the zodiac related to
    obtaining kingdom.
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(2.5), textAlign:'left'}}>Entity</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'30%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Saham Name</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'30%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(2.5)}}>Saham Degree</Text>
    </View>

    {first}




    </ScrollView>
    </View>
  )   
  }
 
}
