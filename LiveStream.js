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
  WebView,
  ActivityIndicator
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import VideoPlayer from 'react-native-video-controls';
const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from 'react-native-custom-headers';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import getYouTubeID from 'get-youtube-id';
import IndicatorCustom from './IndicatorCustom.js';
const equalWidth =  (width -20 )
const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${`UCwobzUc3z-0PrFpoRxNszXQ`}&eventType=live&type=video&key=${GLOBAL.YOUTUBE_API}`
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import {PulseIndicator} from 'react-native-indicators'
import Chat from './Chat'

export default class LiveStream extends Component {

static navigationOptions = {
          title: 'Video Detail',
          headerShown: false
      };


  constructor(props) {
    super(props)

    var gets = this.props.navigation.state.params.params.params
    this.apiKey = GLOBAL.opentok_api_key;
    this.sessionId = gets.session_id;
    this.token = gets.token;

    this.subscriberProperties = {
        subscribeToAudio: true,
        subscribeToVideo: true,
    };
    this.subscriberEventHandlers = {
        error: (error) => {
              console.log(`There was an error with the subscriber: ${error}`);
      },
    };

    this.sessionEventHandlers = {
        streamCreated: event => {
          const streamProperties = {...this.state.streamProperties, [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            style: {
              width: width,
              height: height,
            },
          }};
          this.setState({ streamProperties });
        },
    };
    this.state = {
      loading:'',
      about:'',video_details:GLOBAL.videoDetails, playVideo:false, related:[],
      streamProperties: {},
    }
  }

   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
    this.showLoading()
    this.timeoutCheck = setTimeout(() => {
        this.hideLoading()
   }, 3000);


//      console.log(this.props.navigation.state.params)
   //   this.showLoading()
//       console.log(YOUTUBE_API)
//     fetch(`${YOUTUBE_API}`)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.hideLoading()
//         if (responseJson && responseJson.items[0])
//         {
//           this.setState({ videoId: responseJson.items[0].id.videoId })
// //          alert(this.state.videoId)
//           alert('Live stream available')

//         }else{
//           alert('Live stream shutdown by the host')
//         }
//       })
//       .catch((error) => {
//         console.error(error)
//       })
  }





componentWillUnmount(){
//  alert('unmount')

}

playVideo=(value)=>{
  this.setState({playVideo : value})
}


  render() {
       var yeah = this.props.navigation.state.params.params
       console.log(JSON.stringify(yeah.params))

//       var videoid = getYouTubeID(yeah.youtube_url, {fuzzy: false});
//   //    console.log(videoid);      

       if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }

    return (
      <View style={styles.container}>

           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'LIVE STREAM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


      <View style={{ flex: 1, flexDirection: 'row',}}>


        <OTSession apiKey={GLOBAL.opentok_api_key} sessionId={yeah.params.session_id} token={yeah.params.token}
        eventHandlers={this.sessionEventHandlers}>
          <OTSubscriber style={{ width: width, height: height , backgroundColor:'pink'}}
              properties={this.subscriberProperties}
              eventHandlers={this.subscriberEventHandlers}
              streamProperties={this.state.streamProperties}     

           />

        </OTSession>


        </View>


        <View style={{position:'absolute', right:10, bottom:50}}>
              <Image style={{width:70, height:70, borderRadius:35}}
              source={{uri : yeah.params.image}}
              />

              <Text style = {{marginTop:5,color : 'black',fontSize: 17, height:'auto',
              fontFamily:'Nunito-Light'}} >
              {yeah.params.name}
              </Text>

              <View style={{flexDirection:'row',width:wp(18),marginLeft:-10, }}>
            <PulseIndicator color='#E60000' size={25} style={{}}/>

              <Text style = {{color : 'black',fontSize: 17, height:'auto',marginLeft:-10,
              fontFamily:'Nunito-Light'}} >
              LIVE
              </Text>
              </View>

            </View>
            <Chat/>
            </View>
          );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#EEEEF0'
  },
});
