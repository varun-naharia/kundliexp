import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');

import {decode as atob, encode as btoa} from 'base-64'

const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {};
export default class FreeAstro extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




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
            isDisabledsss:false,
            username:'',
            wallet:'',
            referral:'',
            pdList:[
      {
        id: '1',
        title: 'Kundli',    
        artwork: require('./resources/fone.png')
      },
      {
        id: '2',
        title: 'Match Making',    
        artwork: require('./resources/ftwo.png')
      },
      {
        id: '3',
        title: 'Medical Astrology',    
        artwork: require('./resources/fthree.png')
      },
      {
        id: '4',
        title: 'Numerology',    
        artwork: require('./resources/ffour.png')
      },
      {
        id: '6',
        title: 'Lal Kitab',    
        artwork: require('./resources/fsix.png')
      },
      {
        id: '8',
        title: 'Know Your Lucky Number',    
        artwork: require('./resources/ffour.png')
      },
      {
        id: '9',
        title: 'Sade Sati',    
        artwork: require('./resources/fnine.png')
      },
      {
        id: '12',
        title: 'Rahu Kalam',    
        artwork: require('./resources/ftwelve.png')
      },
      {
        id: '13',
        title: 'Rating & Feedback',    
        artwork: require('./resources/fthirteen.png')
      },
      {
        id: '14',
        title: 'Yearly Prediction',    
        artwork: require('./resources/ffourteen.png')
      },
      {
        id: '15',
        title: 'Membership',    
        artwork: require('./resources/ffifteen.png')
      },
      {
        id: '16',
        title: 'Mantra Suggestion',    
        artwork: require('./resources/fsixteen.png')
      },
      {
        id: '17',
        title: 'Kundali Expert Magazine',    
        artwork: require('./resources/fsev.png')
      },
      {
        id: '18',
        title: 'Know Your Lucky Colour',    
        artwork: require('./resources/feig.png')
      },
      {
        id: '19',
        title: 'Job & Career',    
        artwork: require('./resources/finin.png')
      },
      {
        id: '20',
        title: 'Gemstone Suggestion',    
        artwork: require('./resources/ftwent.png')
      },
      {
        id: '21',
        title: 'Gand Mool',    
        artwork: require('./resources/fmool.png')
      },
      {
        id: '22',
        title: 'Financial Astrology',    
        artwork: require('./resources/ffinas.png')
      },
      {
        id: '23',
        title: 'Dream Meaning',    
        artwork: require('./resources/fdream.png')
      },
      {
        id: '24',
        title: 'Baby Name Suggestion',    
        artwork: require('./resources/fbaby.png')
      },
      {
        id: '25',
        title: 'Chaughadive',    
        artwork: require('./resources/fchau.png')
      },
      {
        id: '26',
        title: 'Daily Panchang',    
        artwork: require('./resources/om.png')
      },
      {
        id: '27',
        title: 'Daily Prediction',    
        artwork: require('./resources/ffourteen.png')
      },
      {
        id: '28',
        title: 'Dasha Bala',    
        artwork: require('./resources/fdasha.png')
      },
      {
        id: '29',
        title: 'Contact Us',    
        artwork: require('./resources/fcontact.png')
      },
      {
        id: '30',
        title: 'About Us',    
        artwork: require('./resources/fabout.png')
      },
      {
        id: '31',
        title: 'Download In Pdf',    
        artwork: require('./resources/fpdf.png')
      },
      {
        id: '32',
        title: 'Download In Pdf',    
        artwork: require('./resources/fpdfs.png')
      },

]
        }
    }

    _keyExtractor = (item, index) => item.productID;



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


selectedFirsts=(item,indexs)=>{
  console.warn(item)
  if(item == 1){
    this.props.navigation.navigate('KundliForm', {astroReportType : 'kundli'})    
 //   this.getBasicDetailsOur()
  }else if(item == 2){
    this.props.navigation.navigate('MatchMaking')    
  }else if(item == 3){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'medical_astro'})  
  }else if(item == 4){
    GLOBAL.isDailyPres = '0'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 6){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'lal_kitab'})  
  }else if(item == 8){
    GLOBAL.isDailyPres = '1'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 9){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'sade_sati'})  
  }else if(item == 16){
    GLOBAL.isDailyPres = '4'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 18){
    GLOBAL.isDailyPres = '3'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 20){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'gemstone_sugges'})  
  }else if(item == 27){
    GLOBAL.isDailyPres = '2'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 29){
    this.props.navigation.navigate('Chat')    
  }else if(item == 30){
    this.props.navigation.navigate('VideoCall')    
  }
}


getBasicDetails=()=>{
  var url = GLOBAL.ASTRO_APIS_URL +'horo_chart_image/D1'
  // var a = "Basic " + btoa('606042'+":"+'10467f59d08e413501925cd9cb73f191');
  var encr = GLOBAL.ASTRO_APIS_PACKAGE + btoa(GLOBAL.ASTRO_APIS_USERID + ":"+ GLOBAL.ASTRO_APIS_API_KEY)

  var data = {
    "day":17,
    "month":11,
    "year":1995,
    "hour":12,
    "min":10,
    "lat":28.70937000,
    "lon":77.12312000,
    "tzone":5.5
  };

  fetch(url, {
  method: 'POST',
  headers: {
    'authorization': encr,
    'Content-Type': 'application/json',
  },
  body:JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((responseJson) => {
//    alert(JSON.stringify(responseJson))
    GLOBAL.response = responseJson
    this.props.navigation.navigate('KundliForm')
    console.log('response object:',responseJson)
  })
  .catch((error) => {
  console.error(error);
  });    
}


getBasicDetailsOur=()=>{
    this.props.navigation.navigate('KundliForm')

//   var url = 'http://139.59.76.223/kundali_expert/astrology_api/global_api'
//   // var a = "Basic " + btoa('606042'+":"+'10467f59d08e413501925cd9cb73f191');
//   var encr = GLOBAL.ASTRO_APIS_PACKAGE + btoa(GLOBAL.ASTRO_APIS_USERID + ":"+ GLOBAL.ASTRO_APIS_API_KEY)

//   var data = {
// "lang":"hi",
// "date":"10",
// "month":"05",
// "year":"2019",
// "hour":"19",
// "minute":"10",
// "latitude":"19.2056",
// "longitude":"25.2056",
// "timezone":"5.5",
// "api-condition":"basic_detail"
//   };

//   fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body:{
//     "user_id":'10',
// "lang":"hi",
// "date":"10",
// "month":"05",
// "year":"2019",
// "hour":"19",
// "minute":"10",
// "latitude":"19.2056",
// "longitude":"25.2056",
// "timezone":"5.5",
// "api-condition":"basic_detail"
//   },
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     alert(JSON.stringify(responseJson))
//     // GLOBAL.response = responseJson
//     // this.props.navigation.navigate('KundliForm')
//     // console.log('response object:',responseJson)
//   })
//   .catch((error) => {
//   console.error(error);
//   });    
}


selectedFirst=(item,indexs)=>{
    this.props.navigation.navigate('FreeAstroIn')
}


    _renderItem = (itemData) => {

        return (
            <TouchableOpacity style={{width:wp('45%'), margin:5, height:hp('14%'),}}
            onPress={() => this.selectedFirsts(itemData.item.id)}
            activeOpacity={0.9}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:8,
                    shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', justifyContent:'center'
                }}>
                    <Image source={itemData.item.artwork}
                           style  = {{width:50, height:50,alignSelf:'center',resizeMode:'contain'}}/>

                    <Text style = {{fontSize:14,marginTop:13,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'center',width:'95%'}}>
                        {itemData.item.title}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }


    render() {
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}
                                       size={50} color="#E9128B" />
                </View>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'FREE ASTRO REPORTS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.pdList}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
            />

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

