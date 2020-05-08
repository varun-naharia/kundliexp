import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const GLOBAL = require('../Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from '../IndicatorCustom'
import LinearGradient from 'react-native-linear-gradient';

export default class FullReport extends Component{
    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            varna:{},
            vashya:{},
            tara:{},
            yoni:{},
            maitri:{},
            gan:{},
            bhakut:{},
            nadi:{},
            total:{},
            conclusion:{},

        }
    }

  componentDidMount(){
    this.getDetails()
  }

  getDetails=()=>{
        var smallBody={
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "api-condition":"match_making_detailed_report",
        }
      var finalBody = {...smallBody , ...this.props.navigation.state.params.wholeMatchData}
      console.log(JSON.stringify(finalBody))

      const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalBody),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  varna: responseJson.responseData.ashtakoota.varna,
                  vashya: responseJson.responseData.ashtakoota.vashya,
                  tara: responseJson.responseData.ashtakoota.tara,
                  yoni: responseJson.responseData.ashtakoota.yoni,
                  maitri: responseJson.responseData.ashtakoota.maitri,
                  gan: responseJson.responseData.ashtakoota.gan,
                  bhakut: responseJson.responseData.ashtakoota.bhakut,
                  nadi: responseJson.responseData.ashtakoota.nadi,
                  total: responseJson.responseData.ashtakoota.total,
                  conclusion: responseJson.responseData.ashtakoota.conclusion,
                },()=>{
//                  alert('zsdd')
                })
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
     //           this.hideLoading()
            });

  }

  render(){

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
        <Text style = {{fontSize:16,marginLeft:wp(5),fontFamily:'Nunito-SemiBold',color:'grey',width:'95%'}}>Conclusion:</Text>

       <View style={{backgroundColor:'#E60000', width:wp(85),  alignSelf:'center', marginVertical:hp(2), borderRadius:7,justifyContent:'center'}}>
        <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'white',textAlign:'center',alignSelf:'center', padding:8, paddingBottom:12}}>
        {this.state.conclusion.report}
        </Text>
       </View>

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Varna'}
        description={this.state.varna.description}
        mkoot={this.state.varna.male_koot_attribute}
        fkoot={this.state.varna.female_koot_attribute}
        tp={this.state.varna.total_points}
        rp={this.state.varna.received_points}
        />
    
        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Vashya'}
        description={this.state.vashya.description}
        mkoot={this.state.vashya.male_koot_attribute}
        fkoot={this.state.vashya.female_koot_attribute}
        tp={this.state.vashya.total_points}
        rp={this.state.vashya.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Tara'}
        description={this.state.tara.description}
        mkoot={this.state.tara.male_koot_attribute}
        fkoot={this.state.tara.female_koot_attribute}
        tp={this.state.tara.total_points}
        rp={this.state.tara.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Yoni'}
        description={this.state.yoni.description}
        mkoot={this.state.yoni.male_koot_attribute}
        fkoot={this.state.yoni.female_koot_attribute}
        tp={this.state.yoni.total_points}
        rp={this.state.yoni.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Maitri'}
        description={this.state.maitri.description}
        mkoot={this.state.maitri.male_koot_attribute}
        fkoot={this.state.maitri.female_koot_attribute}
        tp={this.state.maitri.total_points}
        rp={this.state.maitri.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Gan'}
        description={this.state.gan.description}
        mkoot={this.state.gan.male_koot_attribute}
        fkoot={this.state.gan.female_koot_attribute}
        tp={this.state.gan.total_points}
        rp={this.state.gan.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Bhakut'}
        description={this.state.bhakut.description}
        mkoot={this.state.bhakut.male_koot_attribute}
        fkoot={this.state.bhakut.female_koot_attribute}
        tp={this.state.bhakut.total_points}
        rp={this.state.bhakut.received_points}
        />

        <AshtakootaBlocks colors={['#ef9a9a','#3d0984']}
        title={'Nadi'}
        description={this.state.nadi.description}
        mkoot={this.state.nadi.male_koot_attribute}
        fkoot={this.state.nadi.female_koot_attribute}
        tp={this.state.nadi.total_points}
        rp={this.state.nadi.received_points}
        />


    </ScrollView>
    </View>
  )   
  }
 
}

class AshtakootaBlocks extends Component{
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


<LinearGradient colors={this.props.colors}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{width:wp(97.5),padding:8,
  justifyContent:'center', flexDirection:'row', alignItems:'center'}}
 >

          <Text style = {{fontSize:17,marginBottom:0,fontFamily:'Nunito-ExtraBold',color:'white',alignSelf:'center'}}>
          {this.props.title}
          </Text>
</LinearGradient>

    <View style={{flexDirection:'column', margin:10}}>
          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Description : <Text style={{color:'#293440'}}>
          {this.props.description}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Male Koot Attribute : <Text style={{color:'#293440'}}>
          {this.props.mkoot}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Female Koot Attribute : <Text style={{color:'#293440'}}>
          {this.props.fkoot}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Total Points : <Text style={{color:'#293440'}}>
          {this.props.tp}</Text>
          </Text>

          <Text style = {{fontSize:16,marginBottom:0,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
          Received Points : <Text style={{color:'#293440'}}>
          {this.props.rp}</Text>

          </Text>
    </View>
    </View>
 
        )
    }
}