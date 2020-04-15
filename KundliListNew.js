import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,BackHandler,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
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
import WebView from 'react-native-webview';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';

export default class KundliListNew extends Component<Props> {

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
          { key: 'first', title: 'Birth Details' },
          { key: 'second', title: 'Astro Details' },
          { key: 'third', title: 'Charts' },
          { key: 'fourth', title: 'Astro Details' },
      ],

            chartimage:``,
            g_index:0,
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
              ],index:0,
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
            this.getMoonChartImage=this.getMoonChartImage.bind(this);
            this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    _keyExtractor = (item, index) => item.productID;

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            <View style={{flex:1}}>
            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.basicitems}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
                      extraData={this.state}
            />
            </View>
;

            default:
                return             <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.basicitems}
                      numColumns={2}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
                      extraData={this.state}
            />
;
        }
    };
    renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: 'white', elevation: 0, borderColor: 'transparent', height:70,}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 13, fontFamily:'Nunito-Regular', textAlign:'center'}}

                {...props}
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


        this.setState({categories:this.state.categories,
          g_index: indexs})
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

