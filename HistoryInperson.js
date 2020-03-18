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
class HistoryInperson extends Component<Props> {

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
         const url = GLOBAL.BASE_URL + 'booking_inperson_history'

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
      var renderMembers

      if(itemData.item.booking_for_list.length == 0){
        renderMembers = <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>Self</Text>
      }else{
        renderMembers = itemData.item.booking_for_list.map(id => 
           <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>{id.name}
           </Text>
        )
      }

        return (
    <TouchableOpacity onPress={() => this.selectedProduct(itemData)
    } activeOpacity={0.9}>

     <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :6,width : wp(93), }}>

     <View style={{backgroundColor:'white',color :'white',flexDirection:'row' ,borderRadius :6, }}>

       <View style={{ flexDirection:'column', margin:15, }}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                Event Title: {itemData.item.event_detail.title}
               </Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Address: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.event_detail.lat_long_address}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Price per person: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>Rs. {itemData.item.total_amount}/-
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Start Date: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.event_detail.start_date}
               </Text></Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               End Date: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{itemData.item.event_detail.end_date}
               </Text></Text>

               {itemData.item.trxn_status == 'success' && (
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking Status: <Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'green',}}>{itemData.item.trxn_status}
               </Text></Text>
                )}

               {itemData.item.trxn_status!='success' && (
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking Status: <Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'red',}}>{itemData.item.trxn_status}
               </Text></Text>
                )}

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking For: </Text>
              {renderMembers}
        </View>

        </View>
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Booking Id: #{itemData.item.id}
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
                       headerName={'IN PERSON BOOKINGS'}
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

export default HistoryInperson;