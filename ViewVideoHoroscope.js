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
  TouchableNativeFeedback,
  ActivityIndicator
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

export default class ViewVideoHoroscope extends Component {

static navigationOptions = {
          title: 'Video Detail',
          headerShown: false
      };


  constructor(props) {
    super(props)
    this.state = {
      loading:false,
      fortype:'',
      hasData:0,
      video_url:'',
      height: 215,
      hoType : this.props.getRoute,
      about:'',video_details:'', playVideo:false,
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
//      this.getHoroscope(this.state.hoType)
//    console.log('mount')
            // this.showLoading()

//     this.props.navigation.addListener('willFocus',this._handleStateChange);
    }

    // componentWillReceiveProps(){
    //   console.log('will')
    //   this.getHoroscope(this.state.hoType)

    // }


componentWillReceiveProps(nextProps){
//  alert(JSON.stringify(nextProps))
    // if(nextProps.getRoute=='day'){
    //   console.log('------>'+'day')
    //   this.getHoroscope('day');
    // }
   //   alert(this.state.hoType)
//      this.setState({hoType : nextProps.getRoute });

  //    this.getHoroscope(this.state.hoType);
      this.showLoading()
this.timeoutCheck = setTimeout(() => {
      this.getHoroscope(this.state.hoType);
   }, 300);            

  }


   //  static getDerivedStateFromProps(nextProps, prevState){
   //    console.log('get')
   //     if(nextProps.hoType!==prevState.hoType){
   //       return { hoType: nextProps.hoType};
   //    }
   //    else return null;
   //  }

   // componentDidUpdate(prevProps, prevState) {
   //  console.log('didupate')
   //    if (prevState.hoType !== this.state.hoType) {
   //      // let firebaseRef=firebase.database().ref(this.state.path);
   //      // this.setState({firebaseRef});
   //      // this.getData(firebaseRef);

   //      this.getHoroscope(prevState.hoType)
   //    }
   //  }

// _handleStateChange = state => {
//    alert('hoho')
// //   this.getMoviesFromApiAsync()
//  };

    getHoroscope=(route)=>{

    const url = GLOBAL.BASE_URL + "horoscope_detail";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "for_": route // or "day" or "month" or "week"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideLoading()

       // console.log('---->'+JSON.stringify(responseJson))
        if (responseJson.status == true) {
          this.setState({hasData: 1})

          this.setState({fortype: responseJson.data_a})
          this.setState({video_url : responseJson.data_a.video_url})
        } else {
//          alert("Something went wrong!");
          this.setState({hasData: 0})
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


  render() {
      var yeah = this.state.fortype


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
{this.state.hasData == 1 && (
  <>
<View style={{backgroundColor:'white',flexDirection:'column' , margin: 10, height: hp(40),borderRadius:6,width : wp(95), shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5,}}>

{/*      <VideoPlayer style={{ height:'100%',width:'100%',borderTopLeftRadius:6, borderTopRightRadius:6}}
      onEnd={()=> this.setState({playVideo:false})}
      source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
      navigator={ this.props.navigator }
      />

    <Text>{this.props.getRoute}</Text>
      <YouTubes
              apiKey={GLOBAL.YOUTUBE_API}
              videoId= {videoid}  // The YouTube video ID
              play={false}              // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={false}             // control whether the video should loop when ended
              controls={1}
              onReady  = {this.handleReady}
              showFullscreenButton={true}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => 
                console.log(e)}

              style={{ height: '80%', width: 300,alignSelf: 'stretch',borderTopLeftRadius:6, borderTopRightRadius:6}}/>
    <Text>{yeah.for_}</Text>
*/}



  <WebView
  style={{height: '80%', width: '100%'}}
  source={{uri: `https://www.youtube.com/embed/${videoid}?controls=1&showinfo=0`}}
/>
  

      <Text style={{fontSize:15,backgroundColor:'rgba(0,0,0,0.2)',borderBottomLeftRadius:6,borderBottomRightRadius:6,fontFamily:'Nunito-SemiBold',color:'white',padding:10}}>{yeah.title}</Text>

      </View>
{/*                <HTML html={htmls} 
                containerStyle ={{margin:10}}
                imagesMaxWidth={Dimensions.get('window').width} />*/}
                </>
  )}

{this.state.hasData != 1 &&(

        <Text style={{fontSize:17, color:'black',marginLeft:wp(3),marginTop:hp(1),fontFamily:'Nunito-Bold',}}>No Horoscope for today!</Text>

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

