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
import RazorpayCheckout from 'react-native-razorpay';


var currentDate = moment().format("DD-MMM");
type Props = {};
export default class Wallet extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: '',
            email: '',
            message: '',
            status :'' ,
            loading : '',
            userid : '',
            isDisabledsss:false,
            username:'',
            wallet:'',
            username:'',
            referral:'',
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

//  this.getReviews()
    console.log(JSON.stringify(GLOBAL.userDetails))
    }

    getReviews= () =>{

    }


    pay=()=>{

        if(this.state.username==''){
            alert('Please choose amount')
        }else{
            var desc = GLOBAL.user_id+'|'+'add_wallet'+'|'+0

            var options = {
                description: desc,
                image: {uri : require('./resources/kundli_logo.png')},
                currency: 'INR',
                key: 'rzp_test_XSUYUlOXU9O4AG',
                amount: parseInt(this.state.username) *100,
                name: GLOBAL.userDetails.name,
                prefill: {
                  email: GLOBAL.userDetails.email,
                  contact: GLOBAL.userDetails.email.phone,
                  name: 'Razorpay Software'
                },
                theme: {color: '#E60000'}
            }

            RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
                this.props.navigation.goBack();
              }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });

//            this.props.navigation.navigate('Thankyou')
        }
    }
    buttonClickListeners = () =>{
        this.setState({username:'200'})

    }
    buttonClickListenerss = () =>{
        this.setState({username:'1500'})
    }
    buttonClickListenersss = () =>{
        this.setState({username:'2000'})
//        this.setState({isDisabledsss:!this.state.isDisabledsss})
    }
    render() {
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}

                                       size={50} color="#E9128B" />

                </View>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column'}}>
 
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'WALLET'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
            contentContainerStyle = {{backgroundColor:'#f1f1f1',width : wp(100) ,height:hp(90)}}
            >
                <View style={{width:wp(92), height:hp(22), backgroundColor:'black', marginVertical:hp(2), borderRadius:7,alignSelf:'center'}}>

                <View style={{flexDirection:'row', width:wp(92),height:hp(22), justifyContent:'space-between'}}>

                <View style={{flexDirection:'column', width:wp(45), marginVertical:hp(2), marginHorizontal:wp(3)}}>
                    <Text style = {{color :'white',fontSize :25,fontFamily :'Nunito-Bold', marginLeft:wp(1.8),}}>
                    Balance
                    </Text>

                    <Text style = {{color :'#c8c8c8',fontSize :13,fontFamily :'Nunito-Regular', marginLeft:wp(1.8),}}>
                    Today, {currentDate}
                    </Text>

                    <View style={{flexDirection:'column', width:'100%',marginTop:'15%'}}>
                    <Text style = {{color :'white',fontSize :25,fontFamily :'Nunito-Bold', marginLeft:wp(1.8)}}>
                    ₹ {GLOBAL.walletAmount}
                    </Text>

                    <Text style = {{color :'#c8c8c8',fontSize :13,fontFamily :'Nunito-Regular', marginLeft:wp(1.8),}}>
                    + 0% Comp. Last Week
                    </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', width:wp(30),height:hp(6), borderRadius:4,
                justifyContent:'center',alignItems:'center',alignSelf:'flex-end',position:'absolute', top:hp(1), right:wp(1), borderWidth:1,
                 borderColor:'white',margin:15}}>
                    <Image style={{width : 20 ,height : 20 ,resizeMode :'contain'}}
                           source={require('./resources/add_wallet.png')}/>
                    <Text style = {{color :'white',fontSize :14,fontFamily :'Nunito-Bold', marginLeft:5, marginTop:-2}}>
                    Add Money
                    </Text>
                </View>

                </View>

                </View>


                <View style={{width:wp(92), height:hp(6),flexDirection:'row', backgroundColor:'black', marginVertical:hp(2), borderRadius:7,alignSelf:'center', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style = {{color :'white',fontSize :15,fontFamily :'Nunito-Bold', marginLeft:wp(2),}}>
                    Referral Wallet
                    </Text>
                    <Text style = {{color :'#c8c8c8',fontSize :15,fontFamily :'Nunito-Bold', marginRight:wp(2),}}>
                    ₹ {GLOBAL.userDetails.refferal_wallet}
                    </Text>

                </View>


                    <Text style = {{marginVertical : hp(2) ,marginHorizontal:wp(3.5),color :'black',fontSize :18,fontFamily :'Nunito-Bold'}}>
                        Recharge Wallet
                    </Text>

                    <View style = {{width:wp(90),marginVertical:hp(1) ,marginHorizontal:wp(3.5),flexDirection :'row',justifyContent :'space-between',alignItems:'space-between',}}>

                        <Button
                            containerStyle={{padding:10, height:hp(6), overflow:'hidden',borderBottomWidth :2,width :wp(25),borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#E60000',borderRightColor:'#E60000',  borderTopColor :'#E60000',borderBottomColor :'#E60000',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 15, color: '#E60000',fontFamily:'Nunito-Bold'}}
                            onPress={this.buttonClickListeners}>
                            ₹ 200
                        </Button>

                        <Button
                            containerStyle={{padding:10, height:hp(6), overflow:'hidden',borderBottomWidth :2,width :wp(25) ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#E60000',borderRightColor:'#E60000',  borderTopColor :'#E60000',borderBottomColor :'#E60000',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 15, color: '#E60000',fontFamily:'Nunito-Bold'}}
                            onPress={this.buttonClickListenerss}>
                            ₹ 1500
                        </Button>


                        <Button
                            containerStyle={{padding:10, height:hp(6), overflow:'hidden',borderBottomWidth :2,width :wp(25) ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#E60000',borderRightColor:'#E60000',  borderTopColor :'#E60000',borderBottomColor :'#E60000',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 15, color: '#E60000',fontFamily:'Nunito-Bold'}}
                            onPress={this.buttonClickListenersss}>
                            ₹ 2000
                        </Button>
                    </View>



                    <TextInput style = {{marginVertical : hp(5),borderBottomWidth:1,borderBottomColor :'#bfbfbf',
                        width : wp(90) ,height : hp(5.5) ,color :'black' ,alignSelf:'center',fontSize : 16 ,fontWeight:'bold'}}
                               placeholder="Enter Amount"
                               placeholderTextColor="black"
                               keyboardType = 'numeric'
                               maxLength={5}
                               onChangeText={(username) => this.setState({username : username.replace(/[^0-9]/g, '')})}
                               value={this.state.username}
                    >

                    </TextInput>

                <Button
                containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,position:'absolute',
                 backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  bottom:hp(5)}}
                style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
                onPress={this.pay}
                >
                PROCEED TO PAY
                </Button>


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

