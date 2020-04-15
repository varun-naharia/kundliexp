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
import VarshaphalPlanets from './YearlyPredComponents/VarshaphalPlanets'
import PanchvargiyaBala from './YearlyPredComponents/PanchvargiyaBala'
import HarshaBala from './YearlyPredComponents/HarshaBala'
import SahamPoints from './YearlyPredComponents/SahamPoints'

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
                { key: 'first', title: 'Varshaphal Details' },
                { key: 'second', title: 'Varshaphal Charts' },
                { key: 'third', title: 'Varshaphal Planets' },
                { key: 'fourth', title: 'Varshaphal Monthly Charts' },
                { key: 'fifth', title: 'Panchvargiya Bala' },
                { key: 'sixth', title: 'Harsha Bala' },
                { key: 'seventh', title: 'Saham Points' },
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
            case 'first': return <VarshaphalDetails
                                  response={this.state.response}/>
                          break;
            case 'second': return <VarshaphalCharts/>
                          break;
            case 'third': return <VarshaphalPlanets
                                  response={this.state.response}
                                  navigation={this.props.navigation}/>
                          break;
            case 'fifth': return <PanchvargiyaBala
                                  response={this.state.response}/>
                          break;
            case 'sixth': return <HarshaBala/>
                          break;

            case 'seventh': return <SahamPoints/>
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
           headerName={'YEARLY PREDICTION'}
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
//      alert(index)
      this.setState({ index: index })
//       if(index=== 2){
// //        this.getVarshphalPlanets()
//       }else if(index=== 4){

//       }
    }

  getVarshphalPlanets=()=>{
    console.log('-----> varshaphal_planets')
      // console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
      //       "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": GLOBAL.gl_currYear})
 //     this.showLoading()
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
            "api-condition":"varshaphal_planets",
            "varshaphal_year": GLOBAL.gl_currYear
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
           //   console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
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




}

class VarshaphalDetails extends Component{

    constructor(props){
        super(props)
        const { navigation } = this.props;
        var getCurrentYear= moment().format('YYYY').toString()
        var getNextYear = moment().add(1, 'years').format('YYYY').toString()
        var getNextNextYear = moment().add(2, 'years').format('YYYY').toString()
        this.state = {
            response:'',
            panchadhikari:{},
            varshaphala_muntha:{},
            curr_year: getCurrentYear,
            year_data:[{'label': getCurrentYear, 'value': getCurrentYear},
            {'label': getNextYear, 'value': getNextYear},
            {'label': getNextNextYear, 'value': getNextNextYear}]
        }
    }

    getIndex = (index) => {
//      alert(this.state.year_data[index].label)
        this.setState({curr_year: this.state.year_data[index].label})
        GLOBAL.gl_currYear = this.state.year_data[index].label
        this.getDetails(this.state.curr_year)
    }

  componentDidMount(){
//    console.warn(moment().format('YYYY'))
    this.getDetails(this.state.curr_year)
  }

  getDetails=(sel_year)=>{
    //  console.log({"user_id":GLOBAL.user_id,"lang":"en","date":GLOBAL.gldate,"month":GLOBAL.glmonth,"year":GLOBAL.glyear,"hour":GLOBAL.glhour,
      //      "minute":GLOBAL.glminute,"latitude":GLOBAL.gllat,"longitude":GLOBAL.gllong,"timezone":GLOBAL.glzone,"api-condition":"varshaphal_details","varshaphal_year": sel_year})
 //     this.showLoading()
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
            "api-condition":"varshaphal_details",
            "varshaphal_year": sel_year
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
    //          console.log(JSON.stringify(responseJson))
   //             this.hideLoading()
                if (responseJson.status == true) {
                this.setState({response: responseJson.responseData,
                  panchadhikari: responseJson.responseData.panchadhikari,
                  varshaphala_muntha: responseJson.responseData.varshaphala_muntha
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
    var panch_data = this.state.panchadhikari
    var muntha_data = this.state.varshaphala_muntha
  return(
    <View style={{width: wp(100), flex:1}}>  
    <ScrollView>
    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:21,marginTop:5}}>What is Varshphal?</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>The Varshaphal or Vedic Solar Return system makes
    a progressed yearly kundali for you. The Varshaphala predicts how the your year is going to be.
    This is also known as birthday forecase as it is mainly from one birthday to next birthday.</Text>

    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:21,marginTop:20}}>Select Varshphal Year</Text>

      <Dropdown containerStyle={{width:'97%', height:50, marginTop:hp(-1.5), marginBottom:hp(3)}}
                                fontSize={14}
                                fontColor={'#000000'}
                                labelFontSize={13}
                                placeholderTextColor ={'red'}
                                dropdownPosition = {0}
                                onChangeText ={ (value,index) => this.getIndex(index) }
                                label={''}
                                value={this.state.curr_year}
                                data={this.state.year_data}
                      />


    </View>

    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6.5), justifyContent:'center'}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Basic Details</Text>
    </View>


    <DataColumn
    name={'Varshaphala Year'}
    value={data.varshaphala_year}/>

    <DataColumn
    name={'Age of Native'}
    value={data.age_of_native}/>

    <DataColumn
    name={'Ayanamsha Name'}
    value={data.ayanamsha_name}/>

    <DataColumn
    name={'Ayanamsha Degree'}
    value={data.ayanamsha_degree}/>

    <DataColumn
    name={'Date of Birth'}
    value={data.native_birth_date}/>

    <DataColumn
    name={'Varshaphala Date'}
    value={data.varshaphala_date}/>


    <View style={{width:wp(100), backgroundColor:'#56aef6', height:hp(6), justifyContent:'center', marginTop:30}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19, color:'white', marginLeft:wp(3)}}>Panchadhikari (Five Planets)</Text>
    </View>

    <View style={{flexDirection:'row', width:'100%', marginTop:10,}}>

    <DataBlocks customStyle={{width:'48%', backgroundColor:'#fff5d2'}}
    block_title={'Muntha Lord (Progressed Lord)'}
    block_value={panch_data.muntha_lord}
    />


    <DataBlocks customStyle ={{width:'48%', backgroundColor: '#daebff',}}
    block_title={'Birth Ascendant Lord'}
    block_value={panch_data.birth_ascendant_lord}
    />

    </View>

    <View style={{flexDirection:'row', width:'100%', marginTop:0,}}>

    <DataBlocks customStyle ={{width:'31.5%', backgroundColor: '#ffe2e4',}}
    block_title={'Year Ascendant Lord'}
    block_value={panch_data.year_ascendant_lord}
    />
    <DataBlocks customStyle ={{width:'31.5%', backgroundColor: '#e2fbe5',}}
    block_title={'Dinratri Lord'}
    block_value={panch_data.dinratri_lord}
    />
    <DataBlocks customStyle ={{width:'31.5%', backgroundColor: '#e4e1fe',}}
    block_title={'Trirashi Lord'}
    block_value={panch_data.trirashi_lord}
    />

    </View>

    <View style={{flexDirection:'row', width:'100%', marginTop:0,}}>
    <DataBlocks customStyle ={{width:'48%', backgroundColor: '#f1defe',}}
    block_title={'Varshphal Year Lord'}
    block_value={data.varshaphala_year_lord}
    />

    <DataBlocks customStyle ={{width:'48%', backgroundColor: '#fed9e1',}}
    block_title={'Varshaphal Muntha'}
    block_value={muntha_data.muntha_sign}
    />

    </View>


    </ScrollView>
    </View>
  )   
  }
 
}


class VarshaphalCharts extends Component{
  componentDidMount(){
//      this.setState({ads:'asd'})

  }
  render(){

  return(
    <View style={{width: wp(100), flex:1}}>  

    <View style={{width: wp(95), margin:15}}>
    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:5}}>Varshphal Charts</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'#838383', marginTop:10}}>The Varshaphal kundali is the chart for
    the exact time when Sun is at the same degree as in your natal birth chart.
    This is called Year Kundli as well.</Text>

    <Text style={{fontFamily:'Nunito-Bold', fontSize:22,marginTop:20}}>Year Chart</Text>

      

    </View>
    </View>
  )   
  }
 
}



class DataColumn extends Component{
  render(){
   return(
   <>
    <View style={{width:wp(100), backgroundColor:'white', height:hp(4.5),flexDirection:'row',alignSelf:'center',
      alignItems:'center', marginTop:hp(1) }}>
    <Text style={{fontSize:16, color:'#595959',width:'50%', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{this.props.name}</Text>
    <Text style={{fontSize:16, color:'#858585', textAlign:'left', fontFamily:'Nunito-Regular'}}>{this.props.value}</Text>
    </View>

    <View style={{width:wp(100), height:hp(0.2), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1)}}/>
  </>   
   ) 
  }
}

class DataBlocks extends Component{
  render(){
    return(
    <View style={[{height:hp(15), margin:4,marginLeft:3, alignItems:'center', justifyContent:'center'}
    ,...[this.props.customStyle]]}>
    <Text style={{fontSize:16, color:'#595959', textAlign:'center',width:'75%', fontFamily:'Nunito-SemiBold'}}>{this.props.block_title}</Text>   
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:20,marginTop:5}}>{this.props.block_value}</Text>
    </View>      
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

