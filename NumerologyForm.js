import React, {Component} from 'react';
import {StyleSheet,ScrollView, Text, View,FlatList,Image,TouchableOpacity ,Container,TextInput , Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';



type Props = {};


export default class NumerologyForm extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }




    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: GLOBAL.userDetails.name,
            date: new Date(),
            dates: moment().format('DD-MM-YYYY'),
            time:'',
            isDisabled:false
        }
    }


    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){


    }


    componentWillUnmount(){
      GLOBAL.isDailyPres = '0'
    }

  buttonClickListener=()=>{
  console.warn(this.state.date)
  var d =  new Date(this.state.date);  // i assume your date as 01-11-1933
    var date = d.getDate(); // 11
    var month =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    var year =  d.getFullYear(); // 1933


    GLOBAL.gldate = d.getDate(); // 11
    GLOBAL.glmonth =  d.getMonth()+1; // 0  month is like array so you have to do +1 for correct month
    GLOBAL.glyear =  d.getFullYear(); // 1933

      var numFormType;

      if(GLOBAL.isDailyPres == '2'){
         numFormType = 'numero_prediction_daily' 
      }else{
          numFormType = 'numero_table'
      }

      console.log('---->'+JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "name": this.state.name,
            "date": date,
            "month": month,
            "year": year,
            "api-condition":numFormType
            }))

        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":GLOBAL.glLanguage,
            "name": this.state.name,
            "date": date,
            "month": month,
            "year": year,
            "api-condition":numFormType
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {
              // this.setState({response: responseJson },() => {
              //         alert('gdsd'+JSON.stringify(this.state.response));
              //     });            

                if(GLOBAL.isDailyPres == '2'){
                 this.props.navigation.navigate('NumerologyReportSeparate' , {numReportResponse: responseJson})
                }else if(GLOBAL.isDailyPres == '1'){
                 this.props.navigation.navigate('NumerologyReportSeparate' , {numReportResponse: responseJson})
                }else if(GLOBAL.isDailyPres == '3'){
                 this.props.navigation.navigate('NumerologyReportSeparate' , {numReportResponse: responseJson})
                }else if(GLOBAL.isDailyPres == '4'){
                 this.props.navigation.navigate('NumerologyReportSeparate' , {numReportResponse: responseJson})
                }else{
                 this.props.navigation.navigate('NumerologyReport' , {numReportResponse: responseJson})
                }    
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
}

    setDate=(getDate)=>{
      this.setState({ date : getDate,
        // dates : moment(getDate).format('DD-MM-YYYY')
       }) 
      console.log(getDate)
    }


    render() {
      var title=''
      if(GLOBAL.isDailyPres=='2'){
        title='DAILY PREDICTION'
      }else{
        title = 'NUMEROLOGY FORM'
      }


        return (

        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={title}
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



            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
            backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(5)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            disabledContainerStyle={{backgroundColor: 'grey'}}
            disabled={this.state.isDisabled}
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
                this.setState({ dates: moment(this.state.date).format('DD-MM-YYYY') })
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
});

