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


export default class RudrakshSuggestion extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            img_url:'',     
            rudraksha_key:'',
            name:'',     
            recommend:'',
            detail:''
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
    this.getRudrakshaSuggestion()

  }

  getRudrakshaSuggestion(){
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
            "api-condition":'rudraksha_suggestion',
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      img_url : responseJson.responseData.img_url,
                      rudraksha_key: responseJson.responseData.rudraksha_key,
                      name: responseJson.responseData.name,
                      recommend: responseJson.responseData.recommend,
                      detail: responseJson.responseData.detail

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
           headerName={'RUDRAKSHA SUGGESTION'}
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

        <Image style={{width:130, height:130, alignSelf:'center'}}
        source={{uri : 'https://vedicrishi.in'+this.state.img_url}}/>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Name:{`\n`}<Text style={{color:'#293440'}}>{this.state.name}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Recommend:{`\n`}<Text style={{color:'#293440'}}>{this.state.recommend}</Text>
          </Text>
          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Detail:{`\n`}<Text style={{color:'#293440'}}>{this.state.detail}</Text>
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

