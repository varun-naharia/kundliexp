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
import IndicatorCustom from './IndicatorCustom'
import * as Animatable from 'react-native-animatable';
import EmptyMessage from './EmptyMessage'

type Props = {};
export default class ProductList extends Component<Props> {

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
            limit:0,
            pdList:[]
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
    this.getCategories()

    }

    getCategories= () =>{
     const url = GLOBAL.BASE_URL + "gems_category";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cat: 'cat',
        limit_from: this.state.limit
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
//        alert(JSON.stringify(responseJson))
        if (responseJson.status == true) {
          if(responseJson.category.length == 0){

          }else{
          var resu = this.state.pdList
          this.setState({pdList : [...resu ,...responseJson.category]})

          }

        } else {
//          alert("No categories found!");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }





  selectedFirst=(itemData)=>{
//      alert(JSON.stringify(itemData))
      GLOBAL.catDetails = itemData.item  
      this.props.navigation.navigate('ProductListIn')
  }


  _renderItem=(itemData) => {
        return (
            <TouchableOpacity style={{width:wp('45%'), margin:7,height:hp('24%'),backgroundColor:'white',}}
            activeOpacity={0.99}
            onPress={()=> this.selectedFirst(itemData)}>
              <Animatable.View style  = {{width:wp('45%'), height:hp('24%'),backgroundColor:'#f7f7f7',shadowColor: "#000",
                  elevation:4, flexDirection:'column',alignItems:'center',borderRadius:5, 
              }}
                    animation='slideInLeft'
            useNativeDriver={true}>

            <Image style={{width:wp(40), height:hp('13.5%'), resizeMode:'contain',marginTop:hp(3)}} source={{uri : itemData.item.image}}/>
            <View style={{backgroundColor:'white', width:wp('45%'), height:hp('5%'), flexDirection:'column', marginTop:hp(2), borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                  <Text style = {{fontSize:15,fontFamily:'Nunito-Regular',color:'#000000',marginLeft:wp(3), marginTop:hp(1)}}
                  numberOfLines={2}>
                      {itemData.item.name}
                  </Text>
              </View>
              </Animatable.View>
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
          this.getCategories();
        });

    }

    render() {
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'CATEGORIES'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            {this.state.pdList.length == 0 &&(

              <EmptyMessage
              emptyMessage={'No Categories added!'}/>

              )}

              {this.state.pdList.length !=0 &&(

                    <FlatList style= {{marginVertical:hp(1), marginHorizontal:wp(1.5)}}
                              data={this.state.pdList}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                              extaData={this.state}
                              onEndReached={this.handleLoadMore}
                              onEndReachedThreshold={0.01}

                    />

              )}           


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

