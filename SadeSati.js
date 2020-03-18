import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type Props = {};

import IndicatorCustom from './IndicatorCustom.js';

export default class SadeSati extends Component<Props> {

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
            getResponse:'',
            debts:[],
            lifedetails:[],          
            renderIndex:0,
            categories:[ 
                {"key": "0",
                 "name": "Life Details",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Current Status",
                 "is_selected":"0",
                },
                {"key": "2",
                 "name": "Remedies",
                 "is_selected":"0",
                },

              ],

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

    this.getSadeSati()

    // console.log(this.props.navigation.state.params)
    // var navigation = this.props.navigation.state.params
    // this.setState({getResponse : navigation.matchMakingResponse})
    // this.setState({ points: navigation.matchMakingResponse.total})
    }

    getSadeSati= () =>{
//    this.showLoading()
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"sadhesati_life_details",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      lifedetails : responseJson.responseData,
                  })

                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });


    }

   _handleCategorySelect = (item,indexs) => {
       var a = this.state.categories
        for (var i = 0;i<this.state.categories.length ;i ++){

            this.state.categories[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({catid : item.key})

        }else{
            index.is_selected = "0"
        }
        this.state.categories[indexs] = index

      //  alert(indexs)
//        this.setState({renderIndex: indexs})

               this.setState({renderIndex: indexs },() => {
//                      console.log('seetted'); // this.will give counter value as 1
                  });

   //  this.timeoutCheck = setTimeout(() => {
   //      this.getMoonChartImage(indexs)
   // }, 5000);


        this.setState({categories:this.state.categories})
        this.getSadesatistatus(indexs)
    }


    getSadesatistatus=(indexs) =>{
     // alert(indexs)
      var dec='';

      if(indexs == 1){
        dec = "sadhesati_current_status"
      }else if(indexs == 2){
        dec = "sadhesati_remedies"
      }


        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":dec,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      getResponse : responseJson.responseData,
                  })

                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });

    }


    _renderDebts = (item, index)=>{
      return(
        <View   style  = {{width:'97%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,margin:5,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13, marginBottom:hp(1)
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Debt Name: <Text style={{color:'#293440'}}>{item.item.debt_name}</Text></Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Indications: <Text style={{color:'#293440'}}>{item.item.indications}</Text></Text>

          <Text style = {{fontSize:16,marginTop:5,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Events: <Text style={{color:'#293440'}}>{item.item.events}</Text></Text>

          </View>

        )      
    }

    _renderPlanets=(item, index)=>{
//      console.log(JSON.stringify(item))
      var type;
      var decide= item.item.is_saturn_retrograde
      if(decide){
        type= 'Yes'
      }else{
        type ='No'
      }

      return(
        <View   style  = {{width:'97%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,margin:5,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13, marginBottom:hp(1)
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Moon Sign: <Text style={{color:'#293440'}}>{item.item.moon_sign}</Text>
          </Text>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Saturn Sign: <Text style={{color:'#293440'}}>{item.item.saturn_sign}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Saturn Retrograde: <Text style={{color:'#293440'}}>{type}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Type: <Text style={{color:'#293440'}}>{item.item.type}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Date: <Text style={{color:'#293440'}}>{item.item.date}</Text>
          </Text>


          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Summary: <Text style={{color:'#293440'}}>{item.item.summary}</Text>
          </Text>
        </View>

        )
    }

    _renderItemCateg = (item,index)=>{
        return (
            <TouchableOpacity
                onPress={() => this._handleCategorySelect(item.item,item.index)}
                activeOpacity={0.9}>

                {item.item.is_selected == 1 && (
                    <View style = {{margin :10 ,height :50,backgroundColor:'white',padding:5,alignSelf: 'center',
                        borderColor:'black',
                        borderRadius:25, justifyContent:'center'}}>

                        <Text style = {{fontSize: 14,color:'black',alignSelf: 'center',paddingLeft:30, paddingRight:30,fontFamily:'Nunito-Bold',}}>
                            {item.item.name}
                        </Text>

                    </View>

                )}

                {item.item.is_selected != 1 && (
                       <View style = {{margin :10 ,height :50,backgroundColor:'#E60000',padding:5,alignSelf: 'center',
                        borderColor:'white',borderWidth:1.5,
                        borderRadius:25,justifyContent:'center'}}>

                    <Text style = {{fontSize: 14,alignSelf: 'center',color:'white',paddingLeft:30, paddingRight:30,fontFamily:'Nunito-SemiBold',} }>
                        {item.item.name}
                    </Text>
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    _renderRemedies=(item, index)=>{
      return(
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          <Text style={{color:'#293440'}}>{item.item}</Text>
          </Text>
      )
    }

    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        var yummy = this.state.getResponse

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'#f1f1f1'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'SADHE SATI'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <View style={{width:wp('100%'), height:hp('10%'), backgroundColor:'#E60000'}}>


            <FlatList style= {{flexGrow:0, backgroundColor:'#E60000'}}
                      data={this.state.categories}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor = { (item, index) => index.toString() }
                      extraData={this.state}
                      renderItem={this._renderItemCateg}
            />
          </View>

          <ScrollView>
         {this.state.renderIndex == 0 &&(
          <>

        <View style={{flexDirection:'column', margin:10 , width:wp(95) }}>



        <FlatList data = {this.state.lifedetails}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderPlanets}
        />



      </View>
            </>
            )}

          {this.state.renderIndex == 1 &&(

        <View style={{flexDirection:'column', margin:10 , width:wp(95) }}>

        <View   style  = {{width:'97%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,margin:5, 
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13, marginBottom:hp(1)
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Status: <Text style={{color:'#293440'}}>{yummy.is_undergoing_sadhesati}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Moon Sign: <Text style={{color:'#293440'}}>{yummy.moon_sign}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Saturn Sign: <Text style={{color:'#293440'}}>{yummy.saturn_sign}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Sadhe sati phase: <Text style={{color:'#293440'}}>{yummy.sadhesati_phase}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Start Date: <Text style={{color:'#293440'}}>{yummy.start_date}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          End Date: <Text style={{color:'#293440'}}>{yummy.end_date}</Text>
          </Text>


          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          What is Sadhe Sati: <Text style={{color:'#293440'}}>{yummy.what_is_sadhesati}</Text>
          </Text>
          </View>

          </View>

            )}


          {this.state.renderIndex == 2 &&(
            
        <View style={{flexDirection:'column', margin:10 , width:wp(95) }}>

        <View   style  = {{width:'97%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,margin:5, 
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13, marginBottom:hp(1)
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          What is Sadhe Sati: <Text style={{color:'#293440'}}>{yummy.what_is_sadhesati}</Text>
          </Text>

          <Text style = {{fontSize:16,marginTop:10,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Remedies:</Text>
        <FlatList data = {yummy.remedies}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderRemedies}
        />

          </View>


          </View>


            )}            
          </ScrollView>
          </View>
        );
    }
}





