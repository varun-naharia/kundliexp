import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


var currentDate = moment().format("DD-MMM");


type Props = {};
class SubscribeListIn extends Component<Props> {

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
                key: "#1",
                name: "3 Months Subscription",
                image: require("./resources/pinkscreen.png"),
                add2: "1st January to 31st March",
                "is_selected":"0",

              },
              {
                key: "#2",
                name: "3 Months Subscription",
                image: require("./resources/bluescreen.png"),
                add2: "1st April to 31st June"
              },

              {
                key: "#3",
                name: "3 Months Subscription",
                image: require("./resources/purples.png"),
                add2: "1st July to 31st September"
              },

              {
                key: "#4",
                name: "3 Months Subscription",
                image: require("./resources/yellows.png"),
                add2: "1st October to 31st December"
              }
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





selectedFirst=(item,indexs)=>{
//    alert(indexs)
       var a = this.state.pdList
        for (var i = 0;i<this.state.pdList.length ;i ++){

            this.state.pdList[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({catid : item.id})

        }else{
            index.is_selected = "0"
        }
        this.state.pdList[indexs] = index
        this.setState({pdList:this.state.pdList})

        this.timeoutCheck = setTimeout(() => {
    this.props.navigation.navigate('Payment')
   }, 200);
}


  _renderItem=({item,index}) => {
        return (
        <TouchableOpacity style={{width:wp('90%'),alignSelf:'center',backgroundColor:'#e3e3e3',marginTop:hp(2.5),borderRadius:8}}
        onPress={() => this.selectedFirst(item, index)}
        activeOpacity={0.99}>

           <ImageBackground source={item.image}
            style={{width:wp('90%'),alignSelf:'center',resizeMode:'stretch',borderRadius:8}}
            imageStyle={{ borderRadius: 25,borderRadius:10 }}
            >

             <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'white',alignSelf:'flex-end',borderBottomWidth:2,borderBottomColor:'#e60000',marginRight:wp(3),marginTop:hp(1)}}>{item.add3}</Text>

             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:wp('4.5%'),width:wp('80%')}}>

               <View style={{flexDirection:'column',width:wp('60%'), backgroundColor:'transparent'}}>
               <Text style={{fontSize:24,fontFamily:'Nunito-SemiBold',color:'white',}} multiline={true}>{item.name}</Text>
               <Text style={{fontSize:21,fontFamily:'Nunito-SemiBold',color:'white',marginTop:hp(5),marginBottom:hp('2%')}} multiline={true}>{item.add2}</Text>
               </View>

               {item.is_selected == '0' && (

                <View style={{backgroundColor:'transparent'}}/>

                )}

               {item.is_selected=='1' && (

               <Image source={require('./resources/tick1.png')}
                style={{height:35,width:35,resizeMode:'contain', marginTop:hp(-2)}}/>

                )}

             </View>



           </ImageBackground>
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

        <View style={{flex:1, flexDirection:'column'}}>
               <Header navigation={this.props.navigation}
               showHeaderImage={false}
               headerColor ={'#E60000'}
               backImagePath={require('./resources/back.png')}
               headerName={'BASIC ASTROLOGY'}
               headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />



                    <FlatList style= {{flexGrow:0,marginBottom:hp(2.5)}}
                              data={this.state.pdList}
                              numColumns={1}
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

export default SubscribeListIn;