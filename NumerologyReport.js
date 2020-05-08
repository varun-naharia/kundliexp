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

export default class NumerologyReport extends Component<Props> {

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
            getResponse:navigation.state.params.numReportResponse,          
            moreTitle:'',
            moreDesc:'',  
            renderIndex:0,
            categories:[ 
                {"key": "0",
                 "name": "Key Points",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Full Report",
                 "is_selected":"0",
                },
                {"key": "2",
                 "name": "Auspicious Time",
                 "is_selected":"0",
                },
                {"key": "3",
                 "name": "Auspicious Place",
                 "is_selected":"0",
                },
                {"key": "4",
                 "name": "Fasts & Remedies",
                 "is_selected":"0",
                },
                {"key": "5",
                 "name": "Favourable Lord",
                 "is_selected":"0",
                },
                {"key": "6",
                 "name": "Favourable Mantra",
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

//  this.getReviews()

    // console.log(this.props.navigation.state.params)
    // var navigation = this.props.navigation.state.params
    // this.setState({getResponse : navigation.matchMakingResponse})
    // this.setState({ points: navigation.matchMakingResponse.total})
    }

    getReviews= () =>{

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
        this.getMoreDetails(indexs)
    }


    getMoreDetails=(indexs) =>{
     // alert(indexs)
      var reportType='';

      if(indexs == 1){
        reportType = 'numero_report'
      }else if(indexs == 2){
        reportType = 'numero_fav_time'
      }else if(indexs == 3){
        reportType = 'numero_place_vastu'
      }else if(indexs == 4){
        reportType = 'numero_fasts_report'
      }else if(indexs == 5){
        reportType = 'numero_fav_lord'
      }else if(indexs == 6){
        // confusenumero_fav_mantra
        reportType = 'numero_fav_mantra'
      }else if(indexs == 7){
        reportType = 'numero_prediction_daily'
      }


        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "name": this.state.name,
            "date": GLOBAL.gldate,
            "month": GLOBAL.glmonth,
            "year": GLOBAL.glyear,
            "api-condition": reportType
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {
              // this.setState({response: responseJson },() => {
              //         alert('gdsd'+JSON.stringify(this.state.response));
              //     });                
                  this.setState({moreTitle: responseJson.title, 
                    moreDesc: responseJson.description
                  })
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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
           headerName={'NUMEROLOGY REPORT'}
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

        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Name
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.name}
          </Text>

        </View>

        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Date Of Birth
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.date}
          </Text>

        </View>

      </View>          



        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'31.5%', height:hp(18),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', 
        }}>

          <Text style = {{fontSize:50,marginTop:hp(1),fontFamily:'Nunito-Bold',color:'green',}}>
          {yummy.radical_number}
          </Text>

          <Text style = {{fontSize:16,marginTop:hp(0.4),textAlign:'center',fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Radical {`\n`}Number
          </Text>


      </View>

        <View   style  = {{width:'31.5%', height:hp(18),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', 
        }}>

          <Text style = {{fontSize:50,marginTop:hp(1),fontFamily:'Nunito-Bold',color:'orange',}}>
          {yummy.destiny_number}
          </Text>

          <Text style = {{fontSize:16,marginTop:hp(0.4),textAlign:'center',fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Destiny {`\n`}Number
          </Text>


      </View>

        <View   style  = {{width:'31.5%', height:hp(18),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', 
        }}>

          <Text style = {{fontSize:50,marginTop:hp(1),fontFamily:'Nunito-Bold',color:'lightblue',}}>
          {yummy.name_number}
          </Text>

          <Text style = {{fontSize:16,marginTop:hp(0.4),textAlign:'center',fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Name {`\n`}Number
          </Text>


      </View>

      </View>


        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Evil Number
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.evil_num}
          </Text>

        </View>

        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Favourable Color
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_color}
          </Text>

        </View>

      </View>          


        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Favourable Days
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_day}
          </Text>

        </View>

        <View   style  = {{width:'48.5%',backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          God/Goddess
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_god}
          </Text>

        </View>

      </View>       

        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'100%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>


          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Mantra
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_mantra}
          </Text>

      </View>
      </View>


        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Gemstone
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_stone}
          </Text>

        </View>

        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Favourable Metal
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_metal}
          </Text>

        </View>

      </View>          


        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Substone
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.fav_substone}
          </Text>

        </View>

        <View   style  = {{width:'48.5%', backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Favourable Number
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.friendly_num}
          </Text>

        </View>

      </View>          



        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Neutral Number
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.neutral_num}
          </Text>

        </View>

        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Radical Number
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.radical_num}
          </Text>

        </View>

      </View>          



        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginTop:hp(2)}}>
        <View   style  = {{width:'48.5%', height:hp(10),backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,borderRadius:8,
            shadowRadius: 3.84,elevation:4, flexDirection:'column',padding:13
        }}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
          Ruling Planet
          </Text>

          <Text style = {{fontSize:20,marginTop:3,fontFamily:'Nunito-Bold',color:'#E60000',}}>
          {yummy.radical_ruler}
          </Text>

        </View>

      </View>          

      </View>
            </>
            )}

          {this.state.renderIndex != 0 &&(

          <View style={{alignItems:'center', marginTop:0}}>
                    <Text style = {{fontSize:16,margin:15,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',width:'95%'}}>
                    {this.state.moreTitle}
                    </Text>
                    <Text style = {{fontSize:16,margin:15,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',width:'95%'}}>
                    {this.state.moreDesc}
                    </Text>

          </View>

            )}
          </ScrollView>
          </View>
        );
    }
}





