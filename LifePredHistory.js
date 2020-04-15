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
import IndicatorCustom from './IndicatorCustom.js';

type Props = {};
class LifePredHistory extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false,
            predlist:[],
            limit:0
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

      this.getLifePred()
    }

    getLifePred= () =>{
        const url = GLOBAL.BASE_URL + "booking_lifeprediction_history";
//       this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,
          limit_from: this.state.limit

        })
      })
        .then(response => response.json())
        .then(responseJson => {
  //               this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {
          var resu = this.state.predlist
          this.setState({predlist : [...resu ,...responseJson.lists]})

//            this.setState({predlist : responseJson.lists})
          } else {

          }
        })
        .catch(error => {
          console.error(error);
    //      this.hideLoading()
        });

    }


    selectedPred=(item, index)=>{
//        alert(JSON.stringify(item.item))
        this.props.navigation.navigate('LifePredHistoryDetails', {params:{get : item}})
    }

    _renderItempreds = (itemData, index) => {
        return (
    <TouchableOpacity onPress={() => this.selectedPred(itemData,itemData.item.index)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(91), padding:10, marginTop:hp(2), alignSelf:'center'}}>
 
    
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {itemData.item.name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {itemData.item.tob}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Place of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {itemData.item.pob}</Text>
       </Text>
    
       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Post Date: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {itemData.item.added_on}</Text>
       </Text>

       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Description: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {itemData.item.problem}</Text>
       </Text>

              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{itemData.item.id}
               </Text>

        </View>

    </TouchableOpacity>
        )
    }

    handleLoadMore=()=>{
        // this.setState({limit: this.state.limit + 6})
        // this.loadBookings()
//        alert('ads')
     this.setState({
          limit: this.state.limit + 6
        }, () => {
          this.getLifePred();
        });

    }


    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column',backgroundColor:'#f2f5f7'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'LIFE PREDICTION HISTORY'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <View style={{width:wp(100),flex:1,backgroundColor:'transparent',flexDirection:'column',
        marginTop:hp(1), alignSelf:'center'}}>

                    <FlatList style= {{marginBottom:hp(2)}}
                              data={this.state.predlist}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItempreds}
                              extaData={this.state}
                              onEndReached={this.handleLoadMore}
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

export default LifePredHistory;