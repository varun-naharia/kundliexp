import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View , Dimensions} from 'react-native';
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};
import IndicatorCustom from './IndicatorCustom.js';
import WebView from 'react-native-webview'
import AutoHeightWebView from 'react-native-autoheight-webview'

export default class Terms extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            terms:'',
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
    this.showLoading()
    const url = GLOBAL.BASE_URL + 'terms_and_condition';
    //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'terms_and_condition',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
              this.hideLoading()

        console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          this.setState({terms: responseJson.terms_condition});

        } else {

        }
      })
      .catch(error => {
        console.error(error);
        this.hideLoading()
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
           headerName={'TERMS & CONDITIONS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />



    <AutoHeightWebView source={{html : this.state.terms}} 
    style={{width:window.width,}}
    containerStyle={{ margin:'1.5%' }}
    scalesPageToFit={true}
    scrollEnabled={false}
    viewportContent={'width=device-width, user-scalable=no'}/>



{/*        <WebView containerStyle={{margin:10}}
                 source={{ html: this.state.gandmool }}
        />
*/}






      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
    },
})












