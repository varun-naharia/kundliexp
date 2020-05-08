import React, {Component} from 'react';
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container , Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

type Props = {};
export default class PdfYours extends Component<Props> {

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
         const url = GLOBAL.BASE_URL + 'booking_pdf_history'

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
    //    this.props.navigation.navigate('OrderDetails')
    }

    openPdf=(item, index)=>{
       this.props.navigation.navigate('PdfYoursIn', {params:{get : item.imagess}})
    }

    _renderItemproducts = ({item, index}) => {

        return (

      <>
     <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :6,width : wp(93), }}>

     <View style={{backgroundColor:'white',color :'white',flexDirection:'row' ,borderRadius :6, }}>

       <View style={{ flexDirection:'column', margin:15, }}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                Name: {item.name}
               </Text>
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{item.dob}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{item.tob}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3}}>
               Place of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>{item.pob}
               </Text></Text>

               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Amount Paid: <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'black',}}>Rs. {item.total_amount}/-
               </Text></Text>

               {item.trxn_status == 'success' && (
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking Status: <Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'green',}}>{item.trxn_status}
               </Text></Text>
                )}

               {item.trxn_status!='success' && (
               <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#8F8F8F',marginTop:3,}}>
               Booking Status: <Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'red',}}>{item.trxn_status}
               </Text></Text>
                )}


        </View>

        </View>
                <Button style={{fontSize:16,color:'#FF0000',fontFamily:'Nunito-Bold', marginBottom:10, marginTop:-5}}
                        containerStyle={{overflow:'hidden',}}
                        onPress={()=> this.openPdf(item, index)}>
                    View PDF
                </Button>

              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Booking Id: #{item.id}
               </Text>

        </View>

    </>
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
                       headerName={'VARSHPHAL PDF'}
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

