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

export default class KundliList extends Component<Props> {

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
            renderIndex:0,
            chartimage:``,
            categories:[ 
                {"key": "0",
                 "name": "Basic Details",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Lagna Chart",
                 "is_selected":"0",
                },
                {"key": "2",
                 "name": "Moon Chart",
                 "is_selected":"0"
                },
                {"key": "3",
                 "name": "Navmansha Chart",
                 "is_selected":"0"
                },
                {"key": "4",
                 "name": "Sun Chart",
                 "is_selected":"0"
                },
                {"key": "5",
                 "name": "Hora Chart(D2)",
                 "is_selected":"0"
                },
                {"key": "6",
                 "name": "Dreshkan Chart(D3)",
                 "is_selected":"0"
                },
                {"key": "7",
                 "name": "Chathurthamasha Chart(D4)",
                 "is_selected":"0"
                },
                {"key": "8",
                 "name": "Panchmansha Chart(D5)",
                 "is_selected":"0"
                },
                {"key": "9",
                 "name": "Saptamansha Chart(D7)",
                 "is_selected":"0"
                },
                {"key": "10",
                 "name": "Ashtamansha Chart(D8)",
                 "is_selected":"0"
                },
                {"key": "11",
                 "name": "Dashamansha Chart(D10)",
                 "is_selected":"0"
                },
                {"key": "12",
                 "name": "Dwadasha Chart(D12)",
                 "is_selected":"0"
                },
              ],
            basicitems:[
              {
                id: '1',
                title: 'Basic Details',    
                artwork: require('./resources/fabout.png')
              },
              {
                id: '2',
                title: 'Panchang Details',    
                artwork: require('./resources/om.png')
              },
              {
                id: '3',
                title: 'Ghat Chakra',    
                artwork: require('./resources/ghat_ckra.png')
              },
              {
                id: '4',
                title: 'Astro Details',    
                artwork: require('./resources/hten.png')
              },
             ]             
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
        this.sexa(indexs)
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

                        <Text style = {{fontSize: 14,color:'black',alignSelf: 'center',paddingLeft:15, paddingRight:15,fontFamily:'Nunito-Bold',}}>
                            {item.item.name}
                        </Text>

                    </View>

                )}

                {item.item.is_selected != 1 && (
                       <View style = {{margin :10 ,height :50,backgroundColor:'#E60000',padding:5,alignSelf: 'center',
                        borderColor:'white',borderWidth:1.5,
                        borderRadius:25,justifyContent:'center'}}>

                    <Text style = {{fontSize: 14,alignSelf: 'center',color:'white',paddingLeft:15, paddingRight:15,fontFamily:'Nunito-SemiBold',} }>
                        {item.item.name}
                    </Text>
                    </View>
                )}
            </TouchableOpacity>
        )
    }


    _renderItem = ({item, index}) => {

        return (
            <TouchableOpacity style={{width:wp('45%'), margin:5, height:hp('14%'),}}
            onPress={() => this.selectedFirst(item, index)}
            activeOpacity={0.9}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:8,
                    shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', justifyContent:'center'
                }}>
                    <Image source={item.artwork}
                           style  = {{width:50, height:50,alignSelf:'center',resizeMode:'contain'}}/>

                    <Text style = {{fontSize:14,marginTop:13,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'center',width:'95%'}}>
                        {item.title}
                    </Text>

                </View>
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




    get customRenderer(){
// if(this.state.renderIndex == 2){

// }
      if(this.state.renderIndex == 0){
          return(
              <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.basicitems}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
            />

          )
      }else if(this.state.renderIndex == 1){

            <LagnaChart index={this.state.renderIndex}/>

      }else if(this.state.renderIndex == 2){
        alert(GLOBAL.svgImage)
          return(
            <MoonChart index={this.state.renderIndex}
            svgImage ={GLOBAL.svgImage}/>

            )
      }else if(this.state.renderIndex == 3){

        this.getMoonChartImage(this.state.renderIndex)

        return(
            <NavmanshaChart index={this.state.renderIndex}/>
        )
      }else if(this.state.renderIndex == 4){

        this.getMoonChartImage(this.state.renderIndex)

        return(
            <SunChart index={this.state.renderIndex}/>
        )
      }else if(this.state.renderIndex == 5){

        this.getMoonChartImage(this.state.renderIndex)

        return(
            <HoraChart index={this.state.renderIndex}/>
        )
      }

    }


    render() {
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}
                                       size={50} color="#E9128B" />
                </View>
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

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'KUNDLI LIST'}
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
              <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.basicitems}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
            />


            )}

{/*
            {this.customRenderer}
*/}

          {this.state.renderIndex != 0 &&(

          <View style={{alignItems:'center', marginTop:10}}>
          {compos}
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

