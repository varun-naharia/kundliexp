import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView,Image,TouchableOpacity ,Alert,Container , Dimensions} from 'react-native';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
import IndicatorCustom from './IndicatorCustom'
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class HoroscopeDetails extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }


    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            zodiacItem: navigation.state.params.params.sel_zodiac,
            zodiacSign: navigation.state.params.params.sel_zodiac.for_api,
            response:{},
            health:'',
            emotions:'',
            personal_life:'',
            profession:'',
            travel:'',
            luck:''
        }
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
       this.getTodayHoroscope()
    }

    getTodayHoroscope= () =>{
      // this.showLoading()
        const url = 'http://139.59.76.223/kundali_expert/astrology_api/daily_sun_sign_prediction'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "timezone":GLOBAL.glzone,
            "zodiacSign": this.state.zodiacSign
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson))
                // this.hideLoading()
                if (responseJson.status == true) {
              this.setState({response: responseJson,
                health: responseJson.prediction.health,
                emotions: responseJson.prediction.emotions,
                personal_life: responseJson.prediction.personal_life,
                profession: responseJson.prediction.profession,
                travel: responseJson.prediction.travel,
                luck: responseJson.prediction.luck
              });
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                // this.hideLoading()
            });

    }




    render() {
      var now = moment().format('DD-MM-YYYY')
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
           headerName={'HOROSCOPE DETAILS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

      <ScrollView>
      <View style={{margin:15, flexDirection:'column', alignItems:'flex-start'}}>

      <View style={{backgroundColor:'white', flexDirection:'row', width:wp(75), marginLeft:wp(2), marginTop:hp(1),}}>
      <View style={{width:110, height:110, borderColor: 'transparent', borderWidth: 0.001, borderRadius: 55,elevation:8, backgroundColor:'white', }}>
      <Image style={{width:'100%', height:'100%',}} source={this.state.zodiacItem.artwork}/>
      </View>
      <View style={{flexDirection:'column', alignSelf:'center',marginLeft:wp(3),}}>
       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold'}}>{this.state.zodiacItem.title}</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Bold'}}>{now}</Text>
       </View>
       </View>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(4)}}>Health</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1)}}>
       {this.state.health}
       </Text>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(2)}}>Emotions</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1)}}>
       {this.state.emotions}
       </Text>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(2)}}>Personal Life</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1)}}>
       {this.state.personal_life}
       </Text>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(2)}}>Profession</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1)}}>
       {this.state.profession}
       </Text>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(2)}}>Travel</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1)}}>
       {this.state.travel}
       </Text>

       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold', marginTop:hp(2)}}>Luck</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Regular', marginTop:hp(1), marginBottom:hp(2)}}>
       {this.state.luck}
       </Text>

            </View>

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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

