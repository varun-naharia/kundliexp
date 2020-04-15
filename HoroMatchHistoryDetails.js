import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,ScrollView,PermissionsAndroid,ToastAndroid, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import IndicatorCustom from './IndicatorCustom'
import Svg, {
  Circle,Path, Rect,SvgXml, Defs, Marker } from 'react-native-svg';
import { AnimatedSVGPath } from 'react-native-svg-animations';

type Props = {};
class HoroMatchHistoryDetails extends Component<Props> {

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
            data:this.props.navigation.state.params.params.get.item
        }
    }




    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){
    this.showLoading()
    this.timeoutCheck = setTimeout(() => {
        this.hideLoading()
   }, 200);

    console.log(JSON.stringify(this.props.navigation.state.params.params.get.item))
//    this.setState({data: this.props.navigation.state.params.params.get.item})

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
            title: `test.pdf`,
            path: `${dirs.DownloadDir}/test.pdf`,
            },
          })
            .fetch('GET', 'http://samples.leanpub.com/thereactnativebook-sample.pdf', {})
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

    selectedPred=(item, index)=>{
        Linking.openURL(item.path)
    }


    renderRowItem1=({item, index})=>{
        return(

   <TouchableOpacity style={{marginBottom:hp(0.2)}}
   onPress={() => this.selectedPred(item, index)
    } activeOpacity={0.9}>
     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(40),elevation:4, padding:10, marginTop:hp(1.5),marginLeft:wp(2),marginBottom:hp(0.6)}}>

    {item.type =='application/pdf' && (

    <Image style={{width:60, height:60, resizeMode:'contain', alignSelf:'center', marginVertical:hp(1)}}
     source={require('./resources/pdf_im.png')}/>

     )}    
    {item.type == 'image/jpeg' && (
    <Image style={{width:60, height:60, resizeMode:'contain', alignSelf:'center', marginVertical:hp(1)}}
     source={{uri : item.path}}/>


        )}

    </View>

    </TouchableOpacity>            
            )
    }


    render() {
const markerRendering = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="256.000000pt" height="256.000000pt" viewBox="0 0 256.000000 256.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M193 1619 c-43 -12 -90 -62 -103 -107 -14 -51 -13 -440 1 -483 7 -19 21 -45 33 -57 48 -54 2 -52 1018 -52 899 0 945 1 978 19 19 10 45 33 58 51 21 32 22 40 22 280 0 240 -1 248 -23 280 -12 19 -38 43 -57 54 -35 21 -46 21 -965 23 -551 1 -943 -2 -962 -8z m282 -108 c-6 -4 -36 -27 -67 -49 l-57 -42 -53 42 c-29 22 -57 45 -62 49 -6 5 47 9 119 9 72 0 125 -4 120 -9z m300 -41 c-38 -27 -73 -50 -78 -50 -4 0 -40 23 -79 50 l-71 50 149 0 148 0 -69 -50z m-445 -64 c0 -3 -127 -96 -131 -96 -3 0 -2 179 1 198 0 3 130 -99 130 -102z m266 53 c41 -28 74 -55 74 -58 0 -4 -33 -31 -74 -59 l-74 -52 -76 59 -76 59 68 51 c37 28 71 51 75 51 5 0 42 -23 83 -51z m1064 -79 c0 -123 -1 -130 -20 -130 -11 0 -20 4 -20 9 0 5 -13 4 -30 -2 -26 -10 -32 -8 -55 13 -46 43 -42 122 9 155 19 13 29 14 45 5 20 -10 21 -8 21 28 0 43 5 52 32 52 17 0 18 -11 18 -130z m265 0 c0 -118 -1 -125 -20 -125 -19 0 -20 8 -23 114 -3 127 0 144 25 139 16 -3 18 -17 18 -128z m-1069 -68 c-6 -5 -135 79 -135 88 0 3 30 26 67 51 l67 47 3 -90 c1 -50 1 -93 -2 -96z m1159 163 c0 -23 -34 -33 -46 -14 -10 17 9 41 30 37 9 -2 16 -12 16 -23z m-1023 -31 l3 -47 33 47 c27 37 39 46 63 46 16 0 29 -3 29 -6 0 -3 -16 -25 -35 -48 -19 -24 -35 -46 -35 -50 0 -4 18 -33 40 -65 21 -32 37 -61 35 -63 -3 -3 -18 -3 -33 0 -20 2 -36 16 -53 43 -28 47 -43 45 -47 -4 -3 -34 -6 -37 -33 -37 l-29 0 0 115 0 115 29 0 c28 0 30 -2 33 -46z m1117 16 c14 0 15 -17 1 -25 -17 -10 -11 -27 8 -21 24 8 44 -7 36 -27 -9 -23 -37 -21 -52 4 -10 16 -19 19 -39 14 -20 -5 -24 -3 -20 9 4 9 2 18 -3 21 -15 9 -12 25 4 25 8 0 17 8 21 18 6 16 7 16 19 0 7 -10 18 -18 25 -18z m-642 -49 c8 -10 12 -42 10 -86 -2 -64 -4 -70 -24 -73 -21 -3 -22 1 -25 65 -3 64 -4 68 -27 68 -23 0 -24 -3 -25 -65 -1 -62 -2 -65 -26 -65 -25 0 -25 2 -28 89 l-3 89 34 -6 c19 -3 40 -1 48 4 18 11 50 1 66 -20z m331 18 c36 -12 40 -22 43 -109 l3 -65 -55 -1 c-63 -2 -99 16 -99 50 0 29 27 54 68 62 33 7 41 18 21 29 -5 4 -18 0 -28 -9 -19 -17 -47 -21 -55 -8 -8 14 22 50 47 55 12 2 22 5 23 6 1 0 15 -4 32 -10z m-608 -63 c0 -43 4 -66 13 -69 29 -10 37 6 37 69 0 62 1 64 25 64 25 0 25 -1 25 -85 0 -69 -3 -87 -16 -92 -8 -3 -20 -1 -26 5 -7 7 -16 7 -29 -1 -15 -9 -25 -9 -47 3 -25 15 -27 21 -30 93 -3 77 -3 77 23 77 24 0 25 -2 25 -64z m828 -23 c-3 -80 -5 -88 -23 -88 -18 0 -20 8 -23 88 l-3 87 26 0 26 0 -3 -87z m-1584 -10 c36 -26 65 -51 66 -54 0 -12 -144 -110 -156 -105 -19 7 -144 99 -144 105 1 13 145 111 157 107 7 -3 42 -27 77 -53z m339 1 c37 -25 67 -50 67 -54 0 -4 -33 -33 -74 -63 l-74 -56 -75 58 -76 58 72 51 c40 28 77 51 82 52 6 0 40 -21 78 -46z m-175 -125 c37 -28 67 -54 67 -59 0 -5 -31 -32 -68 -60 l-68 -52 -52 36 c-29 20 -65 46 -80 59 l-28 22 73 52 c40 29 77 52 81 53 4 0 38 -23 75 -51z m258 -166 c-2 -2 -36 20 -75 50 l-71 55 73 55 72 55 3 -106 c1 -57 1 -107 -2 -109z m-528 111 c4 -2 -123 -94 -129 -94 -3 0 -2 171 1 187 0 2 28 -18 63 -44 34 -26 63 -48 65 -49z m783 -54 c23 0 25 -13 4 -30 -11 -9 -14 -22 -9 -43 6 -28 5 -29 -17 -23 -13 4 -28 7 -34 7 -5 0 -21 -3 -34 -7 -22 -6 -23 -5 -17 23 5 21 2 34 -9 43 -21 17 -19 30 5 30 11 0 27 12 37 26 l17 26 19 -26 c10 -14 27 -26 38 -26z m-691 -11 c38 -28 70 -53 70 -55 0 -2 -63 -4 -140 -4 -77 0 -140 3 -140 8 1 5 127 100 137 102 2 0 34 -23 73 -51z m340 -1 c33 -24 59 -46 59 -50 1 -5 -58 -8 -131 -8 -72 0 -129 2 -126 5 17 17 124 95 132 95 4 0 34 -19 66 -42z m610 -48 c0 -5 -10 -10 -22 -10 -20 -1 -21 -2 -6 -11 12 -7 23 -6 37 3 18 11 23 10 35 -7 14 -18 15 -18 16 -2 0 18 30 25 30 7 0 -5 -4 -10 -10 -10 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -10 -20 -5 0 -10 5 -10 11 0 6 -8 3 -17 -6 -16 -16 -18 -16 -34 4 -20 25 -35 27 -43 6 -9 -26 -23 -16 -19 13 3 15 6 33 8 40 5 14 55 17 55 2z m173 3 c3 -5 2 -23 0 -40 -5 -29 -9 -33 -34 -33 -30 0 -32 8 -13 68 4 13 40 17 47 5z m317 -3 c0 -5 -10 -11 -22 -11 -17 -1 -19 -2 -5 -6 21 -5 23 -23 2 -23 -8 0 -15 -7 -15 -15 0 -8 -4 -15 -10 -15 -11 0 -13 39 -4 64 7 17 54 22 54 6z m-189 -21 c-2 -8 -4 -22 -5 -32 0 -9 -5 -16 -11 -14 -5 2 -9 11 -7 21 2 9 -2 16 -8 16 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -10 -20 -11 0 -14 53 -4 63 12 12 59 1 55 -14z m266 -14 c-1 -19 -6 -33 -12 -32 -5 2 -9 15 -8 28 2 23 1 22 -9 -3 -11 -27 -41 -38 -52 -20 -7 12 5 52 15 52 5 0 6 -12 3 -26 -5 -19 -4 -25 5 -20 6 4 11 16 11 26 0 16 11 24 42 29 4 0 6 -15 5 -34z m-339 -5 c4 -27 -17 -44 -35 -28 -16 13 -17 30 -1 46 17 17 32 10 36 -18z m126 21 c11 -17 -12 -61 -29 -55 -15 6 -21 45 -8 57 9 10 31 9 37 -2z m42 -3 c-3 -7 -9 -21 -12 -30 -6 -18 -24 -25 -24 -10 1 25 14 52 27 52 8 0 12 -6 9 -12z m213 -21 c1 24 21 43 21 19 0 -28 -12 -46 -31 -46 -13 0 -19 7 -19 23 0 36 14 42 21 10 5 -22 7 -23 8 -6z m57 21 c-3 -7 -9 -21 -12 -30 -4 -10 -11 -18 -16 -18 -6 0 -7 7 -4 16 3 9 6 22 6 30 0 8 7 14 16 14 9 0 13 -5 10 -12z m52 -18 c4 -27 -17 -44 -35 -28 -16 13 -17 30 -1 46 17 17 32 10 36 -18z"/>
<path d="M1567 1383 c-12 -12 -7 -81 6 -86 26 -9 37 6 37 49 0 36 -3 44 -18 44 -10 0 -22 -3 -25 -7z"/>
<path d="M1744 1319 c-3 -6 -2 -15 3 -20 13 -13 43 -1 43 17 0 16 -36 19 -46 3z"/>
<path d="M1380 994 c0 -8 5 -12 10 -9 6 3 10 10 10 16 0 5 -4 9 -10 9 -5 0 -10 -7 -10 -16z"/>
<path d="M1510 989 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10 -5 -10 -11z"/>
<path d="M2314 1579 c-11 -6 -28 -23 -37 -39 -44 -74 7 -163 93 -163 86 0 137 89 93 163 -27 46 -96 64 -149 39z m80 -81 l7 -23 9 23 c15 35 30 26 30 -18 0 -22 -4 -40 -10 -40 -5 0 -10 6 -10 13 0 9 -3 8 -9 -2 -7 -11 -11 -10 -20 5 -9 17 -10 17 -11 2 0 -10 -4 -18 -10 -18 -5 0 -10 14 -10 30 0 17 -4 30 -10 30 -5 0 -10 -13 -10 -30 0 -16 -4 -30 -10 -30 -5 0 -10 14 -10 30 0 17 -4 30 -10 30 -5 0 -10 5 -10 10 0 6 20 10 44 10 37 0 45 -4 50 -22z"/>
</g>
</svg>
`;

        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        var yeah = this.state.data

  //     const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <Header navigation={this.props.navigation}
                       showHeaderImage={false}
                       headerColor ={'#E60000'}
                       backImagePath={require('./resources/back.png')}
                       headerName={'HOROSCOPE MATCHING DETAILS'}
                       headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />


    <ScrollView>
     <View style={{backgroundColor:'white',flexDirection:'column' ,borderColor:'red',borderWidth:0,
      flex: 1 ,borderRadius :5,width : wp(91), padding:10, marginTop:hp(2), alignSelf:'center'}}>
 
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',marginTop:hp(0.5)}}>
       Boy Details </Text>
    
       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black',}}>
        {yeah.boy_name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.boy_tob}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Place of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.boy_pob}</Text>
       </Text>
    
       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.boy_dob}</Text>
       </Text>


       <View style={{width:'100%', height:0.5, backgroundColor:'#bfbfbf', marginVertical:hp(2)}}/>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',}}>
       Girl Details </Text>

       <Text style = {{fontSize:16,fontFamily:'Nunito-Bold',color:'black'}}>
        {yeah.girl_name}
       </Text>
       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Time of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.girl_tob}</Text>
       </Text>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Place of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.girl_pob}</Text>
       </Text>
    
       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
       Date of Birth: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'black',}}>
        {yeah.girl_dob}</Text>
       </Text>

  {yeah.trxn_status== 'success' && (
       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
        Status: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'green',}}>
        {yeah.trxn_status}</Text>
       </Text>
  )}

  {yeah.trxn_status!= 'success' && (

       <Text style = {{fontSize:12,fontFamily:'Nunito-Regular',color:'#757575',marginTop:hp(0.5)}}>
        Status: <Text style = {{fontSize:13,fontFamily:'Nunito-SemiBold',color:'red',}}>
        {yeah.trxn_status}</Text>
       </Text>

    )}
              <Text style = {{fontSize:15,fontFamily:'Nunito-SemiBold',color:'black',position:'absolute', right:10, top:13}}>
                Id: #{yeah.id}
               </Text>


       <View style={{width:'100%', height:0.5, backgroundColor:'#bfbfbf', marginVertical:hp(2)}}/>

       <Text style = {{fontSize:13,fontFamily:'Nunito-Regular',color:'#E60000',}}>
       Attachments </Text>


                <FlatList style = {{marginTop:5,}}
                    data={yeah.imagess}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderRowItem1}
                    numColumns={2}
                    extraData={this.state}
                />




{/*        <SvgXml xml={markerRendering}/>

                 <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{width:'100%', height:'100%', borderRadius:5,}}/>
*/}

        </View>

        </ScrollView>

{/*        <TouchableOpacity 
        style={{marginBottom:hp(4),marginRight:wp(2), alignSelf:'flex-end',}}
        onPress={()=> this.downloadFile()}>
        <View style={{flexDirection:'row',padding:10, backgroundColor:'transparent',
         height:hp(5),alignItems:'center'}}>
        <Text style = {{fontSize:15,fontFamily:'Nunito-Bold',color:'black',textAlign:'center'}}>
        DOWNLOAD PDF
        </Text>

         <Image style={{width:22, height:22, resizeMode:'contain', marginLeft:wp(2)}}
         source={require('./resources/ic_download.png')}/>
        </View>
        </TouchableOpacity>
*/}
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

export default HoroMatchHistoryDetails;