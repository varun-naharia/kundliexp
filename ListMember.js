import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
type Props = {};
import DropdownAlert from 'react-native-dropdownalert';

export default class ListMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
        };

    }

    componentWillUnmount() {

    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            // headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            // }>
            //     <Text style={{color :'#7CC576',fontFamily:'Konnect-Regular',fontSize: 16,marginRight:10}} >

            //         ADD
            //     </Text>
            // </TouchableOpacity>,
               header: () => null,

        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    _handleStateChange = (state) => {
        this.getMembers()
    }

    getMembers=()=>{
//        alert(GLOBAL.user_id)
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
                console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    _saveDetails = () => {
        this.props.navigation.navigate('AddMember')
    }

    


    componentDidMount(){
        this.getMembers()
         this.props.navigation.addListener('willFocus',this._handleStateChange);
        // this.props.navigation.setParams({ handleSave: this._saveDetails });


    }

    _handlePressContinue=()=>{
        if(GLOBAL.callType == '1'){
            GLOBAL.isBooking ='0'

           Linking.openURL('tel:1111111111')

        }else if(GLOBAL.callType=='2'){
            GLOBAL.isBooking ='0'

           this.props.navigation.navigate("VideoCall", {
                        channelName: '123',
                        onCancel: (message) => {
                            this.setState({
                                visible: true,
                                message
                            });
            }                            
        })


        }else if(GLOBAL.callType=='3'){
            GLOBAL.isBooking ='0'
           this.props.navigation.navigate('Chat')

        }else if(GLOBAL.callType=='4'){
            GLOBAL.isBooking ='0'

            this.props.navigation.navigate('AskQuery')
        }

    }

    _handlePress=()=> {
        console.log('Pressed!');
         this.props.navigation.navigate('AddMember')

        // if(this.state.atleast==0){
        //     alert('Please select atleast 1 member')
        // }else{
        //  this.props.navigation.navigate('AddMember')

        // }

    }

    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item) => {
        if(GLOBAL.typelist==''){
          GLOBAL.mymember = item
          GLOBAL.showMemDetails = 1
          this.props.navigation.goBack()

        }else{
          GLOBAL.memDetails = item
          this.props.navigation.navigate('ShowMember')

        }
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _confDelete=(item)=>{
      //  alert(JSON.stringify(item))
         const url = GLOBAL.BASE_URL +  'delete_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "member_id": item.id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                     this.dropDownAlertRef.alertWithType('success', 'Success', 'Member removed successfully.');

                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list})

                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    askDelete=(item)=>{
        Alert.alert('Remove Member!','Are you sure you want to remove this member?',
            [{text:"Cancel"},
                {text:"Confirm", onPress:()=>this._confDelete(item)
                },
            ],
            {cancelable:false}
        )

    }

    _renderItems = ({item,index}) => {


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            } activeOpacity={0.99}>
                <View style={{ flex: 1 ,marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:10,flexDirection:'row', alignItems:'center'}}>

                <Image style={{width:70, height:70,  marginLeft:10, borderRadius:35, borderColor:'#E60000', borderWidth:2}}
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
                <TouchableOpacity style={{position:'absolute', right:20, top:17}}
                onPress={()=> this.askDelete(item)}>
                <Image style={{width:25, height:35 , resizeMode:'contain'}}
                source={require('./resources/del.png')}/>
                </TouchableOpacity>
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

          <View style={styles.container}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'USER LIST'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
                
                {this.state.results.length == 0 && (

            <Text style={{fontSize : 13,marginTop:15,color :'black',fontFamily:'Nunito-Regular',alignSelf:'center', textAlign:'center'}}>
            No Members added yet!{`\n`}Click `Add Member` button to add members
            </Text>

                )}

                {this.state.results.length!=0 &&(

                    <FlatList style= {{flexGrow:0,height:window.height - 160}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

)}

                {GLOBAL.isBooking == '1' && (

                    <Button
                        style={{padding:5,marginTop:18,fontSize: 20, color: 'black',backgroundColor:'#7CC576',
                        width:'60%',alignSelf:'center',height:40,fontFamily:'Nunito-SemiBold',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePressContinue()}>
                        CONTINUE
                    </Button>

                )}
                {GLOBAL.isBooking !='1' && (
                  <Button
                  containerStyle={{width:wp('70%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:40,position:'absolute',
                  bottom:hp(4),
                   backgroundColor: '#e60000', elevation: 5, alignSelf:'center',  }}
                  style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'Nunito-Bold'}}
                  onPress={this._handlePress}
                  >
                  ADD NEW MEMBER
                  </Button>



                )}
                   <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f1f1f1',
    },
 
})
