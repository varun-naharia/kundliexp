import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom.js';

class SavedKundli extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false,
            kundliList:[],
            limit:0,
            allKundliList:[],
            is_sel:0
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

      this.getSavedKundli()
    }

    getSavedKundli= () =>{
        const url = GLOBAL.BASE_URL + "user_saved_kundali_data";
       this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,

        })
      })
        .then(response => response.json())
        .then(responseJson => {
                this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {

           this.setState({kundliList : responseJson.recent,
            allKundliList: responseJson.all})
          } else {

          }
        })
        .catch(error => {
          console.error(error);
         this.hideLoading()
        });

    }

    selectKundli=(item, index, url)=>{
        this.setState({is_sel: 1,
          name: item.name,
          url: url,
          hour: item.hour,
          minute: item.minute,
          date: item.date,
          month: item.month,
          year: item.year,
          id: item.id
        })

    }


    selectedPred=(item, index, url)=>{
//        alert(JSON.stringify(item.item))
        //this.props.navigation.navigate('LifePredHistoryDetails', {params:{get : item}})

Alert.alert(
        'Choose Your Kundli',
        'Is this your birth chart?',
        [

          {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => this.selectKundli(item, index, url)},
        ],
        { cancelable: false }
      )

    }

    _renderItempreds = ({item, index}) => {
      var url = item.base_url + item.image
        return (
    <TouchableOpacity onPress={() => this.selectedPred(item, index, url)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(91), padding:10, marginTop:hp(2), alignSelf:'center'}}>
 
      <Image style={{width:60, height:60, borderRadius:30}}
      source={{uri : url}}/>
      <View style={{flexDirection:'column', marginLeft:wp(2)}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {item.name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {item.hour}:{item.minute}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {item.date}-{item.month}-{item.year}</Text>
       </Text>
    
      </View>
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{item.id}
               </Text>

        </View>

    </TouchableOpacity>
        )
    }


    _renderItempredss = ({item, index}) => {
      var url = item.base_url + item.image
        return (
    <TouchableOpacity onPress={() => this.selectedPred(item, index, url)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(91), padding:10, marginTop:hp(2), alignSelf:'center'}}>
 
      <Image style={{width:60, height:60, borderRadius:30}}
      source={{uri : url}}/>
      <View style={{flexDirection:'column', marginLeft:wp(2)}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {item.name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {item.hour}:{item.minute}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {item.date}-{item.month}-{item.year}</Text>
       </Text>
    
      </View>
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{item.id}
               </Text>

        </View>

    </TouchableOpacity>
        )
    }

    handleLoadMore=()=>{
        // this.setState({limit: this.state.limit + 6})
        // this.loadBookings()
//        alert('ads')
     this.setState({
          limit: this.state.limit + 6
        }, () => {
          this.getSavedKundli();
        });

    }


    render() {
        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flexDirection:'column',backgroundColor:'#f2f5f7'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'CHOOSE SAVED KUNDLI'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <ScrollView>
        <View style={{width:wp(100),backgroundColor:'transparent',flexDirection:'column',
        marginTop:hp(1), alignSelf:'center'}}>

        {this.state.is_sel==1 &&(
        <View style={{flexDirection:'column'}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3), marginTop:hp(1)}}>
       YOUR CURRENT BIRTH CHART DETAILS
       </Text>
     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      borderRadius :5,width : wp(91), padding:10, marginTop:hp(2), alignSelf:'center',marginBottom:hp(2)}}>
 
      <Image style={{width:60, height:60, borderRadius:30}}
      source={{uri : this.state.url}}/>
      <View style={{flexDirection:'column', marginLeft:wp(2), backgroundColor:"white",}}>
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {this.state.name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {this.state.hour}:{this.state.minute}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {this.state.date}-{this.state.month}-{this.state.year}</Text>
       </Text>
    
      </View>

              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{this.state.id}
               </Text>

        </View>


        </View>
          )}


       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3), marginTop:hp(1)}}>
       RECENT
       </Text>

                    <FlatList style= {{marginBottom:hp(2)}}
                              data={this.state.kundliList}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItempreds}
                              extaData={this.state}
                    />

       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3), marginTop:hp(1)}}>
       ALL
       </Text>


                    <FlatList style= {{marginBottom:hp(10)}}
                              data={this.state.allKundliList}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItempredss}
                              extaData={this.state}
                    />

        </View>
        </ScrollView>
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

export default SavedKundli;