import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
const window = Dimensions.get('window');
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};
import Svg ,{SvgXml}  from 'react-native-svg';


export default class SunChart extends Component<Props>{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response : '',
  }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



  getMoonChart=()=>{
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
            "api-condition":"charts",
            "chart_id":"MOON"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              //alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                    //  alert('gdsd'+JSON.stringify(responseJson));
                     this.setState({response : responseJson})
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }


  getMoonChartImage=()=>{
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
            "api-condition":"horo_chart_image",
            "chart_id":"MOON"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({responseImage : responseJson.responseData.svg})
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }

  componentDidMount(){

  //  alert('from component '+this.props.index)
    //this.getMoonChartImage()
   // this.getMoonChart()

  }

  render(){
       //console.log(this.state.responseImage)
//      <SvgXml xml={xml} />
      console.log('global ss '+GLOBAL.responses)

       const xml = `${GLOBAL.responses}`;
       console.log('adssdd'+xml)
    return(
      <View style={{alignItems:'center', marginTop:10}}>
      <SvgXml xml={xml} />
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

