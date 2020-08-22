import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import Svg ,{SvgXml}  from 'react-native-svg';
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';

type Props = {};
var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
 ];

export default class KundliForm extends Component<Props> {

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
            date: new Date(),
            dates:'',
            time:'',
            value:0,
            pob:'',
            index:0,
            kundliList:[],    
            allKundliList:[],
            routes: [
                { key: 'first', title: 'New Kundli' },
                { key: 'second', title: 'Your Saved Kundli' },
            ]                    
        }
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
        // var getSavedKundli = GLOBAL.savedKundliDetails
        // if(GLOBAL.isSavedKundli == '1'){
        //   this.setState({
        //     name: getSavedKundli.name,
        //     pob: getSavedKundli.lat_long_address,
        //     time: getSavedKundli.hour + getSavedKundli.minute,
        //     date: getSavedKundli.year+'-'+getSavedKundli.month+'-'+getSavedKundli.date
        //   })
        // }else{
        // this.setState({pob : GLOBAL.glLocationName,
        //   name: GLOBAL.userDetails.name
        // })      

        // }

        this.setState({
          // pob : GLOBAL.glLocationName,
          name: GLOBAL.userDetails.name
        })      

        this.props.navigation.addListener('willFocus',this._handleStateChange);

      // this.getSavedKundli()

        console.log(this.props.navigation.state.params)
    }

    getSavedKundli= () =>{
        const url = GLOBAL.BASE_URL + "user_saved_kundali_data";
       // this.showLoading()
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
          // this.hideLoading()
       
          // console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {

           this.setState({kundliList : responseJson.recent,
            allKundliList: responseJson.all
          })
          } else {

          }
        })
        .catch(error => {
          console.error(error);
         this.hideLoading()
        });

    }


    _handleStateChange= state=>{
      console.log(JSON.stringify(GLOBAL.savedKundliDetails))

      if(GLOBAL.isSavedKundli == '1'){

      }else{
        this.setState({
          pob : GLOBAL.glLocationName,
          // name: GLOBAL.userDetails.name
        })         
      }

      this.getSavedKundli()

    }



setDate=(getDate)=>{
    this.setState({date: getDate})
      console.log(getDate)
}

setTime=(time)=>{
  this.setState({time: time})
  var times = new Date('1970-01-01T' + time + 'Z')
  console.warn(times)
  var dis = times.toLocaleTimeString();
  GLOBAL.glhour = times.getUTCHours();
  GLOBAL.glminute = times.getUTCMinutes();

}

buttonClickListener=()=>{
  console.warn(this.state.time)
  // var d =  new Date(this.state.date);  // i assume your date as 01-11-1933
  //   GLOBAL.gldate = d.getDate(); // 11
  //   GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
  //   GLOBAL.glyear =  d.getFullYear(); // 1933


  // var times = new Date('1970-01-01T' + this.state.time + 'Z')
  // console.warn(times)
  // var dis = times.toLocaleTimeString();
  // GLOBAL.glhour = times.getUTCHours();
  // GLOBAL.glminute = times.getUTCMinutes();

//  alert(GLOBAL.glhour + ': '+GLOBAL.glminute)
  GLOBAL.glzone ="5.5"

  var gender

  //
  if(this.state.value == 0){
    gender = 'Male'
  }else{
    gender = 'Female'
  }
//  alert(gender)
   GLOBAL.glgender = gender
   GLOBAL.nameForBasic = this.state.name

   var getSavekundli= GLOBAL.savedKundliDetails
   if(GLOBAL.isSavedKundli=='1'){
      GLOBAL.gldate = getSavekundli.date
      GLOBAL.glmonth = getSavekundli.month
      GLOBAL.glyear =  getSavekundli.year
      GLOBAL.glhour = getSavekundli.hour
      GLOBAL.glminute = getSavekundli.minute
      GLOBAL.glLocationName= getSavekundli.lat_long_address
   }else{

   }

   console.log(this.state.pob)
   if(this.state.pob=='' || this.state.pob==undefined || this.state.pob==null){
    alert('Please select Place of Birth')
   }else{

  var navigation = this.props.navigation.state.params

  if(navigation.astroReportType == 'kundli'){
    this.timeoutCheck = setTimeout(() => {
      this.props.navigation.navigate('KundliListNew')    
   }, 500);

  }else if(navigation.astroReportType == 'medical_astro'){
        this.props.navigation.navigate('MedicalAstrology')
  }else if(navigation.astroReportType == 'lal_kitab'){
        this.props.navigation.navigate('LalKitab')
  }else if(navigation.astroReportType == 'sade_sati'){
       this.props.navigation.navigate('SadeSati')
  }else if(navigation.astroReportType == 'gemstone_sugges'){
       this.props.navigation.navigate('GemstoneSuggestion')
  }else if(navigation.astroReportType == 'chaughadive'){
       this.props.navigation.navigate('Chaughadive')
  }else if(navigation.astroReportType == 'year_pred'){
       this.props.navigation.navigate('YearlyPrediction')
  }else if(navigation.astroReportType == 'kp_system'){
       this.props.navigation.navigate('KpSystem')
  }else if(navigation.astroReportType == 'daily_panchang'){
       this.props.navigation.navigate('DailyPanchang')
  }else if(navigation.astroReportType == 'rudraksh_sugges'){
       this.props.navigation.navigate('RudrakshSuggestion')
  }else if(navigation.astroReportType == 'life_report'){
       this.props.navigation.navigate('LifeReports')
  }else if(navigation.astroReportType == 'paid_pdf'){
       this.props.navigation.navigate('Payment', {
                params: {previous_screen: 'paid_pdf', },
      })
  }

   }




        // const url = GLOBAL.ASTRO_API_BASE_URL

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },


        //     body: JSON.stringify({
        //     "user_id":"10",
        //     "lang":"hi",
        //     "date":"10",
        //     "month":"05",
        //     "year":"2019",
        //     "hour":"19",
        //     "minute":"10",
        //     "latitude":"19.2056",
        //     "longitude":"25.2056",
        //     "timezone":"5.5",
        //     "api-condition":"basic_detail"
        //     }),
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //        alert(JSON.stringify(responseJson))
        //         if (responseJson.status == true) {

        //          this.props.navigation.navigate('KundliList')

        //         }else{

        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.hideLoading()
        //     });

 // var url = 
  // var a = "Basic " + btoa('606042'+":"+'10467f59d08e413501925cd9cb73f191');
//  var encr = GLOBAL.ASTRO_APIS_PACKAGE + btoa(GLOBAL.ASTRO_APIS_USERID + ":"+ GLOBAL.ASTRO_APIS_API_KEY)


//   var data = {
// "lang":"hi",
// "date":"10",
// "month":"05",
// "year":"2019",
// "hour":"19",
// "minute":"10",
// "latitude":"19.2056",
// "longitude":"25.2056",
// "timezone":"5.5",
// "api-condition":"basic_detail"
//   };

//   fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body:{
//     "user_id":"10",
//     "lang":"hi",
//     "date":"10",
//     "month":"05",
//     "year":"2019",
//     "hour":"19",
//     "minute":"10",
//     "latitude":"19.2056",
//     "longitude":"25.2056",
//     "timezone":"5.5",
//     "api-condition":"basic_detail"
//   },
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     alert(JSON.stringify(responseJson))
//     // GLOBAL.response = responseJson
//     // this.props.navigation.navigate('KundliForm')
//     // console.log('response object:',responseJson)
//   })
//   .catch((error) => {
//   console.error(error);
//   });    

}


    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            return           <View style={{width:wp(92),alignSelf:'center', marginTop:hp(2),backgroundColor:'transparent',flex:1}}>
         

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Name"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={true}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.name}
              onChangeText={(text) => this.setState({name:text})}
          />

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Date of Birth</Text>

          <TouchableOpacity 
          onPress={()=> this.dialogComponents.show()}>
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Date of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.dates}
          />
          </TouchableOpacity>


          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Time of Birth</Text>

          <DatePicker
            style={{width: 200,}}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            showIcon={false}
            is24Hour ={true}
            placeholder={this.state.time}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -150, borderWidth:0, color:'black'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:17
              }                            
            }}
            onDateChange={(time) => {
              this.setTime(time)
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('SelectPlace', {params:{previous_screen:'KundliForm'}})}>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Place of Birth"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.pob}
              onChangeText={(text) => this.setState({pob:text})}
          />

          </TouchableOpacity>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Gender</Text>
           <View style={{marginTop:hp(2)}}>
            <RadioForm
                radio_props={radio_props}
                initial={this.state.value}
                buttonSize={10}
                buttonColor={'#E60000'}
                formHorizontal={true}
                buttonOuterColor = {'#E60000'}
                selectedButtonColor = {'#E60000'}
                animation={false}
                labelColor={'grey'}
                buttonStyle={{marginTop:20}}
                buttonWrapStyle={{marginTop:20}}
                labelStyle = {{fontSize:16,fontFamily:'Nunito-Regular',paddingLeft:10, paddingRight:10,color:'grey'}}
                onPress={(value) => {this.setState({value:value})}}
            />
          </View>

          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1),marginBottom: hp(2) ,}}/>

            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(5)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            >
            SUBMIT
            </Button>

          </View>;
            break;

            case 'second': return <View>

           <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3), marginTop:hp(1)}}>
           RECENT
           </Text>

           {this.state.kundliList.length == 0&&(

           <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'grey',alignSelf:'center', marginTop:hp(1)}}>
           You have not generated any Kundli Yet!!
           </Text>

            )}
            <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.kundliList}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItem}
                      extraData={this.state}
            />

       <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',marginLeft:wp(3), marginTop:hp(1)}}>
       ALL
       </Text>

           {this.state.allKundliList.length == 0&&(

           <Text style = {{fontSize:14,fontFamily:'Nunito-SemiBold',color:'grey',alignSelf:'center', marginTop:hp(1)}}>
           You have not generated any Kundli Yet!!
           </Text>

            )}

                    <FlatList style= {{marginBottom:hp(2)}}
                              data={this.state.allKundliList}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                              extaData={this.state}
                    />

            </View>;
            break;

            default: return null;
  }
  
}


    _confDelete=(item)=>{
      //  alert(JSON.stringify(item))
         const url = GLOBAL.BASE_URL +  'delete_saved_kundali_data'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "id": item.id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                  this.getSavedKundli()

                }else{
                    // this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    askDelete=(item)=>{
        Alert.alert('Remove Kundli!','Are you sure you want to remove this kundli?',
            [{text:"Cancel"},
                {text:"Confirm", onPress:()=>this._confDelete(item)
                },
            ],
            {cancelable:false}
        )

    }




    selectedPred=(item, index, url)=>{
      console.log(JSON.stringify(item))
      GLOBAL.gldate = item.date
      GLOBAL.glmonth = item.month
      GLOBAL.glyear =  item.year
      GLOBAL.glhour = item.hour
      GLOBAL.glminute = item.minute
      GLOBAL.glLocationName= item.lat_long_address
      GLOBAL.nameForBasic = item.name
      
      this.props.navigation.navigate('KundliListNew')    

    }



    _renderItem = ({item, index}) => {
      var url = item.base_url + item.image
        return (
    <TouchableOpacity onPress={() => this.selectedPred(item, index, url)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'row' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(95), padding:10, marginTop:hp(1), alignSelf:'center'}}>
 
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

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Birth Location: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {item.lat_long_address}</Text>
       </Text>
    
      </View>
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{item.id}
               </Text>

        </View>

                <TouchableOpacity style={{position:'absolute', right:20, top:40}}
                onPress={()=> this.askDelete(item)}>
                <Image style={{width:25, height:35 , resizeMode:'contain'}}
                source={require('./resources/del.png')}/>
                </TouchableOpacity>

    </TouchableOpacity>
        )
    }


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

    render() {
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}
                                       size={50} color="#E9128B" />
                </View>
            )
        }
        // alert(GLOBAL.response.svg)
        // const xml = `${GLOBAL.response.svg}`;

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'KUNDLI FORM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


{/*      <SvgXml xml={xml} width="100%" height="100%" /> */}
          <KeyboardAwareScrollView>

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



          </KeyboardAwareScrollView>
     
           <DialogComponent
                dialogStyle = {{backgroundColor:'white', marginTop:hp(-13)}}
                dismissOnTouchOutside={true}
                dismissOnHardwareBackPress={true}
                width={wp(82)}
                height={hp(34)}
                ref={(dialogComponents) => { this.dialogComponents = dialogComponents; }}>

              <DialogContent>

            <View style={{flexDirection:'column', width:wp(82),alignSelf:'center',alignItems:'center',justifyContent:'center'
            ,backgroundColor:'white', height:hp(34),borderRadius:5, marginTop:hp(-2) }}>

              <DatePickers
                  date={this.state.date}
                  onDateChange={(date) => this.setDate(date)}
                  mode={'date'}
                  locale={'en'}
                />
            <View style={{width:'80%', flexDirection:'row', alignSelf:'center', marginTop:0, justifyContent:'space-between'}}>
            <DialogButton text="Cancel" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60,  }}
            onPress={()=>{this.dialogComponents.dismiss()
              if(this.state.dates!=''){

              }else{
                this.setState({dates:''})
              }

            }}/>

            <DialogButton text="Confirm" align="center" textStyle ={{color:'red'}}
            activeOpacity={0.99}
            buttonStyle={{width:wp(30), height:60, }}
            onPress={()=>{
              if(this.state.date == ''){
                this.setState({ dates: moment().format('DD-MM-YYYY') })
                this.dialogComponents.dismiss()                
              }else{
                this.setState({ dates: moment(this.state.date).format('DD-MM-YYYY'),

              })
                var d =  new Date(this.state.date);  // i assume your date as 01-11-1933
                GLOBAL.gldate = d.getDate(); // 11
                GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
                GLOBAL.glyear =  d.getFullYear(); // 1933
                console.log(GLOBAL.gldate + 'date'+ GLOBAL.glmonth +'mon'+ GLOBAL.glyear +'yr')
                this.dialogComponents.dismiss()

              }

            }}/>
            </View>
            </View>

            </DialogContent>

            </DialogComponent>

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

