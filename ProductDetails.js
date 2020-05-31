import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
type Props = {};
export default class ProductDetails extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           headerShown: false,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            product_banner_images: GLOBAL.prodDetails.imaggess,
            allDetails : GLOBAL.prodDetails,
            checkincart: GLOBAL.prodDetails.is_cart,
            activeSlide:0,

        }
    }


      get pagination () {
          const { entries, activeSlide } = this.state;
          return (
              <Pagination
                dotsLength={this.state.product_banner_images.length}
                activeDotIndex={activeSlide}
                containerStyle={{ alignSelf:'flex-start',backgroundColor: 'transparent', marginTop:-20, marginLeft:20, }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: -5,
                    backgroundColor: '#FF0000'
                }}
                inactiveDotStyle={{
                  backgroundColor: 'grey'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
          );
      }

    _keyExtractor = (item, index) => item.productID;



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }

    getReviews= () =>{

    }


    _renderItems ({item, index}) {
        return (
            <View style={{width:wp(100), height:hp(30), flex:1,
              backgroundColor:'#EEEEF0', flexDirection:'column',justifyContent:'center', alignItems:'center'
            }}>

              <Image style={{width:wp(100), height:hp(20),alignSelf:'center',marginTop:hp(2), resizeMode:'contain'}} source={{uri : item}}/>

            </View>
        );
    }


    buttonClickListenerAdd =()=>{
         const url = GLOBAL.BASE_URL + "add_to_cart_gems";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: this.state.allDetails.id,
        order_price: this.state.allDetails.base_price,
        user_id: GLOBAL.user_id,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
//      alert(JSON.stringify(responseJson))
        if (responseJson.status == true) {
            alert('Added to cart')
            this.setState({checkincart : '1'})
        } else {
            this.setState({checkincart : '0'})
            alert("Already in cart!");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }


    buttonClickListenerCart=()=>{
//        alert('OPen')
        this.props.navigation.navigate('Cart')
    }

    render() {
 //       alert(JSON.stringify(GLOBAL.prodDetails))
        var yeah = GLOBAL.prodDetails
        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

        <ScrollView style={{flex:1, flexDirection:'column',backgroundColor:'#EEEEF0',width:wp('100%')}}>

        {this.state.product_banner_images.length == 0 && (

              <Image style={{width:wp(100), height:hp(20),alignSelf:'center',marginTop:hp(5), resizeMode:'contain'}} source={{uri : yeah.image}}/>

            )}

            {this.state.product_banner_images.length!=0 && (
              <Carousel
                 ref={(c) => { this._carousel = c; }}
                 data={this.state.product_banner_images}
                 renderItem={this._renderItems}
                 sliderWidth={window.width}
                 containerCustomStyle={{flexGrow:1,}}
                 itemWidth={window.width}
                 layout={'default'} layoutCardOffset={18}
                 onSnapToItem={(index) => this.setState({ activeSlide: index }) }
               />
                )}
        <TouchableOpacity style={{width:30, height:30, position:'absolute', left:wp(4), top:hp(4)}}
        onPress={()=> this.props.navigation.goBack()}>
        <Image style={{width:25, height:25, resizeMode:'contain',}} source={require('./resources/backs.png')}/>
        </TouchableOpacity>

        <View style={{width:wp('99%'),alignSelf:'center',backgroundColor:'white',flex:1/2,elevation:5,
        borderTopLeftRadius:30, borderTopLeftWidth:1, borderTopLeftColor:'transparent',
        borderTopRightRadius:30, borderTopRightWidth:1, borderTopRightColor:'transparent', marginTop:hp('7%')}}
        contentContainerStyle={{backgroundColor:'transparent',}}>

        <Text style = {{color:'black',fontSize: 20,fontFamily:'Nunito-Bold', alignSelf:'flex-end', marginRight:wp(8), marginTop:hp(-9.5)}}>
        ₹ {yeah.base_price}/-
        </Text>

      <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBoldItalic',color:'grey',alignSelf:'flex-end', marginRight:wp(8),}}>
      (Prices are inclusive of Tax)
      </Text>

        <TouchableOpacity style={{width:55, height:55,alignSelf:'flex-end',marginTop:hp(1),marginRight:wp(9)}}
        onPress={()=> this.props.navigation.navigate('Cart')}>

        <View style={{width:'100%', height:'100%', backgroundColor:'#e60000', borderRadius:27.5, borderWidth:2.5, borderColor:'white', justifyContent:'center'}}>
        <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center'}} source={require('./resources/ic_cart.png')}/>
        </View>

        </TouchableOpacity>

        <View style={{width:wp('95%'), justifyContent:'space-between', flexDirection:'column', marginTop:hp('2%'), marginLeft:wp('5.5%')}}>
        <Text style = {{color:'black',fontSize: 20,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
        Product Description
        </Text>

        <Text style = {{color:'rgba(0,0,0,.5)',fontSize: 16,fontFamily:'Nunito-Regular',marginTop:hp(1), alignSelf:'flex-start', width:wp(90)}}>
        {yeah.description}
        </Text>
        

        <Text style = {{color:'black',fontSize: 20,fontFamily:'Nunito-Bold', alignSelf:'flex-start', marginTop:hp(3)}}>
        Benefits
        </Text>

        <Text style = {{color:'rgba(0,0,0,.5)',fontSize: 16,fontFamily:'Nunito-Regular',marginTop:hp(1), alignSelf:'flex-start', width:wp(90)}}>
        {yeah.benfits}
        </Text>


        {this.state.checkincart == '0' && (
        <View style={{width: wp('81%'),backgroundColor:'transparent',alignItems:'center',alignSelf:'center', flexDirection: 'row',  marginTop: hp(15), marginBottom:hp(5)}}>

        <Button
        containerStyle={{width:wp('75%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40, backgroundColor: '#e60000', elevation: 5}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
        onPress={this.buttonClickListenerAdd}
        >
        BUY NOW
        </Button>
        </View>


        )}

        {this.state.checkincart =='1' && (
        <View style={{width: wp('81%'),backgroundColor:'transparent',alignItems:'center',alignSelf:'center', flexDirection: 'row',  marginTop: hp(15), marginBottom:hp(5)}}>

        <Button
        containerStyle={{width:wp('75%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40, backgroundColor: '#e60000', elevation: 5}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
        onPress={this.buttonClickListenerCart}
        >
        GO TO CART
        </Button>
        </View>


        )}


        </View>




        </View>


        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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
