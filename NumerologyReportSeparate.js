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


export default class NumerologyReportSeparate extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            getResponse:navigation.state.params.numReportResponse,          
        }
        console.log('constructor')
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }





  componentDidMount(){
//    console.log('mount')
  }




  render(){
   var yummy = this.state.getResponse
   console.log(JSON.stringify(yummy))
    
    console.log('render called ')

        if(this.state.loading){
        return(
            <IndicatorCustom/>
        )
    }

    var decideTitle='';
    if(GLOBAL.isDailyPres=='1'){
      decideTitle = 'KNOW YOUR LUCKY NUMBER'
    }else if(GLOBAL.isDailyPres == '2'){
      decideTitle = 'DAILY PREDICTION'
    }else if(GLOBAL.isDailyPres == '3'){
      decideTitle = 'KNOW YOUR LUCKY COLOR'
    }else if(GLOBAL.isDailyPres == '4'){
      decideTitle = 'MANTRA SUGGESTION'
    }


    return(
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={decideTitle}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <ScrollView>
      {GLOBAL.isDailyPres=='1' && (
        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,alignItems:'center',justifyContent:'center',  alignSelf:'center'
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Your Lucky Number(s) are:
          </Text>

          <Text style = {{fontSize:50,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.friendly_num}
          </Text>

        </View>

        )}

      {GLOBAL.isDailyPres=='2' && (

      <>
              <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,alignItems:'center',justifyContent:'center',  alignSelf:'center'
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Prediction
          </Text>

          <Text style = {{fontSize:17,textAlign:'justify',marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.prediction}
          </Text>

        </View>


        <View style={{flexDirection:'row', width:wp('95%'), justifyContent:'space-between', marginTop:hp(1), alignSelf:'center', marginBottom:hp(1)}}>
        <View   style  = {{width:'48%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Lucky Color
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.lucky_color}
          </Text>

        </View>

        <View   style  = {{width:'48%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Lucky Number
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.lucky_number}
          </Text>

        </View>

      </View>          
        <View style={{flexDirection:'row', width:wp('95%'), justifyContent:'space-between', marginTop:hp(1), alignSelf:'center', marginBottom:hp(1)}}>
        <View   style  = {{width:'48%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Prediction Date
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.prediction_date}
          </Text>

        </View>

        </View>


</>
      )}

      {GLOBAL.isDailyPres=='3' && (
        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,alignItems:'center',justifyContent:'center',  alignSelf:'center'
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Your Lucky Color(s) are:
          </Text>

          <Text style = {{fontSize:50,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_color}
          </Text>

        </View>

        )}

      {GLOBAL.isDailyPres=='4' && (
        <View   style  = {{width:wp('95%'), backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            margin:10,
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13,alignItems:'center',justifyContent:'center',  alignSelf:'center'
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Your Favourable Mantra:
          </Text>

          <Text style = {{fontSize:30,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',textAlign:'center', }}>
          {yummy.fav_mantra}
          </Text>

        </View>

        )}

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

