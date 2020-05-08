import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StatusBar,
    ImageBackground,
    Linking,
    Platform,
    BackHandler
} from 'react-native';
var status ;
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Carousel,{ Pagination } from 'react-native-snap-carousel';
const window = Dimensions.get('window');
import Button from 'react-native-button';
type Props = {};
const GLOBAL = require('./Global');
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Thumbnail } from 'react-native-thumbnail-video';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import requestCameraAndAudioPermission from './requestCameraAndAudioPermission.js';
import { Dialogs_ex, DialogContent_ex, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import moment from 'moment'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigationFocus } from 'react-navigation';

var myBanners=[{
    id: '1',
    title: 'Upto 20% OFF on Products',
    artwork: require('./resources/ba1.png'),
    color:'#FFBDF7'
}, {
    id: '2',
    title: 'Upto 30% OFF on Products',    
    artwork: require('./resources/ba1.png'),
    color:'#A6DDEA'    
}, {
    id: '3',
    title: 'Upto 40% OFF on Products',
    artwork: require('./resources/ba1.png'),
    color:'#FFBDF7'    
},
]



class Home extends Component {
    state = {
      activeSlide:0,
      myBanners:[],
      visibles:false,
      visible_consult: false,
      live_details:{},
      response_consult:{},
      moviesList:[
      {
        id: '1',
        title: 'Astrology Classes',    
        artwork: require('./resources/hone.png'),
        colors:['#27f0f0','#303395'],
        animation: 'shake',
        duration: 2500,
      },
      {
        id: '2',
        title: 'Chat With Us',    
        artwork: require('./resources/htwo.png'),
        colors:['#fd0f77','#61258a'],
        animation: 'fadeIn',
        duration: 2100,
      },
      {
        id: '3',
        title: 'Call Now',    
        artwork: require('./resources/hthree.png'),
        colors:['#61d8f7','#ab64f6'],
        animation: 'rubberBand',
        duration: 2700,
      },
      {
        id: '4',
        title: 'Ask a question',    
        artwork: require('./resources/hfour.png'),
        colors:['#eabc85','#ed4443'],
        animation: 'swing',
        duration: 3100,        
      },
      {
        id: '5',
        title: 'Video Call',    
        artwork: require('./resources/hfive.png'),
        colors:['#faeb18','#fb121a'],
        animation: 'wobble',
        duration: 2400,
      },
      {
        id: '6',
        title: 'Life Prediction',    
        artwork: require('./resources/hsix.png'),
        colors:['#f8f8ba','#00abee'],
        animation: 'rotate',
        duration: 2800,        
      },
      {
        id: '7',
        title: 'Horoscope Matching',    
        artwork: require('./resources/hnine.png'),
        colors:['#ffff92','#009900'],
        animation: 'tada',
        duration: 3600,        
      },
      {
        id: '8',
        title: 'In Person Consultation',    
        artwork: require('./resources/heigh.png'),
        colors:['#009b90','#90218c'],
        animation: 'bounce',
        duration: 2900,        
      },
      {
        id: '9',
        title: 'Horoscope',    
        artwork: require('./resources/hseven.png'),
        colors:['#05f1e1','#d481ff'],
        animation: 'jello',
        duration: 3500,        
      },
      {
        id: '10',
        title: 'Free Astro Reports',    
        artwork: require('./resources/hten.png'),
        colors:['#f9f981','#04a5c1'],
        animation: 'lightSpeedIn',
        duration: 2300,        
      },
    ],
    videos:[],
    status :'',
    allrashi:[],
    newslist:[],
    wall:'0',

};


    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }


  get pagination () {
          const { entries, activeSlide } = this.state;
          return (
              <Pagination
                dotsLength={this.state.myBanners.length}
                activeDotIndex={activeSlide}
                containerStyle={{ alignSelf:'flex-start',backgroundColor: 'transparent', marginTop:-20, marginLeft:-10, }}
                dotStyle={{
                    width: 20,
                    height: 6,
                    borderRadius: 5,
                    marginHorizontal: -5,
                    backgroundColor: '#E60000'
                }}
                inactiveDotStyle={{
                  backgroundColor: '#DFDFDF'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
          );
      }


selectedProduct=(item, index)=>{
  console.log('hi')
}




_renderItems ({item, index}) {
//  alert(JSON.stringify(item))
        return (
            <View style={{width:wp('95%'), height:hp('20%'),borderRadius: 10,marginRight:10,marginTop:10, 
            elevation:5,backgroundColor:'white', shadowColor:'black',marginBottom:10, flexDirection:'column',
            justifyContent:'center'}}>


              <Image style={{width:'100%', height:'100%',borderRadius:5,}} source={{uri : item}}/>

    
            </View>
        );
    }

    selectedFirst = (index) =>{
      //alert(index)

        //consultType = 1 for chat, 2 for ask, 3 for video, 4 call

        if (index == 1){
            this.props.navigation.navigate('SubscribeList')
        }else if (index == 2){
            GLOBAL.headerTitle='BOOK CHAT'
            GLOBAL.consultType = '1'
            GLOBAL.consultMode = 'chat'
            this.props.navigation.navigate('BookingScreen')
        }else if (index == 3){
            GLOBAL.headerTitle='BOOK AUDIO CALL'
            GLOBAL.consultType = '4'
            GLOBAL.consultMode = 'audio'
            this.props.navigation.navigate('BookingScreen')
        }else if (index == 4){
            GLOBAL.headerTitle='ASK A QUESTION'
            GLOBAL.consultType = '2'            
            GLOBAL.consultMode = 'ask'   
            this.props.navigation.navigate('BookingScreen')
        }else if (index == 5){
            GLOBAL.headerTitle='BOOK VIDEO CALL'
            GLOBAL.consultType = '3'
            GLOBAL.consultMode = 'video'                    
            this.props.navigation.navigate('BookingScreen')
        }else if (index == 6){
            this.props.navigation.navigate('LifePred')
        }else if (index == 7){
//            this.setState({visibles:true})
           this.props.navigation.navigate('HoroscopeMatching')
        }else if(index == 8){
            GLOBAL.headerTitle='BOOKING'
            GLOBAL.consultType = '5'               
            GLOBAL.consultMode = 'inperson'
            this.props.navigation.navigate('BookingScreen')            
        }else if (index == 9){
            this.props.navigation.navigate('Horoscope')
        }else if (index == 10){
            this.props.navigation.navigate('FreeAstro')
        }
    }

_handleStateChange = state => {
    var d = new Date()
    GLOBAL.gldate = d.getDate(); // 11
    GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    GLOBAL.glyear =  d.getFullYear(); // 1933

    var time = moment().format('HH:mm')

    GLOBAL.glhour = moment().hour();
    GLOBAL.glminute = moment().minutes();

    console.warn('-->times' + GLOBAL.glhour +'-->'+GLOBAL.glminute)
    console.warn('-->'+ GLOBAL.gldate+'-->'+GLOBAL.glmonth+'-->'+GLOBAL.glyear)

    this.forConsult()
    this.loadHome()
 };

    openVideo=(itemData)=>{
//      alert(JSON.stringify(itemData))
      GLOBAL.videoDetails = itemData.item
      this.props.navigation.navigate('ViewVideo')
    }

    openProductListIn=(itemData)=>{
    //  alert(JSON.stringify(itemData))
      GLOBAL.catDetails = itemData.item
      this.props.navigation.navigate('ProductListIn')
    }


_renderItemVideos=(itemData)=>{
//  alert(JSON.stringify(itemData.item.image))
  return(
      <TouchableOpacity style={{width:wp('40%'),marginLeft:4,marginRight:4,marginBottom:4,
      height:hp('15%'),backgroundColor:'transparent'}}
      activeOpacity={0.99} onPress={()=>this.props.navigation.navigate('ViewVideo')}>
      <View style  = {{width:wp('40%'), height:hp('15%'),backgroundColor:'transparent',shadowColor: "#000",
          elevation:0, flexDirection:'column',alignItems:'center',borderRadius:5, justifyContent:'center'
      }}>


      <Thumbnail 
      imageWidth = {wp('40%')}
//      containerStyle ={{borderRadius:20, borderWidth:1, borderColor:'red'}}
      imageHeight = {'100%'}
      iconStyle = {{width:35, height:35, resizeMode:'contain'}}
      onPress={()=>{this.openVideo(itemData)}}
      url= {itemData.item.youtube_url} />

{/*      <YouTube
        apiKey={GLOBAL.YOUTUBE_API}
        videoId= {'KVZ-P-ZI6W4'}  // The YouTube video ID
        play={false}             // control playback of video with true/false
        fullscreen={false}       // control whether the video should play in fullscreen or inline
        loop={false}             // control whether the video should loop when ended
        controls={1}
        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => this.setState({ error: e.error })}

        style={{ height: '100%', width: '100%'}}
      /> */}
{/*      <Image style={{width:'100%', height:'100%', resizeMode:'stretch',}} source={{uri: itemData.item.image}}/> */}

{/*      <Image style={{width:'100%', height:'100%', resizeMode:'stretch',}} source={itemData.item.thumbnail_image}/> */}
      </View>
      </TouchableOpacity>
  )
}



_renderItemallrashi=(itemData)=>{
  return(
    <TouchableOpacity style={{width:wp('35%'), height:hp(20), margin:7,backgroundColor:'white',}}
    activeOpacity={0.99}
    onPress={()=> this.openProductListIn(itemData)}>
      <View style  = {{width:wp('35%'),height:'100%', backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'column',alignItems:'center',borderRadius:5, 
      }}>
    <Image style={{width:wp(22),backgroundColor:'transparent', height:hp(12), resizeMode:'cover',marginTop:hp(3)}} source={{uri : itemData.item.image}}/>
    <View style={{backgroundColor:'white', width:wp('35%'), height:hp('5%'), flexDirection:'column', marginTop:hp(0.3), borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
        <Text style = {{fontSize:15,fontFamily:'Nunito-Regular',color:'#000000',marginLeft:wp(3), marginTop:hp(1), marginRight:wp(1)}}
        numberOfLines={2}>
            {itemData.item.name}
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  )
}



    _renderItemproducts = ({item, index}) => {

        return (


            <TouchableOpacity style={{width:wp('47.3%'), margin:5, height:hp('13.5%')}}
            onPress={() => this.selectedFirst(item.id)}
            activeOpacity={0.99}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:8,
                    shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', justifyContent:'center'
                }}
                >
                    <Image source={item.artwork}
                           style  = {{width:45, height:45,alignSelf:'center',resizeMode:'contain'}}/>

                    <Text style = {{fontSize:14,marginTop:10,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'center',width:'95%'}}>
                        {item.title}
                    </Text>

                </View>

{/*<LinearGradient colors={item.colors}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{width:'100%', height:'100%', borderRadius:5, margin:3,
  justifyContent:'center', flexDirection:'row', alignItems:'center'}}
 >

 <Text style={{fontSize:25, color:'white',  fontFamily:'Nunito-ExtraBold', alignSelf:'center', textAlign:'center'}}>{item.title}</Text>

 <Animatable.Text style={{fontSize:30, width:'100%',color:'rgba(255,255,255,0.2)',textAlign:'center', fontFamily:'Nunito-ExtraBold', 
 position:'absolute', alignSelf:'center'}}
animation='pulse'
      easing='ease-out-sine'
      direction ='alternate-reverse'
      iterationCount="infinite"
      delay={1600} >
 {item.title}</Animatable.Text>


</LinearGradient> 
 */}

            </TouchableOpacity>
        )
    }

selectNews=(itemData, index)=>{
//  alert(index)
//  alert(JSON.stringify(itemData))
      //    if (index < this.state.newslist.length && this.flatListRef) {
      //  this.flatList_Ref.scrollToIndex({animated: true,index:index});
      // }
       this.flatList_Ref.scrollToIndex({animated: true, index:index});

}

_renderItemNewsList=({item, index})=>{
//  alert(JSON.stringify(itemData))
    return(
<TouchableOpacity style={{width:wp('45%'),margin:4, height:hp('6%'),}}
onPress={()=> this.selectNews(item, index)}>
  <View style  = {{width:'100%',height:'100%',backgroundColor:'white',
       flexDirection:'row',borderRadius:5, }}>
      <Text style = {{fontSize:13,marginLeft:10,fontFamily:'Nunito-Regular',color:'#8C9198',width:'95%', marginTop:5, borderBottomColor:'#f7f7f7', borderBottomWidth:1}}
      numberOfLines={2}>
          {item.title}
      </Text>
{/*      <Text style = {{fontSize:10,marginLeft:10,fontFamily:'BreeSerif-Regular',color:'pink',width:'95%'}}>
      Read more..
      </Text>
*/}


</View>
</TouchableOpacity>


    )

}


_renderItemNewsImageList=(itemData)=>{
//  alert(JSON.stringify(itemData))
    return(
        <Image style={{width:wp('45%'), height:hp('35%'), resizeMode:'cover', borderRadius:8, marginLeft:wp('2%')}}
        source={{uri :  itemData.item.image}}/>
    )

}



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

    joinConsult=()=>{



      console.log(JSON.stringify({
                    booking_id: GLOBAL.booking_id,
                    what: "2",
                    from: "user"
                  }))
//      this.setState({visible_consult: false})

      if(GLOBAL.is_chat_or_video_start =='1'){
                const url = GLOBAL.BASE_URL + "start_status_online_consult";

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify({
                    booking_id: GLOBAL.booking_id,
                    what: "2",
                    from: "user"
                  })
                })
                  .then(response => response.json())
                  .then(responseJson => {
//                    GLOBAL.bookingid = item.chat_g_id;

                    if (responseJson.status == true) {
                      if (GLOBAL.booking_type == "chat") {
                        this.props.navigation.navigate("Chat");
                      } else if(GLOBAL.booking_type == 'audio'){
//                        GLOBAL.bookingid = item.chat_g_id;
                        this.props.navigation.navigate("AudioCall", {
                          channelName: GLOBAL.chat_g_id,
                          onCancel: message => {
                            this.setState({
                              visible: true,
                              message
                            });
                          }
                        });
                      } else {
//                        GLOBAL.bookingid = item.chat_g_id;
                        this.props.navigation.navigate("VideoCall", {
                          channelName: GLOBAL.chat_g_id,
                          onCancel: message => {
                            this.setState({
                              visible: true,
                              message
                            });
                          }
                        });
                      }
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    //this.hideLoading()
                  });

      }else{

                      if (GLOBAL.booking_type == "chat") {
                        this.props.navigation.navigate("Chat");
                      } else if(GLOBAL.booking_type == 'audio'){
//                        GLOBAL.bookingid = item.chat_g_id;
                        this.props.navigation.navigate("AudioCall", {
                          channelName: GLOBAL.chat_g_id,
                          onCancel: message => {
                            this.setState({
                              visible: true,
                              message
                            });
                          }
                        });
                      } else {
//                        GLOBAL.bookingid = item.chat_g_id;
                        this.props.navigation.navigate("VideoCall", {
                          channelName: GLOBAL.chat_g_id,
                          onCancel: message => {
                            this.setState({
                              visible: true,
                              message
                            });
                          }
                        });
                      }

      }
    }


    forConsult=()=>{
      const url = GLOBAL.BASE_URL + "home_user_dynamics";
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,

        })
      })
        .then(response => response.json())
        .then(responseJson => {
//          console.log(JSON.stringify(responseJson));
//          this.hideLoading();
          if (responseJson.status == true) {



                GLOBAL.is_chat_or_video_start = responseJson.is_chat_or_video_start
                GLOBAL.booking_id = responseJson.booking_id
                GLOBAL.chat_g_id = responseJson.chat_g_id
                GLOBAL.is_booking = responseJson.is_booking
                GLOBAL.get_expert_name_ = responseJson.get_expert_name_
                GLOBAL.booking_type = responseJson.booking_type
                GLOBAL.expert_id = responseJson.expert_id
                GLOBAL.get_expert_name_image = responseJson.get_expert_name_image

            if(responseJson.is_booking == 1){
//              this.setState({visible_consult : true})
              this.dialogComponents.show()

            }
//            this.forConsult() // recursive

          } else {
            alert(
              "Something went wrong!"
            );
          }
        })
        .catch(error => {
  //        this.hideLoading();
          console.error(error);
        });

    }

    loadHome=()=>{
      const url = GLOBAL.BASE_URL + "home_user";
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,

        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(JSON.stringify(responseJson.user_detail));
//          this.hideLoading();
          if (responseJson.status == true) {

              var vid = responseJson.videos
//              var pa = require('./resources/hone.png')
  
              var resultant = vid.map(function(el) {
              var o = Object.assign({thumbnail_image: require('./resources/thumbnail.png')}, el);
              o.isActive = true;
              return o;
            })

         //   alert(JSON.stringify(resultant))
                // for (let i = 0 ; i < vid.length ; i++){
                //   vid[i].thumbnail_image = pa
                // }
//              alert(vid[0].thumbnail_image)

//              vid.push({thumbnail_image: require('./resources/hone.png') })
                  this.setState({ myBanners: responseJson.banners,
                    videos : resultant,
                    newslist : responseJson.news_list,
                    allrashi : responseJson.gems,
                    wall : responseJson.user_detail.wallet,
                    live_details : responseJson.live_details
                   })

                  GLOBAL.all_settings = responseJson.get_Settings
                  GLOBAL.userDetails = responseJson.user_detail
                  GLOBAL.helpline_number = responseJson.helpline_number
                  GLOBAL.walletAmount = responseJson.user_detail.wallet
                  GLOBAL.freePDF = responseJson.common_pdf
                  GLOBAL.glLanguage = responseJson.user_detail.language
                  GLOBAL.glChartStyle= responseJson.user_detail.chart_style
//                  alert(JSON.stringify(GLOBAL.all_settings))
          } else {
            alert(
              "Something went wrong!"
            );
          }
        })
        .catch(error => {
  //        this.hideLoading();
          console.error(error);
        });

    }

//     componentWillMount(){
// //      alert(GLOBAL.user_id)
//       // this.loadHome()
//       // this.forConsult()
//     }


    componentDidMount(){
//      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    var d = new Date()
    GLOBAL.gldate = d.getDate(); // 11
    GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    GLOBAL.glyear =  d.getFullYear(); // 1933
    GLOBAL.gl_currYear = d.getFullYear();
    var time = moment().format('HH:mm')

    GLOBAL.glhour = moment().hour();
    GLOBAL.glminute = moment().minutes();

    console.warn('-->times' + GLOBAL.glhour +'-->'+GLOBAL.glminute)
    console.warn('-->'+ GLOBAL.gldate+'-->'+GLOBAL.glmonth+'-->'+GLOBAL.glyear)

      if (Platform.OS === 'android') {                    //Request required permissions from Android
          requestCameraAndAudioPermission().then(_ => {
              console.log('requested!');
          });
        }

        var value =  AsyncStorage.getItem('username');
        value.then((e)=> {
            GLOBAL.name = e;
        })

        var valuew =  AsyncStorage.getItem('mobile');
        valuew.then((e)=> {
            GLOBAL.mobile = e;
        })
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        // this.props.navigation.addListener('willBlur',()=>{ //called when screen goes out of focus
        //   alert('ads')
        // });


//        this.dialogComponents.show()
//        this.loadHome()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }




    _handlePress() {

    }

    SearchFilterFunction=(text)=>{
      console.log('Search')
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      //  NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }


handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit KundliExpert app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  };
    openWallet=()=>{
      this.props.navigation.navigate('Wallet')

//      this.props.navigation.navigate('Chat')
    }

    handleConnectionChange = (isConnected) => {

            this.setState({ status: isConnected });
            if (this.state.status == false){
                alert('You are not connected to Internet')
            }
            console.log(`is connected: ${this.state.status}`);
        }


buttonOkMatch=()=>{
            this.setState({visibles:false})
            this.props.navigation.navigate('HoroscopeMatching')
 
}

buttonOkJoin=()=>{
            this.setState({visible_consult:false}) 
            this.dialogComponents.dismiss()
            this.joinConsult()
}


    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}
                                       size="large" color='#006FA5' />
                </View>
            )
        }
        console.log('render')
        return (
        <>
              <ScrollView style={styles.container}
              nestedScrollEnabled={true}>
                      <StatusBar backgroundColor={'#c70b0b'}/>
                          <ImageBackground style = {{width :wp('100%'),height:hp('20%')}}
                          source={require('./resources/home_bg.png')}>

                <View style ={{width:wp('100%'),flexDirection:'row',justifyContent:'space-between',height:hp('8%'), }}>
                    <View style={{margin:10, width:wp('95%'), height:'auto', flexDirection:'row',justifyContent:'space-between',}}>
                      <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                      <Image source={require('./resources/ham_ic.png')}
                             style  = {{width:30, height:30,margin:5,resizeMode:'contain'}}
                      />
                      </TouchableOpacity>



                    <Text style = {{width:wp('20%'),color:'white',fontSize: 17,fontFamily:'Nunito-SemiBold', alignSelf:'center',textAlign:'center',}}>
                    HOME
                    </Text>

                    <TouchableOpacity style={{width :wp('25.5%') ,height: hp('4.3%'),borderRadius:4, borderColor:'white', borderWidth:1.5,marginTop:5}}
                    onPress={() => this.openWallet()}>
                    <View style={{width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'center', height:'100%'}}>
                    <Image style = {{width :20 ,height: 20,resizeMode: 'contain',alignSelf:'center',marginLeft:-5 }}
                           source={require('./resources/wallet_ic.png')}/>
                    <Text style = {{color:'white',fontSize: 15,fontFamily:'Nunito-SemiBold',marginLeft:5, alignSelf:'center', }}>
                    ₹{this.state.wall}
                    </Text>                               
                    </View>
                    </TouchableOpacity>
                  </View>

                  </View>
                  </ImageBackground>

                    <Image style={{width:wp('20%'), height:hp('13%'),position:'absolute',right:wp('-5%'),top:hp('33%'), zIndex:0, resizeMode:'contain'}}
                    source={require('./resources/home_left.png')}/>

                    <Image style={{width:wp('20%'), height:hp('13%'),position:'absolute',left:wp('-5%'),top:hp('52%'), zIndex:0, resizeMode:'contain'}}
                    source={require('./resources/home_right.png')}/>

                  <View style = {{width :wp('100%'),alignSelf:'center',alignItems:'center',margin:0,marginTop:hp('-11.5%')}}>


                  <Carousel
                             ref={(c) => { this._carousel = c; }}
                             data={this.state.myBanners}
                             renderItem={this._renderItems}
                             sliderWidth={wp('95%')}
                             itemWidth={wp('95%')}
                             layout={'default'} layoutCardOffset={18}
                             onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                           />{this.pagination}


      {this.state.live_details.status == true && (

      <TouchableOpacity
      activeOpacity={0.99}
      onPress={()=>{this.props.navigation.navigate('LiveStream' ,{params: {params: this.state.live_details}})}}>
      <View style  = {{width:wp(92),height:hp(13), backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'column',alignItems:'center',borderRadius:5, alignSelf:'center', marginBottom:hp(3)
      }}>
    <Image style={{width:wp(11),backgroundColor:'transparent', height:hp(9), resizeMode:'contain',}} source={require('./resources/ic_live.png')}/>

    <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'#000000',}}
    numberOfLines={2}>
    Live Basic Program Start
    </Text>

      </View>
      </TouchableOpacity>

      )}



                    <View style={{width:wp('100%'), justifyContent:'space-between', flexDirection:'row', marginTop:hp('-3%')}}>



                    <FlatList style= {{flexGrow:0,marginTop:hp('1%'),}}
                              data={this.state.moviesList}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                    />


                    </View>


                    <View style={{width:wp('95%'), justifyContent:'space-between', flexDirection:'row', marginTop:hp('2%')}}>
                    <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',marginLeft:5, alignSelf:'flex-start'}}>
                    News
                    </Text>
                    </View>

                    <View style={{elevation:5,marginTop:hp('2%'), width:wp('95%'), height:hp('35%'), flexDirection:'row'}}>
                    <View style={{width:wp('48%'), height:hp('35%'), elevation:5, backgroundColor:'white', borderRadius:8}}>
                    <FlatList style={{flexGrow:0,}}
                              data={this.state.newslist}
                              nestedScrollEnabled={true}
                              numColumns={1}
                              horizontal={false}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemNewsList}
                    />
                    </View>
                    <FlatList style={{flexGrow:0,}}
                              data={this.state.newslist}
                              nestedScrollEnabled={true}
                              ref={ref => { this.flatList_Ref = ref;}}                              
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemNewsImageList}
                              extraData={this.state}
                    />

                    </View>


                    <View style={{width:wp('95%'), justifyContent:'space-between', flexDirection:'row', marginTop:hp('2%')}}>
                    <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',marginLeft:5, alignSelf:'flex-start'}}>
                    Videos
                    </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('VideosAll')}>
                   <Text style = {{color:'#E60000',fontSize: 14,fontFamily:'Nunito-SemiBold',}}>
                   View all</Text>
                   </TouchableOpacity>
                    </View>


                    <FlatList style= {{flexGrow:0,marginTop:hp('2%'),}}
                              data={this.state.videos}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemVideos}
                    />


                    <View style={{width:wp('95%'), justifyContent:'space-between', flexDirection:'row', marginTop:hp('2%')}}>
                    <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',marginLeft:5, alignSelf:'flex-start'}}>
                    Buy Gemstones
                    </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('ProductList')}>
                   <Text style = {{color:'#E60000',fontSize: 14,fontFamily:'Nunito-SemiBold',}}>
                   View all</Text>
                   </TouchableOpacity>
                    </View>



                    <FlatList style= {{flexGrow:0,marginTop:hp('2%')}}
                              data={this.state.allrashi}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemallrashi}
                              extraData ={this.state}
                    />



                  </View>


        <Dialog
            visible={this.state.visibles}
            onTouchOutside={() => {
              this.setState({ visibles: false });
            }}

          >
            <DialogContent>
            <View style={{flexDirection:'column', width:wp(60), height:hp(25), }}>
            <Image style={{width:140, height:140, resizeMode:'contain', alignSelf:'center', marginTop:hp(1)}} source={require('./resources/ic_match.png')}/>
            <Text style={{fontSize:15, color:'#8d8d8d',marginTop:hp(2), fontFamily:'Nunito-Bold', marginLeft:10, marginRight:10,
             lineHeight:20, height:'auto', textAlign:'center'}}>Get Full Report For Match Making</Text>
            </View>

            <Button
            containerStyle={{width:wp('50%'),padding:10, height:hp(6), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(4), marginBottom:hp(2)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonOkMatch}
            >
            OK
            </Button>

            </DialogContent>
          </Dialog>



{/*        <Dialog
            visible={this.state.visible_consult}
          >
            <DialogContent>
            <View style={{flexDirection:'column', width:wp(60), height:hp(25), }}>
            <Image style={{width:140, height:140, resizeMode:'contain', alignSelf:'center', marginTop:hp(1)}} source={require('./resources/ic_consultpop.png')}/>
            <Text style={{fontSize:15, color:'#8d8d8d',marginTop:hp(2), fontFamily:'Nunito-Bold', marginLeft:10, marginRight:10,
             lineHeight:20, height:'auto', textAlign:'center'}}>Your {GLOBAL.booking_type} session with KM Sinha has started.</Text>
            </View>

            <Button
            containerStyle={{width:wp('50%'),padding:10, height:hp(6), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(4), marginBottom:hp(2)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonOkJoin}
            >
            JOIN
            </Button>

            </DialogContent>
          </Dialog>
*/}
              </ScrollView>

                <DialogComponent
                    dialogStyle = {{backgroundColor:'transparent'}}
                    dismissOnTouchOutside={false}
                    dismissOnHardwareBackPress={false}
                    ref={(dialogComponents) => { this.dialogComponents = dialogComponents; }}>


            <View style={{flexDirection:'column', width:wp(65),alignSelf:'center',backgroundColor:'white', height:hp(40),borderRadius:12 }}>
            <Image style={{width:140, height:140, resizeMode:'contain', alignSelf:'center', marginTop:hp(1)}} source={require('./resources/ic_consultpop.png')}/>
            <Text style={{fontSize:15, color:'#8d8d8d',marginTop:hp(2), fontFamily:'Nunito-Bold', marginLeft:10, marginRight:10,
             lineHeight:20, height:'auto', textAlign:'center'}}>Your {GLOBAL.booking_type} session with KM Sinha has started.</Text>

            <Button
            containerStyle={{width:wp('50%'),padding:10, height:hp(6), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(4), marginBottom:hp(2)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonOkJoin}
            >
            JOIN
            </Button>
            </View>

            </DialogComponent>
</>              
        );
    }
}
export default withNavigationFocus(Home);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'white',
        width:wp('100%'),
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

})
