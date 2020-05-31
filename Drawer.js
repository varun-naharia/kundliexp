import React, {Component} from 'react';
import {NavigationActions,StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,    StyleSheet,
    Image,TouchableOpacity,Alert,Share} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import Button from 'react-native-button';


const GLOBAL = require('./Global');

class Drawer extends React.Component {

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            my: 'sdf',
            expandList:true,
            pic:'',
            userDetails:''
        }
    }



    _fancyShareMessage=()=>{

        var a = 'Hey! Checkout Kundli Experts app from Play Store'

        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this app via....'
            }
        ).then(this._showResult);
    }

    componentDidMount() {

     //    var value =  AsyncStorage.getItem('name');
     //    value.then((e)=>{

     //        GLOBAL.name = e;

     //        this.setState({my: GLOBAL.name})
     //    })
     // console.log('did')
     this.getProfile()     
     this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state => {
        this.getProfile()
     };

     getProfile(){
        const url = GLOBAL.BASE_URL + "get_profile";
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
       

        //Color in logs
        console.log("\x1b[36m%s\x1b[0m" ,"Background Color Is Blue");
    
        console.log("\x1b[36m",JSON.stringify(responseJson))
          if (responseJson.status == true) {

            this.setState({userDetails : responseJson.user_details})
          } else {

          }
        })
        .catch(error => {
          console.error(error);
        });

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


        this.props.navigation.dispatch(DrawerActions.closeDrawer())

           }else {
               alert('Something Went Wrong.')
           }
        })
        .catch((error) => {
          console.error(error);
        });
    }

openMembers=()=>{
    GLOBAL.typelist='1'
    this.props.navigation.navigate('ListMember')

}
    navigateToScreen1 = (route) => () => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }


    navigateToScreen = (route) => () => {

        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }







    render () {
        var yeah = this.state.userDetails
//        alert(JSON.stringify(yeah))
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <ScrollView
                showsVerticalScrollIndicator ={false}>
                    <View style={{backgroundColor:'white',}}>
                        <TouchableOpacity  onPress={this.navigateToScreen('EditProfile')}
                        activeOpacity={0.9}>

                        <View  style={styles.headertop}>

                            <View style={{marginTop:30, marginLeft:20, flexDirection: 'column'}}>

                            <Image style={{width:70, height:70, borderRadius:35}}
                            source={{uri : yeah.image}}
                            />
                                <TouchableOpacity style={{backgroundColor:'transparent', position:'absolute', top:5, left:55}}
                                onPress={this.navigateToScreen('EditProfile')}>
                                <Image style={{width:20, height:20, resizeMode:'contain',}}
                                source={require('./resources/pencil.png')}/>
                                </TouchableOpacity>
                                <View style={{flexDirection:'column', marginTop:5,}}>

                                    <Text style = {{marginTop:10,color : 'white',marginLeft : 10,fontSize: 17, height:'auto',fontFamily:'Nunito-Light'}} >
                                    {yeah.name}
                                    </Text>
                                    <Text style = {[styles.drawerText, {color:'white'}]} >
                                    {yeah.email}
                                    </Text>

                                </View>
                            </View>

                        </View>
                        </TouchableOpacity>


                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_home.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.toggleDrawer()}>
                                Home
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_wish.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('Wishlist')}>
                                Wishlist
                            </Text>
                        </View>



                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_order.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('MyOrders')}>
                                  My Order
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_history.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('History')}>
                                  History
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_book.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('HistoryInperson')}>
                                  In Person Bookings
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_pdf.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('PdfYours')}>
                                  Your PDF's
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_about.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=> this.props.navigation.navigate('AboutUs')}>
                               About Us
                            </Text>
                        </View>


{/*
                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_tc.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Support')}>
                                  Transaction History
                            </Text>
                        </View>
                      */}

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_support.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Support')}>
                                Support
                            </Text>
                        </View>



                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_share.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this._fancyShareMessage()}>
                                Share
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_member.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=> this.openMembers()}>
                               User List
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_setting.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=> this.props.navigation.navigate('Settings')}>
                               Settings
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_wallet.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=> this.props.navigation.navigate('Wallet')}>
                               Wallet
                            </Text>
                        </View>




                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_notif.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Notification')}>
                                  Notification
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_free.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('FreeAstro')}>
                                  Free Astro Reports
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_tele.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>Linking.openURL(`tel:${GLOBAL.helpline_number}`)}>
                                  Customer Care No.
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_life.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('HoroMatchHistory')}>
                                  Horoscope Matching History
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_life.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('LifePredHistory')}>
                                  Life Prediction History
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_saved.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('SavedKundli')}>
                                  Choose Saved Kundli
                            </Text>
                        </View>


                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./resources/drawer/d_logout.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen1('Login')}>
                                Logout
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};


const styles = StyleSheet.create({
    container: {
        backgroundColor :'#f1f1f1',

    },
    drawerText :{
        marginTop : 2,
        color : 'white',
        marginLeft : 10,
        fontSize: 13,
        fontFamily:'Nunito-Light'
    } ,
    headertop :{
        width : 300,
        height : 180,
        backgroundColor : '#E60000',
        flexDirection:'column'
    } ,

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    drawericon: {
        borderLeftWidth: 1,
        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,
        resizeMode:'contain'
    },
    drawericons: {

        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,
    },
    drawerTexts: {

        width: 'auto',
        height: 22,
        marginLeft : 45 ,
        marginTop : -20,
        color: 'black',
        fontFamily: 'Nunito-Light'

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})

export default Drawer;