import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class HouseSignif extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
            houses:[
            {'pl_name':'House 1'},
            {'pl_name':'House 2'},
            {'pl_name':'House 3'},
            {'pl_name':'House 4'},
            {'pl_name':'House 5'},
            {'pl_name':'House 6'},
            {'pl_name':'House 7'},
            {'pl_name':'House 8'},
            {'pl_name':'House 9'},
            {'pl_name':'House 10'},
            {'pl_name':'House 11'},
            {'pl_name':'House 12'},
        ]
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getHouseSignif()
  }

  componentWillReceiveProps(){
    this.getHouseSignif()
  }

  getHouseSignif=()=>{
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
            "api-condition":"kp_horoscope",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//           console.log(JSON.stringify(responseJson))
  //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData.houseSignificator,
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

  _renderPlanets=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    return(
    <View style={{width:'100%', backgroundColor:dec_color, height:hp(6.5), alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Bold',width:'100%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(1.5), textAlign:'left'}}>{item.pl_name}</Text>
    </View>
        )
  }


  _renderSignifAll=({item, index})=>{

    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    var str_four, str_three, str_two, str_one

    if(Array.isArray((item.level4))){
        if(item.level4.length == 0){
            str_four = '-'
        }else{
            str_four = item.level4.toString()
        }
    }else{
        str_four = item.level4
    }

    if(Array.isArray((item.level3))){
        if(item.level3.length==0){
            str_three = '-'
        }else{
        str_three = item.level3.toString()            
        }
    }else{
        str_three = item.level3
    }

    if(Array.isArray((item.level2))){
        if(item.level2.length==0){
            str_two = '-'
        }else{
            str_two = item.level2.toString()            
        }
    }else{
        str_two = item.level2
    }

    if(Array.isArray((item.level1))){
        if(item.level1.length==0){
            str_one = '-'
        }else{
            str_one = item.level1.toString()
        }
    }else{
        str_one = item.level1
    }

    return(
    <View style={{width:'100%', backgroundColor:dec_color, height:hp(6.5), 
    alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'26%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{str_one}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'26%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{str_two}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'26%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{str_three}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'26%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{str_four}</Text>
    </View>
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
    <View style={{width: wp(92), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>House Significators</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Significator for a house in the order of strength are as follows - {`\n`}
    Level 1 - Planets in the star of the occupants of that house{`\n`}
    Level 2 - Planets in that house{`\n`}
    Level 3 - Planets in the star of owners of that house{`\n`}
    Level 4 - Owner of that house{`\n`}

    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'23%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(0.5), textAlign:'left'}}>House</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>I</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>II</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left',}}>III</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(1.5)}}>IV</Text>

    </View>

    <View style={{flexDirection:'row', width:wp(100), justifyContent:'space-between',}}>
    <FlatList style={{width:'25%',}}
    data={this.state.houses}
    horizontal={false}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }

    />

    <FlatList style={{width:'75%',}}
    data={this.state.response}
    horizontal={false}
    renderItem={this._renderSignifAll}
    keyExtractor = { (item, index) => index.toString() }

    />
    </View>
    </ScrollView>
    </View>
  )   
  }
 
}
