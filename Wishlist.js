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
class Wishlist extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            wish_list: [],

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

      this.getWishlist()
    }

    getWishlist= () =>{
          this.showLoading()
         const url = GLOBAL.BASE_URL + 'list_gems_bookmark'

            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

               console.log(JSON.stringify(responseJson))
                this.hideLoading()
    
                if (responseJson.status == true) {

                    this.setState({wish_list: responseJson.wishlist_list})

      //              console.log(JSON.stringify(this.state.results))

                } else {
                   this.setState({wish_list: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }

    unfavoPro=(item,index)=>{
  console.log(JSON.stringify(item))
      const url = GLOBAL.BASE_URL + "delete_bookmark_patient";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: item.product_id,
        user_id: GLOBAL.user_id,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson))

        if(responseJson.status==true){
            // var s = this.state.wish_list[index];
            // delete s
            // this.setState({wish_list:})
        }else{

        }

      })
      .catch(error => {
        console.error(error);
      });
    }



    selectedProduct=(item, index)=>{
//        this.props.navigation.navigate('ProductDetails')
    }

    _renderItemproducts = ({item, index}) => {
        return (
    <TouchableOpacity onPress={() => this.selectedProduct(item, index)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',color :'white',flexDirection:'row' , flex: 1 ,margin: 5,height:'auto',borderRadius :6,width : wp(93), shadowColor: '#000',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.6,
       shadowRadius: 2,
       elevation: 5 }}>
       <Image style={{width:90, height:90, borderRadius:5,borderWidth:1, borderColor:'#FF0000'}} source={{uri : item.image}}/>
       <View style={{marginLeft:10, flexDirection:'column', alignSelf:'center', width:'80%'}}>
               <Text style = {{fontSize:15,fontFamily:'Nunito-Regular',color:'black',}}>
                {item.name}
               </Text>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'grey',}}>
                ₹ {item.base_price}/-
               </Text>


{/*               <TouchableOpacity>
               <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#FF0000',marginTop:10}}>
               View Details
               </Text>
               </TouchableOpacity>
*/}

        </View>
   {/*    <TouchableOpacity style={{position:'absolute', top:12, right:15}}
       onPress= {()=> this.addtoFav(itemData.item)}>
     <Image style={{width: 25, height: 25, resizeMode: 'contain'}} source={require('./resources/favo.png')}/>
     </TouchableOpacity>
*/}     

        </View>

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

        <View style={{flex:1, flexDirection:'column',backgroundColor:'white'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'WISHLIST'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <View style={{flex:1,width:'95%',  margin:10, borderRadius:7}}>

            {this.state.wish_list.length == 0 &&(
              <EmptyMessage
              emptyMessage={'Your wishlist is empty!'}/>

              )}

              {this.state.wish_list.length !=0 &&(

                    <FlatList style= {{flexGrow:0,}}
                              data={this.state.wish_list}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                              extraData={this.state}
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

export default Wishlist;