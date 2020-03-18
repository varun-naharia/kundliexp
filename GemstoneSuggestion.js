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


export default class GemstoneSuggestion extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            getLife:'',     
            getBenefit:'',
            getLucky:'',     
        }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }





  componentDidMount(){
//    console.log('mount')
    this.getGemstoneSuggestion()

  }

  getGemstoneSuggestion(){
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
            "api-condition":'basic_gem_suggestion',
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      getLife : responseJson.responseData.LIFE,
                      getBenefit: responseJson.responseData.BENEFIC,
                      getLucky: responseJson.responseData.LUCKY
                  })

                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });

  }


  render(){

        if(this.state.loading){
        return(
            <IndicatorCustom/>
        )
    }



    return(
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'GEMSTONE SUGGESTION'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <ScrollView>

        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,
        }}>

          <Text style = {{fontSize:18,marginBottom:0,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          LIFE
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Name: <Text style={{color:'#293440'}}>{this.state.getLife.name}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Semi Gem: <Text style={{color:'#293440'}}>{this.state.getLife.semi_gem}</Text>
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Finger: <Text style={{color:'#293440'}}>{this.state.getLife.wear_finger}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Weight Carat: <Text style={{color:'#293440'}}>{this.state.getLife.weight_caret}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Metal: <Text style={{color:'#293440'}}>{this.state.getLife.wear_metal}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Day: <Text style={{color:'#293440'}}>{this.state.getLife.wear_day}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Gem Deity: <Text style={{color:'#293440'}}>{this.state.getLife.gem_deity}</Text>
          </Text>

        </View>


        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,marginTop:hp(1)
        }}>

          <Text style = {{fontSize:18,marginBottom:0,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          BENEFIC
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Name: <Text style={{color:'#293440'}}>{this.state.getBenefit.name}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Semi Gem: <Text style={{color:'#293440'}}>{this.state.getBenefit.semi_gem}</Text>
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Finger: <Text style={{color:'#293440'}}>{this.state.getBenefit.wear_finger}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Weight Carat: <Text style={{color:'#293440'}}>{this.state.getBenefit.weight_caret}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Metal: <Text style={{color:'#293440'}}>{this.state.getBenefit.wear_metal}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Day: <Text style={{color:'#293440'}}>{this.state.getBenefit.wear_day}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Gem Deity: <Text style={{color:'#293440'}}>{this.state.getBenefit.gem_deity}</Text>
          </Text>

        </View>


        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,marginTop:hp(1)
        }}>

          <Text style = {{fontSize:18,marginBottom:0,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          LUCKY
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Name: <Text style={{color:'#293440'}}>{this.state.getLucky.name}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Semi Gem: <Text style={{color:'#293440'}}>{this.state.getLucky.semi_gem}</Text>
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Finger: <Text style={{color:'#293440'}}>{this.state.getLucky.wear_finger}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Weight Carat: <Text style={{color:'#293440'}}>{this.state.getLucky.weight_caret}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Metal: <Text style={{color:'#293440'}}>{this.state.getLucky.wear_metal}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Wear Day: <Text style={{color:'#293440'}}>{this.state.getLucky.wear_day}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Gem Deity: <Text style={{color:'#293440'}}>{this.state.getLucky.gem_deity}</Text>
          </Text>

        </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
    },
})

