import React, {Component} from 'react';
import {Platform, StyleSheet,Dimensions, Text, View,Alert,StatusBar,PermissionsAndroid, AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import AppNavigator from './Navigator';
import DropdownAlert from 'react-native-dropdownalert';

import NotifService from './NotifService';
const GLOBAL = require('./Global');
import appConfig from './app.json';
import PushNotificationAndroid  from 'react-native-push-notification';
import RNCallKeep from 'react-native-callkeep';
import { v4 as uuidv4 } from 'uuid';
type Props = {};
import IncomingCall from 'react-native-incoming-call';


function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}



export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        gotNotif:0,
        isConnected:false,
        senderId: appConfig.senderID,
        netalert : 0,
      };
      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));

      // console.disableYellowBox = true;
        // PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);

    }

uuid=()=>{
  let d = new Date().getTime();
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
   const r = (d + Math.random() * 16) % 16 | 0;
   d = Math.floor(d / 16);

   return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
 });
}

    componentDidMount(){

//      alert(this.uuid())
      // this.notif.localNotif()
// const options = {
//   ios: {
//     appName: 'My app name',
//   },
//   android: {
//     alertTitle: 'Permissions required',
//     alertDescription: 'This application needs to access your phone accounts',
//     cancelButton: 'Cancel',
//     okButton: 'ok',
//     imageName: 'phone_account_icon',
//     additionalPermissions: [PermissionsAndroid.PERMISSIONS.example]
//   }
// };

// RNCallKeep.setup(options).then(accepted => {});
// const options = {
//       ios: {
//         appName: 'ReactNativeWazoDemo',
//         imageName: 'sim_icon',
//         supportsVideo: false,
//         maximumCallGroups: '1',
//         maximumCallsPerCallGroup: '1'
//       },
//       android: {
//         alertTitle: 'Permissions Required',
//         alertDescription:
//           'This application needs to access your phone calling accounts to make calls',
//         cancelButton: 'Cancel',
//         okButton: 'ok',
//         imageName: 'sim_icon',
//         additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS]
//       }
//     };

//     try {
//       RNCallKeep.setup(options);
//       RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
//     } catch (err) {
//       console.log('initializeCallKeep error:', err.message);
//     }
//     RNCallKeep.addEventListener('didReceiveStartCallAction', this.didReceiveStartCallAction);

//    RNCallKeep.displayIncomingCall(this.uuid(), '+918439213137', 'sfddsdsd');

      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected? "+ state.isConnected);
        if(state.isConnected){
          this.setState({netalert : 0})
        }else{
          this.dropDownAlertRef.alertWithType('error', 'Error', 'No Internet Connection.');
        }
      });
    }

    didReceiveStartCallAction=(data) => {
    let { handle, callUUID, name } = data;
    // Get this event after the system decides you can start a call
    // You can now start a call from within your app
  };

  render() {
    //alert(this.state.netalert)
    return (
   <SafeAreaProvider>
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <StatusBar backgroundColor={'#c70b0b'}/>
         <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />


         <AppNavigator/>
     

      </SafeAreaView>
     </SafeAreaProvider>


    );
  }


  onRegister(token) {
      AsyncStorage.setItem('token', token.token);
      GLOBAL.firebaseToken= token.token
      console.log( 'TOKEN:', token );
     // alert('ji'+token.token)
      this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
//    IncomingCall.display(this.uuid(), 'asdsa', './resources/fbaby.png');

      console.log(notif);
//      Alert.alert(notif.title, notif.message);
      this.setState({gotNotif: 1})
    }

    handlePerm(perms) {
      Alert.alert("Permissions", JSON.stringify(perms));
    }


  }


const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'green',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30,
  },
  offlineText: {
    color: '#fff',
  },
});
