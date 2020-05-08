import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import LinearGradient from 'react-native-linear-gradient';

export default class JaiminiDetails extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:{},
            atma_karaka:{},
            amatya_karaka:{},
            bhatri_karaka:{},
            matri_karaka:{},
            putra_karaka:{},
            gnati_karaka:{},
            dara_karaka:{}
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount(){
    this.getJaminiDetails()
  }

  componentWillReceiveProps(){
    this.getJaminiDetails()
  }

  // componentDidUpdate(prevProps, prevState){
  // alert(JSON.stringify(prevState))
  //   // if(prevProps.compType =){
  //   //     alert('hi')
  //   // }
  // }

  getJaminiDetails=()=>{
//    this.showLoading()
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
            "api-condition":"jaimini_details",
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                    atma_karaka: responseJson.responseData.jaimini_karaka.atma_karaka,
                    amatya_karaka: responseJson.responseData.jaimini_karaka.amatya_karaka,
                    bhatri_karaka: responseJson.responseData.jaimini_karaka.bhatri_karaka,
                    matri_karaka: responseJson.responseData.jaimini_karaka.matri_karaka,
                    putra_karaka: responseJson.responseData.jaimini_karaka.putra_karaka,
                    gnati_karaka: responseJson.responseData.jaimini_karaka.gnati_karaka,
                    dara_karaka: responseJson.responseData.jaimini_karaka.dara_karaka,

                },()=>{
                   // console.log(JSON.stringify(this.state.response))
                })
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
     //           this.hideLoading()
            });

  }
degreeMinSec=(dec)=>{
        let $vars = dec.split('.');
        if($vars[1] === undefined) {
          $vars[1] = '0';        
        }
        let $deg = $vars[0],
        $tempma = '0.'+$vars[1];
        $tempma = $tempma * 3600; 
        let $min = Math.floor($tempma / 60), 
        $sec =Math.round($tempma - ($min*60));  
//        console.log($vars[1]);
        if($deg < 10)
         $deg = '0'+$deg; 
        if($min < 10) 
         $min = '0'+$min;
        if($sec < 10) 
         $sec = '0'+$sec;
        return {hour:$deg, min: $min,sec:$sec};
    }



  render(){
    var yeah = this.state
    // var getDegree = this.degreeMinSec(yeah.atma_karaka.degree.toString())

    if(this.state.loading){
        return(
          <IndicatorCustom/>
        )
    }


  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15,}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5, alignSelf:'center'}}>Jaimini Kundli</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>
    This section list down specific components for Jaimini Kundli such as Atma Karaka, Pad Lagna and
    Karakamsha
    </Text>
    
    </View>

    <View style={{width:wp(100), backgroundColor:'#e60000', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', marginLeft:wp(2.5), textAlign:'left'}}>Karaka</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left'}}>Planet</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', }}>Sign</Text>
    <Text style={{fontFamily:'Nunito-ExtraBold',width:'25%',backgroundColor:'transparent', fontSize:16, color:'white', textAlign:'left', marginRight:wp(2.5)}}>Degree</Text>
    </View>


    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Atma</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.atma_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.atma_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.atma_karaka.degree}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#f7f7f7', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Amatya</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.amatya_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.amatya_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.amatya_karaka.degree}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Bhatri</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.bhatri_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.bhatri_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.bhatri_karaka.degree}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'#f7f7f7', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Matri</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.matri_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.matri_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.matri_karaka.degree}</Text>
    </View>

    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Putra</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.putra_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.putra_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.putra_karaka.degree}</Text>
    </View>


    <View style={{width:wp(100), backgroundColor:'#f7f7f7', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Gnati</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.gnati_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.gnati_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.gnati_karaka.degree}</Text>
    </View>


    <View style={{width:wp(100), backgroundColor:'white', height:hp(6.5), justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', marginLeft:wp(2.5), textAlign:'left'}}>Dara</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left'}}>{yeah.dara_karaka.planet_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left',}}>{yeah.dara_karaka.sign}</Text>
    <Text style={{fontFamily:'Nunito-Regular',width:'25%',backgroundColor:'transparent', fontSize:14, color:'black', textAlign:'left', marginRight:wp(2.5)}}>{yeah.dara_karaka.degree}</Text>
    </View>


    <DataBlocks customStyle ={{width:'98.5%',}}
    colorsArray={['#9a3439','#ffe791']}
    block_title={'Ascendant'}
    block_value={yeah.response.janma_lagna}
    />
    <DataBlocks customStyle ={{width:'98.5%', }}
    colorsArray={['#3d0984','#ef9a9a']}
    block_title={'Pad Lagna'}
    block_value={yeah.response.pad_lagna}
    />
    <DataBlocks customStyle ={{width:'98.5%', }}
    colorsArray={['#ff866d','#ffd0bb']}
    block_title={'Up Pad Lagna'}
    block_value={yeah.response.up_pad_lagna}
    />

    <DataBlocks customStyle ={{width:'98.5%',}}
    colorsArray={['#123865', '#dfdede']}
    block_title={'Karamsha Lagna'}
    block_value={yeah.response.kakamsha_lagna}
    />


    </ScrollView>
    </View>
  )   
  }
 
}
class DataBlocks extends Component{
  render(){
    return(
    <LinearGradient 
    colors={this.props.colorsArray}
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    style={[{height:hp(10), margin:4,marginLeft:3, alignItems:'center', justifyContent:'center'}
    ,...[this.props.customStyle]]}>
    <Text style={{fontSize:16, color:'white', textAlign:'center',width:'75%', fontFamily:'Nunito-SemiBold'}}>{this.props.block_title}</Text>   
    <Text style={{fontFamily:'Nunito-ExtraBold',color:'white', fontSize:20,marginTop:5}}>{this.props.block_value}</Text>
    </LinearGradient>      
    )
  }
}
