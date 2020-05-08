import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View , Dimensions} from 'react-native';
const GLOBAL = require('./Global');
import Header from 'react-native-custom-headers'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};
import IndicatorCustom from './IndicatorCustom.js';
import WebView from 'react-native-webview'

export default class RahuKalam extends Component<Props>{

    constructor(props){

        super(props)
        const { navigation } = this.props;
        this.state = {
            mon:'',
            tue:'',
            wed:'',
            thu:'',
            fri:'',
            sat:'',
            sun:''
        }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }





  componentDidMount(){
    this.getData()

  }

  getData = () => {
    const url = GLOBAL.BASE_URL + 'rahukalam';
    //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'rahukalam',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()

        console.log(JSON.stringify(responseJson));

         this.setState({mon: responseJson.monday,
          tue: responseJson.tuesday,
          wed: responseJson.wednesday,
          thu: responseJson.thrusday,
          fri: responseJson.friday,
          sat: responseJson.saturday,
          sun: responseJson.sunday
         });


      })
      .catch(error => {
        this.hideLoading()
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
           headerName={'RAHU KALAM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Monday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.mon}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Tuesday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.tue}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Wednesday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.wed}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Thursday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.thu}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Friday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.fri}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Saturday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.sat}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:15, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Sunday</Text>
          <Text style={{fontSize:15, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.state.sun}</Text>
          </View>
          <View style={{width:wp(90), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
    },
})












