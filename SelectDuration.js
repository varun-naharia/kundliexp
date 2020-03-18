import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
type Props = {};
class SelectDuration extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            slots:[],
            disabled:true,
            sel_item:{}
        }
    }



    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);

        this.getData()
    }

    async getData(){

        alert(GLOBAL.hbooking_time + ' ' + GLOBAL.hbooking_date + ' ' + GLOBAL.consultMode)
        console.log(GLOBAL.hbooking_time + ' ' + GLOBAL.hbooking_date + ' ' + GLOBAL.consultMode)

     const url = GLOBAL.BASE_URL + "time_slots_with_price";
     await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          for: GLOBAL.consultMode,
          select_date: GLOBAL.hbooking_date,
          id: GLOBAL.expId,
          user_id: GLOBAL.user_id,
          time_slots: GLOBAL.hbooking_time

        })
      })
        .then(response => response.json())
        .then(responseJson => {
                 this.hideLoading()
       

        //Color in logs

    
        console.log("\x1b[36m",JSON.stringify(responseJson))
          if (responseJson.status == true) {

            this.setState({slots : responseJson.detail})


          } else {
            this.setState({slots:[]})
          }
        })
        .catch(error => {
          this.hideLoading()
          console.error(error);
        });

    }

    buttonClickListener=()=>{
      var mode =  GLOBAL.consultMode
      alert(GLOBAL.hbooking_time + ' ' + GLOBAL.hbooking_date + ' ' + GLOBAL.consultMode)

      var finalData

      finalData = this.state.sel_item
      // finalData = {...finalData , ...}

      var moreParams={
        booking_time: GLOBAL.hbooking_time,
        booking_date: GLOBAL.hbooking_date,


      }

      finalData = {...finalData, ...moreParams}

      console.log(JSON.stringify(finalData))      
       this.props.navigation.navigate('Payment', {
          params: {previous_screen: GLOBAL.consultMode , finalData},
        });
    }

selectedFirst = (item, indexs) => {
  //    alert(indexs)
  var a = this.state.slots;
  for (var i = 0; i < this.state.slots.length; i++) {
    this.state.slots[i].is_selected = "";
  }
  var index = a[indexs];
  if (index.is_selected == "") {
    index.is_selected = "1";
    this.setState({ slotid: item.minutes });
  } else {
    index.is_selected = "0";
  }
  this.state.slots[indexs] = index;
  this.setState({ slots: this.state.slots,
  disabled: false,
  sel_item : item 
  });
  //this.setState({disabled : false})
  GLOBAL.selectDuration = item.minutes

//  alert(GLOBAL.selectDuration)
  this.state.sel_item = item
  //    this.props.navigation.navigate('PanditDetails')
};

_renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity onPress={() => this.selectedFirst(item, index)}>
        <View style={{marginLeft:wp(4),justifyContent:'space-between',marginRight:wp(4), flexDirection:'row', backgroundColor:'white',marginTop:hp(2),}}>
        <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black', }}>{item.minutes} Min Duration</Text>
        <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'#bfbfbf', }}>₹ {item.price}</Text>
        </View>
        {item.is_selected == '' && (
        <Image style={{width:22, height:22, resizeMode:'contain', alignSelf:'center'}}
        source={require('./resources/ic_untick.png')}/>
        )}
        {item.is_selected != '' && (
        <Image style={{width:22, height:22, resizeMode:'contain', alignSelf:'center'}}
        source={require('./resources/ic_tick.png')}/>
        )}
        </View>
    </TouchableOpacity>
  );
};

    render() {
        if(this.state.loading){
            return(
               
               <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'SELECT DURATION'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <View style={{width:wp(91),backgroundColor:'white',flexDirection:'column',
        marginTop:hp(3), borderRadius:5, alignSelf:'center', flex:1, marginBottom:hp(3)}}>
{this.state.slots.length == 0 && (

            <Text style={{fontSize : 13,marginTop:15,color :'black',fontFamily:'Nunito-Regular',alignSelf:'center', textAlign:'center'}}>
            No Duration slots found for the selected date and time.{`\n`} Try again with another date and time.
            </Text>
  )}

  {this.state.slots.length!=0 && (

        <FlatList
          style={{ flexGrow: 0, marginTop: 5 }}
          data={this.state.slots}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />

    )}

            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
            position:'absolute', bottom:hp(3),
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(3)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            styleDisabled={{ color: 'black' }}
            disabledContainerStyle={{backgroundColor:'grey'}}
            disabled={this.state.disabled}

            >
            SUBMIT
            </Button>

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
});

export default SelectDuration;