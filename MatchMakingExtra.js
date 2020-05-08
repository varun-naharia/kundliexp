import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,BackHandler,Image,TouchableOpacity ,Container,Linking ,TextInput , Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { Dropdown } from 'react-native-material-dropdown';

import RajjuDosha from './MatchMakingComponents/RajjuDosha'
import PapasamyamDetails from './MatchMakingComponents/PapasamyamDetails'
import FullReport from './MatchMakingComponents/FullReport'

export default class MatchMakingExtra extends Component {

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
            routes: [
                { key: 'first', title: 'Basic Report' },
                { key: 'second', title: 'Rajju Dosha' },
                // { key: 'third', title: 'Papasamyam Details' },
                { key: 'fourth', title: 'Full Report' },
            ],
            g_index:0,
            index:0,
        }
    }



    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            return <BasicReport
                    navigation={this.props.navigation}/>;
            break;

            case 'second': return <RajjuDosha
                                   navigation={this.props.navigation}/>
            break;

            case 'third': return <PapasamyamDetails
                                  navigation= {this.props.navigation} />
            break;

            case 'fourth': return <FullReport
                                  navigation= {this.props.navigation}/>
            break;

            case 'fifth': return <View/>
            break;

            case 'sixth': return <View/>
            break;

            default:
                return null;
        }
    };

 renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: 'white', elevation: 0, borderColor: 'transparent', height:50,}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 13, fontFamily:'Nunito-Regular', textAlign:'left',}}

                {...props}

               renderLabel={({ route, focused, color }) => {
                var decide
                if(focused)
                  decide='black'
                else
                  decide= 'rgba(0,0,0,0.5)'
                return(
                  <Text style={{color: decide, fontSize: 13, fontFamily:'Nunito-Bold', textAlign:'left',}}>
                    {route.title}
                  </Text>
                )}}
                scrollEnabled ={true}
                tabStyle={{width:'auto'}}
                pressColor={'grey'}
                indicatorStyle={{backgroundColor: '#E60000', height: 2.5,}}
            />
        );
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    componentDidMount(){
      console.log('--->' + JSON.stringify(this.props.navigation.state.params.wholeMatchData))
    }


    componentWillUnmount() {

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

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'MATCH MAKING'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <View style={{width:wp('100%'),backgroundColor:'#E60000', flex:1}}>
                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#800000' }}
                    style={{ backgroundColor: 'white', flexGrow:1 }}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    pressColor={'#E60000'}
                    // onSwipeStart ={(index)=> this.setState({ index })}
                    // onSwipeEnd ={()=> this.hideLoading()}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />


          </View>

          </View>
        );
    }
}

class BasicReport extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            method:'',
            house_report:'',
            male_profile:{},
            female_profile:{},
            match_analysis:{},
            match_points:{},
            total:{},
            conclusion:{},
            curr_method: 'ashtakoot',
            match_type:'',
            match_percentage:0,
            match_method:[
            {'label': 'Ashtakoot', 'value': 'ashtakoot'},
            {'label': 'Dashkoot', 'value': 'dashkoot'},
            ]
        }
    }

    getIndex = (index) => {
//      alert(this.state.match_method[index].label)
        this.setState({curr_method: this.state.match_method[index].value})
        GLOBAL.gl_currMatchMethod = this.state.match_method[index].value
        this.getDetails(this.state.match_method[index].value)
    }

  componentDidMount(){
    this.getDetails(this.state.curr_method)
  }

  getDetails=(sel_method)=>{
     // console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
     //       "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": sel_year})
 //     this.showLoading()
      var smallBody={
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "api-condition":"match_horoscope",
            "match_method": sel_method,
            "manglik_regional_setting": "north"
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
                  male_profile: responseJson.responseData.astro_details.male_profile,
                  female_profile: responseJson.responseData.astro_details.female_profile,

                  match_analysis: responseJson.responseData.match_analysis,
                  match_points: responseJson.responseData.match_analysis.match_points,
                  total: responseJson.responseData.match_analysis.match_points.total,
                  match_type: responseJson.responseData.match_analysis.match_type,
                  conclusion: responseJson.responseData.manglik.conclusion,
                  match_percentage: responseJson.responseData.match_analysis.match_percentage,

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
    var data = this.state.response
    var yummy = this.state.match_points
    var total = this.state.total

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15}}>


      <Dropdown containerStyle={{width:'100%', height:50, marginTop:hp(-1.5), marginBottom:hp(1)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndex(index) }
                                label={''}
                                value={this.state.curr_method}
                                data={this.state.match_method}
                      />
    </View>

        <Text style = {{fontSize:16,margin:15,marginTop:0,fontFamily:'Nunito-SemiBold',color:'#293440',width:'95%'}}>
        {this.state.match_type} Points
        </Text>

        <View style={{width:wp(93),alignSelf:'center', 
        backgroundColor:'white', elevation:5, borderRadius:5,
         height:hp(16), marginBottom:hp(1), justifyContent:'center', flexDirection:'row', alignItems:'center'}}>

        <Text style = {{fontSize:45,fontFamily:'Nunito-SemiBold',color:'#E60000',}}>
        {total.received_points}<Text style = {{fontSize:35,color:'#E60000',}}>/{total.total_points}</Text>
        </Text>
        </View>
        <Text style = {{fontSize:16,marginLeft:wp(5),fontFamily:'Nunito-SemiBold',color:'grey',width:'95%'}}>* Minimum required points : {total.minimum_required}</Text>

       <View style={{backgroundColor:'#E60000', width:wp(85),  alignSelf:'center', marginVertical:hp(2), borderRadius:7,justifyContent:'center'}}>
        <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'white',textAlign:'center',alignSelf:'center', padding:8, paddingBottom:12}}>
        {this.state.conclusion.report}
        </Text>
       </View>


    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Male Profile</Text>
    </View>
    <DataColumn
    name={'Ascendant'}
    value={this.state.male_profile.ascendant}/>
    <DataColumn
    name={'Moon Sign'}
    value={this.state.male_profile.moon_sign}/>
    <DataColumn
    name={'Moon Sign Lord'}
    value={this.state.male_profile.moon_sign_lord}/>
    <DataColumn
    name={'Naksahtra'}
    value={this.state.male_profile.naksahtra}/>
    <DataColumn
    name={'Naksahtra Lord'}
    value={this.state.male_profile.naksahtra_lord}/>
    <DataColumn
    name={'Varna'}
    value={this.state.male_profile.varna}/>
    <DataColumn
    name={'Vashya'}
    value={this.state.male_profile.vashya}/>
    <DataColumn
    name={'Yoni'}
    value={this.state.male_profile.yoni}/>
    <DataColumn
    name={'Gan'}
    value={this.state.male_profile.gan}/>
    <DataColumn
    name={'Nadi'}
    value={this.state.male_profile.nadi}/>
    <DataColumn
    name={'Tithi'}
    value={this.state.male_profile.tithi}/>
    <DataColumn
    name={'Yog'}
    value={this.state.male_profile.yog}/>
    <DataColumn
    name={'Karan'}
    value={this.state.male_profile.karan}/>
    <DataColumn
    name={'Yunja'}
    value={this.state.male_profile.yunja}/>
    <DataColumn
    name={'Tatva'}
    value={this.state.male_profile.tatva}/>
    <DataColumn
    name={'Name Alphabet'}
    value={this.state.male_profile.name_alphabet}/>
    <DataColumn
    name={'Paya'}
    value={this.state.male_profile.paya}/>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Female Profile</Text>
    </View>
    <DataColumn
    name={'Ascendant'}
    value={this.state.female_profile.ascendant}/>
    <DataColumn
    name={'Moon Sign'}
    value={this.state.female_profile.moon_sign}/>
    <DataColumn
    name={'Moon Sign Lord'}
    value={this.state.female_profile.moon_sign_lord}/>
    <DataColumn
    name={'Naksahtra'}
    value={this.state.female_profile.naksahtra}/>
    <DataColumn
    name={'Naksahtra Lord'}
    value={this.state.female_profile.naksahtra_lord}/>
    <DataColumn
    name={'Varna'}
    value={this.state.female_profile.varna}/>
    <DataColumn
    name={'Vashya'}
    value={this.state.female_profile.vashya}/>
    <DataColumn
    name={'Yoni'}
    value={this.state.female_profile.yoni}/>
    <DataColumn
    name={'Gan'}
    value={this.state.female_profile.gan}/>
    <DataColumn
    name={'Nadi'}
    value={this.state.female_profile.nadi}/>
    <DataColumn
    name={'Tithi'}
    value={this.state.female_profile.tithi}/>
    <DataColumn
    name={'Yog'}
    value={this.state.female_profile.yog}/>
    <DataColumn
    name={'Karan'}
    value={this.state.female_profile.karan}/>
    <DataColumn
    name={'Yunja'}
    value={this.state.female_profile.yunja}/>
    <DataColumn
    name={'Tatva'}
    value={this.state.female_profile.tatva}/>
    <DataColumn
    name={'Name Alphabet'}
    value={this.state.female_profile.name_alphabet}/>
    <DataColumn
    name={'Paya'}
    value={this.state.female_profile.paya}/>

    </ScrollView>
    </View>
  )   
  }
 
}

class DataColumn extends Component{
  render(){
   return(
   <>
    <View style={{width:wp(100), backgroundColor:'white',flexDirection:'row',alignSelf:'center',
      alignItems:'center', marginTop:hp(1) }}>
    <Text style={{fontSize:16, color:'#595959',width:'55%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'45%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
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
