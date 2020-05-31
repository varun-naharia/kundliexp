import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from 'react-native';

const window = Dimensions.get('window');
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import {NavigationActions, StackActions} from "react-navigation";


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Thankyou extends Component {
    state = {
        name :'',
    };

  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };



    componentDidMount(){
      // BackHandler.addEventListener('hardwareBackPress', this._handlePress);

    }

    componentWillUnmount () {
      // BackHandler.removeEventListener('hardwareBackPress', this._handlePress);

    }
    _handlePress=()=>{

    this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'DrawerNavigator',
                        params: { someParams: 'parameters goes here...' },
                    }),
                ],


            }))        
//        this.props.navigation.replace('DrawerNavigator')
    }


    render() {
        
        return (

                <View style={styles.container}>



                    <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'30%',resizeMode: 'contain'}}
                           source={require('./resources/thank.png')}/>


                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 40,color :'#E60000', height:'auto',fontFamily:'Nunito-Bold',alignSelf:'center'}}>

                        THANK YOU
                    </Text>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'black', height:'auto',fontFamily:'Nunito-Regular',alignSelf:'center'}}>

                       FOR YOUR ORDER
                    </Text>




                    <Button
                        style={{padding:4,marginTop:100,fontSize: 20, color: 'white',backgroundColor:'#E60000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Nunito-SemiBold',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        GO TO HOME
                    </Button>





                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor :'#f1f1f1',
        height: window.height,
    },

})