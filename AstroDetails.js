import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom.js';

type Props = {};
export default class AstroDetails extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: '',
            response:''
        }
    }

    _keyExtractor = (item, index) => item.productID;



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

     this.getAstroDetails()
    }

    getAstroDetails= () =>{
      this.showLoading()
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
            "api-condition":"astro_detail"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//               alert(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {
              this.setState({response: responseJson },() => {
//                      alert('gdsd'+JSON.stringify(this.state.response));
                  });                
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }





selectedFirst=(item,indexs)=>{
    this.props.navigation.navigate('ProductListIn')
}


  _renderItem=(itemData) => {
        return (
            <TouchableOpacity style={{width:wp('45%'), margin:7,height:hp('22%'),backgroundColor:'white',}}
            activeOpacity={0.8}
            onPress={()=> this.selectedFirst(itemData)}>
              <View style  = {{width:wp('45%'), height:hp('22%'),backgroundColor:'#f7f7f7',shadowColor: "#000",
                  elevation:4, flexDirection:'column',alignItems:'center',borderRadius:5, 
              }}>
            <Image style={{width:wp(45), height:hp(12), resizeMode:'contain',marginTop:hp(3)}} source={itemData.item.artwork}/>
            <View style={{backgroundColor:'white', width:wp('45%'), height:hp('5%'), flexDirection:'column', marginTop:hp(2), borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                  <Text style = {{fontSize:15,fontFamily:'Nunito-Regular',color:'#000000',marginLeft:wp(3), marginTop:hp(1)}}>
                      {itemData.item.title}
                  </Text>
              </View>
              </View>
            </TouchableOpacity>  
                                        
        )
    }


    render() {
      var yeah = this.state.response
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'ASTRO DETAILS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <ScrollView>
          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Varna</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Varna}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vashya</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Vashya}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Yoni</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Yoni}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Gan</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Gan}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Nadi</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Nadi}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sign</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.sign}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sign Lord</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.SignLord}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Nakshatra</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Naksahtra}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Nakshatra Lord</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.NaksahtraLord}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Charan</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.Charan}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Yunja</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.yunja}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Tatva</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.tatva}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Name Alphabet</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.name_alphabet}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Paya</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.paya}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Ascendant</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.ascendant}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Ascendant Lord</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yeah.ascendant_lord}</Text>
          </View>

          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          </ScrollView>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },


});

