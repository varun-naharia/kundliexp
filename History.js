import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

type Props = {};
class History extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            results: [],
            limit: 0,
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

      this.loadBookings()
    }

    loadBookings= () =>{
//        alert(this.state.limit)
//        this.showLoading()
         const url = GLOBAL.BASE_URL + 'online_booking_history'

            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "limit_from": this.state.limit,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

               console.log(JSON.stringify(responseJson))
  //              this.hideLoading()
    
                if (responseJson.status == true) {

                    var resu = this.state.results
                    this.setState({results: [...resu, ...responseJson.lists]})

      //              console.log(JSON.stringify(this.state.results))

                } else {
//                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });
    }



    selectedProduct=(item, index)=>{
        this.props.navigation.navigate('OrderDetails')
    }

    _renderItemproducts = (itemData, index) => {
        var im_base= itemData.item.expert_details.base_url_expert
        var exp_im =  im_base+ '/'+itemData.item.expert_details.image

        return (
    <TouchableOpacity onPress={() => this.selectedProduct(itemData)
    } activeOpacity={0.9}>

     <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :6,width : wp(93), }}>


{/*               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',marginLeft:15, marginTop:15}}>
                Order No. 1234
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#bfbfbf',marginLeft:15,}}>
                03: PM 10 Sep 2109
               </Text>
*/}

     <View style={{backgroundColor:'white',color :'white',flexDirection:'row' ,borderRadius :6, }}>

       <Image style={{width:80, height:80, borderRadius:40,borderWidth:1, borderColor:'#FF0000', marginLeft:10, marginRight:10, marginTop:20}}
        source={{uri : exp_im}}/>
       <View style={{ flexDirection:'column', marginTop:15, }}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {itemData.item.expert_details.name}
               </Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Call Timing: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.appointment_time}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Price: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>Rs. {itemData.item.total_amount}/-
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Date: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.appointment_date}
               </Text></Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Time: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.appointment_time}
               </Text></Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking Status: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.booking_status}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3, marginBottom:5}}>
               Booking Type: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.module}
               </Text></Text>
              <View style={{flexDirection:'row',marginTop:5, marginBottom:10, width:wp(65),}}>

             {itemData.item.cancel_power == 1 && (
                <Button style={{fontSize:14,color:'#FF0000',fontFamily:'Nunito-Bold'}}
                        containerStyle={{overflow:'hidden',justifyContent:'center',}}
                        onPress={()=> this.onPressCancel(item, index)}>
                    CANCEL
                </Button>
            )}

{/*             {itemData.item.reshedule_power  == 1 && (
                    <Button style={{fontSize:14,color:'#E60000',fontFamily:'Nunito-Bold'}}
                            containerStyle={{overflow:'hidden',justifyContent:'center', marginLeft:20}}
                            onPress={()=> this.onPressResc(item,index)}
                    >
                        RESCHEDULE                                    
                    </Button>
            )}
*/}
        </View>

        </View>

        </View>
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Booking Id: #{itemData.item.booking_id}
               </Text>

        </View>

    </TouchableOpacity>
        )
    }

    handleLoadMore=()=>{
        // this.setState({limit: this.state.limit + 6})
        // this.loadBookings()

     this.setState({
          limit: this.state.limit + 6
        }, () => {
          this.loadBookings();
        });

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
                       headerName={'BOOKING HISTORY'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <View style={{width:'95%',  margin:10, borderRadius:7, flex:1}}>

                    <FlatList style= {{flexGrow:0, marginBottom:5}}
                              data={this.state.results}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                              extraData={this.state}
                              onEndReached={()=>this.handleLoadMore()}
                              onEndReachedThreshold={0.01}
                    />



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
});

export default History;