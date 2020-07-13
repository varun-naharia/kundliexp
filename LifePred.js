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
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';

type Props = {};
var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
 ];
class LifePred extends Component<Props> {

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
            value:0,
            name:'',
            date: new Date(),
            dates:'',
            pob:'',
            review:'',
            time: moment().format("HH:mm")
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


  returnLifePred(lat, lon, name) {
    console.log('LIFE PRED--> lat' + lat + 'lon' + lon);
    this.setState({p_lat: lat, p_lon: lon, pob: name});
  }

    componentDidMount(){

    }



    buttonClickListener=()=>{
      var genderTitle;

      if(this.state.name==''){
        alert('Please enter name')
      }else if(this.state.dates==''){
        alert('Please select date of birth')
      }else if(this.state.pob==''){
        alert('Please select place of birth')
      }else if(this.state.review==''){
        alert('Please write a message')
      }else{
          if(this.state.value == 0)
            genderTitle='Male'
          else
            genderTitle ='Female'

          var finalData={
            name: this.state.name,
            gender: genderTitle,        
            dob: this.state.dates,
            tob: this.state.time,
            pob: this.state.pob,
            pob_lat : this.state.p_lat,
            pob_long : this.state.p_lon,
            pob_lat_long_address : this.state.pob,
            country: '',
            problem: this.state.review          
          }

          console.log(JSON.stringify(finalData))
            this.props.navigation.navigate('Payment', {
              params: {previous_screen: 'life_pred', finalData},
            });

      }      
    }

    setDate=(getDate)=>{
      this.setState({
        date: getDate,
      },()=>{

      })                        

      console.log(getDate)
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
                       headerName={'LIFE PREDICTION'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <KeyboardAwareScrollView>
        <View style={{width:wp('93%'),backgroundColor:'white',flexDirection:'column', alignSelf:'center', marginTop:hp(2)}}>
        

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Name"
              placeholderTextColor = 'black'
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
            showIcon={false}
            placeholder={this.state.time}
            format="HH:mm"
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
              this.setState({time: time})
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>



          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>
          <TouchableOpacity
          onPress={() => {
                  this.props.navigation.navigate('SelectPlace', {
                    params: {
                      previous_screen: 'life_pred',
                      returnLifePred: this.returnLifePred.bind(this),
                    },
                  });
                }}>
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

{/*
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Country</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:0, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:wp(92),color:'black',fontFamily:'Nunito-Regular'}}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Country"
              placeholderTextColor = 'grey'
              maxLength={35}
              editable={false}
              // Making the Under line Transparent.
              underlineColorAndroid="transparent"
              value = {'India'}
              onChangeText={(text) => this.setState({country:text})}
          />
*/}
          <Text style={{fontSize:16,fontFamily:'Nunito-Bold',color:'black', marginTop:hp(2)}}>Any Question</Text>

          <TextInput style={{ fontSize: 16,elevation:5,paddingLeft:10,borderRadius:5,marginTop:hp(2), backgroundColor:'white',width:'100%',fontFamily:'Nunito-Regular', height:hp(20)}}
               placeholder="Write Message..."
               returnKeyType='go'
               onChangeText={(text)=> this.setState({review : text})}
               autoCorrect={false}
               value ={this.state.review}
               onSubmitEditing = {() => this.setState({disabled:false})}
               textAlignVertical= {'top'}
            />


            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(8), marginBottom:hp(3)}}
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

export default LifePred;