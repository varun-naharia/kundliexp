import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var currentDate = moment().format("DD-MMM");
type Props = {};
import IndicatorCustom from './IndicatorCustom'

export default class Cart extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
      // alert(GLOBAL.all_settings.tax)
        super(props)
        const { navigation } = this.props;
        this.state = {
            qty: '1',
            tax: '0',
            delivery: GLOBAL.all_settings.delivery_charge,
            cartItems:[]

        }
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

      this.loadCart()
    }

    loadCart= () =>{
//        alert(GLOBAL.user_id)
     const url = GLOBAL.BASE_URL + "list_cart_gems";
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
        //       this.hideLoading()
       console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {

          this.setState({cartItems : responseJson.list,
            sumtotal : responseJson.sum_total
          })

        } else {
          alert("Empty Cart!");
        }
      })
      .catch(error => {
        console.error(error);
      });        
    }


    pay=()=>{

    }

    buttonClickListeners = () =>{
      if(GLOBAL.totalAmount ==0){
        alert('No item in cart')
      }else{
        this.props.navigation.navigate('AddressSelect')

      }

    }


    removeItem=(itemData)=>{
//        alert(JSON.stringify(itemData.item))
     const url = GLOBAL.BASE_URL + "delete_cart_gems";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart_id: itemData.item.cart_id,
        user_id: GLOBAL.user_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
        console.log('hiasdisdhsdhi')
       console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {
            alert('Product removed from cart')

           this.setState({cartItems : responseJson.list,
           sumtotal : responseJson.sum_total})

        } else {
          alert("Empty Cart!");
        
           this.setState({cartItems : [],
            sumtotal: 0})
        }
      })
      .catch(error => {
        console.error(error);
      });        

    }


    addMore=(itemData)=>{
//        alert(JSON.stringify(itemData.item))
        var quant = parseInt(itemData.item.quantity) +1

     const url = GLOBAL.BASE_URL + "update_quantity";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart_id: itemData.item.cart_id,
        quantity: quant,
        price: itemData.item.base_price,
        user_id: GLOBAL.user_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
        console.log('hiasdisdhsdhi')
       console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {

           this.setState({cartItems : responseJson.list,
            sumtotal : responseJson.sum_total
           })


        } else {
          alert("Something went wrong!");
        }
      })
      .catch(error => {
        console.error(error);
      });        

    }


    removeMore=(itemData)=>{
        // alert(JSON.stringify(itemData.item))
        if(itemData.item.quantity == 0){
            this.removeItem(itemData)
        }else{
            var quant = parseInt(itemData.item.quantity) - 1

             const url = GLOBAL.BASE_URL + "update_quantity";
            //  this.showLoading()
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                cart_id: itemData.item.cart_id,
                quantity: quant,
                price: itemData.item.base_price,
                user_id: GLOBAL.user_id
              })
            })
              .then(response => response.json())
              .then(responseJson => {
                //       this.hideLoading()

               console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                   this.setState({cartItems : responseJson.list,
                    sumtotal : responseJson.sum_total
                   })

                } else {
                  alert("Something went wrong!");
                }
              })
              .catch(error => {
                console.error(error);
              });        


        }
 

    }

    selectedFirst=(itemData)=>{
    //    GLOBAL.prodDetails = itemData.item
    //    this.props.navigation.navigate('ProductDetails')
    }


  _renderItem=(itemData) => {
        return (
    <TouchableOpacity style={{width:wp('94%'), margin:7,height:hp('18%'),borderRadius:8,backgroundColor:'white',}}
    activeOpacity={0.99} onPress={()=> this.selectedFirst(itemData)}>
      <View style  = {{width:wp('94%'), height:hp('18%'),backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'row',alignItems:'center',borderRadius:8, 
      }}>


      <View style={{width:wp(12), height:hp(14),borderRadius:5, borderWidth:1, borderColor:'#9E9E9E', flexDirection:'column', justifyContent:'space-between', alignItems:'center', marginLeft:wp(4), alignSelf:'center'}}>

      <TouchableOpacity style={{backgroundColor:'transparent', width:'100%', alignItems:'center'}}
      onPress={()=> this.addMore(itemData)}>
      <Text style={{color:'#9E9E9E', fontSize:18}}>+</Text>
      </TouchableOpacity>
      <Text style={{color:'#9E9E9E', fontSize:18}}>{itemData.item.quantity}</Text>

      <TouchableOpacity style={{backgroundColor:'transparent', width:'100%', alignItems:'center'}}
      onPress={()=> this.removeMore(itemData)}>
      <Text style={{color:'#9E9E9E', fontSize:18}}>-</Text>
      </TouchableOpacity>

      </View>

    <Image style={{width:wp(23), height:hp(13),borderWidth:1.4, marginLeft:wp(3),borderRadius:5,borderColor:'#E60000', resizeMode:'cover',}} source={{uri : itemData.item.image}}/>

    <View style={{backgroundColor:'white', width:wp('45%'),  flexDirection:'column',marginLeft:wp(3)}}>
          <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#000000',width:wp('39%'),}}
          numberOfLines={2}>
              {itemData.item.name}
          </Text>
          <View style={{width:wp('40%'), flexDirection:'row', justifyContent:'space-between', }}>

          <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',width:wp(27),marginTop:hp(1)}}>
            ₹ {itemData.item.base_price}
          </Text>
          </View>

      </View>
      <TouchableOpacity style={{width:wp(5), height:hp(5), resizeMode:'contain',position:'absolute', top:2, right:wp(1)}}
      onPress={()=> this.removeItem(itemData)}>
        <Image style={{width:wp(3.5), height:hp(4), resizeMode:'contain',}} source={require('./resources/cross.png')}/>
      </TouchableOpacity>

      </View>
    </TouchableOpacity>
    )
}


    render() {
      console.log(this.state.sumtotal + 'tax'+ this.state.tax+ 'delivery'+this.state.delivery)
        let totalAmount = parseFloat(this.state.sumtotal)+ parseFloat(this.state.tax)+parseFloat(this.state.delivery)
        GLOBAL.totalAmount = totalAmount

        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column',}}>
 
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'MY CART'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
            contentContainerStyle = {{backgroundColor:'#f1f1f1',width : wp(100)}}
            >

{this.state.cartItems.length != 0 && (
   <>
            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.cartItems}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
                      extraData={this.state}
            />


        <View style = {{width:wp(94),height:hp(17),backgroundColor:'white',marginVertical:hp(1) ,
        marginHorizontal:wp(3),flexDirection :'column',borderRadius:8, elevation:4}}>

          <View style={{width:wp(94), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3.5), fontFamily:'Nunito-Regular'}}>Cart Total</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3.5),textAlign:'left', fontFamily:'Nunito-Regular'}}>₹ {this.state.sumtotal}</Text>
          </View>

{/*          <View style={{width:wp(94), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3.5), fontFamily:'Nunito-Regular'}}>Tax</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3.5),textAlign:'left', fontFamily:'Nunito-Regular'}}>{GLOBAL.gemsTax} %</Text>
          </View>
*/}
          <View style={{width:wp(94), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', }}>
          <Text style={{fontSize:15, color:'black', marginLeft:wp(3.5), fontFamily:'Nunito-Regular'}}>Delivery</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3.5),textAlign:'left', fontFamily:'Nunito-Regular'}}>₹ {this.state.delivery}</Text>
          </View>

          <View style={{width:wp(94), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', }}>
          <Text style={{fontSize:15, color:'#E60000', marginLeft:wp(3.5), fontFamily:'Nunito-Regular'}}>Subtotal</Text>
          <Text style={{fontSize:15, color:'#E60000', marginRight:wp(3.5),textAlign:'left', fontFamily:'Nunito-Regular'}}>₹ {totalAmount}</Text>
          </View>

        </View>


                <Button
                containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
                 backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  marginTop:hp(15), marginBottom:hp(5)}}
                style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
                onPress={this.buttonClickListeners}
                >
                PROCEED TO ORDER
                </Button>

</>
  )}


  {this.state.cartItems.length==0 && (

            <Text style={{fontSize : 15,marginTop:15,color :'black',fontFamily:'Nunito-Regular',alignSelf:'center', textAlign:'center'}}>
            Empty Cart!
            </Text>

    )}
            </KeyboardAwareScrollView>


            </View>
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

