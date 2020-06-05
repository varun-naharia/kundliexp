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
// import KPCharts from './KPSystemComponents/KPCharts'
import JaiminiDetails from './KundliComponents/JaiminiDetails'
import PlanetaryPosition from './KundliComponents/PlanetaryPosition'
import DashamBhav from './KundliComponents/DashamBhav'
import Sarvashtak from './MedicalAstrology'
import Ashtakvarga from './KundliComponents/Ashtakvarga'
import FavourablePoints from './KundliComponents/FavourablePoints'
import Vimshottari from './KundliComponents/Vimshottari'
import CharDasha from './KundliComponents/CharDasha'
import YoginiDasha from './KundliComponents/YoginiDasha'
import KalsarpaDosha from './KundliComponents/KalsarpaDosha'
import MangalDosha from './KundliComponents/MangalDosha'
import PitraDosha from './KundliComponents/PitraDosha'
import KundliCharts from './KundliComponents/KundliCharts'

export default class KundliListNew extends Component {

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
          { key: 'first', title: 'Basic Details' },
          { key: 'second', title: 'Charts' },
          { key: 'third', title: 'Planetary Positions' },
          { key: 'fourth', title: 'Jamini Details' },
          { key: 'fifth', title: 'Dasham Bhav Madhya' },
          { key: 'sixth', title: 'Ashtakvarga' },
          { key: 'seventh', title: 'Sarvashtak' },
          // { key: 'eighth', title: 'Favorables' },
          { key: 'ninth', title: 'Vimshottari' },
          { key: 'tenth', title: 'Char Dasha' },
          { key: 'eleventh', title: 'Yogini Dasha' },
          { key: 'twelveth', title: 'Kalsarpa Dosha' },
          { key: 'thirteenth', title: 'Mangal Dosha' },
          { key: 'fourteenth', title: 'Pitra Dosha' },
      ],

            chartimage:``,
            g_index:0,
            index:0,
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
                artwork: require('./resources/htens.png')
              },
             ]             
        }


    }

    _keyExtractor = (item, index) => item.productID;

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            return <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.basicitems}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
                      extraData={this.state}
            />;
            break;

            case 'second': return <KundliCharts/>
            break;

            case 'third': return <PlanetaryPosition/>
            break;

            case 'fourth': return <JaiminiDetails
                                  compType={'JaiminiDetails'}/>
            break;

            case 'fifth': return <DashamBhav/>
            break;

            case 'sixth': return <Ashtakvarga/>
            break;

            case 'seventh': return <Sarvashtak/>
            break;

            case 'eighth': return <FavourablePoints/>
            break;

            case 'ninth': return <Vimshottari/>
            break;

            case 'tenth': return <CharDasha/>
            break;

            case 'eleventh': return <YoginiDasha/>
            break;

            case 'twelveth': return <KalsarpaDosha/>
            break;

            case 'thirteenth': return <MangalDosha/>
            break;

            case 'fourteenth' : return <PitraDosha/>
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

     this.getBasicDetails()
    }

    getBasicDetails= () =>{
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
            "api-condition":"basic_detail",
            "name": GLOBAL.nameForBasic
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log('---> basic_detail hit first')
                if (responseJson.status == true) {
              // this.setState({response: responseJson },() => {
              //     //    alert('gdsd'+JSON.stringify(this.state.response));
              //     });                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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
           headerName={'KUNDLI LIST'}
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

