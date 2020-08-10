import React, {Component} from 'react';
import {Platform,Modal, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import CalendarStrip from "react-native-calendar-strip";
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import IndicatorCustom from './IndicatorCustom'
type Props = {};
export default class FollowUpSelectDateTime extends Component<Props> {

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
            results:[],
            modalVisible: false,
            time:[],
            disabled:true,
            atleast:0,
            single_atleast:0            

        }
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }

    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }


    selectedFirst = (indexs) => {
        var a = this.state.time
        for (var i = 0;i<this.state.time.length ;i ++){

            this.state.time[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.time[indexs] = index
        this.setState({time:this.state.time})
        this.setState({disabled:false})

    }

    _renderItems = ({item,index}) => {

        return (


    <TouchableOpacity style={{marginBottom:10, marginTop:10,}}onPress={() => this.selectedFirst(index)
    } activeOpacity={0.99}>

        {item.is_selected == '' && (
            <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',elevation:5,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,borderRadius: 4 ,backgroundColor: 'white'
            }}>

                <Text style={{color:'#707070',fontSize:16, padding:8,fontFamily:'Nunito-Bold'}}>
                    {item.time}
                </Text>
            </View>

        )}

        {item.is_selected != '' && (
            <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',elevation:5,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,borderRadius: 4 ,backgroundColor: '#E60000'
            }}>

                <Text style={{color:'white',fontSize:16, padding:8, fontFamily:'Nunito-Bold'}}>
                    {item.time}
                </Text>
            </View>

        )}
    </TouchableOpacity>

        )
    }


    componentDidMount(){

        let startDate = moment();
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)
        GLOBAL.date = moment(date).format('YYYY-MM-DD')
        this.getMembers()
      this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state=>{
         let startDate = moment();
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)
        GLOBAL.date = moment(date).format('YYYY-MM-DD')
        this.getMembers()
    }



    getMembers=()=>{
         const url = GLOBAL.BASE_URL +  'list_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }


    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
//        alert(GLOBAL.date)
        this.calculateDay(s)
        this.setState({disabled: true})

    }


  calculateDay(date){
        var decideBody;

        var actualBody = {
                "user_id":GLOBAL.user_id,
                "select_date":date,
                "id":GLOBAL.expId,
                "condition":'online',
                "event_id":'0'
        }

        if(GLOBAL.consultMode == 'inperson'){
            decideBody={
                condition : GLOBAL.consultMode,
                event_id : GLOBAL.event_id
            }

            actualBody = {...actualBody , ...decideBody}
        }else{

        }
        console.log(JSON.stringify(actualBody))
        const url = GLOBAL.BASE_URL +  'common_time_slots_comm'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify(actualBody),
        }).then((response) => response.json())
            .then((responseJson) => {
//                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.setState({time:responseJson.slot})
                }else{
                    this.setState({time: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }



    buttonClickListener=()=>{


        console.log(GLOBAL.dec_single_sel_member + '--' + GLOBAL.single_sel_member)
        GLOBAL.hbooking_time = GLOBAL.time
        GLOBAL.hbooking_date = GLOBAL.date        
        console.warn(GLOBAL.hbooking_date)
    
          var decide_for ='2'
          var decide_module = GLOBAL.consultMode
          var decide_booking_type='2' //1 = ask for question, 2 = for online counsult
          var decide_type = 'online'

              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: GLOBAL.followup_user_type,
                member_id: '0',
                booking_time: GLOBAL.hbooking_time,
                booking_date: GLOBAL.hbooking_date,
                total_minutes: '15',
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code: '0',
                coupan_code_id: '0',
                from_payment_gateway:'0',
                total_amount: '0',
                tax_amount: '0',
                wallet_amount: '0',
                referral_amount: '0',
                discount_amount: '0',
                trxn_mode:'normal',
                is_follow_up: '1',
                follow_up_code: GLOBAL.followup_code
              } 

              console.log('---perm++'+JSON.stringify(body))

                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

    }
    

    doneMembers=()=>{
//    alert('dsadsd')
    if(this.state.atleast){
    var ids=''
    for(let i =0 ; i < this.state.results.length; i++){
        if(this.state.results[i].is_selected=='Y'){
            ids = ids + this.state.results[i].id +','+ this.state.results[i].status + '|'
        }else{

        }
    }
 
    let str = GLOBAL.user_id + ','+'0'+'|'+ ids
    str = str.slice(0, -1); 
    console.log(str);
    GLOBAL.sel_members= str
    console.log('member params---'+ GLOBAL.sel_members)
    this.setModalVisible(false)

    }else{
        alert('Please select atleast one member')
    }
   
    }

    selectMember=(item,index)=>{

    if(GLOBAL.consultMode == 'inperson'){
    let { results } = this.state;
   let targetPost = results[index];

   if (targetPost.is_selected == ""){
     targetPost.is_selected = "Y";
   }else{
     targetPost.is_selected = "";
   }

    results[index] = targetPost;
    // console.log(JSON.stringify(item))
    // console.log(item.id)

   this.setState({ results: results,
    atleast: 1})
//   GLOBAL.sel_members= GLOBAL.user_id + '0'+'|'+

    }else{

    var a = this.state.results;
  for (var i = 0; i < this.state.results.length; i++) {
    this.state.results[i].is_selected = "";
  }
  var index = a[index];
  if (index.is_selected == "") {
    index.is_selected = "Y";
//    console.log(JSON.stringify(item))
    console.log(item.id)
  //  this.setState({ member_id: item.id });
    GLOBAL.dec_single_sel_member = 'member'
    GLOBAL.single_sel_member = item.id
  } else {
    index.is_selected = "";
  }
  this.state.results[index] = index;
  this.setState({ results: this.state.results,
                  single_atleast: 1
    });
  this.timeoutCheck = setTimeout(() => {
  this.setModalVisible(false)
   }, 400);
    }
    // 2,0|8,1|9,1 => pattern for member ids
    // GLOBAL.user_id, 0 | member_id, 1 | member_id, 1


    }


    _renderMembers = ({item,index}) => {



        return (
            <TouchableOpacity style={{marginLeft : 5,width:'93%', backgroundColor: 'white',marginRight:5,
                marginTop: 10,marginBottom:5,borderBottomWidth:1,borderBottomColor:'#E60000',borderRadius:0,}}
            onPress={() => this.selectMember(item, index)} activeOpacity={0.99}>
                <View style={{width:'100%', backgroundColor: 'white',flexDirection:'row', alignItems:'center'}}>

                <Image style={{width:50, height:50,  marginLeft:10, borderRadius:25, borderColor:'#E60000', borderWidth:2}}
                source={require('./resources/member_im.png')}/>

                <View style={{flexDirection:'column', width:'80%', margin:10}}>
                 <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Nunito-SemiBold',}}>
                        {item.member_name}
                    </Text>
                    <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'Nunito-Regular',}}>
                        {item.relation}
                    </Text>

                     <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'Nunito-Regular',}}>
                        {item.member_gender}
                    </Text>
                    <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'Nunito-Regular',}}>
                        {item.member_dob}, {item.member_tob}
                    </Text>
                  

                   <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'Nunito-Regular',}}>
                        {item.place_of_birth}
                    </Text>
                </View>
                </View>

                {item.is_selected == '' && (
                <Image style={{width:25, height:35 , resizeMode:'contain',position:'absolute', right:20, top:17}}
                source={require('./resources/ic_untick.png')}/>

                )}
                {item.is_selected!='' && (
                <Image style={{width:25, height:35 , resizeMode:'contain',position:'absolute', right:20, top:17}}
                source={require('./resources/ic_tick.png')}/>

                )}

            </TouchableOpacity>
        )
    }



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
                       headerName={'SELECT DATE & TIME (FOLLOWUP)'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <View style={{width:'100%',flex:1, height:hp(30) ,backgroundColor:'white',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{marginLeft:wp(4),marginRight:wp(4), flexDirection:'row', backgroundColor:'white',marginTop:hp(2),}}>
        <Image style={{width:22, height:22, resizeMode:'contain', alignSelf:'center'}}
        source={require('./resources/ic_select_date.png')}/>
        <Text style={{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3) }}>Select Date</Text>
        </View>

        <View style={{width:'100%', height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1.5),}}/>


        <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#E60000'}}
            style={{height:120, paddingTop: 15}}
            calendarHeaderStyle={{color: 'black',}}
            calendarColor={'white'}
            highlightDateNameStyle={{color:'white'}}
            highlightDateNumberStyle  ={{color:'white'}}
            iconContainer={{flex: 0.1}}
            onDateSelected={(date)=> this.dates(date)}
        />

        <View style={{width:'100%', height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1.5),}}/>

        <View style={{marginLeft:wp(4),marginRight:wp(4), flexDirection:'row', backgroundColor:'white',marginTop:hp(2),}}>
        <Image style={{width:22, height:22, resizeMode:'contain', alignSelf:'center'}}
        source={require('./resources/ic_select_time.png')}/>
        <Text style={{fontSize:16,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3) }}>Select Time</Text>
        </View>


          {this.state.time.length==0 && (
            <Text style={{fontSize : 13,marginTop:15,color :'black',fontFamily:'Nunito-Bold',alignSelf:'center', textAlign:'center'}}>
            No Time slots!
            </Text>

          )}

            {this.state.time.length !=0 &&(

                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.time}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

            )}





        <Button
        containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,position:'absolute',
         backgroundColor: '#e60000', elevation: 5, alignSelf:'center',bottom:hp(3), marginTop:hp(8), marginBottom:hp(3)}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
        onPress={this.buttonClickListener}
        styleDisabled={{ color: 'black' }}
        disabledContainerStyle={{backgroundColor:'grey'}}
        disabled={this.state.disabled}
        >
        CONTINUE
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

