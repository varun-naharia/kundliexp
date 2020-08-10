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
import EmptyMessage from './EmptyMessage'

type Props = {};
class FollowUpHistory extends Component<Props> {

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
         const url = GLOBAL.BASE_URL + 'online_booking_history_follow'

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

                  if(responseJson.lists.length == 0){

                  }else{
                    var resu = this.state.results
                    this.setState({results: [...resu, ...responseJson.lists]})
                  }
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
        this.props.navigation.navigate('HistoryDetails', {params: {get: item}})
    }




    _renderItemproducts = ({item, index}) => {

        return (
    <TouchableOpacity
     activeOpacity={0.9}>

     <View style={{backgroundColor:'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :12,width : wp(93), elevation:5}}>


     <View style={{backgroundColor:'white',flexDirection:'row' ,borderRadius :12,padding:15 }}>

      <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
        Booking Id: #{item.booking_id}
       </Text>

      </View>

      <View style={{height:1.5,backgroundColor:'#f7f7f7', marginTop:0, marginBottom:0, width:'100%',}}/>

       <View style={{ flexDirection:'row', padding:15, justifyContent:'space-between', width:'100%'}}>

            <View style={{flexDirection:'column', width:'50%', backgroundColor:'transparent'}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',marginTop:3}}>
               Free Followup 1:</Text>
               {item.follow_up_array.follow_up_one_status == '1' && (
                  <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'grey',marginTop:5}}>
                  Redeem on: {item.follow_up_array.redeem_date_one}
                   </Text>
               )}

               {item.follow_up_array.follow_up_one_status != '1' && (
                  <Text style = {{fontSize:14,fontFamily:'Nunito-Regular',color:'#E60000',}}>
                  Expiry: {item.follow_up_array.expiry_date}
                  </Text>
               )}
            </View>

           {item.follow_up_array.follow_up_one_status == '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f1f1f1', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'grey', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'grey',}}>
              {item.follow_up_array.followup_coupan_code_one}
               </Text>

            </View>
            )}

           {item.follow_up_array.follow_up_one_status != '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f5e1e3', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'#E60000', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'#E60000',}}>
              {item.follow_up_array.followup_coupan_code_one}
               </Text>

            </View>
            )}


        </View>

      <View style={{height:1.5,backgroundColor:'#f7f7f7', marginTop:0, marginBottom:0, width:'90%',alignSelf:'center'}}/>

       <View style={{ flexDirection:'row', padding:15, justifyContent:'space-between', width:'100%'}}>

            <View style={{flexDirection:'column', width:'50%', backgroundColor:'transparent'}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',marginTop:3}}>
               Free Followup 2:</Text>
               {item.follow_up_array.follow_up_two_status == '1' && (
                  <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'grey',marginTop:5}}>
                  Redeem on: {item.follow_up_array.redeem_date_two}
                   </Text>
               )}

               {item.follow_up_array.follow_up_two_status != '1' && (
                  <Text style = {{fontSize:14,fontFamily:'Nunito-Regular',color:'#E60000',}}>
                  Expiry: {item.follow_up_array.expiry_date}
                  </Text>
               )}
            </View>

           {item.follow_up_array.follow_up_two_status == '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f1f1f1', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'grey', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'grey',}}>
              {item.follow_up_array.followup_coupan_code_two}
               </Text>

            </View>
            )}

           {item.follow_up_array.follow_up_two_status != '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f5e1e3', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'#E60000', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'#E60000',}}>
              {item.follow_up_array.followup_coupan_code_two}
               </Text>

            </View>
            )}


        </View>

      <View style={{height:1.5,backgroundColor:'#f7f7f7', marginTop:0, marginBottom:0, width:'90%',alignSelf:'center'}}/>

       <View style={{ flexDirection:'row', padding:15, justifyContent:'space-between', width:'100%'}}>

            <View style={{flexDirection:'column', width:'50%', backgroundColor:'transparent'}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',marginTop:3}}>
               Free Followup 3:</Text>
               {item.follow_up_array.follow_up_three_status == '1' && (
                  <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'grey',marginTop:5}}>
                  Redeem on: {item.follow_up_array.redeem_date_three}
                   </Text>
               )}

               {item.follow_up_array.follow_up_three_status != '1' && (
                  <Text style = {{fontSize:14,fontFamily:'Nunito-Regular',color:'#E60000',}}>
                  Expiry: {item.follow_up_array.expiry_date}
                  </Text>
               )}
            </View>

           {item.follow_up_array.follow_up_three_status == '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f1f1f1', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'grey', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'grey',}}>
              {item.follow_up_array.followup_coupan_code_three}
               </Text>

            </View>
            )}

           {item.follow_up_array.follow_up_three_status != '1' && (

            <View style={{flexDirection:'column', width:'45%', backgroundColor:'#f5e1e3', alignItems:'center',justifyContent:'center',
            borderRadius:35, borderWidth:1.5,borderColor:'#E60000', borderStyle:'dashed', height:35, alignSelf:'center'}}>

              <Text style = {{fontSize:11.5,fontFamily:'Nunito-Regular',color:'#E60000',}}>
              {item.follow_up_array.followup_coupan_code_three}
               </Text>

            </View>
            )}


        </View>

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
                       headerName={'YOUR FOLLOWUPS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <View style={{width:'95%',  margin:10, borderRadius:7, flex:1}}>

                 {this.state.results.length == 0 &&(

                    <EmptyMessage
                    emptyMessage={'You have not made any bookings yet!'}/>
              )}

              {this.state.results.length !=0 &&(

                    <FlatList style= {{flexGrow:0, marginBottom:5}}
                              data={this.state.results}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                              extraData={this.state}
                              onEndReached={()=>this.handleLoadMore()}
                              onEndReachedThreshold={0.01}
                    />

                )}

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

export default FollowUpHistory;