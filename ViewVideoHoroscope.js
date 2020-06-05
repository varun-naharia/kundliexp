import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import WebView from 'react-native-webview';
import VideoPlayer from 'react-native-video-controls';
const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from 'react-native-custom-headers';
import YouTubes, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import getYouTubeID from 'get-youtube-id';
import IndicatorCustom from './IndicatorCustom.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment'
export default class ViewVideoHoroscope extends Component {

static navigationOptions = {
          title: 'Video Detail',
          headerShown: false
      };


  constructor(props) {
    super(props)
    var getPrevYear = moment().add(-1, 'years').format('YYYY').toString()
    var getCurrentYear= moment().format('YYYY').toString()
    var getNextYear = moment().add(1, 'years').format('YYYY').toString()
    var getNextNextYear = moment().add(2, 'years').format('YYYY').toString()

    var decData=[]

    if(this.props.getRoute == 'year'){
        decData=[{'label': getPrevYear, 'value': getPrevYear},
            {'label': getCurrentYear, 'value': getCurrentYear},
            {'label': getNextYear, 'value': getNextYear},
            {'label': getNextNextYear, 'value': getNextNextYear}]      
    }


    this.state = {
      loading:false,
      vidTitle:'',
      hasData:0,
      video_url:'',
      height: 215,
      hoType : this.props.getRoute,
      about:'',video_details:'', playVideo:false,

      sel_horo:'cancer',
      sel_year:getCurrentYear,

      dropYearTitle: getCurrentYear,
      dropYear: decData,

      dropTitle: 'Cancer',
      dropData: [{
        id: '1',
        label: 'Aries',
        value: 'aries',    
        artwork: require('./resources/ho_aries.png')
      },
      {
        id: '2',
        label: 'Taurus', 
        value: 'taurus',           
        artwork: require('./resources/ho_taurus.png')
      },
      {
        id: '3',
        label: 'Gemini', 
        value: 'gemini',               
        artwork: require('./resources/ho_gemini.png')
      },
      {
        id: '4',
        label: 'Cancer',    
        value: 'cancer',            
        artwork: require('./resources/ho_canc.png')
      },
      {
        id: '5',
        label: 'Leo',    
        value: 'leo',            
        artwork: require('./resources/ho_leo.png')
      },
      {
        id: '6',
        label: 'Virgo',    
        value: 'virgo',            
        artwork: require('./resources/ho_virgo.png')
      },
      {
        id: '7',
        label: 'Libra',    
        value: 'libra',            
        artwork: require('./resources/ho_libra.png')
      },
      {
        id: '8',
        label: 'Scorpio',    
        value: 'scorpio',            
        artwork: require('./resources/ho_scorpio.png')
      },
      {
        id: '9',
        label: 'Sagittairus',
        value: 'sagittarius',                
        artwork: require('./resources/ho_sagittairus.png')
      },
      {
        id: '10',
        label: 'Capricorn',
        value: 'capricorn',                
        artwork: require('./resources/ho_capricorn.png')
      },
      {
        id: '11',
        label: 'Aquarius',
        value: 'aquarius',                
        artwork: require('./resources/ho_aquarius.png')
      },
      {
        id: '12',
        label: 'Pisces',
        value: 'pisces',                
        artwork: require('./resources/ho_pisces.png')
      },
    ]      
    ,

      curr_year: getCurrentYear,


    }
   // console.log('constructor')
  }

   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


handleReady = () => {
        setTimeout(() => this.setState({ height: 216 }), 500);
    }

    componentDidMount() {
//     this.getHoroscope(this.state.hoType)
    }

    // componentWillReceiveProps(){
    //   console.log('will')
    //   this.getHoroscope(this.state.hoType)

    // }


componentWillReceiveProps(nextProps){
      this.showLoading()
  this.timeoutCheck = setTimeout(() => {
      this.getHoroscope(this.state.hoType);
   }, 300);            

  }


    getHoroscope=(route)=>{

    var obj={}

    if(this.state.hoType=='year'){
      obj={
        "for_": this.state.hoType, // or "day" or "month" or "week",
        "year": this.state.sel_year,
        "zodiacName": this.state.sel_horo
      }
    }else{
      obj={
        "for_": this.state.hoType, // or "day" or "month" or "week",
        "zodiacName": this.state.sel_horo
      }      
    }

    console.log(JSON.stringify(obj))
    const url = GLOBAL.BASE_URL + "horoscope_detail";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideLoading()

       console.log('---->'+JSON.stringify(responseJson))
        if (responseJson.status == true) {
          this.setState({
            hasData: 1,
            video_url: responseJson.data_a.video_url,
            vidTitle: responseJson.data_a.title

          })


        } else {

         // alert("No Horoscope available for the selected data.");
          this.setState({hasData: 0,
            sel_horo:'cancer',
            sel_year:'2020'
          })
        }
      })
      .catch(error => {
        this.hideLoading()
         this.setState({hasData: 0})
        console.error(error);
      });


    }



    componentWillUnmount(){
    //  console.log('unmount')
      this.setState({playVideo:false})
    }

    playVideo=(value)=>{
      this.setState({playVideo : value})
    }

    getIndex = (index) => {
//      alert(this.state.dropData[index].label)
        this.setState({sel_horo: this.state.dropData[index].value})
        // GLOBAL.gl_currYear = this.state.dropData[index].label
        this.getHoroscope(this.state.sel_horo)
    }

    getIndexs = (index) => {
//      alert(this.state.dropData[index].label)
        this.setState({sel_year: this.state.dropYear[index].value})
//        GLOBAL.gl_currYear = this.state.dropData[index].label
//        this.getHoroscope(this.state.sel_year)
    }

  render() {
      var yeah = this.state.vidTitle


       var videoid = getYouTubeID(this.state.video_url, {fuzzy: false});
     // console.log(videoid); 
      const htmls = `${yeah.description}`

  //    console.log('render')     

       if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }

    return (
<SafeAreaProvider>
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>

  {this.state.hoType == 'year' &&(
    <>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:18,margin:20}}>Select Year</Text>

      <Dropdown containerStyle={{width:'90%',alignSelf:'center', height:50, marginTop:hp(-4.5), marginBottom:hp(3)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndexs(index) }
                                label={''}
                                value={this.state.dropYearTitle}
                                data={this.state.dropYear}
                      />
      </>
    )}


    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:18,margin:20}}>Select Horoscope</Text>

      <Dropdown containerStyle={{width:'90%',alignSelf:'center', height:50, marginTop:hp(-4.5), marginBottom:hp(3)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndex(index) }
                                label={''}
                                value={this.state.dropTitle}
                                data={this.state.dropData}
                      />

{this.state.hasData == 1 && (
  <>

  <View>

<View style={{backgroundColor:'white',flexDirection:'column' , margin: 10, height: hp(40),borderRadius:6,width : wp(95), shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5,}}>


  <WebView
  style={{height: '80%', width: '100%'}}
  source={{uri: `https://www.youtube.com/embed/${videoid}?controls=1&showinfo=0`}}
/>
  

      <Text style={{fontSize:15,backgroundColor:'rgba(0,0,0,0.8)',borderBottomLeftRadius:6,borderBottomRightRadius:6,fontFamily:'Nunito-SemiBold',color:'white',padding:10}}>{yeah}</Text>

      </View>
{/*                <HTML html={htmls} 
                containerStyle ={{margin:10}}
                imagesMaxWidth={Dimensions.get('window').width} />*/}
                </View>
                </>
  )}



{this.state.hasData == 0 &&(


        <Text style={{fontSize:17, color:'black',marginLeft:wp(3),marginTop:hp(1),fontFamily:'Nunito-Bold',}}>No Horoscope for the selected choices!</Text>

  )}


                </ScrollView>
                </SafeAreaView>
     </SafeAreaProvider>

          );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#EEEEF0'
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

