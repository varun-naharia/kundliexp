import React, {Component} from 'react';
import {StyleSheet,ScrollView,PermissionsAndroid,ToastAndroid,Animated, Easing, Text, View,Image,TouchableOpacity,Container} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class AboutUs extends Component {

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
      this.getAboutUs()
    }


    render() {
        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }

        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'ABOUT US'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <ScrollView>
          <Text style = {{fontSize:14,alignSelf:'center',marginVertical:10,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'justify',width:'95%'}}>
          {this.state.about_us}
          </Text>
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

