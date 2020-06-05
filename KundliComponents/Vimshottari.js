import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import LinearGradient from 'react-native-linear-gradient';

export default class Vimshottari extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:[],
            param:'',
            major:{},
            minor:{},
            sub_minor:{},
            sub_sub_minor:{},
            sub_sub_sub_minor:{},
            categories:[ 
                {"key": "0",
                 "name": "Major Dasha",
                 "param": "major_vdasha",
                 "is_selected":"1",
                },
                {"key": "1",
                 "name": "Current Dasha",
                 "param": "current_vdasha",
                 "is_selected":"0",
                },
            ],
            index:"0",
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

   _handleCategorySelect = (item,indexs) => {
       var a = this.state.categories
        for (var i = 0;i<this.state.categories.length ;i ++){

            this.state.categories[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({index : item.key,
                param: item.param},()=>{
//                    alert(this.state.param)
                })

        }else{
            index.is_selected = "0"
        }
        this.state.categories[indexs] = index
        this.setState({categories:this.state.categories})
        this.getVim(item.param)
    }


    _renderItemCateg = (item,index)=>{
        return (
            <TouchableOpacity
                onPress={() => this._handleCategorySelect(item.item,item.index)}
                activeOpacity={0.9}>

                {item.item.is_selected == 1 && (
                    <View style = {{margin :10 ,height :50,backgroundColor:'#E60000',padding:5,alignSelf: 'center',
                        borderColor:'white',
                        borderRadius:25, justifyContent:'center'}}>

                        <Text style = {{fontSize: 14,color:'white',alignSelf: 'center',paddingLeft:15, paddingRight:15,fontFamily:'Nunito-ExtraBold',}}>
                            {item.item.name}
                        </Text>

                    </View>

                )}

                {item.item.is_selected != 1 && (
                       <View style = {{margin :10 ,height :50,backgroundColor:'white',padding:5,alignSelf: 'center',
                        borderColor:'black',borderWidth:1.5,
                        borderRadius:25,justifyContent:'center'}}>

                    <Text style = {{fontSize: 14,alignSelf: 'center',color:'black',paddingLeft:15, paddingRight:15,fontFamily:'Nunito-SemiBold',} }>
                        {item.item.name}
                    </Text>
                    </View>
                )}
            </TouchableOpacity>
        )
    }

  componentDidMount(){
    this.getVim('major_vdasha')
  }


  getVim=(typeVimshottari)=>{
//    alert(typeVimshottari)
//    this.showLoading()
        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lat_long_address": GLOBAL.glLocationName,                        
            "lang":GLOBAL.glLanguage,
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition": typeVimshottari,
            "gender":GLOBAL.glgender
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                   // console.log('------>'+JSON.stringify(responseJson))

                if (responseJson.status == true) {

                    if(typeVimshottari == 'major_vdasha'){
                            this.setState({response: responseJson.responseData,

                            },()=>{ 
                            })

                    }else{
                            this.setState({response: responseJson.responseData,
                                major: responseJson.responseData.major,
                                minor:responseJson.responseData.minor,
                                sub_minor:responseJson.responseData.sub_minor,
                                sub_sub_minor: responseJson.responseData.sub_sub_minor,
                                sub_sub_sub_minor: responseJson.responseData.sub_sub_sub_minor
                            },()=>{
                    })
                }
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
     //           this.hideLoading()
            });

  }

    _renderPlanets=({item, index})=>{
    var dec_color, dec_p_color
    if(index%2==0){
      dec_color = '#f7f7f7'
      dec_p_color = '#e91e63'
    }else{
      dec_color = 'transparent' 
      dec_p_color = '#4caf50'
    }

    return(
      <>
    <View style={{width:wp(100), backgroundColor:dec_color, height:hp(6), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'20%',backgroundColor:'transparent', fontSize:14, color: 'grey', marginLeft:wp(1.5), textAlign:'left'}}>{item.planet}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', }}>{item.start}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'32%',backgroundColor:'transparent', fontSize:14, color:'grey', textAlign:'left', marginRight:wp(1.5)}}>{item.end}</Text>
    </View>

      </>
      )
  }



  render(){

    var allGet = this.state
    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Vimshottari Dasha</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    Vimshottari dasha is Moon based Dasha Cycle with 120 years time period. It has 5 levels starting with
    Major Dasha and ending with Pran Dasha
    </Text>
    
    </View>

          <View style={{width:wp('100%'), height:hp('10%'), backgroundColor:'transparent'}}>


            <FlatList style= {{flexGrow:0, backgroundColor:'transparent'}}
                      data={this.state.categories}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor = { (item, index) => index.toString() }
                      extraData={this.state}
                      renderItem={this._renderItemCateg}
            />
          </View>

    {this.state.index == "0" &&(
   <>
    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'white', marginLeft:wp(4.5), textAlign:'left'}}>Mahadasha</Text>
    </View>

    <FlatList style={{width:'100%'}}
    data={this.state.response}
    renderItem={this._renderPlanets}
    keyExtractor = { (item, index) => index.toString() }
    extraData={this.state}
    />
</>
    )}

    {this.state.index == "1" &&(
    <>
{/*    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'80%',backgroundColor:'transparent', fontSize:17, color:'white', marginLeft:wp(4.5), textAlign:'left'}}>Current Dasha</Text>
    </View>
*/}

        <VimBlocks vimColors={['#ef9a9a','#3d0984']}
        vimTitle={'Major Vimshottari Dasha'}
        vimPlanet={allGet.major.planet}
        vimStart={allGet.major.start}
        vimEnd={allGet.major.end}
        />


        <VimBlocks vimColors={['#bababa', '#fb5d2c']}
        vimTitle={'Antardasha'}
        vimPlanet={allGet.minor.planet}
        vimStart={allGet.minor.start}
        vimEnd={allGet.minor.end}
        />

        <VimBlocks vimColors={['#ffe791', '#f7005d']}
        vimTitle={'Pratyantardasha'}
        vimPlanet={allGet.sub_minor.planet}
        vimStart={allGet.sub_minor.start}
        vimEnd={allGet.sub_minor.end}
        />

        <VimBlocks vimColors={['#ffd0bb', '#086888']}
        vimTitle={'Sookshmadasha'}
        vimPlanet={allGet.sub_sub_minor.planet}
        vimStart={allGet.sub_sub_minor.start}
        vimEnd={allGet.sub_sub_minor.end}
        />
 
        <VimBlocks vimColors={['#ffb565', '#00878e']}
        vimTitle={'Pranadasha'}
        vimPlanet={allGet.sub_sub_sub_minor.planet}
        vimStart={allGet.sub_sub_sub_minor.start}
        vimEnd={allGet.sub_sub_sub_minor.end}
        />

    </>
    )}


    </ScrollView>
    </View>
  )   
  }
 
}

class VimBlocks extends Component{
    render(){
        return(

<View   style  = {{width:wp(97.5), backgroundColor:'white',shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,borderRadius:0,margin:5,
    shadowRadius: 3.84,elevation:4, flexDirection:'column', marginBottom:hp(1)
}}>


<LinearGradient colors={this.props.vimColors}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{width:wp(97.5),padding:8,
  justifyContent:'center', flexDirection:'row', alignItems:'center'}}
 >

          <Text style = {{fontSize:17,marginBottom:0,fontFamily:'Nunito-ExtraBold',color:'white',alignSelf:'center'}}>
          {this.props.vimTitle}
          </Text>
</LinearGradient>

    <View style={{flexDirection:'column', margin:10}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Planet : <Text style={{color:'#293440'}}>
          {this.props.vimPlanet}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Start : <Text style={{color:'#293440'}}>
          {this.props.vimStart}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          End : <Text style={{color:'#293440'}}>
          {this.props.vimEnd}</Text>
          </Text>
    </View>
    </View>
 
        )
    }
}