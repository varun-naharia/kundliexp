import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class FavourablePoints extends Component{

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
    // this.getDashamBhav()
  }


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
            "lang":GLOBAL.glLanguage,
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
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Your Favourable Points</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    This section uses Vedic Numerology to ascertain various favorable and unfavorable numbers for you.
    </Text>
    
    </View>





    </ScrollView>
    </View>
  )   
  }
 
}

