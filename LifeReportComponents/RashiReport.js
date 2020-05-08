import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import { Dropdown } from 'react-native-material-dropdown';

export default class RashiReport extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            planet:'',
            rashi_report:'',
            curr_planet: 'moon',
            year_data:[
            {'label': 'Moon', 'value': 'moon'},
            {'label': 'Mars', 'value': 'mars'},
            {'label': 'Mercury', 'value': 'mercury'},
            {'label': 'Jupiter', 'value': 'jupiter'},
            {'label': 'Venus', 'value': 'venus'},
            {'label': 'Saturn', 'value': 'saturn'},
            // {'label': 'Ascendant', 'value': 'ascendant'},
            {'label': 'Sun', 'value': 'sun'},
            ]
        }
    }

    getIndex = (index) => {
//      alert(this.state.year_data[index].label)
        this.setState({curr_planet: this.state.year_data[index].value})
        GLOBAL.gl_currPlanetLifeReport = this.state.year_data[index].value
        this.getDetails(this.state.year_data[index].value)
    }

  componentDidMount(){
//    console.warn(moment().format('YYYY'))
    this.getDetails(this.state.curr_planet)
  }

  getDetails=(sel_planet)=>{
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
            "api-condition":"general_house_report",
            "planetName": sel_planet
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  planet: responseJson.responseData.planet,
                  rashi_report: responseJson.responseData.house_report
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
    var data=this.state.response

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15}}>


      <Dropdown containerStyle={{width:'100%', height:50, marginTop:hp(-1.5), marginBottom:hp(3)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndex(index) }
                                label={''}
                                value={this.state.curr_planet}
                                data={this.state.year_data}
                      />


    </View>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Rashi Report</Text>
    </View>


    <DataColumn
    name={'Planet'}
    value={this.state.planet}/>

    <DataColumn
    name={'Rashi Report'}
    value={this.state.rashi_report}/>

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
