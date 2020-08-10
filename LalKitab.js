import React, {Component} from 'react';
import {StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Container, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom.js';
import AutoHeightWebView from 'react-native-autoheight-webview'

export default class LalKitab extends Component {

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
            planets:[],          
            renderIndex:0,
            getChartHtml:``,
            houses:[],
            planetss:[],
            categories:[ 
                {"key": "0",
                 "name": "Lal Kitab",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Debt",
                 "is_selected":"0",
                },
                {"key": "2",
                 "name": "Chart",
                 "is_selected":"0",
                },
                {"key": "3",
                 "name": "Houses",
                 "is_selected":"0",
                },
                {"key": "4",
                 "name": "Planets",
                 "is_selected":"0",
                },
              ],

        }

    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
    this.getLalKitab()
    }

    getLalKitab= () =>{
//    this.showLoading()
      console.log(JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"lalkitab_horoscope",
            }))

        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"lalkitab_horoscope",
            "chartType":GLOBAL.glChartStyle
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              // console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      planets : responseJson.responseData,
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
        if(indexs == 1){
        this.getLalkitabdebt(indexs)          
        }else if(indexs == 2){
          this.getLalkitabChart()
        }else if(indexs == 3){
          this.getLalkitabHouses()
        }else if(indexs == 4){
          this.getLalkitabPlanets()
        }
    }


    getLalkitabPlanets=()=>{
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"lalkitab_planets",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      planetss : responseJson.responseData,
                  })

                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });


    }

    getLalkitabHouses=()=>{
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"lalkitab_houses",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              // console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      houses : responseJson.responseData,
                  })

                }else{

                }
            })
            .catch((error) => {
                console.error(error);
    //            this.hideLoading()
            });


    }



    getLalkitabChart=(indexs) =>{

            const url = 'http://134.209.159.180/kundali_expert/astrology_api/laalkitaab_chart';
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('lang', GLOBAL.glLanguage);
            data.append('date', GLOBAL.gldate);
            data.append('month', GLOBAL.glmonth); 
            data.append('year', GLOBAL.glyear);
            data.append('hour', GLOBAL.glhour);
            data.append('minute', GLOBAL.glminute);
            data.append('latitude', GLOBAL.gllat);
            data.append('longitude', GLOBAL.gllong);
            data.append('timezone', GLOBAL.glzone);
            data.append('width', window.width);
            data.append('chartType', GLOBAL.glChartStyle )
            // console.log(data)
            fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

            }).then((response) => response.text())
                .then((text) => {
                 this.hideLoading()
 //                  console.log(text)
                   this.setState({getChartHtml: text})

                });


    }


    getLalkitabdebt=(indexs) =>{
     // alert(indexs)
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"lalkitab_debts",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //              this.hideLoading()
              // console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                     this.setState({
                      debts : responseJson.responseData,
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

_renderPlanetss=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#fce8d8'
      dec_p_color = '#e91e63'
    }else{
      dec_color = '#f2eeb3' 
      dec_p_color = '#4caf50'
    }

    var soya_str =''
    if(item.soya){
      soya_str = 'Yes'
    }else{
      soya_str = 'No'
    }

    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(6), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(1.5), textAlign:'left'}}>{item.planet}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left'}}>{item.rashi}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'15%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left' }}>{soya_str}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left'}}>{item.nature}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left', marginRight:wp(6)}}>{item.position}</Text>
    </View>
      </>
      )
  }


    _renderHouses=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#fce8d8'
      dec_p_color = '#e91e63'
    }else{
      dec_color = '#f2eeb3' 
      dec_p_color = '#4caf50'
    }

    var soya_str =''
    if(item.soya){
      soya_str = 'Yes'
    }else{
      soya_str = 'No'
    }

    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(6), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:16, color:'black', marginLeft:wp(1.5), textAlign:'left'}}>{item.maalik}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'30%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left'}}>{item.pakka_ghar}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left' }}>{item.kismat}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'15%',backgroundColor:'transparent', fontSize:16, color:'black', textAlign:'left', marginRight:wp(6)}}>{soya_str}</Text>
    </View>
      </>
      )
  }



    _renderPlanets=(item, index)=>{
      var renderPlanets =   item.item.planet.map((b, index) => {


         return(
           <View style = {{flexDirection:'row'}}>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
           {b}</Text>
                  </View>


         )
       })


      var renderSmallPlanets =   item.item.planet_small.map((b, index) => {


         return(
           <View style = {{flexDirection:'row'}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',}}>
           {b}</Text>
                  </View>


         )
       })


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
          Sign Name: <Text style={{color:'#293440'}}>{item.item.sign_name}</Text>
          </Text>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Planets
          </Text>


          {renderPlanets}

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Small Planets
          </Text>

          {renderSmallPlanets}
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
           headerName={'LAL KITAB'}
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



        <FlatList data = {this.state.planets}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderPlanets}
        />



      </View>
            </>
            )}

          {this.state.renderIndex == 1 &&(

        <View style={{flexDirection:'column', margin:10 , width:wp(95) }}>

        <FlatList data = {this.state.debts}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderDebts}
        />

          </View>

            )}


          {this.state.renderIndex == 2 &&(

        <View style={{flexDirection:'column', width:wp(100),alignSelf:'center' }}>

    <AutoHeightWebView source={{html : this.state.getChartHtml}} 
    style={{width:window.width,marginTop: '9%'}}
    containerStyle={{ marginLeft:'9%' }}
    scalesPageToFit={true}
    scrollEnabled={false}
    viewportContent={'width=device-width, user-scalable=no'}/>

          </View>

            )}

            {this.state.renderIndex == 3 &&(

        <View style={{flexDirection:'column', width:wp(100) }}>
    <View style={{width:wp(100), backgroundColor:'grey', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(1.5), textAlign:'left'}}>Maalik</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'30%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Pakka Ghar</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left' }}>Kismat</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(6)}}>Soya</Text>
    </View>

        <FlatList data = {this.state.houses}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderHouses}
        />

          </View>

              )}

            {this.state.renderIndex == 4 &&(

        <View style={{flexDirection:'column', width:wp(100) }}>
    <View style={{width:wp(100), backgroundColor:'grey', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(1.5), textAlign:'left'}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Rashi</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'15%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left' }}>Soya</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'20%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Nature</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(2)}}>Position</Text>
    </View>

        <FlatList data = {this.state.planetss}
        keyExtractor = { (item, index) => index.toString() }
        extraData={this.state}
        renderItem={this._renderPlanetss}
        />

          </View>

              )}

          </ScrollView>
          </View>
        );
    }
}





