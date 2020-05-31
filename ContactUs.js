import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image,Linking, TouchableOpacity, Container} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class ContactUs extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            about_us:'',
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    getAboutUs= () =>{
        this.showLoading()
      const url = GLOBAL.BASE_URL + "about_us";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode:'about_us'
        })
      })
        .then(response => response.json())
        .then(responseJson => {
           this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {
            this.setState({about_us: responseJson.about_us})
          } else {
            alert('Something went wrong!')
          }
        })
        .catch(error => {
          console.error(error);
          // this.hideLoading()
        });


    }


    componentDidMount(){
      // this.getAboutUs()
    }


    render() {
        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }

        var yeah = GLOBAL.all_settings
        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'CONTACT US'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <ScrollView>
          <Text style = {{fontSize:20,marginVertical:10,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'left',marginLeft:wp(3)}}>
          Contact Details:
          </Text>

           <View style={{flexDirection:'column', marginLeft:wp(3)}}>
          <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',textAlign:'left',}}>
          Call Us at: </Text>

          <TouchableOpacity onPress={()=> Linking.openURL(`tel:`+GLOBAL.all_settings.helpline_number)}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {GLOBAL.all_settings.helpline_number}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL(`tel:`+GLOBAL.all_settings.landline)}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {GLOBAL.all_settings.landline}</Text>
          </TouchableOpacity>
          </View>

           <View style={{flexDirection:'column', marginLeft:wp(3), marginTop:hp(2)}}>
          <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',textAlign:'left',}}>
          Email Us at: </Text>

          <TouchableOpacity onPress={()=> Linking.openURL(`mailto:`+GLOBAL.all_settings.support_email)}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {GLOBAL.all_settings.support_email}</Text>
          </TouchableOpacity>
          </View>

           <View style={{flexDirection:'column', marginLeft:wp(3), marginTop:hp(2)}}>
          <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',textAlign:'left',}}>
          Website: </Text>

          <TouchableOpacity onPress={()=> {Linking.openURL('https://'+GLOBAL.all_settings.website_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {GLOBAL.all_settings.website_link}</Text>
          </TouchableOpacity>
          </View>

           <View style={{flexDirection:'column', marginLeft:wp(3), marginTop:hp(2)}}>
          <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',textAlign:'left',}}>
          Company Details: </Text>
          <Text style = {{color:'#E60000',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.company_name}</Text>
          <Text style = {{color:'#E60000',fontSize: 15,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.address}</Text>
          </View>


           <View style={{flexDirection:'column', marginLeft:wp(3), marginTop:hp(2), width:wp(95),}}>
          <Text style = {{color:'black',fontSize: 18,fontFamily:'Nunito-Bold',textAlign:'left',}}>
          Social Media: </Text>

          <View style={{flexDirection:'row', width:'83%', }}>
          <Text style = {{color:'purple',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          Facebook - </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL(yeah.facebook_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.facebook_link}</Text>
          </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', width:'83%', }}>
          <Text style = {{color:'purple',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          Instagram - </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL(yeah.instagram_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.instagram_link}</Text>
          </TouchableOpacity>
          </View>


          <View style={{flexDirection:'row', width:'83%', }}>
          <Text style = {{color:'purple',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          Twitter - </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL(yeah.twitter_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.twitter_link}</Text>
          </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', width:'83%', }}>
          <Text style = {{color:'purple',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          LinkedIn - </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL(yeah.linkedin_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.linkedin_link}</Text>
          </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', width:'83%', marginBottom:hp(2)}}>
          <Text style = {{color:'purple',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          YouTube - </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL(yeah.youtube_link).catch(err => console.error("Couldn't load page", err));}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'Nunito-SemiBold',textAlign:'left',marginTop:hp(1)}}>
          {yeah.youtube_link}</Text>
          </TouchableOpacity>
          </View>



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

