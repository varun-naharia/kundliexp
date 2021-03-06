import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Header from 'react-native-custom-headers';
import DatePicker from 'react-native-datepicker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment'
import IndicatorCustom from './IndicatorCustom'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePickers from 'react-native-date-picker'
import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';


export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name:'',
            email:'',
            mobile:'',
            relation:'',
            gender:'',
            dob:'Select Date of Birth',
            date:new Date(),
            dates:'',
            value:0,
            rdata:[],
            time:'',
            atleast:0,
            pob:''

        };

    }




    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount(){
      this.getRelations()
    }


    getRelations(){
        const url = GLOBAL.BASE_URL + "master_relationship";
      //  this.showLoading()
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
          // console.log(JSON.stringify(responseJson));
//          this.hideLoading();
          if (responseJson.status == true) {

                var rece = responseJson.response
                const transformed = rece.map(({ id, name }) => ({ label: name, value: id }));
                // console.log(transformed)

                this.setState({rdata : transformed})
          }else {
            alert(
              "Something went wrong!"
            );
          }
        })
        .catch(error => {
  //        this.hideLoading();
          console.error(error);
        });    
    }


    _handlePress=()=> {
        if(this.state.name==''){
            alert('Please Enter Member Name')

        }else if(this.state.dates==''){
            alert('Please Select date of birth')

        }else if(this.state.time==''){
            alert('Please Select time of birth')

        }else if(this.state.pob==''){
            alert('Please Select place of birth')

        }else if(this.state.atleast==0){
            alert('Please Select Relationship')

        }else{
        var type= ''
        if(this.state.value == 0){
            type = 'Male'
        }else{
            type ='Female'
        }

        const url = GLOBAL.BASE_URL +  'add_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "member_name":this.state.name,
                "member_dob":this.state.dates,
                "member_gender":type,
                "place_of_birth": this.state.pob,
                "latitude": this.state.mem_lat,
                "member_tob": this.state.time,
                "longitude": this.state.mem_lon,
                "relation":this.state.relation,
               
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                   alert('Member Added Successfully!')
                }else{
                    this.props.navigation.goBack()
                    alert('Members limit reached!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        }
    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    setDate=(getDate)=>{
      this.setState({ date : getDate,
        // dates : moment(getDate).format('DD-MM-YYYY')
       }) 
      console.log(getDate)
    }


    returnMemberPlace(lat, lon, name) {
      console.log('Member--> lat'+lat+'lon'+lon )
      this.setState({mem_lat: lat, mem_lon: lon, pob: name});
    }


    getIndex = (index) => {
        this.setState({atleast:1})
        this.setState({relation:this.state.rdata[index].label})
        //alert(this.state.relation)
    }
    render() {

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];

        if(this.state.loading){
            return(
               
               <IndicatorCustom/>
            )
        }
        return (

                <View style={styles.container}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'CREATE USER'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

        <View style={{width:wp('100%'), backgroundColor:'white',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#00000040', paddingLeft:15, paddingTop:5}}>
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'black'}}>Details</Text>
        </View>


         <View style={{width:wp('93%'),backgroundColor:'white',flexDirection:'column', alignSelf:'center', marginTop:hp(2)}}>
        

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey'}}>Name</Text>

          <TextInput
              style={{ height: hp(6), borderColor: '#f3f3f4',fontSize:17,paddingLeft:-0.5, borderBottomWidth: 1, marginTop:0 ,marginBottom: hp(2) ,width:'99%',color:'black',fontFamily:'Nunito-Regular'}}
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
            showIcon={false}
            placeholder={'Select Time of Birth'}
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -150, borderWidth:0, color:'black'
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:17
              },
              placeholderText: {
                    fontFamily:'Nunito-Regular', fontSize:17, marginLeft:105, color:'grey'
              }                            
            }}
            onDateChange={(time) => {
              this.setState({time: time})
            }}
          />
          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(0.4),marginBottom: hp(2) ,}}/>



          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Place of Birth</Text>
          <TouchableOpacity
          onPress={()=> {
             this.props.navigation.navigate('SelectPlace' ,
             {params:{previous_screen: 'add_member', returnMemberPlace: this.returnMemberPlace.bind(this)}})}
         }>
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
        
          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(1)}}>Relationship</Text>

            <Dropdown containerStyle={{width:'100%', height:50, marginTop:hp(-3)}}
                                      fontSize={14}
                                      fontColor={'#000000'}
                                      labelFontSize={13}
                                      placeholderTextColor ={'red'}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }
                                      label={''}
                                      data={this.state.rdata}
                            />

          <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold',color:'lightgrey', marginTop:hp(3)}}>Gender</Text>
            <RadioForm style={{ marginTop:12}}
                       labelStyle={{paddingRight:20}}
                       radio_props={radio_props_one}
                       initial={0}
                       buttonSize={10}
                       formHorizontal={true}
                       buttonColor={'#E60000'}
                       labelHorizontal={true}
                       animation={false}
                       labelColor={'black'}
                       selectedButtonColor={'#E60000'}
                       onPress={(value) => {this.setState({value:value})}}
            />

          <View style={{width:wp(92), height:hp(0.15), backgroundColor:'rgba(0,0,0,0.05)', alignSelf:'center', marginTop:hp(1),marginBottom: hp(2) ,}}/>


                            </View>

          </View>


            <Button
            containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,
             backgroundColor: '#e60000', elevation: 5, alignSelf:'center', marginTop:hp(6), marginBottom:hp(3)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
            onPress={this._handlePress}
            >
            SAVE
            </Button>

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
        flex:1,
        backgroundColor :'white',
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
  

})
