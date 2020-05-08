import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import LinearGradient from 'react-native-linear-gradient';

export default class MoonBiorhythm extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            name_letter:[],
            death_day:[],
            day_ruling_days:[],
            night_ruling_days:[],
            enemy:[],
            friend:[],
            day:[],
            night:[],
            color:'',
            direction:''
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
            "api-condition":"moon_biorhythm",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  name_letter: responseJson.responseData.birth_pakshi_details.name_letter,
                  death_day: responseJson.responseData.birth_pakshi_details.death_day,
                  day_ruling_days: responseJson.responseData.birth_pakshi_details.day_ruling_days,
                  night_ruling_days: responseJson.responseData.birth_pakshi_details.night_ruling_days,
                  enemy: responseJson.responseData.birth_pakshi_details.enemy,
                  friend: responseJson.responseData.birth_pakshi_details.friend,
                  color: responseJson.responseData.birth_pakshi_details.color,
                  direction: responseJson.responseData.birth_pakshi_details.direction,


                  day: responseJson.responseData.activity_cycle.day,
                  night: responseJson.responseData.activity_cycle.night
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


  _renderDay=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    return(
    <View style={{width:'100%', backgroundColor:dec_color, height:hp(6.5), 
     justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginLeft:wp(2)}}>{item.activity}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{item.activity_meaning}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{item.start_time}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{item.end_time}</Text>
    </View>
      )
  }

  render(){
    var data= this.state.response

    var name_letter_a, death_day_a, day_ruling_days_a, night_ruling_days_a, enemy_a, friend_a

    this.state.name_letter.length==0 ? name_letter_a = 'No Data' : name_letter_a = this.state.name_letter.toString()
    this.state.death_day.length==0 ? death_day_a = 'No Data' : death_day_a = this.state.death_day.toString()
    this.state.day_ruling_days.length==0 ? day_ruling_days_a = 'No Data' : day_ruling_days_a = this.state.day_ruling_days.toString()
    this.state.night_ruling_days.length==0 ? night_ruling_days_a = 'No Data' : night_ruling_days_a = this.state.night_ruling_days.toString()
    this.state.enemy.length==0 ? enemy_a = 'No Data' : enemy_a = this.state.enemy.toString()
    this.state.friend.length==0 ? friend_a = 'No Data' : friend_a = this.state.friend.toString()
    
  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center', marginTop:10}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Birth Pakshi Details</Text>
    </View>

    <DataColumn
    name={'Birth Pakshi'}
    value={data.birth_pakshi}/>

    <DataColumn
    name={'Name Letter'}
    value={name_letter_a}/>

    <DataColumn
    name={'Death Day'}
    value={death_day_a}/>

    <DataColumn
    name={'Day Ruling Days'}
    value={day_ruling_days_a}/>

    <DataColumn
    name={'Name Letter'}
    value={night_ruling_days_a}/>

    <DataColumn
    name={'Enemy'}
    value={enemy_a}/>

    <DataColumn
    name={'Friend'}
    value={friend_a}/>

    <DataColumn
    name={'Color'}
    value={this.state.color}/>

    <DataColumn
    name={'Direction'}
    value={this.state.direction}/>


    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center', marginTop:10}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Activity Cycle</Text>
    </View>

    <Text style={{fontFamily:'Nunito-ExtraBold',width:'23%',backgroundColor:'transparent', fontSize:16, color:'black',padding:6, marginLeft:wp(1.5), textAlign:'left'}}>Day</Text>

    <LinearGradient colors={['#ffd0bb', '#086888']}
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    style={{width:wp(100),padding:8,height:hp(6.5),
    justifyContent:'center', flexDirection:'row', alignItems:'center'}}
    >
    <View style={{width:wp(100), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(2), textAlign:'left'}}>Activity</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Meaning</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>Start Time</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(1.5)}}>End Time</Text>
    </View>
    </LinearGradient>


    <FlatList
    data={this.state.day}
    horizontal={false}
    renderItem={this._renderDay}
    keyExtractor = { (item, index) => index.toString() }
    />


   <Text style={{fontFamily:'Nunito-ExtraBold',width:'23%',backgroundColor:'transparent', fontSize:16, color:'black',padding:6, marginLeft:wp(1.5), textAlign:'left'}}>Night</Text>

    <LinearGradient colors={['#ffe791', '#f7005d']}
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    style={{width:wp(100),padding:8,height:hp(6.5),
    justifyContent:'center', flexDirection:'row', alignItems:'center'}}
    >
    <View style={{width:wp(100), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(2), textAlign:'left'}}>Activity</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Meaning</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>Start Time</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(1.5)}}>End Time</Text>
    </View>
    </LinearGradient>


    <FlatList
    data={this.state.night}
    horizontal={false}
    renderItem={this._renderDay}
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
    <Text style={{fontSize:16, color:'#595959',width:'50%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'45%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
  }
}
