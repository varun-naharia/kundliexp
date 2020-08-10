import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Clipboard,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Share
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
import Header from 'react-native-custom-headers';

export default class Refernearn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            ref_code:GLOBAL.userDetails.referral_code
        };

    }

    componentWillUnmount() {

    }

_fancyShareMessage=()=>{
        var reefercode = this.state.ref_code
        var a = 'Hey! Checkout Kundali Expert app. Use my referral code '+reefercode+ 
        ' to signup into the app to get 500 referral points ' +
        'https://play.google.com/store/apps/details?id=com.kundliexpert'

        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this app via....'
            }
        ).then(this._showResult);
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    copytoclipboard = async () => {
        //To copy the text to clipboard
        await Clipboard.setString(this.state.ref_code);
        alert('Copied to Clipboard!');
      };

    componentDidMount(){


    }




    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
        <View style={{flex:1}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'REFER AND EARN'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

       <ScrollView style={styles.container}>

       <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height,backgroundColor:'#F2F5F7'}}>
         <View style={{width : Dimensions.get('window').width,height : Dimensions.get('window').height-250,flexDirection:'column',backgroundColor:'white'}}>
          <Image source={require('./resources/share_earn.png')}
           style={{ height:135,width:135,alignSelf:'center',borderRadius:3, marginTop:50,resizeMode:'contain'}} />

           <Text style={{fontSize:18,fontFamily:'Nunito-Bold',color:'black',alignSelf:'center',marginTop:30}}>Welcome to Kundali Expert App</Text>

           <Text style={{fontSize:13.5,fontFamily:'Nunito-Regular',color:'#575353',alignSelf:'center',
           textAlign:'center',lineHeight:23,
           marginTop:10,marginLeft:15,marginRight:15}}>You and new users who signup using your referral code gets 500 points in referral wallets.
           </Text>


           <Text style={{fontSize:19,alignSelf:'center',fontFamily:'Nunito-Regular',marginTop:40,color:'#575353'}}>Share your referral code</Text>

           <Image source={require('./resources/logo.png')}
            style={{ height:140,width:290,alignSelf:'center',resizeMode:'contain',marginTop:10}}>
            </Image>

           <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:-97,borderColor:'#57535326'}}>
           </View>

           <TouchableOpacity onPress={()=> this.copytoclipboard()}>
           <Text style={{fontSize:19,fontFamily:'Nunito-Regular',color:'#575353',alignSelf:'center',marginTop:10}}>{this.state.ref_code}</Text>
            </TouchableOpacity>
           <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:10,borderColor:'#57535326'}}>
           </View>


          </View>

         <Text style={{fontSize:21,fontFamily:'Nunito-Regular',marginTop:25,marginLeft:25,color:'#385C8E'}}>Share Via</Text>

         <View style={{flexDirection:'row',marginTop:20,marginLeft:27,alignItems:'center'}}>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
         <Image source={require('./resources/share_03.png')}
          style={{ height:60,width:60,resizeMode:'contain'}} />
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./resources/share_05.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
        </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./resources/share_07.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
          </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./resources/share_09.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
        </TouchableOpacity>

         </View>

         <TouchableOpacity style={{alignSelf:'center',marginTop:25}}
         onPress={()=> this.props.navigation.goBack()}>
         <Image source={require('./resources/share_04.png')}
          style={{ height:50,width:50,resizeMode:'contain'}} />
        </TouchableOpacity>


       </View>

       </ScrollView>

       </View>
               );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f1f1f1',

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
