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
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const { width, height } = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from 'react-native-custom-headers';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import getYouTubeID from 'get-youtube-id';
import IndicatorCustom from './IndicatorCustom.js';
const equalWidth =  (width -20 )
const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${`UCwobzUc3z-0PrFpoRxNszXQ`}&eventType=live&type=video&key=${GLOBAL.YOUTUBE_API}`

export default class LiveStream extends Component {

static navigationOptions = {
          title: 'Video Detail',
          headerShown: false
      };


  constructor(props) {
    super(props)
    this.state = {
      loading:'',
      about:'',video_details:GLOBAL.videoDetails, playVideo:false, related:[]
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
      console.log(YOUTUBE_API)
    fetch(`${YOUTUBE_API}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.hideLoading()
        if (responseJson && responseJson.items[0])
        {
          this.setState({ videoId: responseJson.items[0].id.videoId })
//          alert(this.state.videoId)
          alert('Live stream available')

        }else{
          alert('Live stream shutdown by the host')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }



  _keyExtractor = (item, index) => item.productID;


openVideo=(itemData)=>{
//  alert(JSON.stringify(itemData))
  GLOBAL.postId = itemData.item.post_id
  this.props.navigation.push('ViewVideo')
}

  renderItem = (itemData) => {
//    alert(JSON.stringify(itemData))
    return (
      <TouchableNativeFeedback onPress={()=> this.openVideo(itemData)}>
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 0.5,flexDirection:'row',height: 'auto',
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:8,  width : width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:1, elevation:5}}>

    <Image style={{width:130, height:130, borderColor: 'transparent', borderWidth: 1, borderRadius: 8}} source={{uri: itemData.item.thumbnail}}/>
    <View style={{width: 130, position: 'absolute', alignSelf: 'center',}}>
    <Image style={{width:80, height:40, resizeMode: 'contain', alignSelf: 'center', }} source={require('./resources/b1.png')}/>
    </View>

    <View style={{flexDirection:'column', margin:10, width: '62%',}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
     <Text style={{fontSize:15, color:'#4C5361',fontFamily: 'AvenirLTStd-Roman', width: '85%'}}
     numberOfLines={3}>{itemData.item.subject}</Text>
{/*
     <TouchableOpacity>
     <Image style={{width: 25, height: 25, resizeMode: 'contain'}} source={require('./resources/favo.png')}/>
     </TouchableOpacity>
     */}
     </View>
     <Text style={{fontSize:13, marginRight:10,  marginTop: 10, fontFamily: 'AvenirLTStd-Book'}} numberOfLines={3}>{itemData.item.body}</Text>


</View>
</View>

</TouchableNativeFeedback>

    )
  }


componentWillUnmount(){
//  alert('unmount')
  this.setState({playVideo:false})
}

playVideo=(value)=>{
  this.setState({playVideo : value})
}


  render() {
      var yeah = this.state.video_details
//      console.log(JSON.stringify(yeah))

      var videoid = getYouTubeID(yeah.youtube_url, {fuzzy: false});
  //    console.log(videoid);      

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

      <ScrollView>
     <View style={{flex:1, flexDirection:'column',backgroundColor:'white'}}>


      <View style={{backgroundColor:'white',flexDirection:'column' , flex: 1 ,margin: 10, height: hp(40),borderRadius:6,width : wp(95), shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>

 {/*     <VideoPlayer style={{ height:hp(20),width:wp('95%'),borderTopLeftRadius:6, borderTopRightRadius:6}}
      onEnd={()=> this.setState({playVideo:false})}
      source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
      navigator={ this.props.navigator }
      />
*/}
      <YouTube
              style={{ height:hp(20),width:wp('95%'),borderTopLeftRadius:6, borderTopRightRadius:6 }}
              apiKey={GLOBAL.YOUTUBE_API}
              videoId= {this.state.videoId}  // The YouTube video ID
              play={false}             // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={false}             // control whether the video should loop when ended
              controls={1}
              onReady={e => this.setState({ isReady: true })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}

              style={{ height: '85%', width: '100%'}}/>


      <Text style={{fontSize:15,backgroundColor:'rgba(0,0,0,0.2)',borderBottomLeftRadius:6,borderBottomRightRadius:6,fontFamily:'Nunito-SemiBold',color:'white',padding:10}}
      numberOfLines={2}>YouTube LiveStream</Text>
      </View>


        </View>


            </ScrollView>

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
 appBar: {
   backgroundColor:'black',
   height: APPBAR_HEIGHT,
 },
});
