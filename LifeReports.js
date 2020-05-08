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

import RashiReport from './LifeReportComponents/RashiReport'
import AscendantReport from './LifeReportComponents/AscendantReport'
import PlanetNature from './LifeReportComponents/PlanetNature'
import MoonBiorhythm from './LifeReportComponents/MoonBiorhythm'
import PersonalityReport from './LifeReportComponents/PersonalityReport'

export default class LifeReports extends Component {

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
          { key: 'first', title: 'House Report' },
          { key: 'second', title: 'Rashi Report' },
          { key: 'third', title: 'Ascendant Report' },
          { key: 'fourth', title: 'Planet Nature' },
          { key: 'fifth', title: 'Moon Biorhythm' },
          { key: 'sixth', title: 'Personality Report' },
      ],

            chartimage:``,
            g_index:0,
            index:0,

        }


    }



    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            return <HouseReport/>;
            break;

            case 'second': return <RashiReport/>
            break;

            case 'third': return <AscendantReport/>
            break;

            case 'fourth': return <PlanetNature/>
            break;

            case 'fifth': return <MoonBiorhythm/>
            break;

            case 'sixth': return <PersonalityReport/>
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

handleBackButtonClick() {
 //  this.setState((prevState, props)=>({

 //    g_index : prevState.g_index - 1
 //  }));
 // alert('hardwareBackPress'+this.state.g_index)
 //     this.props.navigation.goBack(null);
 //    return true;
}

    componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }


componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
           // console.log('adssdd'+ this.state.chartimage)
            compos= 

            <SvgXml xml={xml} 


            />

        }

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'LIFE REPORT'}
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

class HouseReport extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            response:'',
            planet:'',
            house_report:'',
            curr_planet: 'moon',
            year_data:[
            {'label': 'Moon', 'value': 'moon'},
            {'label': 'Mars', 'value': 'mars'},
            {'label': 'Mercury', 'value': 'mercury'},
            {'label': 'Jupiter', 'value': 'jupiter'},
            {'label': 'Venus', 'value': 'venus'},
            {'label': 'Saturn', 'value': 'saturn'},
            // {'label': 'Ascendant', 'value': 'ascendant'},
            {'label': 'Sun', 'value': 'sun'},
            ]
        }
    }

    getIndex = (index) => {
//      alert(this.state.year_data[index].label)
        this.setState({curr_planet: this.state.year_data[index].value})
        GLOBAL.gl_currPlanetLifeReport = this.state.year_data[index].value
        this.getDetails(this.state.year_data[index].value)
    }

  componentDidMount(){
//    console.warn(moment().format('YYYY'))
    this.getDetails(this.state.curr_planet)
  }

  getDetails=(sel_planet)=>{
     // console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
     //       "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": sel_year})
 //     this.showLoading()
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
            "api-condition":"general_house_report",
            "planetName": sel_planet
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  planet: responseJson.responseData.planet,
                  house_report: responseJson.responseData.house_report
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
    var data=this.state.response

  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(92), margin:15}}>


      <Dropdown containerStyle={{width:'100%', height:50, marginTop:hp(-1.5), marginBottom:hp(3)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndex(index) }
                                label={''}
                                value={this.state.curr_planet}
                                data={this.state.year_data}
                      />


    </View>

    <View style={{width:wp(100), backgroundColor:'#E60000', height:hp(6.5), justifyContent:'center'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>House Report</Text>
    </View>


    <DataColumn
    name={'Planet'}
    value={this.state.planet}/>

    <DataColumn
    name={'House Report'}
    value={this.state.house_report}/>

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
    <Text style={{fontSize:16, color:'#595959',width:'30%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585',width:'65%', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
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
