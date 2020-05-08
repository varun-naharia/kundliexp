import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Container, Dimensions} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('../Global');
import Header from 'react-native-custom-headers'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WebView from 'react-native-webview'
import IndicatorCustom from '../IndicatorCustom.js';
import HTML from 'react-native-render-html';
import AutoHeightWebView from 'react-native-autoheight-webview'


export default class VarshaphalCharts extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
          gethtml:``,
          gethtmlx:``
        }
    }

  componentDidMount(){
   //  this.getVarshphalChartMonth()
   // this.getVarshphalChart()
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentWillReceiveProps(){
   this.getVarshphalChart()
   this.getVarshphalChartMonth()
  }

  getVarshphalChartMonth(){
            const url = 'http://139.59.76.223/kundali_expert/astrology_api/varshaphal_month_chart';
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('lang', GLOBAL.glLanguage);
            data.append('date', GLOBAL.gldate);
            data.append('month', GLOBAL.glmonth);
            data.append('year', GLOBAL.glyear);
            data.append('hour', GLOBAL.glhour);
            data.append('minute', GLOBAL.glminute);
            data.append('latitude', GLOBAL.gllat);
            data.append('longitude', GLOBAL.gllong);
            data.append('timezone', GLOBAL.glzone);
            data.append('varshaphal_year', GLOBAL.gl_currYear);
            data.append('width', window.width);
            data.append('chartType', GLOBAL.glChartStyle)
            // console.log(data)
            fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

            }).then((response) => response.text())
                .then((text) => {
                 this.hideLoading()
 //                  console.log(text)
                   this.setState({gethtmlx: text})

                });

  }


  getVarshphalChart(){
     this.showLoading()

            const url = 'http://139.59.76.223/kundali_expert/astrology_api/varshaphal_year_chart';
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('lang', GLOBAL.glLanguage);
            data.append('date', GLOBAL.gldate);
            data.append('month', GLOBAL.glmonth);
            data.append('year', GLOBAL.glyear);
            data.append('hour', GLOBAL.glhour);
            data.append('minute', GLOBAL.glminute);
            data.append('latitude', GLOBAL.gllat);
            data.append('longitude', GLOBAL.gllong);
            data.append('timezone', GLOBAL.glzone);
            data.append('varshaphal_year', GLOBAL.gl_currYear);
            data.append('width', window.width);
            data.append('chartType', GLOBAL.glChartStyle)
            // console.log(data)
            fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

            }).then((response) => response.text())
                .then((text) => {
                 this.hideLoading()
   //                console.log(text)
                   this.setState({gethtml: text})

                });


  }

  render(){
var ges = this.state.gethtml

  return(
    <ScrollView style={{width: wp(100), flex:1,}}>  

    <View style={{width: wp(92), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Varshphal Charts</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>The Varshaphal kundali is the chart for
    the exact time when Sun is at the same degree as in your natal birth chart.
    This is called Year Kundli as well.</Text>

    </View>

    {this.state.loading== true &&(

      <IndicatorCustom/>
      )}
    {this.state.loading==false &&(
   <>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,margin:15, marginTop:5}}>Year Chart</Text>
    <AutoHeightWebView source={{html : ges}} 
    style={{width:window.width,}}
    containerStyle={{ marginLeft:'9%' }}
    scalesPageToFit={true}
    scrollEnabled={false}
    viewportContent={'width=device-width, user-scalable=no'}/>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,margin:15}}>Monthly Chart</Text>
    <AutoHeightWebView source={{html : this.state.gethtmlx}} 
    style={{width:window.width,}}
    containerStyle={{ marginLeft:'9%' }}
    scalesPageToFit={true}
    scrollEnabled={false}
    viewportContent={'width=device-width, user-scalable=no'}

    />
</>
      )}
    </ScrollView>

  )   
  }
 
}
