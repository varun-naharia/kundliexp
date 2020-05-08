import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking , Dimensions} from 'react-native';
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
import * as Animatable from 'react-native-animatable';
import RateModal from 'react-native-store-rating'

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
            isModalOpen: false,
            pdList:[
      {
        id: '1',
        title: 'Kundli',    
        artwork: require('./resources/fone.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '2',
        title: 'Horoscope Matching',    
        artwork: require('./resources/ftwo.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '3',
        title: 'Medical Astrology',    
        artwork: require('./resources/fthree.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '4',
        title: 'Numerology',    
        artwork: require('./resources/ffour.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '6',
        title: 'Lal Kitab',    
        artwork: require('./resources/fsix.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '7',
        title: 'KP System',    
        artwork: require('./resources/fseven.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '8',
        title: 'Know Your Lucky Number',    
        artwork: require('./resources/ffour.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '9',
        title: 'Sade Sati',    
        artwork: require('./resources/fnine.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '10',
        title: 'Life Reports',    
        artwork: require('./resources/flife.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '11',
        title: 'Match Making',    
        artwork: require('./resources/ftwo.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '12',
        title: 'Rahu Kalam',    
        artwork: require('./resources/ftwelve.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '13',
        title: 'Rating & Feedback',    
        artwork: require('./resources/fthirteen.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '14',
        title: 'Yearly Prediction',    
        artwork: require('./resources/ffourteen.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '15',
        title: 'Membership',    
        artwork: require('./resources/ffifteen.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '16',
        title: 'Mantra Suggestion',    
        artwork: require('./resources/fsixteen.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '17',
        title: 'Kundali Expert Magazine',    
        artwork: require('./resources/fsev.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '18',
        title: 'Know Your Lucky Colour',    
        artwork: require('./resources/feig.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '19',
        title: 'Rudraksh Suggestion',    
        artwork: require('./resources/rudraksha.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '20',
        title: 'Gemstone Suggestion',    
        artwork: require('./resources/ftwent.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '21',
        title: 'Gand Mool',    
        artwork: require('./resources/fmool.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '22',
        title: 'Financial Astrology',    
        artwork: require('./resources/ffinas.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '23',
        title: 'Dream Meaning',    
        artwork: require('./resources/fdream.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '24',
        title: 'Baby Name Suggestion',    
        artwork: require('./resources/fbaby.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '25',
        title: 'Chaughadive',    
        artwork: require('./resources/fchau.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '26',
        title: 'Daily Panchang',    
        artwork: require('./resources/om.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '27',
        title: 'Daily Prediction',    
        artwork: require('./resources/ffourteen.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '28',
        title: 'Dasha Bala',    
        artwork: require('./resources/fdasha.png'),
        hasIc:0,
        ic:'' 
      },
      {
        id: '29',
        title: 'Contact Us',    
        artwork: require('./resources/fcontact.png'),
        hasIc:0,
        ic:''        
      },
      {
        id: '30',
        title: 'About Us',    
        artwork: require('./resources/fabout.png'),
        hasIc:0,
        ic:''
      },
      {
        id: '31',
        title: 'Download In Pdf',    
        artwork: require('./resources/fpdf.png'),
        hasIc: 1,
        ic: require('./resources/ic_paid.png')
      },
      {
        id: '32',
        title: 'Download In Pdf',    
        artwork: require('./resources/fpdfs.png'),
        hasIc: 1,
        ic: require('./resources/ic_free.png')        
      },

]
        }
    }

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
    this.props.navigation.navigate('MatchMaking', {matchReportType : 'horo_match'})    
  }else if(item == 3){
    alert('Coming soon...')
//    this.props.navigation.navigate('KundliForm',{astroReportType : 'medical_astro'})  
  }else if(item == 4){
    GLOBAL.isDailyPres = '0'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 6){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'lal_kitab'})  
  }else if(item == 7){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'kp_system'})  
  }else if(item == 8){
    GLOBAL.isDailyPres = '1'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 9){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'sade_sati'})  
  }else if(item == 10){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'life_report'})  
  }else if(item == 11){
    this.props.navigation.navigate('MatchMaking', {matchReportType : 'match_making'})    
  }else if(item == 12){
    this.props.navigation.navigate('RahuKalam')
  }else if(item == 13){
    var PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.larder'
    Alert.alert(
        'Enjoying the app?',
        'Please help us by rating the app on '+(Platform.OS =='ios' ? 'app store' : 'play store')+'.',
        [
            {text: 'Rate Now!', onPress: () => {

                    Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));

            }},
            {text: 'Cancel', onPress:()=>{ console.log('Pressed Cancel')}}
        ]
    );    
  }else if(item == 14){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'year_pred'})  
  }else if(item == 16){
    GLOBAL.isDailyPres = '4'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 18){
    GLOBAL.isDailyPres = '3'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 19){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'rudraksh_sugges'})
  }else if(item == 20){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'gemstone_sugges'})
  }else if(item == 21){
    this.props.navigation.navigate('GandMool')
  }else if(item == 22){
    alert('Coming soon...')
  }else if(item == 23){
    alert('Coming soon...')
  }else if(item == 24){
    alert('Coming soon...')
  }else if(item == 25){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'chaughadive'})
  }else if(item == 26){
    this.props.navigation.navigate('DailyPanchang')
  }else if(item == 27){
    GLOBAL.isDailyPres = '2'
    this.props.navigation.navigate('NumerologyForm')  
  }else if(item == 28){
    alert('Coming soon...')
  }else if(item == 29){
  //  this.props.navigation.navigate('Chat')    
  }else if(item == 31){
    this.props.navigation.navigate('KundliForm',{astroReportType : 'paid_pdf'})
  }else if(item == 32){
   this.props.navigation.navigate('ViewPdf')    
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

                {itemData.item.hasIc == 1 &&(
                    <Animatable.Image source={itemData.item.ic}
                   style  = {{width:35, height:35,position:'absolute',top:8,right:8,resizeMode:'contain'}}
                   animation={'flash'}
                   duration={2500}
                   iterationCount='infinite'
                   />

                  )}

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

            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5), alignSelf:'center'}}
                      data={this.state.pdList}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
            />


      <RateModal
                  modalTitle="Your modal title"
              rateBtnText={'Rate'}
              cancelBtnText={'Cancel'}
              totalStarCount={5}
              defaultStars={5}
              isVisible={true}
              sendBtnText={'Send'}
              commentPlaceholderText={'Placeholder text'}
              emptyCommentErrorMessage={'Empty comment error message'}
              playStoreUrl={'https://play.google.com/store/apps/details?id=in.AajTak.headlines'}
              isModalOpen={this.state.isModalOpen}
              storeRedirectThreshold={3}
              style={{
                paddingHorizontal: 30,
              }}
              onStarSelected={(e) => {
                console.log('change rating', e);
              }}
              onClosed={() => {
                console.log('pressed cancel button...')
                  this.setState({
                  isModalOpen: false
                })
              }}
              sendContactUsForm={(state) => {
                alert(JSON.stringify(state));
              }}
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

