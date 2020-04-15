import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View , Dimensions} from 'react-native';
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};
import IndicatorCustom from './IndicatorCustom.js';
import WebView from 'react-native-webview'

export default class GandMool extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            gandmool:'',
        }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }





  componentDidMount(){
    this.getReviews()

  }
  getReviews = () => {
    const url = GLOBAL.BASE_URL + 'master_prices';
    //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: '',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()

        console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          this.setState({gandmool: responseJson.gandmool});

        } else {

        }
      })
      .catch(error => {
        console.error(error);
      });
  };




  render(){

        if(this.state.loading){
        return(
            <IndicatorCustom/>
        )
    }


    return(
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'GAND MOOL'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />





        <WebView containerStyle={{margin:10}}
  source={{ html: this.state.gandmool }}
    />







      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
    },
})












