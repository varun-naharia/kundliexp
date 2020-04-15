import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ToastAndroid,ScrollView, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
import moment from 'moment'

class HistoryDetails extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false,
            color:'red',
            data:this.props.navigation.state.params.params.get
        }
    }




    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
    this.showLoading()
    this.timeoutCheck = setTimeout(() => {
        this.hideLoading()
   }, 200);

    console.log(JSON.stringify(this.props.navigation.state.params.params.get))
//        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }

    getReviews= () =>{

    }



    selectedPred=(item, index)=>{
        Linking.openURL(item.path)
    }


    renderRowItem1=({item, index})=>{
        return(

   <TouchableOpacity style={{marginBottom:hp(0.2)}}
   onPress={() => this.selectedPred(item, index)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(40),elevation:4, padding:10, marginTop:hp(1.5),marginLeft:wp(2),marginBottom:hp(0.6)}}>

    {item.type =='application/pdf' && (

    <Image style={{width:60, height:60, resizeMode:'contain', alignSelf:'center', marginVertical:hp(1)}}
     source={require('./resources/pdf_im.png')}/>

     )}    
    {item.type == 'image/jpeg' && (
    <Image style={{width:60, height:60, resizeMode:'contain', alignSelf:'center', marginVertical:hp(1)}}
     source={{uri : item.path}}/>


        )}

    </View>

    </TouchableOpacity>            
            )
    }


    render() {


        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        var yeah = this.state.data
        var date = moment(yeah.appointment_date).format('ddd, DD-MM-YYYY')

        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'BOOKING DETAILS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
    <ScrollView>

     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(93), padding:10, marginTop:hp(2), alignSelf:'center', alignItems:'center'}}>

      <Image style={{width: 30, height:30, resizeMode:'contain', marginLeft:wp(3)}}
      source={require('./resources/ic_cal.png')}/>

      <View style={{flexDirection:'column', marginLeft:wp(5)}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {date}
       </Text>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginTop:5}}>
        {yeah.appointment_time}
       </Text>

       </View>
      </View>


     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(93), padding:10, marginTop:hp(2), alignSelf:'center', alignItems:'center'}}>

      <Image style={{width: 30, height:30, resizeMode:'contain', marginLeft:wp(3)}}
      source={require('./resources/ic_fees.png')}/>

      <View style={{width:'80%',flexDirection:'row', justifyContent:'space-between',marginLeft:wp(5)}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        Fees
       </Text>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        ₹ {yeah.total_amount}
       </Text>

       </View>
      </View>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#515C6F',marginTop:hp(3), marginLeft:wp(5)}}>
       Personal Info
       </Text>

     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(93), padding:10, marginTop:hp(2), alignSelf:'center', padding:17}}>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#00000040',}}>
        Full Name
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',}}>
       {GLOBAL.userDetails.name}
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#00000040',marginTop:hp(1)}}>
        Booking Id
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',}}>
       {yeah.booking_id}
       </Text>

      </View>


       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#515C6F',marginTop:hp(3), marginLeft:wp(5)}}>
       More Details
       </Text>

     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(93), padding:10, marginTop:hp(2), alignSelf:'center', padding:17}}>
 

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#00000040',}}>
        Astrologer Name
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',}}>
       {yeah.expert_details.name}
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#00000040',marginTop:hp(1)}}>
        Booking Status
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',}}>
       {yeah.booking_status}
       </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Regular',color:'#00000040',marginTop:hp(1)}}>
        Booking Type
       </Text>
       <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',}}>
       {yeah.module}
       </Text>


       {yeah.booking_status=='cancelled' && (

              <Image style = {{width:wp(20),height:25,resizeMode:'contain',position:'absolute', right:10, top:13}}
              source={require('./resources/ic_cancel.png')}
              />

        )}

       {yeah.booking_status!='cancelled' && (

              <Image style = {{width:wp(20),height:25,resizeMode:'contain',position:'absolute', right:10, top:13}}
              source={require('./resources/ic_booked.png')}
              />

        )}



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

export default HistoryDetails;