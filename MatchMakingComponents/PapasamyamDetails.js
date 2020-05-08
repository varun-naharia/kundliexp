import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'

export default class PapasamyamDetails extends Component{
    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            ashtakoota:'',
            ashtakoota_points:'',
            manglik:'',
            male_percentage:'',
            female_percentage:'',
            rajju_dosha:'',
            vedha_dosha:'',            
            conclusion:'',
        }
    }

  componentDidMount(){
    this.getDetails()
  }

  getDetails=()=>{
        var smallBody={
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "api-condition":"match_rajju_dosha",
        }
      var finalBody = {...smallBody , ...this.props.navigation.state.params.wholeMatchData}
      console.log(JSON.stringify(finalBody))

      const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalBody),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  ashtakoota: responseJson.responseData.ashtakoota.status,
                  ashtakoota_points: responseJson.responseData.ashtakoota.received_points,
                  manglik: responseJson.responseData.manglik,
                  rajju_dosha: responseJson.responseData.rajju_dosha.status,
                  vedha_dosha: responseJson.responseData.vedha_dosha.status,
                  conclusion: responseJson.responseData.conclusion.match_report,
                  manglik: responseJson.responseData.manglik.status,
                  male_percentage: responseJson.responseData.manglik.male_percentage,
                  female_percentage: responseJson.responseData.manglik.female_percentage,                  
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
    var decVed_Dosha = '', decRajju_Dosha = '', decAshtakoota = '', decManglik=''
    this.state.vedha_dosha == false ? decVed_Dosha = 'No': decVed_Dosha = 'Yes'
    this.state.rajju_dosha == false ? decRajju_Dosha = 'No' : decRajju_Dosha = 'Yes'
    this.state.ashtakoota == false ? decAshtakoota = 'No' : decAshtakoota = 'Yes'
    this.state.manglik == false ? decManglik = 'No' : decManglik = 'Yes'
  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>

{/*    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center', marginTop:10}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Ascendant Report</Text>
    </View>
*/}
    <DataColumn
    name={'Ashtakoota Present?'}
    value={decAshtakoota}/>
    <DataColumn
    name={'Ashtakoota Points'}
    value={this.state.ashtakoota_points}/>
    <DataColumn
    name={'Manglik Dosha Present?'}
    value={decManglik}/>
    <DataColumn
    name={'Female Percentage'}
    value={this.state.female_percentage + '%'}/>
    <DataColumn
    name={'Male Percentage'}
    value={this.state.male_percentage + '%'}/>

    <DataColumn
    name={'Rajju Dosha'}
    value={decRajju_Dosha}/>
    <DataColumn
    name={'Vedha Dosha'}
    value={decVed_Dosha}/>
    <DataColumn
    name={'Conclusion'}
    value={this.state.conclusion}/>
    

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
    <Text style={{fontSize:16, color:'#595959',width:'40%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'55%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
  }
}
