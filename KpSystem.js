import React, {Component} from 'react';
import { StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import IndicatorCustom from './IndicatorCustom'
import { Dropdown } from 'react-native-material-dropdown';
import KPPlanets from './KPSystemComponents/KPPlanets'
import HouseCusps from './KPSystemComponents/HouseCusps'
import PlanetSignif from './KPSystemComponents/PlanetSignif'
import HouseSignif from './KPSystemComponents/HouseSignif'
import PlanetaryAspects from './KPSystemComponents/PlanetaryAspects'
import BasicDetailsNew from './KPSystemComponents/BasicDetailsNew'
import KPCharts from './KPSystemComponents/KPCharts'

export default class YearlyPrediction extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            renderIndex:0,
            routes: [
                { key: 'first', title: 'Birth Details' },
                { key: 'second', title: 'KP Planets' },
                { key: 'third', title: 'KP Charts' },
                { key: 'fourth', title: 'House Cusps' },
                { key: 'fifth', title: 'Planet Significator' },
                { key: 'sixth', title: 'House Significator' },
                // { key: 'seventh', title: 'Planetary Aspects' },
                // { key: 'eighth', title: 'House Aspects' },
            ],
            g_index:0,index:0,
            response:'',
        }
    console.log('\n-----constructor')

    }

    _keyExtractor = (item, index) => item.productID;

    _renderScene = ({ route }) => {
//          console.log(route.key)

        switch (route.key) {
            case 'first': return <BasicDetailsNew/>
                          break;

            case 'second': return <KPPlanets/>
                          break;

            case 'third': return <KPCharts/>
                          break;


            case 'fourth': return <HouseCusps/>
                          break;
            case 'fifth': return <PlanetSignif/>
                          break;

            case 'sixth': return <HouseSignif/>
                          break;
            case 'seventh': return <PlanetaryAspects/>
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

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

//     this.getReviews(2020)
    }


    componentWillUnmount() {

    }
    getReviews= () =>{

    }

    render() {
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
    console.log('Parent render')
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'KP SYSTEM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#E60000' }}
                    style={{ backgroundColor: 'white', flexGrow:1 }}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    pressColor={'#E60000'}
                    // onSwipeStart ={(index)=> this.setState({ index })}
                    // onSwipeEnd ={()=> this.hideLoading()}
                    onIndexChange={index => {this.onTabChange(index)}}
                    initialLayout={{ width: Dimensions.get('window').width }}

                />
          </View>
        );
    }

    onTabChange=(index)=>{
      this.setState({ index: index })
    }
}
