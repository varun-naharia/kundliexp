import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,ScrollView,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
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
import StepIndicator from 'react-native-step-indicator';

const labels = ["Pending","Order Packed","Order Placed","Out for delivery","Order Delivered", "Cancelled", "Cancelled", "Refund"];

const customStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize:20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00C809',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#00C809',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#00C809',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#00C809',
  stepIndicatorUnFinishedColor: '#999999',
  stepIndicatorCurrentColor: '#00C809',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#00C809',
  stepIndicatorLabelFinishedColor: '#00C809',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  labelFontFamily:'Nunito-SemiBold',
  currentStepLabelColor: '#00C809'
}

const labels_refund = ["Refund amount", "Refund Txn", "Refund Date"]

const customStyles_refund = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize:20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00C809',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#00C809',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#00C809',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#00C809',
  stepIndicatorUnFinishedColor: '#999999',
  stepIndicatorCurrentColor: '#00C809',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#00C809',
  stepIndicatorLabelFinishedColor: '#00C809',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#00C809'  
}


class MyOrdersDetails extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        console.log(JSON.stringify(this.props.navigation.state.params.params))
        const { navigation } = this.props;
        this.state = {
            limit:0,
            currentPosition: 0,
            got_data: this.props.navigation.state.params.params,
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

//      this.getMyOrders()
    

    }


    _renderItemproducts = ({item, index}) => {

      var item_status= parseInt(item.status)
      return(

     <View style={{backgroundColor:'white',flexDirection:'row' ,borderRadius :6, 
     width:'100%', borderBottomColor:'grey', borderBottomWidth:1}}>

       <Image style={{width:80, height:80, borderRadius:5,borderWidth:1, borderColor:'#FF0000',margin:15}}
        source={{uri : item.image}}/>
       <View style={{ flexDirection:'column', marginTop:15, width:'71%', marginBottom:10}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',}}>
                {item.name}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                ₹ {item.order_price}/-
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Qty: {item.quantity} unit(s)
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Carat: {item.Carat}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
                Ratti: {item.Ratti}
               </Text>

       {item.refund_status =="0" && (
       <View style={{ marginTop:hp(1.5), height:400}}>
      
 <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',}}>
       Item Status</Text>

        <StepIndicator
           customStyles={customStyles}
           currentPosition={item_status}
           labels={labels}
           stepCount={labels.length}
           direction={'vertical'}
        />
        </View>


                )}


               {item.refund_status =="1" && (
       <View style={{ marginTop:hp(1), marginBottom:hp(0.5)}}>

         <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#E60000',}}>
          Refund Status
         </Text>
         <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
          Refund Amount: {item.refund_amount}
         </Text>

         <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
          Refund Txn Id: {item.refund_trxn_id}
         </Text>

         <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'black',}}>
          Refund Date: {item.refund_date}
         </Text>


        </View>
        )}
      
        </View>

        </View>

        )
    }


    onPageChange(position){
      this.setState({currentPosition: position});
    }

    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }

        var yeah = this.state.got_data.order[0]

        var more_details = this.state.got_data.order_details[0]

        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'ORDER DETAILS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

      <ScrollView>
     <View style={{backgroundColor:'white',flexDirection:'column' , flex: 1 ,borderRadius :0,width : wp(100),alignSelf:'center' }}>


               <Text style = {{fontSize:17,fontFamily:'Nunito-SemiBold',color:'black',marginLeft:15, marginTop:15}}>
                Order No. #{yeah.id}
               </Text>
               <Text style = {{fontSize:14,fontFamily:'Nunito-Regular',color:'#bfbfbf',marginLeft:15,}}>
                Date: {yeah.booking_date}
               </Text>

               <Text style = {{fontSize:14,fontFamily:'Nunito-Regular',color:'black',marginLeft:15,}}>
                Total Amount: ₹ {yeah.order_amount}/-
               </Text>


               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#00C809',position:'absolute', right:10, top:13}}>
                {yeah.trxn_status}
               </Text>

       <View style={{width:'100%', height:0.5, backgroundColor:'#bfbfbf', marginTop:hp(2)}}/>

       <View style={{marginLeft:15, marginTop:hp(1.5)}}>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',}}>
       Address Details </Text>

               <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'black',}}>
                Shipping Address: {yeah.address}
               </Text>
               <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'black',}}>
                Area: {yeah.area}
               </Text>
               <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'black',}}>
                Pincode: {yeah.pincode}
               </Text>
               <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'black',}}>
                State: {yeah.city_state}
               </Text>
       </View>

       <View style={{width:'100%', height:0.5, backgroundColor:'#bfbfbf', marginTop:hp(2)}}/>

       <View style={{marginLeft:15, marginTop:hp(1.5)}}>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',}}>
       Item Details</Text>

                <FlatList style= {{marginBottom:10, marginLeft:-15}}
                          data={this.state.got_data.order_details}
                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderItemproducts}
                />



        </View>


       <View style={{width:'100%', height:0.5, backgroundColor:'#bfbfbf', marginTop:hp(2)}}/>





        </View>
    </ScrollView>
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

export default MyOrdersDetails;