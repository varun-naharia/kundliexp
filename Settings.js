import React, {Component} from 'react';
import {StyleSheet,Text, View,FlatList,Image,ToastAndroid,TouchableOpacity ,Alert,Container,Linking , Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'
import {NavigationActions,StackActions} from 'react-navigation';
import { Dialog, DialogContent, DialogComponent, DialogTitle,DialogButton,SlideAnimation } from 'react-native-dialog-component';
import IndicatorCustom from './IndicatorCustom'
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        var getLang=''
        var getChartStyle=''
        if(GLOBAL.glLanguage == 'hi'){
            getLang ='Hindi'
        }else if(GLOBAL.glLanguage == 'en'){
            getLang='English'
        }else if(GLOBAL.glLanguage == 'nn'){
            getLang='Bengali'
        }else if(GLOBAL.glLanguage == 'ma'){
            getLang='Marathi'
        }else if(GLOBAL.glLanguage == 'ta'){
            getLang='Tamil'
        }else if(GLOBAL.glLanguage == 'te'){
            getLang='Telgu'
        }else if(GLOBAL.glLanguage == 'ml'){
            getLang='Malyalam'
        }else if(GLOBAL.glLanguage == 'kn'){
            getLang='Kannada'
        }

        if(GLOBAL.glChartStyle=='south'){
          getChartStyle ='South'
        }else if(GLOBAL.glChartStyle=='north'){
          getChartStyle ='North'
        }else if(GLOBAL.glChartStyle=='east'){
          getChartStyle ='East'
        }

         // GLOBAL.glChartStyle=='south' ? getChartStyle='South': getChartStyle='North'

        var dec_notif
        GLOBAL.userDetails.notification_config =='1' ? dec_notif = true : dec_notif = false 

        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:dec_notif,
            visible:false,
            langName:getLang,
            chartStyleName:getChartStyle,
            langs:[{
                id:'1',
                l_name:'Hindi',
                l_code:'hi',
            },
            {
                id:'2',
                l_name:'English',
                l_code:'en',
            },
            {
                id:'3',
                l_name:'Bengali',
                l_code:'bn',
            },
            {
                id:'4',
                l_name:'Marathi',
                l_code:'ma',
            },
            {
                id:'5',
                l_name:'Tamil',
                l_code:'ta',
            },
            {
                id:'6',
                l_name:'Telgu',
                l_code:'te',
            },
            {
                id:'7',
                l_name:'Malyalam',
                l_code:'ml',
            },
            {
                id:'8',
                l_name:'Kannada',
                l_code:'kn',
            },
            ],
            chartStyles:[
            {
                id:'1',
                chart_name:'North',
                chart_key:'north'
            },
            {
                id:'2',
                chart_name:'South',
                chart_key:'south'
            },
            {
                id:'3',
                chart_name:'East',
                chart_key:'east'
            },
            ]
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

   async setLang(langItem){
    const url = GLOBAL.BASE_URL + "update_user_configuration";
    //  this.showLoading()
   await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        for: 'language',
        value: langItem.l_code
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
          console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {

            ToastAndroid.showWithGravity(
              'Language changed successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
               50, 100,              
            );
           this.setState({langName : langItem.l_name})

        } else {

            alert("Something went wrong");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }

    selectLang=(item, index)=>{
        this.setLang(item)

        this.dialogComponents.dismiss()
    }

  _renderItems=({item, index})=>{
    return(
      <TouchableOpacity 
      style={{width:'100%',margin:5,marginLeft:0, marginTop:hp(1), marginBottom:5}}
      onPress={()=> this.selectLang(item, index)}>
    <View style={{width: '100%',  flexDirection:'row', justifyContent:'space-between'
    ,borderBottomColor:'#bfbfbf', borderBottomRadius:0, borderBottomWidth:1, }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19,marginTop:0,}}>{item.l_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'grey', }}>
    {item.des}</Text>
    </View>       
    </View>       
    </TouchableOpacity>
      )
  }


   async setChartStyle(chartItem){
    const url = GLOBAL.BASE_URL + "update_user_configuration";
    //  this.showLoading()
   await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        for: 'direction',
        value: chartItem.chart_key
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
          console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {

            ToastAndroid.showWithGravity(
              'Chart style changed successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
               50, 100,              
            );
           this.setState({chartStyleName : chartItem.chart_name})

        } else {

            alert("Something went wrong");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }


    selectChart=(item, index)=>{
        this.setChartStyle(item)

        this.dialogComponent.dismiss()
    }

  _renderItemss=({item, index})=>{
    return(
      <TouchableOpacity 
      style={{width:'100%',margin:5,marginLeft:0, marginTop:hp(1), marginBottom:5}}
      onPress={()=> this.selectChart(item, index)}>
    <View style={{width: '100%',  flexDirection:'row', justifyContent:'space-between'
    ,borderBottomColor:'#bfbfbf', borderBottomRadius:0, borderBottomWidth:1, }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19,marginTop:0,}}>{item.chart_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'grey', }}>
    {item.des}</Text>
    </View>       
    </View>       
    </TouchableOpacity>
      )
  }


   async toggleNotification(type){
    var val='1'
    type ? val ='1' : val = '0'
//    alert(val)

    const url = GLOBAL.BASE_URL + "update_user_configuration";
    //  this.showLoading()
   await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        for: 'notification',
        value: val
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
          console.log(JSON.stringify(responseJson))

        if (responseJson.status == true) {
            this.setState({istoggle : type})

            ToastAndroid.showWithGravity(
              'Notification status changed successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
               50, 100,              
            );
        } else {

            alert("Something went wrong");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }


    render() {
        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

        <View style={{ flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'SETTINGS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <View style={{width:wp(100), height:hp(100) ,backgroundColor:'white',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:wp(91), height:hp(40) ,backgroundColor:'white',flexDirection:'column',
        marginTop:hp(3), borderRadius:7, elevation:5, alignSelf:'center'}}>

        <TouchableOpacity
        onPress={()=> this.dialogComponents.show()}>
        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/lan.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Language ({this.state.langName})</Text>
        </View>
        <Image style={{marginRight:wp(4), width:18, height:18, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={()=> this.dialogComponent.show()}>
        <View style={{marginTop:hp(2),flexDirection:'row', height:hp(3),alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row', marginLeft:hp(2.5),}}>
        <Image style={{width:wp(6), height:hp(4), resizeMode:'contain'}}
        source={require('./resources/chart.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'Nunito-SemiBold', alignSelf:'center'}}>Chart Style ({this.state.chartStyleName})</Text>
        </View>
        <Image style={{marginRight:wp(4), width:18, height:18, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>
        </TouchableOpacity>

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
          onToggle={isOn => this.toggleNotification(isOn)}
        />
        </View>
        </View>
        <View
        style={{borderBottomColor: 'rgba(0,0,0,.1)',borderBottomWidth: 1, marginTop:12, width:'90%', alignSelf:'center'}}>
        </View>


        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Terms')}>
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

        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Privacy')}>        
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
    <DialogComponent
        dialogStyle = {{backgroundColor:'transparent',}}
        dismissOnTouchOutside={true}
        dismissOnHardwareBackPress={true}
        width={wp(80)}
        height={hp(50)}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }        
        dialogStyle={{width:wp(80), height:hp(50),borderRadius:5,}}
        ref={(dialogComponents) => { this.dialogComponents = dialogComponents; }}>

      <DialogContent>

    <View style={{flexDirection:'column', width:wp(80),alignSelf:'center'
    ,backgroundColor:'white', height:hp(50),borderRadius:5, }}>

      <FlatList data={this.state.langs}
      renderItem={this._renderItems}
      keyExtractor = { (item, index) => index.toString() }      
      extraData={this.state}/>
    <DialogButton text="DISMISS" align="center" textStyle ={{color:'red'}}
    activeOpacity={0.99}
    onPress={()=>{this.dialogComponents.dismiss()}}/>
    </View>

    </DialogContent>
    </DialogComponent>


    <DialogComponent
        dialogStyle = {{backgroundColor:'transparent',}}
        dismissOnTouchOutside={true}
        dismissOnHardwareBackPress={true}
        width={wp(80)}
        height={hp(30)}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }        
        dialogStyle={{width:wp(80), height:hp(38),borderRadius:5,}}
        ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}>

      <DialogContent>

    <View style={{flexDirection:'column', width:wp(80),alignSelf:'center'
    ,backgroundColor:'white', height:hp(38),borderRadius:5, }}>

      <FlatList data={this.state.chartStyles}
      renderItem={this._renderItemss}
      keyExtractor = { (item, index) => index.toString() }      
      extraData={this.state}/>
    <DialogButton text="DISMISS" align="center" textStyle ={{color:'red'}}
    activeOpacity={0.99}
    onPress={()=>{this.dialogComponent.dismiss()}}/>
    </View>

    </DialogContent>
    </DialogComponent>

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