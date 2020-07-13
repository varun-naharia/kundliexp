import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView, Text, View,FlatList,ImageBackground,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
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
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton, SlideAnimation } from 'react-native-dialog-component';

type Props = {};
var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
 ];

export default class BasicForm extends Component<Props> {

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
            dob:'Select Date of Birth',
            tob: 'Select Time of Birth',
            date: new Date(),
            dates:'',
            email:'',
            mobile:'',
            time:'',
            value:0,
            medical_price:'',
            financial_price:'',
            sel_lang:'English',
            sel_lang_code:'en',
            sel_chart:'North',
            sel_chart_key:'NORTH_INDIAN',
            langs:[{
                id:'1',
                l_name:'Hindi',
                l_code:'hi',
            },
            {
                id:'2',
                l_name:'English',
                l_code:'en',
            },
            ],
            chartStyles:[
            {
                id:'1',
                chart_name:'North',
                chart_key:'NORTH_INDIAN'
            },
            {
                id:'2',
                chart_name:'South',
                chart_key:'SOUTH_INDIAN'
            },
            {
                id:'3',
                chart_name:'East',
                chart_key:'EAST_INDIAN'
            },
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
      // alert(JSON.stringify(this.props.navigation.state.params.astroReportType))

        var getSavedKundli = GLOBAL.savedKundliDetails
        if(GLOBAL.isSavedKundli == '1'){
          this.setState({
            name: getSavedKundli.name,
            pob: getSavedKundli.lat_long_address,
            time: getSavedKundli.hour + getSavedKundli.minute,
            date: getSavedKundli.year+'-'+getSavedKundli.month+'-'+getSavedKundli.date
          })
        }else{
        this.setState({pob : GLOBAL.glLocationName,
          name: GLOBAL.userDetails.name
        })      

        }

        this.props.navigation.addListener('willFocus',this._handleStateChange);

        console.log(this.props.navigation.state.params)
    }


    _handleStateChange= state=>{
      this.getPrices()
      console.log(JSON.stringify(GLOBAL.savedKundliDetails))

      if(GLOBAL.isSavedKundli == '1'){

      }else{
        this.setState({pob : GLOBAL.glLocationName,
          name: GLOBAL.userDetails.name
        })         
      }

    }


    getPrices=()=>{

      const url = GLOBAL.BASE_URL + "prices_medical_finacial";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode:'prices'

        })
      })
        .then(response => response.json())
        .then(responseJson => {
           // this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {
            this.setState({medical_price: responseJson.medical_price,
              financial_price: responseJson.financial_price
            })
          } else {
            // alert('No PDF for now!')
          }
        })
        .catch(error => {
          console.error(error);
          // this.hideLoading()
        });

    }

setDate=(date)=>{
    this.setState({date: date})
    var d =  new Date(date);  // i assume your date as 01-11-1933
    GLOBAL.gldate = d.getDate(); // 11
    GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    GLOBAL.glyear =  d.getFullYear(); // 1933

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

   if(this.state.name==''){
    alert('Please enter name')
   }else if(this.state.date==''){
    alert('Please select Date of Birth')
   }else if(this.state.time==''){
    alert('Please select Time of Birth')
   }else if(this.state.email==''){
    alert('Please enter email')
   }else if(this.state.mobile==''){
    alert('Please enter mobile number')
   }else{
  var navigation = this.props.navigation.state.params

  if(navigation.astroReportType == 'medical_astro'){
      var finalData={
        name: this.state.name,
        dob: this.state.dates,
        tob: this.state.time,
        pob: this.state.pob,
        lat: GLOBAL.gllat,
        long: GLOBAL.gllong,
        lat_long_address: this.state.pob,
        mobile: this.state.mobile,
        email: this.state.email,
        prev_amount: this.state.medical_price
      }

     console.log(JSON.stringify(finalData))

       this.props.navigation.navigate('Payment', {
                params: {previous_screen: 'medical_astro', finalData },
      })
  }else if(navigation.astroReportType == 'financial_astro'){
      var finalData={
        name: this.state.name,
        dob: this.state.dates,
        tob: this.state.time,
        pob: this.state.pob,
        lat: GLOBAL.gllat,
        long: GLOBAL.gllong,
        lat_long_address: this.state.pob,
        mobile: this.state.mobile,
        email: this.state.email,
        prev_amount: this.state.financial_price
      }
  
       console.log(JSON.stringify(finalData))

       this.props.navigation.navigate('Payment', {
                params: {previous_screen: 'financial_astro', finalData },
      })    
  }else if(navigation.astroReportType == 'paid_pdf'){

      var gDate, gMonth, gYear;
      var gHour, gMin;

      // alert(this.state.dates)
      var d =  this.state.dates;  // i assume your date as 01-11-1933
      gDate = moment(d, 'DD-MM-YYYY').date(); // 11
      gMonth =  moment(d, 'DD-MM-YYYY').month()+1; // 0  month is like array so you have to do +1 for correct month
      gYear =  moment(d, 'DD-MM-YYYY').year(); // 1933

      var times = new Date('1970-01-01T' + this.state.time + 'Z')
      var dis = times.toLocaleTimeString();
      gHour = times.getUTCHours();
      gMin = times.getUTCMinutes();

      var finalData={
        name: this.state.name,
        date: gDate,
        month: gMonth,
        year: gYear,
        hour: gHour,
        minute: gMin,
        place: this.state.pob,
        lat: GLOBAL.gllat,
        long: GLOBAL.gllong,
        language: this.state.sel_lang_code,
        chart_style: this.state.sel_chart_key,
        lat_long_address: this.state.pob,
        mobile: this.state.mobile,
        email: this.state.email,
      }

       console.log(JSON.stringify(finalData))

       this.props.navigation.navigate('Payment', {
                params: {previous_screen: 'paid_pdf', finalData },
      })    
  }

   }



}


    setDates=(getDate)=>{
        this.setState({date: getDate})
          console.log(getDate)
    }

    selectLang=(item, index)=>{

        this.setState({sel_lang : item.l_name,
          sel_lang_code: item.l_code
        })
        this.dialogComponentss.dismiss()
    }

  _renderItems=({item, index})=>{
    return(
      <TouchableOpacity 
      style={{width:'100%',margin:5,marginLeft:0, marginTop:hp(1), marginBottom:5}}
      onPress={()=> this.selectLang(item, index)}>
    <View style={{width: '100%',  flexDirection:'row', justifyContent:'space-between'
    ,borderBottomColor:'#bfbfbf', borderBottomRadius:0, borderBottomWidth:1, }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19,marginTop:0,}}>{item.l_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'grey', }}>
    {item.des}</Text>
    </View>       
    </View>       
    </TouchableOpacity>
      )
  }

    selectChart=(item, index)=>{

        this.setState({
          sel_chart: item.chart_name,
          sel_chart_key: item.chart_key
        })
        this.dialogComponent.dismiss()
    }

  _renderItemss=({item, index})=>{
    return(
      <TouchableOpacity 
      style={{width:'100%',margin:5,marginLeft:0, marginTop:hp(1), marginBottom:5}}
      onPress={()=> this.selectChart(item, index)}>
    <View style={{width: '100%',  flexDirection:'row', justifyContent:'space-between'
    ,borderBottomColor:'#bfbfbf', borderBottomRadius:0, borderBottomWidth:1, }}>
    <View style={{flexDirection:'column', width:'83%',  margin:8, marginLeft:15}}>
    <Text style={{fontFamily:'Nunito-ExtraBold', fontSize:19,marginTop:0,}}>{item.chart_name}</Text>
    <Text style={{fontFamily:'Nunito-Regular', fontSize:16,color:'grey', }}>
    {item.des}</Text>
    </View>       
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

        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'BASIC FORM'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

          <KeyboardAwareScrollView>

          <View style={{width:wp(92),alignSelf:'center', marginTop:hp(2),backgroundColor:'transparent',flex:1}}>
         

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
            placeholder={this.state.tob}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -150, borderWidth:0, color:'black'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:17
              },
              placeholderText:{
                marginLeft:104, color:'gray', fontFamily:'Nunito-Regular', fontSize:17
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
{/*          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Gender</Text>
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
*/}

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Email</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="abcdxx@gmail.com"
              placeholderTextColor = 'grey'
              editable={true}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.email}
              onChangeText={(text) => this.setState({email:text})}
          />

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Mobile Number</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="999XXXXXXX"
              placeholderTextColor = 'grey'
              editable={true}
              maxLength={10}
              keyboardType={'numeric'}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.mobile}
              onChangeText={(text) => this.setState({mobile:text})}
          />

          {this.props.navigation.state.params.astroReportType == 'paid_pdf' && (
          <View>

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Select Language</Text>

          <TouchableOpacity 
          onPress={()=> this.dialogComponentss.show()}>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Language"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.sel_lang}
          />
          </TouchableOpacity>

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Select Chart Style</Text>

          <TouchableOpacity 
          onPress={()=> this.dialogComponent.show()}>
          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Select Chart Style"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {this.state.sel_chart}
          />
          </TouchableOpacity>

          </View>
          )}

          {this.props.navigation.state.params.astroReportType != 'paid_pdf' && (

          <Text style = {{fontSize:16,marginBottom:5,fontFamily:'Nunito-SemiBoldItalic',color:'grey',marginLeft:wp(3)}}>
          *We will send you pdf on your email in 2-3 working days
          </Text>

          )}


            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(5)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this.buttonClickListener}
            >
            SUBMIT
            </Button>

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
                  onDateChange={(date) => this.setDates(date)}
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
                this.dialogComponents.dismiss()

              }

            }}/>
            </View>
            </View>

            </DialogContent>

            </DialogComponent>


    <DialogComponent
        dialogStyle = {{backgroundColor:'transparent',}}
        dismissOnTouchOutside={true}
        dismissOnHardwareBackPress={true}
        width={wp(80)}
        height={hp(30)}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }        
        dialogStyle={{width:wp(80), height:hp(30),borderRadius:5,}}
        ref={(dialogComponentss) => { this.dialogComponentss = dialogComponentss; }}>

      <DialogContent>

    <View style={{flexDirection:'column', width:wp(80),alignSelf:'center'
    ,backgroundColor:'white', height:hp(35),borderRadius:5, }}>

      <FlatList data={this.state.langs}
      renderItem={this._renderItems}
      keyExtractor = { (item, index) => index.toString() }      
      extraData={this.state}/>
    <DialogButton text="DISMISS" align="center" textStyle ={{color:'red'}}
    activeOpacity={0.99}
    onPress={()=>{this.dialogComponents.dismiss()}}/>
    </View>

    </DialogContent>
    </DialogComponent>


    <DialogComponent
        dialogStyle = {{backgroundColor:'transparent',}}
        dismissOnTouchOutside={true}
        dismissOnHardwareBackPress={true}
        width={wp(80)}
        height={hp(30)}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }        
        dialogStyle={{width:wp(80), height:hp(38),borderRadius:5,}}
        ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}>

      <DialogContent>

    <View style={{flexDirection:'column', width:wp(80),alignSelf:'center'
    ,backgroundColor:'white', height:hp(38),borderRadius:5, }}>

      <FlatList data={this.state.chartStyles}
      renderItem={this._renderItemss}
      keyExtractor = { (item, index) => index.toString() }      
      extraData={this.state}/>
    <DialogButton text="DISMISS" align="center" textStyle ={{color:'red'}}
    activeOpacity={0.99}
    onPress={()=>{this.dialogComponent.dismiss()}}/>
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

