import React, {Component} from 'react';
import {StyleSheet,FlatList,ScrollView,PermissionsAndroid,ToastAndroid,Animated,Linking, Easing, Text, View,Image,TouchableOpacity,Container} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';
import * as Animatable from 'react-native-animatable';
import RNFetchBlob from 'rn-fetch-blob';
import IndicatorCustom from './IndicatorCustom'

export default class PdfYoursIn extends Component {

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
            data:this.props.navigation.state.params.params.get,
        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
      console.log(JSON.stringify(this.state.data))
    }



    actualDownload=()=>{
            const { dirs } = RNFetchBlob.fs;
        //    alert(JSON.stringify(dirs))
          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `kundliexpert.pdf`,
            path: `${dirs.DownloadDir}/kundliexpert.pdf`,
            },
          })
            .fetch('GET', GLOBAL.freePDF, {})
            .then((res) => {
            ToastAndroid.show('The file saved to '+ res.path(), ToastAndroid.SHORT)
              console.log('The file saved to ', res.path());
            })
            .catch((e) => {
              console.log(e)
            });
    }

   async downloadFile(){
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    } 
   }


   _renderItem=({item, index})=>{
    return(
            <TouchableOpacity style={{margin:5}}onPress={()=> Linking.openURL(item.path)}>

            <View   style  = {{width:wp('30.6%'), height:hp(20),shadowColor: "#000",alignItems:'center',
             backgroundColor:'transparent', justifyContent:'center', borderColor:'#E60000', borderRadius:5,
              borderWidth:1}}>

              {item.type=='pdf' && (

            <Image style={{width: '100%', height:'100%'}}
            source={require('./resources/docu.png')}/>

                )}

              {item.type!='pdf' && (
            <Image style={{width: '100%', height:'100%'}}
            source={{uri : item.path}}/>

                )}


            </View>
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

        <View style={{flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'DOCUMENT VIEW'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.data}
                              numColumns={3}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                              extraData={this.state}
                    />


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

