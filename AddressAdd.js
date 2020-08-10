import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';

type Props = {};
export default class AddressAdd extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           headerShown: false,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            address:'',
            house:'',
            city:'',
            pin:'',
            locality:'',

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


    }




    _renderItems ({item, index}) {
        return (
            <View style={{width:wp(100), height:hp(30), flex:1,
              backgroundColor:'#EEEEF0', flexDirection:'column',justifyContent:'center', alignItems:'center'
            }}>

              <Image style={{width:wp(100), height:hp(20),alignSelf:'center',marginTop:hp(5), resizeMode:'contain'}} source={{uri : item}}/>

            </View>
        );
    }


    buttonClickListenerAdd =()=>{
      if(this.state.address==''){
//        alert('Please enter address')
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please enter address.');

      }else if(this.state.house == ''){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please enter house or street.');

      }else if(this.state.city==''){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please enter city.');

      }else if(this.state.pin == ''){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please enter pincode.');

      }else if(this.state.locality==''){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please enter locality.');

      }else{

        const url = GLOBAL.BASE_URL + "add_address";
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,
          address: this.state.house + this.state.address,
          area: this.state.locality,
          pincode: this.state.pin,
          city_state: this.state.locality,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //       this.hideLoading()
//        alert(JSON.stringify(responseJson))
          if (responseJson.status == true) {
             this.dropDownAlertRef.alertWithType('success', 'Success', 'Address added successfully.');
             this.props.navigation.goBack()
          } else {
             this.dropDownAlertRef.alertWithType('error', 'Error', 'Something went wrong.');
          }
        })
        .catch(error => {
          console.error(error);
        });


      }
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

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
               headerName={'ADD ADDRESS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

           <KeyboardAwareScrollView contentContainerStyle={{alignItems:'center'}}
           keyboardShouldPersistTaps='handled'>

           <View style={{width:wp(90), height:hp(11), borderColor:'#00000040', borderWidth:1, borderRadius:8, marginTop:hp(3), padding:13}}>

            <Text style = {{color:'#00000040',fontSize: 14,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
            Address
            </Text>

            <TextInput style = {{width:wp('83%'),backgroundColor:'white',color:'black', height:hp('6%'), fontSize:16, fontFamily:'Nunito-Regular', paddingLeft:wp(0)}}
                       placeholder = {'Address'}
                       placeholderTextColor = "black"
                       onChangeText={(text) => this.setState({address:text})}
                       value={this.state.address}
            />

           </View>


           <View style={{width:wp(90), height:hp(11), borderColor:'#00000040', borderWidth:1, borderRadius:8, marginTop:hp(3), padding:13}}>

            <Text style = {{color:'#00000040',fontSize: 14,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
            House & Street
            </Text>

            <TextInput style = {{width:wp('83%'),backgroundColor:'white',color:'black', height:hp('6%'), fontSize:16, fontFamily:'Nunito-Regular', paddingLeft:wp(0)}}
                       placeholder = {'House & Street'}
                       placeholderTextColor = "black"
                       onChangeText={(text) => this.setState({house:text})}
                       value={this.state.house}
            />

           </View>


           <View style={{width:wp(90), height:hp(11), borderColor:'#00000040', borderWidth:1, borderRadius:8, marginTop:hp(3), padding:13}}>

            <Text style = {{color:'#00000040',fontSize: 14,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
            City
            </Text>

            <TextInput style = {{width:wp('83%'),backgroundColor:'white',color:'black', height:hp('6%'), fontSize:16, fontFamily:'Nunito-Regular', paddingLeft:wp(0)}}
                       placeholder = {'City'}
                       placeholderTextColor = "black"
                       onChangeText={(text) => this.setState({city:text})}
                       value={this.state.city}
            />

           </View>


           <View style={{width:wp(90), height:hp(11), borderColor:'#00000040', borderWidth:1, borderRadius:8, marginTop:hp(3), padding:13}}>

            <Text style = {{color:'#00000040',fontSize: 14,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
            Pincode
            </Text>

            <TextInput style = {{width:wp('83%'),backgroundColor:'white',color:'black', height:hp('6%'), fontSize:16, fontFamily:'Nunito-Regular', paddingLeft:wp(0)}}
                       placeholder = {'Pincode'}
                       placeholderTextColor = "black"
                       keyboardType={'numeric'}
                       onChangeText={(text) => this.setState({pin:text})}
                       value={this.state.pin}
            />

           </View>


           <View style={{width:wp(90), height:hp(11), borderColor:'#00000040', borderWidth:1, borderRadius:8, marginTop:hp(3), padding:13}}>

            <Text style = {{color:'#00000040',fontSize: 14,fontFamily:'Nunito-Bold', alignSelf:'flex-start'}}>
            Locality
            </Text>

            <TextInput style = {{width:wp('83%'),backgroundColor:'white',color:'black', height:hp('6%'), fontSize:16, fontFamily:'Nunito-Regular', paddingLeft:wp(0)}}
                       placeholder = {'Locality'}
                       placeholderTextColor = "black"
                       onChangeText={(text) => this.setState({locality:text})}
                       value={this.state.locality}
            />

           </View>


          <Button
          containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
           backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  marginVertical:hp(5),}}
          style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
          onPress={this.buttonClickListenerAdd}
          >
          SAVE
          </Button>

           </KeyboardAwareScrollView>
          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

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
