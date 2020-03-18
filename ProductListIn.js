import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import IndicatorCustom from './IndicatorCustom'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {};
export default class ProductListIn extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           headerShown: () => false,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: '',
            pdList:[],
            limit:0
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
    this.getProducts()      

        this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state=>{
    this.getProducts()      
    }

    async getProducts(){
      var body = {
        gems: 'gems',
        limit_from: this.state.limit,
        user_id: GLOBAL.user_id,
        gems_category: GLOBAL.catDetails.id

      }
//      console.log(JSON.stringify(body))
     const url = GLOBAL.BASE_URL + "gems_products";
    //  this.showLoading()
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
       console.log(JSON.stringify(responseJson))
          var resu = this.state.pdList

        if (responseJson.status == true) {
          this.setState({pdList : [...resu , ...responseJson.gems]})

        } else {
//          alert("No Products found!");

          this.setState({pdList : [...resu , ...responseJson.gems]})

        }
      })
      .catch(error => {
        console.error(error);
      });

    }


    openCart=(itemData)=>{
      this.props.navigation.navigate('Cart')
    }


    addToCart=(itemData)=>{
//      alert(JSON.stringify(itemData.item))
      const url = GLOBAL.BASE_URL + "add_to_cart_gems";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: itemData.item.id,
        order_price: itemData.item.base_price,
        user_id: GLOBAL.user_id,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
//      alert(JSON.stringify(responseJson))
        if (responseJson.status == true) {
            alert('Added to cart')
            this.getProducts()
        } else {
            alert("Already in cart!");
        }
      })
      .catch(error => {
        console.error(error);
      });
     
    }


selectedFirst=(itemData)=>{
    GLOBAL.prodDetails = itemData.item
    this.props.navigation.navigate('ProductDetails')
}


  _renderItem=(itemData) => {
        return (
    <TouchableOpacity style={{width:wp('45%'), margin:7,height:hp('28%'),backgroundColor:'white',}}
    activeOpacity={0.99} onPress={()=> this.selectedFirst(itemData)}>
      <View style  = {{width:wp('45%'), height:hp('28%'),backgroundColor:'#f7f7f7',shadowColor: "#000",
          elevation:4, flexDirection:'column',alignItems:'center',borderRadius:5, 
      }}>
    <Image style={{width:wp(40), height:hp(15), resizeMode:'cover',marginTop:hp(1)}} source={{uri : itemData.item.image}}/>
    <View style={{backgroundColor:'white', width:wp('45%'),  flexDirection:'column', marginTop:hp(2), borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
          <Text style = {{fontSize:15,fontFamily:'Nunito-Regular',color:'#000000',width:wp('39%'),marginLeft:wp(3), marginTop:hp(1)}}
          numberOfLines={2}>
              {itemData.item.name}
          </Text>
          <View style={{width:wp('40%'), flexDirection:'row', justifyContent:'space-between',marginLeft:wp(3), }}>
          <Text style = {{fontSize:10,fontFamily:'Nunito-Regular',color:'#E60000',width:wp(27),marginTop:hp(1)}}>
              {itemData.item.Carat} Carat/{itemData.item.Ratti} Ratti
          </Text>

          {itemData.item.is_cart == 0 && (
          <TouchableOpacity onPress={()=> this.addToCart(itemData)}>
          <View style={{backgroundColor:'#E60000', height:25, width:wp(11.5), borderRadius:6, justifyContent:'center'}}>
          <Text style = {{fontSize:9,fontFamily:'Nunito-Regular',color:'white', alignSelf:'center'}}>
          Buy Now
          </Text>
          </View>
          </TouchableOpacity>
          )}

          {itemData.item.is_cart != 0 && (
          <TouchableOpacity onPress={()=> this.openCart(itemData)}>
          <View style={{backgroundColor:'#E60000', height:25, width:wp(11.5), borderRadius:6, justifyContent:'center'}}>
          <Text style = {{fontSize:9,fontFamily:'Nunito-Regular',color:'white', alignSelf:'center'}}>
          In Cart
          </Text>
          </View>
          </TouchableOpacity>
          )}

          </View>

      </View>
      </View>
    </TouchableOpacity>
    )
}

    handleLoadMore=()=>{
        // this.setState({limit: this.state.limit + 6})
        // this.loadBookings()
//        alert('ads')
     this.setState({
          limit: this.state.limit + 6
        }, () => {
          this.getProducts();
        });

    }

    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
               <Header navigation={this.props.navigation}
               showHeaderImage={false}
               headerColor ={'#E60000'}
               backImagePath={require('./resources/back.png')}
               headerName={GLOBAL.catDetails.name.toUpperCase()}
               headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                    <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                              data={this.state.pdList}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                              extraData={this.state}
                              onEndReached={this.handleLoadMore}
                              onEndReachedThreshold={0.01}
                    />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
});

