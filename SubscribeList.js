import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,ImageBackground,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom.js';

var currentDate = moment().format("DD-MMM");


type Props = {};
class SubscribeList extends Component<Props> {

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
            pdList:[],
            taxes:''
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

      this.getSubsList()
    }

    getSubsList= () =>{
        const url = GLOBAL.BASE_URL + "class_package_list";
       this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: 'package',
          user_id: GLOBAL.user_id

        })
      })
        .then(response => response.json())
        .then(responseJson => {
                 this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {

            this.setState({pdList : responseJson.response,
              taxes: responseJson.tax
            })
          } else {
            alert('No astrology classes found!')
          }
        })
        .catch(error => {
          console.error(error);
          this.hideLoading()
        });


    }





selectedFirst=(item,indexs)=>{
//    alert(indexs)
       var a = this.state.pdList
        for (var i = 0;i<this.state.pdList.length ;i ++){

            this.state.pdList[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ''){
            index.is_selected = '1'
            this.setState({catid : item.id})

        }else{
            index.is_selected = ''
        }
        this.state.pdList[indexs] = index
        this.setState({pdList:this.state.pdList})

   //      this.timeoutCheck = setTimeout(() => {
   //  this.props.navigation.navigate('SubscribeListIn')
   // }, 200);
        this.timeoutCheck = setTimeout(() => {
          if(item.is_active==1){
            alert('You are already subscribed to this package.')
          }else{
          this.props.navigation.navigate('Payment', {
                params: {previous_screen: 'astro_classes', item},
              })
          }
   }, 200);
//   alert(JSON.stringify(item))
}


  _renderItem=({item,index}) => {
 
    var bg,col;
 if(index%2==0){
    col = '#f33d54'
    bg = require('./resources/pinkscreen.png')
 }else{
    col = '#3cf0f5'
    bg = require('./resources/bluescreen.png')
 }


        return (
        <TouchableOpacity style={{width:wp('90%'),alignSelf:'center',backgroundColor:'#e3e3e3',marginTop:hp(2.5),borderRadius:8}}
        onPress={() => this.selectedFirst(item, index)}
        activeOpacity={0.99}>

           <ImageBackground source={bg}
            style={{width:wp('90%'),alignSelf:'center',resizeMode:'stretch',borderRadius:8}}
            imageStyle={{ borderRadius: 25,borderRadius:10 }}
            >
            <TouchableOpacity
            style={{alignSelf:'flex-end',marginRight:wp(3),marginTop:hp(1),flexDirection:'row'}}
            onPress={()=> Linking.openURL(item.file_url)}>
            <Image style={{width:18, height:18, resizeMode:'contain', marginTop:5, marginRight:5}}
            source={require('./resources/down.png')}/>
             <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'white',borderBottomWidth:2,borderBottomColor:'#e60000'}}>About Program</Text>
             </TouchableOpacity>
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:wp('4.5%'),width:wp('80%')}}>

               <View style={{flexDirection:'column',width:wp('60%'), backgroundColor:'transparent'}}>
               <Text style={{fontSize:24,fontFamily:'Nunito-SemiBold',color:'white',}} multiline={true}>{item.package_name}</Text>
               <Text style={{fontSize:21,fontFamily:'Nunito-SemiBold',color:'white',marginTop:hp(5),marginBottom:hp('2%')}} multiline={true}>{item.description} in Rs.{item.base_price} for {item.duration} {item.duration_type} ( + Service Tax {GLOBAL.classTax}% )</Text>
               </View>

{/*               {item.is_selected == '' && (

                <View style={{backgroundColor:'transparent'}}/>

                )}

               {item.is_selected=='1' && (

               <Image source={require('./resources/tick1.png')}
                style={{height:25,width:25,resizeMode:'contain'}}/>

                )}
*/}
             {item.is_active != 1 &&(

              <View style={{backgroundColor:'white', height:hp(6),borderRadius:3,borderWidth:0,borderColor:'transparent', width:wp(20), justifyContent:'center',position:'absolute', bottom:10, right:-10}}>
               <Text style={{fontSize:14,fontFamily:'Nunito-ExtraBold',color:col,alignSelf:'center'}} >Enroll Now</Text>
              </View>
              )}
             </View>

             {item.is_active == 1 &&(
              <View style={{backgroundColor:'white', height:hp(3),borderRadius:3,borderWidth:0,borderColor:'transparent', width:wp(14), position:'absolute',justifyContent:'center', bottom:10, right:10}}>
               <Text style={{fontSize:12,fontFamily:'Nunito-ExtraBold',color:col,alignSelf:'center'}} >Active</Text>
              </View>
              )}

           </ImageBackground>
        </TouchableOpacity>
                                        
        )
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
               headerName={'SUBSCRIPTION'}
               headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.pdList}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                              extraData={this.state}
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

export default SubscribeList;