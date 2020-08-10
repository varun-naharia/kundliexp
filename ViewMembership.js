import React, {Component} from 'react';
import {StyleSheet,ScrollView,Text, View,Image,Linking,TouchableOpacity,FlatList,Container} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class ViewMembership extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    getAboutUs= () =>{
        this.showLoading()
      const url = GLOBAL.BASE_URL + "checkmembership";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
           this.hideLoading()
       
          // console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {
            this.setState({response: responseJson.response})
          } else {
            alert('You have no active membership!')
          }
        })
        .catch(error => {
          console.error(error);
          // this.hideLoading()
        });


    }


    componentDidMount(){
      this.getAboutUs()
    }


    _renderItem=({item, index})=>{
      return(
     <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 5,borderRadius :6,width : wp(93), }}>
       <View style={{ flexDirection:'column', margin:15,width:'93%',}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
                Package Name: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.package_name}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                Package Description: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.description}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                Price: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                Rs. {item.base_price}/-
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                Start Date: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.user_start_date}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                End Date: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.user_end_date}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                Duration: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.duration} {item.duration_type}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
                Days Remaining: 
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}>
                {item.remain_days}
               </Text>

               <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'#E60000',marginTop:10}}>
               More info here
               </Text>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',}}
               onPress={()=> Linking.openURL(item.file_url)}>
               View PDF
               </Text>

        </View>
     </View>
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
                       headerName={'MEMBERSHIP'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5), alignSelf:'center'}}
                      data={this.state.response}
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
});

