import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers';
import IndicatorCustom from './IndicatorCustom'

class Notification extends Component<Props> {


static navigationOptions = {
          title: 'Notification',
          headerTintColor: '#EA128B',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:150,
            color:'#EA128B'

          },
      };




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
       notificationslist:[{
        id:'1',
        title:'Deepak kumar received payment successfully',
        message:'yeah it is',
        added_on:'3 hours ago'
       }],
    }
}
  _keyExtractor = (item, index) => item.productID;

  renderRowItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row',
    flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 
    ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:10, elevation:5}}>

    <Image style={{width:30, height:30, resizeMode:'contain', margin:12}} source={require('./resources/notification.png')}/>
    <View style={{flexDirection:'column', margin:10, width: '82%',}}>
     <Text style={{fontSize:15, color:'#21262C', fontFamily: 'Nunito-SemiBold'}}>{item.title}</Text>
      <Text style={{fontSize:13, marginRight:10,fontFamily: 'Nunito-Regular'}}>{item.message}</Text>
     <View style={{flexDirection:'row', width: '100%', alignItems:'flex-end', justifyContent: 'flex-end'}}>
      <Image style={{width: 18, height: 18, resizeMode: 'contain'}} source={require('./resources/clocks.png')}/>
      <Text style={{fontSize:13,marginTop: 10,marginLeft: 10,marginRight:10,  color:'#7E7E7E'}}>{item.added_on}</Text>
         </View>

</View>
</View>



    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

  _handleStateChange = state => {


   this.getReviews()
 };


componentDidMount(){
//  alert(GLOBAL.productid)
 // this.props.navigation.addListener('willFocus',this._handleStateChange);

 //  this.getReviews()
}

   getReviews= () =>{
      this.showLoading();
      const url = GLOBAL.BASE_URL +  'notification'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.userid

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      console.log(JSON.stringify(responseJson))
       this.hideLoading()
       if (responseJson.status == true) {


       this.setState({notificationslist : responseJson.notification})

       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }

  render() {



    if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }
    return (

      <View style={styles.container}>
         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'NOTIFICATION'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
            {this.state.notificationslist.length == 0 &&(
                <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'Nunito-Regular'}}>No new notifications!</Text>
              )}

              {this.state.notificationslist.length !=0 &&(
                  <FlatList style= {{backgroundColor:'#f2f2f2',flexGrow:0, marginBottom:20}}
                      data={this.state.notificationslist}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this.renderRowItem}
                    />

                )}




     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default Notification;
