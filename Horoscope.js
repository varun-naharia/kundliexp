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
import YouTubes, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import HTML from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from 'react-native-custom-headers';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import ViewVideoHoroscope from './ViewVideoHoroscope.js';
import IndicatorCustom from './IndicatorCustom.js';
const equalWidth =  (width -20 )
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
      <View style={{backgroundColor:'white',flexDirection:'column' , flex: 1 ,margin: 10, height: hp(40),borderRadius:6,width : wp(95), shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>

      <VideoPlayer style={{ height:hp(20),width:wp('95%'),borderTopLeftRadius:6, borderTopRightRadius:6}}
      onEnd={()=> this.setState({playVideo:false})}
      source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
      navigator={ this.props.navigator }
      />

      <Text style={{fontSize:15,backgroundColor:'rgba(0,0,0,0.2)',borderBottomLeftRadius:6,borderBottomRightRadius:6,fontFamily:'Nunito-SemiBold',color:'white',padding:10}}>Mangal ka Rashi Parivartan 2019 | Astrologer KM Sinha - Kundali Expert.</Text>
      </View>
);
export default class Horoscope extends Component {

static navigationOptions = {
          title: 'Video Detail',
          header: null
      };


  constructor(props) {
    super(props)
    this.state = {
      loading:'',
      about:'',video_details:'', playVideo:false,index:0, related:[],
      routes: [
          { key: 'first', title: 'Daily' },
          { key: 'second', title: 'Weekly' },
          { key: 'third', title: 'Monthly' },
          { key: 'fourth', title: 'Yearly' },
      ],
      horosigns_list:[{
        id: '1',
        title: 'Aries',    
        artwork: require('./resources/ho_aries.png')
      },
      {
        id: '2',
        title: 'Taurus',    
        artwork: require('./resources/ho_taurus.png')
      },
      {
        id: '3',
        title: 'Gemini',    
        artwork: require('./resources/ho_gemini.png')
      },
      {
        id: '4',
        title: 'Cancer',    
        artwork: require('./resources/ho_canc.png')
      },
      {
        id: '5',
        title: 'Leo',    
        artwork: require('./resources/ho_leo.png')
      },
      {
        id: '6',
        title: 'Virgo',    
        artwork: require('./resources/ho_virgo.png')
      },
      {
        id: '7',
        title: 'Libra',    
        artwork: require('./resources/ho_libra.png')
      },
      {
        id: '8',
        title: 'Scorpio',    
        artwork: require('./resources/ho_scorpio.png')
      },
      {
        id: '9',
        title: 'Sagittairus',    
        artwork: require('./resources/ho_sagittairus.png')
      },

]      
    }
  }

   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {


  }


  _keyExtractor = (item, index) => item.productID;


openVideo=(itemData)=>{
//  alert(JSON.stringify(itemData))
  GLOBAL.postId = itemData.item.post_id
//  this.props.navigation.push('ViewVideo')
  this.props.navigation.navigate('HoroscopeDetails')

}


    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return     <ViewVideoHoroscope
                          navigation={this.props.navigation}
                          getRoute = {'day'}
                          key = {route.key}
                          ytFunc = {<YouTubes
              apiKey={GLOBAL.YOUTUBE_API}
              videoId= {'iCNYsuIBZtw'}  // The YouTube video ID
              play={false}              // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={false}             // control whether the video should loop when ended
              controls={1}
              onReady  = {this.handleReady}
              showFullscreenButton={true}
              onChangeState={e => console.log(e)}
              onChangeQuality={e => 
                console.log(e)}
              onError={e => 
                console.log(e)}

              style={{ height: '80%', width: 300,alignSelf: 'stretch',borderTopLeftRadius:6, borderTopRightRadius:6}}/>
}/>
;
            case 'second':
                return <ViewVideoHoroscope
                          navigation={this.props.navigation}
                          getRoute = {'week'}
                           key = {route.key}/>;
            case 'third':
                return <ViewVideoHoroscope
                          navigation={this.props.navigation}
                          getRoute = {'month'}/>;

            case 'fourth': return <ViewVideoHoroscope
                          navigation={this.props.navigation}
                          getRoute = {'year'}/>;
            default:
                return null;
        }
    };

  renderItem = (itemData) => {
    //alert(JSON.stringify(itemData))
    return (
      <TouchableNativeFeedback onPress={()=> this.openVideo(itemData)}>
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 0.5,flexDirection:'column',height: 'auto',
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:8,
    margin:5,marginTop:15,marginBottom:1,}}>
    <View style={{width:110, height:110, borderColor: 'transparent', borderWidth: 0.001, borderRadius: 55,elevation:8, backgroundColor:'white', alignSelf:'center'}}>
    <Image style={{width:'100%', height:'100%',}} source={itemData.item.artwork}/>
    </View>
     <Text style={{fontSize:15, alignSelf:'center',  marginTop: 10, fontFamily: 'Nunito-SemiBold'}} numberOfLines={3}>{itemData.item.title}</Text>

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

    renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: 'white', elevation: 0, borderColor: 'transparent', height:50,}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 13, fontFamily:'Nunito-Regular'}}

                {...props}
                indicatorStyle={{backgroundColor: '#E60000', height: 2.5,}}
            />
        );
    }

  render() {
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
           headerName={'HOROSCOPE'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#800000' }}
                    style={{ backgroundColor: 'white', flexGrow:1 }}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    pressColor={'#E60000'}
                    // onSwipeStart ={(index)=> this.setState({ index })}
                    // onSwipeEnd ={()=> this.hideLoading()}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

{/*      <ScrollView>
     <View style={{flexDirection:'column',backgroundColor:'white', flex:1}}>







        </View>


            </ScrollView>
*/}
            </View>
          );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white'
  },
});

