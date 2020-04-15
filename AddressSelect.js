import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ToastAndroid, Text, View,ScrollView,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import PopoverTooltip from 'react-native-popover-tooltip';
import DropdownAlert from 'react-native-dropdownalert';
import IndicatorCustom from './IndicatorCustom'

type Props = {};
export default class AddressSelect extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           headerShown: false,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            addressList:[],
            name:'',
            address_id:'',       
            sel_addr:{}
        }
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.getAllAddress()

    }

    _handleStateChange = state =>{
      this.getAllAddress()

    }

    getAllAddress= () =>{
    const url = GLOBAL.BASE_URL + "list_user_address";
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
            this.setState({addressList : responseJson.user_saved_address})

        } else {

            alert("No address found");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }

    makeDefaultAddress=(item)=>{
//        alert(JSON.stringify(item.id))
    const url = GLOBAL.BASE_URL + "make_default_address";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        address_id: item.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
          console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {

            ToastAndroid.showWithGravity(
              'Address made as default address',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
               25, 50,              
            );
//            this.setState({addressList : responseJson.user_saved_address})

        } else {

            alert("Something went wrong");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }

    addMoreAddress=()=>{
        this.props.navigation.navigate('AddressAdd')
    }


       selectAddress = (item,indexs) => {
       var a = this.state.addressList
        for (var i = 0;i<this.state.addressList.length ;i ++){

            this.state.addressList[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({address_id : item.id})

        }else{
            index.is_selected = "0"
        }
        this.state.addressList[indexs] = index
        this.setState({addressList:this.state.addressList,
          sel_addr: item})
        GLOBAL.addressId = this.state.address_id
        this.makeDefaultAddress(item)
    }


    _renderItems =({item,index})=> {
     if (item.plusImage) {
          return (
            <TouchableOpacity onPress={()=> this.addMoreAddress()}>
            <View style={{width:wp(100),  flex:1, height:hp(7),
              backgroundColor:'white', flexDirection:'row', alignItems:'flex-start', borderBottomColor:'#f7f7f7',
              borderBottomWidth:1
            }}>
              <Image style={{height: '30%', width: '11%', resizeMode:'contain', backgroundColor:'white',alignSelf:'center' ,}}
                source={require("./resources/add.png")} />
                    <Text style = {{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black',alignSelf:'center'}}>
                    Add a new address
                    </Text>
            </View>
            </TouchableOpacity>
          );
        }        
        return (
        <TouchableOpacity onPress={()=> this.selectAddress(item, index)}>
            <View style={{width:wp(100),  flex:1,marginTop:hp(1),
              backgroundColor:'white', flexDirection:'row', alignItems:'flex-start', borderBottomColor:'#f7f7f7',
              borderBottomWidth:1
            }}>

            {item.is_selected == '0' && (
              <Image style={{width:wp(5), height:hp(7),marginHorizontal:hp(2), resizeMode:'contain', }} 
              source={require('./resources/ic_unfill.png')
              }/>
            )}

            {item.is_selected == '1' && (

              <Image style={{width:wp(5), height:hp(7),marginHorizontal:hp(2), resizeMode:'contain', }} 
              source={require('./resources/ic_fill.png')
              }/>

            )}

            <View style={{width:'100%', height:'95%', backgroundColor:'white', flexDirection:'column', marginBottom:hp(1.5)}}>
            <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-SemiBold', alignSelf:'flex-start', marginTop:hp(1.5)}}>
            {item.address}
            </Text>
            <Text style = {{color:'#bfbfbf',fontSize: 17,fontFamily:'Nunito-Regular', alignSelf:'flex-start', marginTop:hp(1)}}>
            {item.area}, {item.city_state} - {item.pincode}
            </Text>

{/*             <PopoverTooltip
          ref='tooltip1'
          buttonComponent={
            <View style={{width:200, height:50, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
              <Text>
                Press Me
              </Text>
            </View>
          }
          items={[
            {
              label: 'Item 1',
              onPress: () => {}
            },
            {
              label: 'Item 2',
              onPress: () => {}
            }
          ]}
          // animationType='timing'
          // using the default timing animation
          />           
*/}
{/*            <ReactNativeTooltipMenu

          buttonComponent={
            <View
              style={{
                backgroundColor: 'purple',
                marginLeft:200,
                padding: 10,
                borderRadius: 25
              }}
            >
              <Text style={{ color: 'white', flex: 1 }}>Click</Text>
            </View>
          }
          items={[
            {
              label: 'Edit',
              onPress: () => {alert(JSON.stringify(item))
                this.setState({ counterItem1: this.state.counterItem1 + 1 })}
            },
            {
              label: 'Make it as default address',
              onPress: () => this.setState({ counterItem2: this.state.counterItem2 + 1 }),
            },
          ]}
        />
*/}

            </View>

            </View>
            </TouchableOpacity>
        );
    }

    buttonClickListenerCont =()=>{

        var finalData={
          price: GLOBAL.totalAmount,
        }

        finalData = {...finalData, ...this.state.sel_addr}

        console.log(JSON.stringify(finalData))

        
        if(this.state.address_id == ''){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please select address.');

        }else{
            this.props.navigation.navigate('Payment', {params:{previous_screen: 'from_cart', finalData}})
        }
    }

    buttonClickListenerAdd =()=>{
    //      const url = GLOBAL.BASE_URL + "list_user_address";
    // //  this.showLoading()
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     user_id: GLOBAL.user_id,
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //       this.hideLoading()
    //   alert(JSON.stringify(responseJson))
    //     if (responseJson.status == true) {
    //         alert('Added to cart')
    //         this.setState({checkincart : '1'})
    //     } else {
    //         this.setState({checkincart : '0'})
    //         alert("Already in cart!");
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

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
               headerName={'SELECT ADDRESS'}
               headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                    <FlatList style= {{flexGrow:0,marginBottom:hp(1.5),}}
                              data={[...this.state.addressList, { plusImage : true }]}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

          <Button
          containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,position:'absolute',
          bottom:hp(4),
           backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  }}
          style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
          onPress={this.buttonClickListenerCont}
          >
          CONTINUE
          </Button>
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
});
