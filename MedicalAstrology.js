import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};
import IndicatorCustom from './IndicatorCustom.js';


export default class MedicalAstrology extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            responseAries : '',
            responseTaurus:'',
            responseGemini:'',
            responseCancer:'',
            responseLeo:'',
            responseVirgo:'',
            responseLibra:'',
            responseScorpio:'',
            responseSagittarius:'',
            responseCapricorn:'',
            responseAquarius:'',
            responsePisces:'',
            ashtakPoints:[]
        }
        console.log('constructor')
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



  getMedicalAstro=()=>{

//           console.log('did')
 
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
            "api-condition":"sarvashtak",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson.ashtak_points))
                if (responseJson.status == true) {

                    //  alert('gdsd'+JSON.stringify(responseJson));
                     this.setState({
                      responseAries : responseJson.ashtak_points.aries,
                      responseTaurus : responseJson.ashtak_points.taurus,
                      responseGemini : responseJson.ashtak_points.gemini, 
                      responseCancer : responseJson.ashtak_points.cancer,
                      responseLeo : responseJson.ashtak_points.leo,
                      responseVirgo : responseJson.ashtak_points.virgo,
                      responseLibra : responseJson.ashtak_points.libra,
                      responseScorpio : responseJson.ashtak_points.scorpio,
                      responseSagittarius : responseJson.ashtak_points.sagittarius,
                      responseCapricorn : responseJson.ashtak_points.capricorn,
                      responseAquarius : responseJson.ashtak_points.aquarius,
                      responsePisces : responseJson.ashtak_points.pisces
                  })
                     // this.setState({responseTaurus : responseJson.ashtak_points.taurus})
    


                     var collect = [];

// OR                   const newArray = collect.concat(responseJson.ashtak_points)

                    const newArray = this.appendObjTo(collect, responseJson.ashtak_points);
                    this.setState({ashtakPoints :  newArray})
//                    alert(JSON.stringify(this.state.ashtakPoints))
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });


    }

appendObjTo(thatArray, newObj) {
  const frozenObj = Object.freeze(newObj);
  return Object.freeze(thatArray.concat(frozenObj));
}


  componentDidMount(){
//    console.log('mount')
    this.getMedicalAstro()

  }


  _renderAshtakPoints = (item, index)=>{
    console.log(item)
    return(
        <>
         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>1</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>3</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>3</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>2</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>
          </>
        )
  }

  render(){
//    var yumyum = this.state.response.aries
//    console.log(JSON.stringify(yumyum))
    
    console.log('render called ')

        if(this.state.loading){
        return(
            <IndicatorCustom/>
        )
    }


    return(
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
{/*           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'ASTAKVARGA'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
*/}
          <ScrollView>

      <View style={{width: wp(92), margin:15,}}>
      <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Sarvashtak Varga</Text>
      <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
      Sarvashtak is a combination or sum of all the Astakvarga. The houses which has more than 28
      points are considered powerful and strenghthen the house significators.
      </Text>
      
      </View>


          <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:16, color:'white', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>RN</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>SU</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>MO</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>MA</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>ME</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>JU</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>VE</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>SA</Text>
          <Text style={{fontSize:16, color:'white', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>TOT</Text>
          </View>


{/*          <FlatList data ={this.state.ashtakPoints}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this._renderAshtakPoints}
          extraData={this.state}
          />
*/}

         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>1</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAries.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>2</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseTaurus.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>3</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseGemini.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>4</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCancer.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>5</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLeo.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>6</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseVirgo.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>7</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseLibra.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>8</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseScorpio.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>9</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseSagittarius.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>10</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseCapricorn.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>11</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responseAquarius.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

         <View style={{width:wp(99), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-SemiBold'}}>12</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.sun}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.moon}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.mars}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.mercury}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.jupiter}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.venus}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.saturn}</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-SemiBold'}}>{this.state.responsePisces.total}</Text>
          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {

        width:wp('100%'),
    },
    loading: {
        flex:1,
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

