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
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
import IndicatorCustom from './IndicatorCustom'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Support extends Component {
    state = {
        name :GLOBAL.userDetails.name,
        email:GLOBAL.userDetails.email,
        message :'',
        company :'',
        phone:GLOBAL.userDetails.phone,
        loading:false,
        visible:false,
        helpline_email:'',
        helpline_no:'',
    };


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
//        this.getSupport()
    }





    submitEnq=()=>{
        if(this.state.name == ''){
            alert('Please enter name')
        }else if(this.state.email==''){
            alert('Please enter email')
        }else if(this.state.phone==''){
            alert('Please enter mobile number')
        }else if(this.state.message ==''){
            alert('Please enter message')
        }else{

        const url = GLOBAL.BASE_URL +  'user_support'
        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "name": this.state.name,
                "email": this.state.email,
                "message": this.state.message,
                "mobile":this.state.phone,                 
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()
                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                    alert('Enquiry submitted successfully. We will reach you soon!')
                }else{
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

        }

    }


    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        let { picaid } = this.state;
        let { hosp } = this.state;
        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }
        return (
        <View style={{flex:1}}>

           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'SUPPORT'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

  <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>

    <View style={{width : Dimensions.get('window').width,backgroundColor:'#F2F5F7'}}>

    <View style={{backgroundColor:'white',color :'white',flexDirection:'column',flex:1 ,marginTop:15,marginBottom:70,marginLeft:15,marginRight:15, height:'auto',borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>


    <View style={{flexDirection:'row',marginTop:40,marginLeft:20,alignItems:'center'}}>

    <Text style={{fontSize:15,color:'black',fontFamily:'Nunito-Bold'}}>LEAVE US A MESSAGE</Text>
  </View>

  <View style={{flexDirection:'column',marginTop:40,marginLeft:20}}>
  <Text style={{fontSize:16,fontFamily:'Nunito-Regular',color:'lightgrey'}}>FULL NAME</Text>

   <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Nunito-Regular'}}
        placeholder=""
       returnKeyType='go'
       value={this.state.name}
        onChangeText={(text)=> this.setState({name : text})}
        secureTextEntry={false}
        autoCorrect={false}
     />


     <Text style={{fontSize:16,fontFamily:'Nunito-Regular',color:'lightgrey',marginTop:20}}>EMAIL</Text>

      <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Nunito-Regular'}}
           placeholder=""
          returnKeyType='go'
          value= {this.state.email}
           onChangeText={(text)=> this.setState({email : text})}
           secureTextEntry={false}
           autoCorrect={false}
        />


     <Text style={{fontSize:16,fontFamily:'Nunito-Regular',color:'lightgrey',marginTop:20}}>MOBILE</Text>

      <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Nunito-Regular'}}
           placeholder=""
          returnKeyType='go'
          maxLength={10}
          value={this.state.phone}
          keyboardType={'numeric'}
           onChangeText={(text)=> this.setState({phone : text})}
           autoCorrect={false}
        />

        <Text style={{fontSize:16,fontFamily:'Nunito-Regular',color:'lightgrey',marginTop:30}}>MESSAGE</Text>

         <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Nunito-Regular'}}
              placeholder=""
             returnKeyType='go'

              onChangeText={(text)=> this.setState({message : text})}
              secureTextEntry={false}
              autoCorrect={false}
           />
     </View>




        <TouchableOpacity style={{marginTop:40,alignSelf:'center', marginBottom:30}}
        onPress={() => this.submitEnq()}>
        <View style = {{backgroundColor:'#E60000',height:55,borderRadius:27.5,alignSelf:'center',width:300,
            borderBottomWidth: 0,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            flexDirection:'row'}}>


            <Text style= {{width:'100%',alignSelf:'center',textAlign:'center',fontSize:20,fontFamily:'Nunito-SemiBold',color:'white',padding:11}} >
                SUBMIT
            </Text>

        </View>
        </TouchableOpacity>

    </View>

    </View>


  </KeyboardAwareScrollView>
      </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})