import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import Svg ,{SvgXml}  from 'react-native-svg';
import {
  BarIndicator,
} from 'react-native-indicators';


export default class KPCharts extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
            visible: true,
            loading:'',
            chartName:'Cusp Chart',
            chartDes:'D1 - Cusp Chart based on KP Houses',
            chartimage:'',
            categories:[ 
                {"key": "0",
                 "name": "Cusp Chart",
                 "is_selected":"0",
                 "chart_id":'D1',
                 "des":'D1 - Cusp Chart based on KP Houses'
                },
                {"key": "1",
                 "name": "Chalit Chart",
                 "is_selected":"0",
                 "chart_id":'Chalit',
                 "des":'Chalit - Body, Physical Matters'
                },
                {"key": "2",
                 "name": "Moon Chart",
                 "is_selected":"0",
                 "chart_id":'Moon',
                 "des":'Moon - Body, Physical Matters'
                },
                {"key": "3",
                 "name": "Sun Chart",
                 "is_selected":"0",
                 "chart_id":'Sun',
                 "des":'Sun - Body, Physical Matters'
                },
                {"key": "4",
                 "name": "Hora Chart",
                 "is_selected":"0",
                 "chart_id":'D2',
                 "des":'D2 - Wealth, Family'
                },
                {"key": "5",
                 "name": "Dreshkan Chart",
                 "is_selected":"0",
                 "chart_id":'D3',
                 "des":'D3 - Siblings, Nature'
                },
                {"key": "6",
                 "name": "Chaturthamasha Chart",
                 "is_selected":"0",
                 "chart_id":'D4',
                 "des":'D4 - Fortune and Property'
                },
                {"key": "7",
                 "name": "Panchmansha Chart",
                 "is_selected":"0",
                 "chart_id":'D5',
                 "des":'D5 - Fame and Power'
                },
                {"key": "8",
                 "name": "Saptamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D7',
                 "des":'D7 - Children/Property'
                },
                {"key": "9",
                 "name": "Ashtamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D8',
                 "des":'D8 - Unexpected Troubles'
                },
                {"key": "10",
                 "name": "Navamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D9',
                 "des":'D9 - Wife, Dharma and Relationships'
                },
                {"key": "11",
                 "name": "Dashamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D10',
                 "des":'D10 - Actions in Society, Profession'                 
                },
                {"key": "12",
                 "name": "Dwadasha Chart",
                 "is_selected":"0",
                 "chart_id":'D12',
                 "des":'D12 - Parents'                 
                },
                {"key": "13",
                 "name": "Shodashamsha Chart",
                 "is_selected":"0",
                 "chart_id":'D16',
                 "des":'D16 - Vehicles, Travelling and Comforts'                 
                },
                {"key": "14",
                 "name": "Vishamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D20',
                 "des":'D20 - Spiritual Pursuits'                 
                },
                {"key": "15",
                 "name": "Chaturvimshamsha Chart",
                 "is_selected":"0",
                 "chart_id":'D24',
                 "des":'D24 - Education, Learning and Knowledge'                 
                },
                {"key": "16",
                 "name": "Bhamsha Chart",
                 "is_selected":"0",
                 "chart_id":'D27',
                 "des":'D27 - Strengths and Weakness'                 
                },                
                {"key": "17",
                 "name": "Trishamansha Chart",
                 "is_selected":"0",
                 "chart_id":'D30',
                 "des":'D30 - Evils, Failure, Bad Luck'                 
                },
                {"key": "18",
                 "name": "Khavedamsha Chart",
                 "is_selected":"0",
                 "chart_id":'D40',
                 "des":'D40 - Maternal Legacy'                 
                },
                {"key": "19",
                 "name": "Akshvedansha Chart",
                 "is_selected":"0",
                 "chart_id":'D45',
                 "des":'D45 - Paternal Legacy'                 
                },                
                {"key": "20",
                 "name": "Shashtymsha Chart",
                 "is_selected":"0",
                 "chart_id":'D60',
                 "des":'D60 - Past birth or Karma'                 
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
    this.getKpCharts('D1')
  }

  componentWillReceiveProps(){
        this.setState({
      chartName: 'Cusp Chart',
      chartDes: 'D1 - Cusp Chart based on KP Houses'
    })

    this.getKpCharts('D1')
  }

  getKpCharts=(chartId)=>{
    this.showLoading()
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
            "chart_id":chartId
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()
             console.log('chat api status--->'+JSON.stringify(responseJson.status))
                if (responseJson.status == true) {
                  this.setState({chartimage: responseJson.responseData.svg})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
  }

  openChartNames=()=>{
       this.dialogComponents.show()

  }

  selectChart=(item, index)=>{
    console.log(item.chart_id)
    this.setState({
      chartName: item.name,
      chartDes: item.des
    })
    this.getKpCharts(item.chart_id)
    this.dialogComponents.dismiss()
  }

  _renderItems=({item, index})=>{
    return(
      <TouchableOpacity 
      style={{width:'100%',margin:5,marginLeft:0, marginTop:hp(1), marginBottom:5}}
      onPress={()=> this.selectChart(item, index)}>
    <View style={{width: '100%',  flexDirection:'row', justifyContent:'space-between'
    ,borderBottomColor:'#bfbfbf', borderBottomRadius:0, borderBottomWidth:1, }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19,marginTop:0,}}>{item.name}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'grey', }}>
    {item.des}</Text>
    </View>       
    </View>       
    </TouchableOpacity>
      )
  }


  render(){


    // if(this.state.loading){
    //     return(
    //       <IndicatorCustom/>
    //     )
    // }

      var compos
        if(this.state.chartimage ==''){
          compos=  null
        }else{
           const xml = `${this.state.chartimage}`;
            compos= 
            <>
            {this.state.loading== true && (

              <BarIndicator count= {5}
               size={40} color="#E60000" />
              )}
              {this.state.loading == false && (
              <SvgXml 
                style={{alignSelf:'center'}}
                xml={xml}/>
                )}
                </>


        }

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <TouchableOpacity onPress={()=> this.openChartNames()}>
    <View style={{width: wp(95), margin:10, flexDirection:'row', justifyContent:'space-between'
    ,borderColor:'black', borderRadius:5, borderWidth:1, marginTop:hp(3) }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:19,marginTop:0,}}>{this.state.chartName}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', }}>
    {this.state.chartDes}</Text>
    </View> 

    <Image style={{width:38, height:38 ,resizeMode:'contain', margin:15, marginLeft:-5}}
    source={require('../resources/menu.png')}/>

    </View>
    </TouchableOpacity>


    {compos}



    </ScrollView>
    <DialogComponent
        dialogStyle = {{backgroundColor:'transparent', marginTop:hp(-13)}}
        dismissOnTouchOutside={true}
        dismissOnHardwareBackPress={true}
        width={wp(80)}
        height={hp(80)}
        ref={(dialogComponents) => { this.dialogComponents = dialogComponents; }}>

      <DialogContent>

    <View style={{flexDirection:'column', width:wp(80),alignSelf:'center'
    ,backgroundColor:'white', height:hp(80),borderRadius:5, marginTop:hp(-5) }}>

      <FlatList data={this.state.categories}
      renderItem={this._renderItems}
      keyExtractor = { (item, index) => index.toString() }      
      extraData={this.state}/>

    </View>
    </DialogContent>
    </DialogComponent>

    </View>
  )   
  }
 
}
