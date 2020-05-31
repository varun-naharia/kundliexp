import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import PageControl from 'react-native-page-control';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var array = [
  '',
  '',
  '',
];
var arrays = [
  'Welcome to Kundali Expert',
  'Consult Astrologer live on chat/call',
  'Get Astrology Classes',
];
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const window = Dimensions.get('window');
type Props = {};
export default class Slider extends Component<Props> {
  state = {
    value: '',
    index: '',
    values: '',
  };
  static navigationOptions = ({navigation}) => {
    return {
      swipeEnabled: false,
      gesturesEnabled: false,
      header: () => null,
    };
  };

  buttonClickListener = () => {
    GLOBAL.user_id='0'
    this.props.navigation.replace('DrawerNavigator');
  };

  renders = index => {
    this.setState({value: array[index]});
    this.setState({values: arrays[index]});
    this.setState({index: index});
  };

  _handlePress = () => {
    this.props.navigation.replace('Login');
  };

  buttonClickListenersLogin=()=>{

    this.props.navigation.navigate('Login');

  }

  buttonClickListenersSignup=()=>{

    this.props.navigation.navigate('Signup');

  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
       <StatusBar backgroundColor={'#c70b0b'}/>

        <View style={{width: window.width, height: window.height}}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: window.height,
            }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={0}
              showPagination={true}
              onChangeIndex={index => this.renders(index.index)}>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slider_one.png')} />
              </View>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slider_two.png')} />
              </View>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slider_three.png')} />
              </View>
            </SwiperFlatList>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 200,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {this.state.values}
          </Text>

{/*          <Text
            style={{
              color: 'grey',
              fontFamily: 'Nunito-Regular',
              fontSize: 17,
              marginTop: 8,
              textAlign: 'center',
            }}>
            {this.state.value}
          </Text>
*/}

          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontSize: 12,
              marginLeft: 10,
              marginTop: '8%',
              textAlign: 'left',
            }}>
            By signing up, you agree to our Terms of use and Privacy Policy
          </Text>

            <PageControl
              style={{width: 100, position:'absolute', top:-30, alignSelf:'center'}}
              numberOfPages={3}
              currentPage={this.state.index}
              hidesForSinglePage
              pageIndicatorTintColor="#CCCCCC"
              currentPageIndicatorTintColor="#E60000"
              indicatorStyle={{borderRadius: 5.5, marginLeft: -0.5}}
              currentIndicatorStyle={{borderRadius: 5.5, marginLeft: -0.5}}
              indicatorSize={{width: 11, height: 11}}
              onPageIndicatorPress={this.onItemTap}
            />

          <View
            style={{
              position: 'absolute',
              bottom: 65,
              width: '90%',
              backgroundColor:'white',
              alignSelf:'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>


          <Button
          containerStyle={{width:wp('40%'),padding:6, height:hp(5), overflow:'hidden', borderRadius:40,
           backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  }}
          style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
          onPress={this.buttonClickListenersLogin}
          >
          Login
          </Button>


          <Button
          containerStyle={{width:wp('40%'),padding:6, height:hp(5), overflow:'hidden', borderRadius:40,
           backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  }}
          style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
          onPress={this.buttonClickListenersSignup}
          >
          Signup
          </Button>

{/*            <Button
              style={{
                padding: 4,
                fontSize: 18,
                color: '#E60000',
                marginRight: 10,
                height: 40,
                fontFamily: 'Nunito-Bold',
              }}
              styleDisabled={{color: 'red'}}
              onPress={() => this.props.navigation.replace('Login')}>
              Login
            </Button>
*/}

          </View>

{/*            <Button
              containerStyle={{
                padding: 4,
                height: 40,
                position:'absolute',
                bottom:10,
                alignSelf:'center',
              }}
              style={{                fontSize: 18,
                color: '#E60000',                
                fontFamily: 'Nunito-Bold',

}}
              styleDisabled={{color: 'red'}}
              onPress={() => this.buttonClickListener()}>
              SKIP
            </Button>
*/}


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  child: {
    height: window.height,
    width: window.width,
    alignSelf:'center',
    justifyContent: 'center',
  },
  text: {
    resizeMode: 'stretch',
    height: window.height,
    width: window.width,
    alignSelf:'center',
    marginTop: 0,
  },
});
