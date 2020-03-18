import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar
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
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Carousels from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
import StepIndicator from 'react-native-step-indicator';

const labels = ["Booked","Confirmed","Completed"];

var myBanners=[{
    id: '1',
    title: 'Upto 20% OFF on Products',
    artwork: require('./resources/b1.png'),
    color:'#FFBDF7'
}, {
    id: '2',
    title: 'Upto 30% OFF on Products',    
    artwork: require('./resources/b1.png'),
    color:'#A6DDEA'    
}, {
    id: '3',
    title: 'Upto 40% OFF on Products',
    artwork: require('./resources/b1.png'),
    color:'#FFBDF7'    
},
]


const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'green',
  stepStrokeUnFinishedColor: 'grey',
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: 'grey',
  stepIndicatorCurrentColor: 'green',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: 'green',
  stepIndicatorLabelUnFinishedColor: 'grey',
  labelColor: 'black',
  labelSize: 13,
  currentStepLabelColor: 'green'
}
var feedbacks = [];

export default class TenHome extends Component {
    state = {
      banners:[],
      feedbacks:[],
      activeSlide:0,
        moviesList :[
            {
                title :'Home Cleaning',
                selected :'#E9ECF7',
                image:require('./resources/home-c.png')
            },
            {
                title :'Office Cleaning',
                selected :'#E9ECF7',
                image:require('./resources/car-service.png')
            },
            {
                title :'Car Cleaning',
                selected :'#E9ECF7',
                image:require('./resources/car-service.png')
            },
        ],
        currentPosition: 0
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



selectedProduct=(item, index)=>{
  console.log('hi')
}


renderPage =(items, key) => {
alert(items)
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: items }} />
            </View>
        );
    }


_renderItems ({item, index}) {
        return (
            <View style={{width:window.width-20, height:190,marginRight:10,marginTop:10, 
              shadowColor:'#fc901c',marginBottom:10, flexDirection:'column',
            justifyContent:'center', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>
              <Image style={{width:'100%', height:'100%',resizeMode:'stretch', marginTop:5}} source={{uri:item.image}}/>
            </View>
        );
    }

_renderItemsfeed ({item, index}) {
//  alert(JSON.stringify(item))
        return (
            <View style={{width:window.width-20, height:170,marginRight:10,marginTop:10, 
              shadowColor:'#fc901c',marginBottom:10, flexDirection:'column',backgroundColor:'purple',
            justifyContent:'center', borderRadius:10, borderWidth:1, borderColor:'transparent', alignItems:'center', justifyContent:'center'}}>
              <View style ={{width:'90%', flexDirection:'column',alignItems:'center', justifyContent:'center', height:'100%', marginTop:5}}>
              <Image style={{width:50, height:50, borderRadius:25, }} source={{uri:item.user_image}}/>
              <Text style = {{fontSize:14,margin:1,fontFamily:'BreeSerif-Regular',color:'white',}}>
                  {item.name}
              </Text>
              <Text style = {{fontSize:14,margin:1,fontFamily:'BreeSerif-Regular',color:'white',textAlign:'center'}}
              numberOfLines={2}>
                  {item.comments}
              </Text>

            </View>
            </View>

        );
    }

    hideLoading() {
        this.setState({loading: false})
    }
    selectedFirst = (index) =>{
             this.props.navigation.navigate('PanditList')


    }


  get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={this.state.feedbacks.length}
              activeDotIndex={activeSlide}
              containerStyle={{ alignSelf:'center',backgroundColor: 'transparent', marginTop:-60, marginLeft:-20, }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: -5,
                  backgroundColor: 'white'
              }}
              inactiveDotStyle={{
                backgroundColor: 'rgba(0,0,0,10)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }


_renderItemre =(itemData)=>{
//  console.log(JSON.stringify(itemData))
  return(
            <View style={{width:window.width-20, height:150,marginRight:10,marginTop:10, 
              shadowColor:'#fc901c',marginBottom:10, flexDirection:'column',
            justifyContent:'center', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>
              <Image style={{width:'100%', height:'100%',resizeMode:'cover', marginTop:5, borderRadius:5}} source={{uri:itemData.item.image_url}}/>
                    <Text style = {{fontSize:20,margin:1,fontFamily:'BreeSerif-Regular',color:'white',width:'95%', position:'absolute', bottom:10, left:10}}>
                        {itemData.item.title}
                    </Text>

            </View>

  )
}


    _renderItem = (itemData) => {

        return (
            <TouchableOpacity style={{width:'93%', margin:5}}
            onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:'100%',height:150,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:5,
                    shadowRadius: 3.84,elevation:5, flexDirection:'column',alignItems:'center', justifyContent:'center'
                }}>
                    <Image source={itemData.item.image}
                           style  = {{width:'100%', height:'100%',resizeMode:'cover'}}/>

                    <Text style = {{fontSize:20,margin:1,fontFamily:'BreeSerif-Regular',color:'white',width:'95%', position:'absolute', bottom:10}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }

_bookingRender=(itemData)=>{
  return(
            <View style={{width:window.width-20, height:150,marginRight:10,marginTop:10, 
              shadowColor:'#fc901c',marginBottom:10, flexDirection:'column',backgroundColor:'#e7e7e7',
            justifyContent:'center', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>


                    <Text style = {{fontSize:20,margin:1,fontFamily:'BreeSerif-Regular',color:'black',width:'95%'}}>
                        {itemData.item.job_status}
                    </Text>
                  {itemData.item.status == '3'  && itemData.item.status == '4' &&(
                    <Text style = {{fontSize:20,margin:1,fontFamily:'BreeSerif-Regular',color:'black',width:'95%'}}>
                      YOu is_cancelled
                    </Text>
                  )}
                  {itemData.item.status !='3' &&  itemData.item.status != '4' &&( 
                  <StepIndicator
                           customStyles={customStyles}
                           currentPosition={parseInt(itemData.item.status)}
                           labels={labels}
                           stepCount={3}
                      />


                  )}
            </View>


  );
}

        loadHome(){
           const url = "http://139.59.76.223/tenon/api/customers/gethomepage"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':'c3a3cf7c211b7c07b2495d8aef9761fc',
             },
            body: JSON.stringify({
                "user_id" : 1,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             //   alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                  this.setState({bu_models : responseJson.business_models})
                  this.setState({banners : responseJson.banners})
                  this.setState({rece_viewd : responseJson.recently_viewed})
                  this.setState({feedbacks : responseJson.feedbacks})
                  feedbacks = responseJson.feedbacks
                 // console.log(JSON.stringify(feedbacks))

                }else {
                   // alert('No Data Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });


        }


    getSelections = (type) =>{
        GLOBAL.type = type;
        this.setState({visible:false})
        this.props.navigation.navigate('CreateRequest')

    }
    componentDidMount(){
        this.loadHome()
        this.loadEx()
    }

    loadEx(){
       const url = 'http://139.59.76.223/tenon/api/customers/jobs'

                   fetch(url, {
                       method: 'POST',
                       headers: {
                         'x-api-key':'c3a3cf7c211b7c07b2495d8aef9761fc',
                        'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                           user_id : 1


                       }),
                   }).then((response) => response.json())
                       .then((responseJson) => {



                      console.log(JSON.stringify(responseJson))


                           if (responseJson.status == true) {
                             this.setState({userDetail:responseJson.enquiries})
                              this.setState({booking:responseJson.my_bookings})

                           }else {
                               alert('Unable to get Connect You. Please try again after Sometime.')
                           }
                       })
                       .catch((error) => {
                           console.error(error);
                       });
    }




    _handlePress() {

    }

    SearchFilterFunction=(text)=>{
      console.log('Search')
    }

    componentWillUnmount() {
      //  NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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
        return (

              <KeyboardAwareScrollView style={styles.container}
              >
                  <View style = {{width :'100%',backgroundColor:'#7B2672',flexDirection: "column", height:300,borderBottomRadius:50, borderBottomLeftRadius:120, borderBottomRightRadius:80, }}>

                  <View style ={{width:'100%',flexDirection:'row',justifyContent:'space-between',height:60}}>

                    <Image source={require('./resources/home-logo.png')}
                           style  = {{width:'40%', height:80,marginLeft:15,marginRight:15,marginTop:10,resizeMode:'contain'}}
                    />

                    <View style={{flexDirection:'row', margin:20}}>
                    <Image style = {{width :30 ,height: 30,resizeMode: 'contain',margin:10}}
                           source={require('./resources/cart.png')}/>
                    </View>

                  </View>

                    <View style = {{margin :10,width:window.width - 40 ,height:45,borderRadius:20,alignSelf:'center',flexDirection:'row',backgroundColor:'grey',marginTop:50}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./resources/search_ic.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45, color:'white'}}
                                   placeholderTextColor='white'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}
                                   value={this.state.height}
                                   placeholder={"Search for a service"}/>

                    </View>


                  </View>

                  <View style = {{width :'100%',alignSelf:'flex-start',margin:10, marginTop:'-30%',}}>

                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.moviesList}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}                              
                    />

                    <Text style = {{color:'black',fontSize: 20,fontFamily:'BreeSerif-Regular',marginLeft:5, alignSelf:'flex-start', marginTop:20}}>
                      Offers
                    </Text>                               

                  <Carousel
                             ref={(c) => { this._carousel = c; }}
                             data={this.state.banners}
                             renderItem={this._renderItems}
                             sliderWidth={window.width-20}
                             itemWidth={window.width-20}
                             containerCustomStyle={{
                                  flexGrow: 0,
                                }}
                             layout={'default'} layoutCardOffset={18}
                             onSnapToItem={(index) => this.setState({ activeSlides: index }) }
                           />


                    <View style={{width:'95%', justifyContent:'space-between', flexDirection:'row', marginTop:10}}>
                    <Text style = {{color:'black',fontSize: 18,fontFamily:'BreeSerif-Regular',marginLeft:5, alignSelf:'flex-start'}}>
                    Recently Viewed Services
                    </Text>
                    </View>


                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.rece_viewd}
                              horizontal ={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemre}                              
                    />


                  <Carousel
                             ref={(c) => { this._carousel = c; }}
                             data={this.state.feedbacks}
                             renderItem={this._renderItemsfeed}
                             sliderWidth={window.width-20}
                             itemWidth={window.width-20}
                             containerCustomStyle={{
                                  flexGrow: 0,
                                }}
                             layout={'default'} layoutCardOffset={18}
                             onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                           />{ this.pagination }

                        <Image source={require('./resources/car-service.png')}
                           style  = {{width:window.width-20, height:170,resizeMode:'cover', borderRadius:10}}/>

                    </View>


                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.booking}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._bookingRender}                              
                    />

             </KeyboardAwareScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor :'#F6F8F9',
        width:window.width,
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
