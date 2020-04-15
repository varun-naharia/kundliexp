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
import GlobalCharts from './GlobalCharts.js';
type Props = {};
import Svg ,{SvgXml}  from 'react-native-svg';
import NavmanshaChart from './ChartComponents/NavmanshaChart.js';
import SunChart from './ChartComponents/SunChart.js';
import HoraChart from './ChartComponents/HoraChart.js';
import IndicatorCustom from './IndicatorCustom.js';

export default class MatchMakingIn extends Component<Props> {

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
            getResponse:navigation.state.params.matchMakingResponse,
            renderIndex:0,
            chartimage:``,
            categories:[ 
                {"key": "0",
                 "name": "Results",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Details",
                 "is_selected":"0",
                },
              ],
        }
            this.getMoonChartImage=this.getMoonChartImage.bind(this);
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





selectedFirst=(item,index)=>{
//  alert(item+'ads'+index)
  if(index == 0 ){
    this.props.navigation.navigate('BasicDetails')

  }else if(index == 1){
    this.props.navigation.navigate('PanchangDetails')

  }else if(index == 2){
    this.props.navigation.navigate('GhatChakra')

  }else if(index == 3){
    this.props.navigation.navigate('AstroDetails')

  }
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
                      console.log('seetted'); // this.will give counter value as 1
                  });

   //  this.timeoutCheck = setTimeout(() => {
   //      this.getMoonChartImage(indexs)
   // }, 5000);


        this.setState({categories:this.state.categories})
//        this.sexa(indexs)
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





     sexa (indexs){
var xoxo;
var xml = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="275" height="200" viewBox="0 0 275 200">
  <defs>
    <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
            markerUnits="strokeWidth" markerWidth="4" markerHeight="3"
            orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
    </marker>
  </defs>

  <g fill="none" stroke-width="10" marker-end="url(#Triangle)">
    <path stroke="crimson" d="M 100,75 C 125,50 150,50 175,75" marker-end="url(#Triangle)"/>
    <path stroke="olivedrab" d="M 175,125 C 150,150 125,150 100,125" marker-end="url(#Triangle)"/>
  </g>
</svg>`


    var chartID;
    if(indexs == 1){
      chartID = 'D1' // Lagna or Birth chart
    }else if(indexs == 2){
      chartID = 'MOON' // Moon chart
    }else if(indexs == 3){
      chartID = 'D9' // Navmansha chart
    }else if(indexs == 4){
      chartID = 'SUN' // Sun chart
    }else if(indexs == 5){
      chartID = 'D2' // Hora chart
    }else if(indexs == 6){
      chartID = 'D3' // Dreshkan chart
    }else if(indexs == 7){
      chartID = 'D4' // Chathurthamasha chart
    }else if(indexs == 8){
      chartID = 'D5' // Panchmansha chart
    }else if(indexs == 9){
      chartID = 'D7' // Saptamansha chart
    }else if(indexs == 10){
      chartID = 'D8' // Ashtamansha chart
    }else if(indexs == 11){
      chartID = 'D10' // Dashamansha chart
    }else if(indexs == 12){
      chartID = 'D12' // Dwadashamsha chart
    }

    alert(chartID+'--'+ indexs)

   if(indexs == 0 ){

   }else{
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
            "api-condition":"horo_chart_image",
            "chart_id":chartID
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

               //    console.log('response --->')

               //    var ss = responseJson.responseData.svg
               //      GLOBAL.svgImage = ss

                var ask = responseJson.responseData.svg
               this.setState({chartimage: ask },() => {
                      console.log('seetted'); // this.will give counter value as 1
                  });

               xml = `${responseJson.responseData.svg}`

                
                this.xoxo = <SvgXml xml={xml} />
                return xoxo

                }else{

                }



            })
            .catch((error) => {
                console.error(error);

            });

   }


        return xoxo
    }

  getMoonChartImage(indexs){
    var chartID;
    if(indexs == 2){
      chartID = 'MOON'
    }else if(indexs == 3){
      chartID = 'D9'
    }else if(indexs == 4){
      chartID = 'SUN'
    }else if(indexs == 5){
      chartID = 'D2'
    }
//    alert(chartID)

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
            "api-condition":"horo_chart_image",
            "chart_id":chartID
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//              console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                  console.log('response --->')

                  var ss = responseJson.responseData.svg
                    GLOBAL.svgImage = ss

                    // var ask = `${responseJson.responseData.svg}`
               this.setState({chartimage: ss },() => {
                      console.log('seetted'); // this.will give counter value as 1
                  });

                }else{

                }
            })
            .catch((error) => {
                console.error(error);

            });


    }





    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }

        var compos
        if(this.state.chartimage ==''){
          compos=  null
        }else{
           const xml = `${this.state.chartimage}`;
           console.log('adssdd'+ this.state.chartimage)
            compos= <SvgXml xml={xml} />
        }

        var yummy = this.state.getResponse

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'MATCH MAKING'}
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
                    <Text style = {{fontSize:16,margin:15,fontFamily:'Nunito-SemiBold',color:'#293440',width:'95%'}}>
                    Ashtakoot Matching Points
                    </Text>

                    <View style={{width:wp(93),alignSelf:'center', 
                    backgroundColor:'white', elevation:5, borderRadius:5,
                     height:hp(16), marginBottom:hp(1), justifyContent:'center', flexDirection:'row', alignItems:'center'}}>

                    <Text style = {{fontSize:45,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
                    {yummy.total.received_points}<Text style = {{fontSize:35,color:'#E60000',}}>/{yummy.total.total_points}</Text>
                    </Text>


                    </View>

               <View style={{backgroundColor:'#E60000', width:wp(85),  alignSelf:'center', marginTop:hp(5), borderRadius:7,justifyContent:'center'}}>
                <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'white',textAlign:'center',alignSelf:'center', padding:8, paddingBottom:12}}>
                {yummy.conclusion.report}
                </Text>
               </View>

            </>
            )}



          {this.state.renderIndex != 0 &&(

          <View style={{alignItems:'center', marginTop:0}}>
                    <Text style = {{fontSize:16,margin:15,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#293440',width:'95%'}}>
                    Guna Milan Result Detail
                    </Text>


          <View style={{width:wp(95), backgroundColor:'white', height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:16, color:'#E60000', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>Guna</Text>
          <Text style={{fontSize:16, color:'#E60000', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>Maximum</Text>
          <Text style={{fontSize:16, color:'#E60000', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>Obtained</Text>
          <Text style={{fontSize:16, color:'#E60000', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Bold'}}>Area of Life</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Varna</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.varna.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.varna.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.varna.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Vashya</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.vashya.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.vashya.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.vashya.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Tara</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.tara.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.tara.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.tara.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Yoni</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.yoni.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.yoni.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.yoni.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Maitri</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.maitri.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.maitri.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.maitri.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>


          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Gana</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.gan.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.gan.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.gan.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>




          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Bhakut</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.bhakut.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.bhakut.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.bhakut.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>



          <View style={{width:wp(95), backgroundColor:'white',flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
          <Text style={{fontSize:14, color:'#A3B8CB', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Nadi</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.nadi.total_points}</Text>
          <Text style={{fontSize:14, color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>{yummy.nadi.received_points}</Text>
          <Text style={{fontSize:14,width:wp(20), color:'black', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}
          >{yummy.nadi.description}</Text>

          </View>

          <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1)}}/>

                    <View style={{width:wp(93),alignSelf:'center', 
                    backgroundColor:'white', elevation:5, borderRadius:5,marginTop:hp(5),
                     height:hp(16), marginBottom:hp(5), justifyContent:'center', flexDirection:'row', alignItems:'center'}}>

                    <Text style = {{fontSize:45,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
                    {yummy.total.received_points}<Text style = {{fontSize:35,color:'#E60000',}}>/{yummy.total.total_points}</Text>
                    </Text>


                    </View>

          </View>

            )}
          </ScrollView>
          </View>
        );
    }
}



export class LagnaChart extends Component<Props>{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response : ''
  }
  }

  getLagnaChart=()=>{
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
            "api-condition":"charts",
            "chart_id":"D1"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//               alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                    //  alert('gdsd'+JSON.stringify(responseJson));
                     this.setState({response : responseJson})
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }

  componentDidMount(){
   // alert('from component '+this.props.index)
    this.getLagnaChart()
  }
  render(){
    console.log(this.state.response)
    return(<Text>HIIII</Text>)
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

