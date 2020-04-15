import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
type Props = {};

class MyOrders extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            limit:0,
            myorder_list: [],

        }
    }
 



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

      this.getMyOrders()
    }

    getMyOrders= () =>{
         const url = GLOBAL.BASE_URL + 'gems_products_order_history'

            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "limit_from": this.state.limit,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

               console.log(JSON.stringify(responseJson))
  //              this.hideLoading()
    
                if (responseJson.status == true) {

                    var resu = this.state.myorder_list
                    this.setState({myorder_list: [...resu, ...responseJson.lists]})

      //              console.log(JSON.stringify(this.state.results))

                } else {
//                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });

    }



    selectedProduct=(item, index)=>{
        this.props.navigation.navigate('MyOrdersDetails', {params: item})
    }

    _renderItemproducts = ({item, index}) => {

     //  alert(JSON.stringify(item))
        var order_arr = item.order[0]

//       alert(JSON.stringify(order_arr))

        var order_items = item.order_details.map((o_item, key) =>
     <View style={{backgroundColor:'white',flexDirection:'row' ,borderRadius :6, 
     width:'100%', borderBottomColor:'grey', borderBottomWidth:1}}>

       <Image style={{width:80, height:80, borderRadius:5,borderWidth:1, borderColor:'#FF0000',margin:15}}
        source={{uri : o_item.image}}/>
       <View style={{ flexDirection:'column', marginTop:15, width:'71%', marginBottom:10}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',}}>
                {o_item.name}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                ₹ {o_item.order_price}/-
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Qty: {o_item.quantity} unit(s)
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Carat: {o_item.Carat}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Ratti: {o_item.Ratti}
               </Text>

               {o_item.refund_status == 1 && (
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#E60000',}}>
                Refund Status : 
               </Text>
                )}

        </View>

        </View>
    )

        return (
    <TouchableOpacity onPress={() => this.selectedProduct(item, index)
    } activeOpacity={0.9}>

     <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :6,width : wp(93), }}>


               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',marginLeft:15, marginTop:15}}>
                Order No. #{order_arr.id}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#bfbfbf',marginLeft:15,}}>
                Date: {order_arr.booking_date}
               </Text>

               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',marginLeft:15,}}>
                Total Amount: ₹ {order_arr.order_amount}/-
               </Text>

               {order_items}
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#00C809',position:'absolute', right:10, top:13}}>
               {order_arr.trxn_status}
               </Text>

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
          this.getMyOrders();
        });

    }

    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'MY ORDERS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <View style={{width:'95%',  margin:10, borderRadius:7, flex:1}}>

                    <FlatList style= {{marginBottom:10}}
                              data={this.state.myorder_list}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                              extaData={this.state}
                              onEndReached={this.handleLoadMore}
                              onEndReachedThreshold={0.01}
                    />



                </View>

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

export default MyOrders;