import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,ScrollView,FlatList,Modal,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
import IndicatorCustom from './IndicatorCustom.js';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ReadMore from 'react-native-read-more-text';

import Spinner from 'react-native-loading-spinner-overlay';

type Props = {};
export default class BookingScreenOld extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.state = {
            name: '',
            email: '',
            message: '',
            status :'' ,
            loading : '',
            userid : '',
            username:'',
            wallet:'',
            referral:'',
            bio:'',
            expertDetails:'',
            texs:'',
            availSlots:[],
            spinner:false,
            event_id:'',
            modalVisible: false,
            results:[{
              id:'1',
              mode_name:'Video call',
              is_chosen: '0',
              dec_consultMode: 'video'
            },{
              id:'2',
              mode_name:'Call',
              is_chosen: '0',
              dec_consultMode: 'audio'              
            },{
              id:'3',
              mode_name:'Chat',
              is_chosen: '0',
              dec_consultMode: 'chat'             
            }]
        }

    this._renderTruncatedFooter = this._renderTruncatedFooter.bind(this);
    this._renderRevealedFooter = this._renderRevealedFooter.bind(this);
//    this._handleTextReady = this._handleTextReady.bind(this);

    }



_renderTruncatedFooter = (handlePress) => {
//  console.log('hi')
    return (
      <Text style={{color: '#E60000', fontFamily:'Nunito-Bold',marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  }
 
  _renderRevealedFooter = (handlePress) => {

    return (
      <Text style={{color: '#E60000', fontFamily:'Nunito-Bold',marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

_handleTextReady = () => {


  }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    selectEvent=(item, index)=>{
      

    var a = this.state.availSlots;
    for (var i = 0; i < this.state.availSlots.length; i++) {
      this.state.availSlots[i].is_selected = "";
    }
    var index = a[index];
    if (index.is_selected == "") {
      index.is_selected = "1";
      this.setState({ event_id: item.id });
      GLOBAL.event_id = item.id
      GLOBAL.event_details = item
    } else {
      index.is_selected = "";
    }
    this.state.availSlots[index] = index;
    this.setState({ availSlots: this.state.availSlots });
    }

    _availSlotsRender=({item,index})=>{
    var s_date = moment(item.start_date).format('DD/MM/YYYY')
    var e_date = moment(item.end_date).format('DD/MM/YYYY')

      return(
      <TouchableOpacity activeOpacity={0.99}
      onPress={()=> this.selectEvent(item, index)}>
               <View style={{width:wp(93), backgroundColor:'white', elevation:3, borderRadius:5,flexDirection:'column',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1), marginBottom:hp(1) }}>

                      <View style={{width:wp(93), height:hp(5),flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', }}>
                      <Text style={{fontSize:15, color:'black', marginLeft:wp(3), fontFamily:'Nunito-Bold'}}>{item.title}</Text>
                      <Text style={{fontSize:15, color:'black', fontFamily:'Nunito-Bold',textAlign:'left', marginRight:wp(3)}}></Text>
                 {item.is_selected == '' && (
                  <Image style={{width:25, height:35 , resizeMode:'contain', marginRight:wp(2)}}
                source={require('./resources/ic_untick.png')}/>

                 )}
                 {item.is_selected != '' && (
                  <Image style={{width:25, height:35 , resizeMode:'contain', marginRight:wp(2)}}
                source={require('./resources/ic_tick.png')}/>

                 )}

                      </View>

                      <View style={{width:wp(93), height:hp(5),borderBottomColor:'rgba(0,0,0,0.1)',borderBottomWidth:1,flexDirection:'row',alignSelf:'center', alignItems:'center', }}>
                      <Image style={{ marginLeft:wp(3), width:18, height:18, resizeMode:'contain'}}
                      source={require('./resources/loc.png')}/>
                      <Text style={{fontSize:15, color:'#ACAAAA',textAlign:'left', marginLeft:wp(1),marginRight:wp(3), fontFamily:'Nunito-Regular' }}>{item.lat_long_address}</Text>
                      </View>


                      <View style={{width:wp(93), height:hp(5),borderBottomColor:'rgba(0,0,0,0.1)',borderBottomWidth:1,flexDirection:'row',alignSelf:'center', alignItems:'center', }}>
                      <Image style={{ marginLeft:wp(3), width:18, height:18, resizeMode:'contain'}}
                      source={require('./resources/rup.png')}/>
                      <Text style={{fontSize:15, color:'#ACAAAA',textAlign:'left', marginLeft:wp(1),marginRight:wp(3), fontFamily:'Nunito-Regular' }}>{item.price_per_person}/- per person consultation</Text>
                      </View>

                    

                     
                      <View style={{width:wp(93), height:hp(5),flexDirection:'row',alignSelf:'center', alignItems:'center', }}>
                      <Image style={{ marginLeft:wp(3), width:18, height:18, resizeMode:'contain'}}
                      source={require('./resources/calen.png')}/>
                      <Text style={{fontSize:15, color:'#ACAAAA',textAlign:'left', marginLeft:wp(1),marginRight:wp(3), fontFamily:'Nunito-Regular' }}>{s_date} to {e_date}</Text>
                      </View>

                      </View>

         {/*             <Text style={{fontSize:15, color:'black',fontFamily:'Nunito-Bold', marginTop:hp(1)}}>Amount</Text>
                      <View style={{width:wp(93), backgroundColor:'white', height:hp(5),elevation:3, borderRadius:5,flexDirection:'row',alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:hp(1) }}>
                      <Text style={{fontSize:13, color:'#ACAAAA', marginLeft:wp(3), fontFamily:'Nunito-Regular'}}>Price</Text>
                      <Text style={{fontSize:13, color:'#ACAAAA', marginRight:wp(3),textAlign:'left', fontFamily:'Nunito-Regular'}}>₹ 1500/-</Text>
                      </View>
        */}
    

                      </TouchableOpacity>
      )
    }


    componentDidMount(){

//        this.props.navigation.addListener('willFocus',this._handleStateChange);
      this.showLoading()

      setTimeout(() => {
         // write your functions    
      this.getData()

      },500);


      if(GLOBAL.consultType == '5'){
        this.getEventsList()
      }

    }


    _handleStateChange=state=>{
    }


    async getEventsList(){
     const url = GLOBAL.BASE_URL + "in_person_events_list";
     await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: 'dataevent',

        })
      })
        .then(response => response.json())
        .then(responseJson => {

          console.log(JSON.stringify(responseJson))
    
          if (responseJson.status == true) {

            this.setState({availSlots: responseJson.response})

          } else {

          }
        })
        .catch(error => {
          this.hideLoading()
          console.error(error);
        });

    }


   async getData(){
     const url = GLOBAL.BASE_URL + "expert_profile";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          expert: 'km sinha',

        })
      })
        .then(response => response.json())
        .then(responseJson => {
                 this.hideLoading()
       

        //Color in logs

          console.log('----> expert_api'+responseJson.status)

          if (responseJson.status == true) {

//            this.setState({bio : responseJson.detail.bio})
            GLOBAL.expId = responseJson.detail.id
            GLOBAL.expbio = responseJson.detail.bio
            this.setState({expertDetails : responseJson.detail})

          } else {

          }
        })
        .catch(error => {
          this.hideLoading()
          console.error(error);
        });

    }



componentWillUnmount(){
//  console.log('hi')
 GLOBAL.headerTitle='';
 GLOBAL.consultType='';
 GLOBAL.consultMode='';
}

buttonClickListener=()=>{

  if(GLOBAL.consultMode=='ask'){
    //alert('ask')
    this.setModalVisible(true)
  }

  else if(GLOBAL.consultMode=='inperson'){
    if(this.state.event_id==''){
      alert('Please select event to continue...')
    }else{
    this.props.navigation.navigate('SelectDateTime')
    }
  }

  else{
  this.props.navigation.navigate('SelectDateTime')

  }
}

   setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }

    selectMode=(item, indexs)=>{
      //alert(JSON.stringify(item))
//      this.setModalVisible(false)
  var a = this.state.results;
  for (var i = 0; i < this.state.results.length; i++) {
    this.state.results[i].is_chosen = "0";
  }
  var index = a[indexs];
  if (index.is_chosen == "0") {
    index.is_chosen = "1";
    this.setState({ mode_id: item.id });
  } else {
    index.is_chosen = "0";
  }
  this.state.results[indexs] = index;
  this.setState({ results: this.state.results });

   this.timeoutCheck = setTimeout(() => {
    this.setModalVisible(false)
    //alert(item.dec_consultMode)
    GLOBAL.consultMode = item.dec_consultMode
    this.props.navigation.navigate('SelectDateTime')
   }, 500);

  }

    modesRender=({item,index})=>{
      return(
        <TouchableOpacity onPress={()=> this.selectMode(item, index)}>
         <View style={{flexDirection:'row', width:'71%', margin:10, 
         justifyContent:'space-between'}}>
         <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Nunito-SemiBold',alignSelf:'center'}}>
                        {item.mode_name}
        </Text>
        
        {item.is_chosen == '0' && (
                <Image style={{width:25, height:35 , resizeMode:'contain',}}
                source={require('./resources/ic_untick.png')}/>
        )}
        {item.is_chosen!='0' && (
                <Image style={{width:25, height:35 , resizeMode:'contain',}}
                source={require('./resources/ic_tick.png')}/>
        )}


        </View>
        </TouchableOpacity>
        )
    }

    render() {

      var yeah = this.state.expertDetails
  //alert(yeah.location)

   // console.log(GLOBAL.expbio)

  //consultType = 1 for chat, 2 for ask, 3 for video, 4 call

      var price_type = "0";

      if(GLOBAL.consultType == '1' ){
        price_type = yeah.min_price_for_chat
        GLOBAL.m_price_type = price_type
      }else if(GLOBAL.consultType == '2' ){
        price_type = yeah.min_price_for_ask_a_q        
        GLOBAL.m_price_type = price_type
      }else if(GLOBAL.consultType == '3'){
        price_type = yeah.min_price_for_video  
        GLOBAL.m_price_type = price_type
      }else if(GLOBAL.consultType == '4'){
        price_type = yeah.min_price_for_call          
        GLOBAL.m_price_type = price_type        
      }


        if(this.state.loading){
            return(
            <IndicatorCustom/>
            )
        }
        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
               <Header navigation={this.props.navigation}
               showHeaderImage={false}
               headerColor ={'#E60000'}
               backImagePath={require('./resources/back.png')}
               headerName={GLOBAL.headerTitle}
               headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
{/*            <Spinner
                      visible={this.state.spinner}
                      textContent={'Loading...'}
                      textStyle={{color:'#E60000'}}
                    />
*/}
               <ScrollView>
               <View style={{width:wp('100%'), height:hp('14%'), backgroundColor:'#E60000'}}>

               </View>

               <View style={{width:wp('85%'), flexDirection:'column', alignItems:'center',backgroundColor:'white', marginTop:hp('-13%'),alignSelf:'center', elevation:5, borderRadius:5,}}>

               <Image source={{uri: yeah.path + yeah.image}}
               style  = {{width:wp(27), height:hp(15),borderRadius: hp(15/2),marginTop:hp(2),}}/>

              <Text style = {{fontSize:18,fontFamily:'Nunito-Bold',color:'black', marginTop:hp(0.5)}}>
              {yeah.name}
              </Text>

{/*              <Text style = {{fontSize:12.5,fontFamily:'Nunito-Regular',color:'#ACAAAA',marginTop:hp(1), width:wp(80), textAlign:'center', marginBottom:hp(1.5)}}
              numberOfLines={5}>
              {yeah.bio}
              </Text> */}
          <View style={{width:wp(80), marginBottom:hp(1.5),marginTop:hp(1),}}>
          <ReadMore
              numberOfLines={5}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              >
              <Text style={{fontSize:12.5,fontFamily:'Nunito-Regular',color:'#ACAAAA',marginTop:hp(1), width:wp(80), textAlign:'center', marginBottom:hp(1.5)}}>
              {GLOBAL.expbio}
            </Text>
            </ReadMore>
            </View>

               </View>

               {GLOBAL.headerTitle != 'BOOKING' &&(

               <View style={{backgroundColor:'#E60000', width:wp(85), height:hp(7), alignSelf:'center', marginTop:hp(2), borderRadius:7,justifyContent:'center'}}>
                <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'white', alignSelf:'center'}}>
                Service start from as low as ₹ {price_type}
                </Text>
               </View>
               )}

               {GLOBAL.headerTitle == 'BOOKING' &&(
               <View style={{width:wp(95), flexDirection:'column', alignSelf:'center', marginTop:hp(1), marginBottom:hp(0.5)}}>
                      <Text style={{fontSize:15, color:'black',fontFamily:'Nunito-Bold'}}>Availability</Text>

                      <FlatList
                      data={this.state.availSlots}
                      renderItem={this._availSlotsRender}
                      extraData={this.state}/>

               </View>
               )}


              <View style={{flexDirection:'row', marginVertical:hp(2),width:wp(93),alignSelf:'center',marginTop:hp(2)}}>
                  <Image style={{width:25, height:25, resizeMode:'contain', }} source={require('./resources/review.png')}/>
                  <View style={{flexDirection:'column', marginLeft:hp(2)}}>
                      <Text style={{fontSize:15, color:'black',fontFamily:'Nunito-Bold'}}>Reviews</Text>
                      <Text style={{fontSize:13, color:'#ACAAAA', width:wp(80),marginTop:hp(1),lineHeight:20}}
                      numberOfLines={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                  </View>
              </View>

              <View style={{width:wp(95), height:hp(0.1), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1.5)}}/>

{/*              <View style={{flexDirection:'row', marginVertical:hp(2),width:wp(93),alignSelf:'center',marginTop:hp(2)}}>
                  <Image style={{width:25, height:25, resizeMode:'contain', }} source={require('./resources/loc.png')}/>
                  <View style={{flexDirection:'column', marginLeft:hp(2)}}>
                      <Text style={{fontSize:15, color:'black',fontFamily:'Nunito-Bold'}}>Location</Text>

                      <Text style={{fontSize:13, color:'#ACAAAA', width:wp(80),marginTop:hp(1),lineHeight:20}}>{yeah.location}</Text>

                  </View>
              </View>
              <View style={{width:wp(95), height:hp(0.1), backgroundColor:'rgba(0,0,0,0.1)', alignSelf:'center', marginTop:hp(1.5)}}/>
*/}

              <View style={{flexDirection:'row', marginVertical:hp(2),width:wp(93),alignSelf:'center',marginTop:hp(2)}}>
                  <Image style={{width:25, height:25, resizeMode:'contain', }} source={require('./resources/lang.png')}/>
                  <View style={{flexDirection:'column', marginLeft:hp(2)}}>
                      <Text style={{fontSize:15, color:'black',fontFamily:'Nunito-Bold'}}>Language Spoken</Text>
                      <Text style={{fontSize:13, color:'#ACAAAA', width:wp(80),marginTop:hp(1),lineHeight:20}}>{yeah.languages}</Text>
                  </View>
              </View>




              </ScrollView>

            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(1), marginBottom: hp(2)
              }}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold',}}
            onPress={this.buttonClickListener}
            >
            BOOK NOW
            </Button>


        <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.modalVisible}
           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
             this.setModalVisible(!this.state.modalVisible)
           }}>
                         <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            alignItems: 'center', borderRadius:8}}
                            activeOpacity={1}
                            onPressOut={() => {this.setModalVisible(false)}}
                            >
                            <View style={{width: wp(80),backgroundColor: 'white',height: hp(30), borderRadius:8}}>
                              <View style={{width: '100%',  backgroundColor:'white', borderRadius:8}}>

                              <View style={{flexDirection:'row', width:'100%', backgroundColor:'#E60000', height:60,
                               borderTopLeftRadius:8, borderTopRightRadius:8, borderTopLeftWidth:1,justifyContent:'space-between',alignItems:'center',
                               borderTopRightWidth:1, borderTopRightColor:'transparent', borderTopLeftColor:'transparent'}}>
                              <Text style={{fontSize: 17, color:'white', fontFamily: 'Nunito-Regular',margin:10 }}>Select Mode</Text>
                              <TouchableOpacity onPress={()=> this.setModalVisible(false)}>
                              <Image style={{width:20, height:20, resizeMode:'contain', marginRight:10}} source={require('./resources/white_cross.png')}/>
                              </TouchableOpacity>

                                </View>
          



                      <FlatList style= {{flexGrow:0,marginBottom:10, alignSelf:'center'}}
                                data={this.state.results}
                                numColumns={1}
                                extraData={this.state}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={this.modesRender}/>

                                </View>
                            </View>
                        </TouchableOpacity>
         </Modal>

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

