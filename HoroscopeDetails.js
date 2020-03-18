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
export default class HoroscopeDetails extends Component<Props> {

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
      var now = moment().format('DD-MM-YYYY')
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
           headerName={'HOROSCOPE DETAILS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

      <View style={{margin:15, flexDirection:'column', alignItems:'flex-start'}}>

      <View style={{backgroundColor:'white', flexDirection:'row', width:wp(75), marginLeft:wp(2), marginTop:hp(1),}}>
      <View style={{width:110, height:110, borderColor: 'transparent', borderWidth: 0.001, borderRadius: 55,elevation:8, backgroundColor:'white', }}>
      <Image style={{width:'100%', height:'100%',}} source={require('./resources/ho_leo.png')}/>
      </View>
      <View style={{flexDirection:'column', alignSelf:'center',marginLeft:wp(3),}}>
       <Text style={{fontSize:18,color:'#E60000', fontFamily: 'Nunito-Bold'}}>Leo</Text>
       <Text style={{fontSize:16,color:'black', fontFamily: 'Nunito-Bold'}}>{now}</Text>
       </View>
       </View>

       <Text style={{fontSize:16,color:'#bfbfbf', fontFamily: 'Nunito-Regular', marginTop:hp(4)}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchangedt. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions</Text>


            </View>


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

