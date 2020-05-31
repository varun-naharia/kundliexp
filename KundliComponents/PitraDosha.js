import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity, Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import HTML from 'react-native-render-html';

export default class PitraDosha extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:{},
            report:``,
            rules_matched:[],
            remedies:[],
            effects:[]
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getPitraDosha()
  }


  getPitraDosha=()=>{
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
            "api-condition":"pitra_dosha_report",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                   console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  rules_matched: responseJson.responseData.rules_matched,
                })

                  if(responseJson.responseData.remedies == null){

                  }else{
                    this.setState({remedies: responseJson.responseData.remedies})
                  }

                  if(responseJson.responseData.effects == null){

                  }else{
                    this.setState({effects: responseJson.responseData.effects})
                  }

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
    <View style={{width:wp(100), backgroundColor:dec_color,padding:10, justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'98%',backgroundColor:'transparent', fontSize:14, color: 'grey', marginLeft:wp(1.5), textAlign:'left'}}>{item}</Text>
    </View>

      </>
      )
  }


  render(){
    var decide=''

    if(this.state.response.is_pitri_dosha_present == false){
        decide = 'No'
    }else{
        decide = 'Yes'
    }

    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Pitra Dosha</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Pitra Dosha is a Karmic debt of the ancestors and reflected in the horoscope in the form of
    planetary combinations. It can also happen due to the neglect of ancestors and not providing them
    their proper due in the form of shraddh or charity or spiritual upliftments.
    </Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Conclusion</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#d9d9f3', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',width:'99%',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.response.conclusion}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Overview</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#f4f0e6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Is Present?</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{decide}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#fcebb6', justifyContent:'space-between',padding:8,alignItems:'center', flexDirection:'row'}}
    >
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>Rules Matched</Text>
    <Text style={{fontFamily:'Nunito-Regular',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(0.5), textAlign:'left'}}>{this.state.rules_matched.length}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Remedies</Text>
    </View>


    {this.state.remedies.length == 0 && (
    <Text style={{fontFamily:'Nunito-Regular',width:'80%',backgroundColor:'transparent', fontSize:14, color:'grey', marginLeft:wp(2.5), textAlign:'left'}}>No Remedies</Text>
        )}
    {this.state.remedies.length != 0 && (
    <FlatList style={{width:'100%', marginTop:0}}
    data={this.state.remedies}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />


        )}
        
    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Effects</Text>
    </View>


    {this.state.effects.length == 0 && (
    <Text style={{fontFamily:'Nunito-Regular',width:'80%',backgroundColor:'transparent', fontSize:14, color:'grey', marginLeft:wp(2.5), textAlign:'left'}}>No Effects</Text>
        )}
    {this.state.effects.length != 0 && (
   <FlatList style={{width:'100%', marginTop:0}}
    data={this.state.effects}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />

        )}

    </ScrollView>
    </View>
  )   
  }
 
}

