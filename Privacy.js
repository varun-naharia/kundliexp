import React, { useState, useEffect } from 'react';
import {Text, View} from 'react-native';
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers'
import IndicatorCustom from './IndicatorCustom'
import AutoHeightWebView from 'react-native-autoheight-webview'

const Privacy=(props)=>{

	const [ privacy, setPrivacy ] = useState();
	const [ loading, showLoading] = useState(false);

	useEffect(()=>{
		// alert(JSON.stringify(props))
		getData();
	}
	)

	async function getData(){
	    const url = GLOBAL.BASE_URL + 'privacy';
	    // showLoading(true)
	    fetch(url, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
	        mode: 'privacy',
	      }),
	    })
	      .then(response => response.json())
	      .then(responseJson => {
              // showLoading(false)

	        console.log(JSON.stringify(responseJson));
	        if (responseJson.status == true) {
	        	setPrivacy(responseJson.privacy)
	        } else {

	        }
	      })
	      .catch(error => {
	        console.error(error);
	        // this.hideLoading()
	      });

	}

	// We dont use "this" referencing in HOOKS


	return(

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'PRIVACY POLICY'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
           {loading && (
           	            <IndicatorCustom/>

           	)}
           {loading == false &&(

		    <AutoHeightWebView source={{html : privacy}} 
		    style={{width:window.width,}}
		    containerStyle={{ margin:'1.5%' }}
		    scalesPageToFit={true}
		    scrollEnabled={false}
		    viewportContent={'width=device-width, user-scalable=no'}/>

           	)}
	</View>

	);
}

export default Privacy