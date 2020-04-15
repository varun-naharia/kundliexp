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
import ToggleSwitch from 'toggle-switch-react-native'
import {NavigationActions,StackActions} from 'react-navigation';


type Props = {};
class Settings extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false
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
    }

    getReviews= () =>{

    }

    _YesLogout=()=>{

       const url = GLOBAL.BASE_URL +  'logout'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id : GLOBAL.user_id,
  }),
}).then((response) => response.json())
    .then((responseJson) => {

//    alert(JSON.stringify(responseJson))
  //     this.hideLoading()
       if (responseJson.status == true) {
        AsyncStorage.removeItem('userID');

        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Login',
                        params: { someParams: 'parameters goes here...' },
                    }),
                ],
            }))


//        this.props.navigation.dispatch(DrawerActions.closeDrawer())

           }else {
               alert('Something Went Wrong.')
           }
        })
        .catch((error) => {
          console.error(error);
        });
    }


    navigateToScreen1 = (route) => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

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
                       headerName={'SETTINGS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <View style={{width:wp(91), height:hp(30) ,backgroundColor:'white',flexDirection:'column',
        marginTop:hp(3), borderRadius:7, elevation:5, alignSelf:'center'}}>

        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/ic_bell.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Notification</Text>
        </View>
        <View style={{marginRight:wp(4)}}>
        <ToggleSwitch
          isOn={this.state.istoggle}
          onColor="green"
          offColor="red"
          size="medium"
          onToggle={isOn => this.setState({istoggle : isOn})}
        />
        </View>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>


        <TouchableOpacity>
        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/ic_terms.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Terms & Conditions</Text>
        </View>
        <Image style={{marginRight:wp(4), width:18, height:18, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/ic_pass.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Privacy Policy</Text>
        </View>
        <Image style={{marginRight:wp(4), width:18, height:18, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>
        </TouchableOpacity>


        <TouchableOpacity 
        onPress= {()=> this.navigateToScreen1('Login')}>
        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/ic_logout.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Logout</Text>
        </View>
        <Image style={{marginRight:wp(4), width:18, height:18, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>
        </TouchableOpacity>

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

export default Settings;