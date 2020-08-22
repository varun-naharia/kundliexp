import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,TouchableNativeFeedback,Image,StatusBar,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import { DrawerActions } from 'react-navigation';
import Header from 'react-native-custom-headers';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { Thumbnail } from 'react-native-thumbnail-video';

type Props = {};
class VideosAll extends Component<Props> {
  static navigationOptions = {
          title: 'Video Detail',
          header: null
      };

  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       newslist:[],
    }
}
  _keyExtractor = (item, index) => item.productID;


openVideo=(itemData)=>{
//  alert(JSON.stringify(itemData))
  GLOBAL.videoDetails = itemData.item
  this.props.navigation.navigate('ViewVideo')
}






  renderRowItem = (itemData) => {
//    alert(JSON.stringify(itemData))
var helloMessage = false;
if (itemData.item.is_bookmarked == "N"){
helloMessage = true;
}

    return (
      <TouchableOpacity onPress={()=> this.openVideo(itemData)}
      activeOpacity={0.8}>
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 0.5,flexDirection:'row',height: 'auto',
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:8,  width : wp(96) ,marginLeft : hp(1),marginRight:hp(1),marginTop:hp(1.5),marginBottom:1, elevation:5}}>

    <Image style={{width:130, height:130, borderColor: 'transparent', borderWidth: 1, borderRadius: 8}} source={{uri: itemData.item.image}}/>
    <View style={{width: 130, position: 'absolute', alignSelf: 'center',}}>
    <Image style={{width:80, height:40, resizeMode: 'contain', alignSelf: 'center', }} source={require('./resources/ic_play.png')}/>
    </View>

    <View style={{flexDirection:'column', margin:10, width: '62%',}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
     <Text style={{fontSize:15, color:'#4C5361',fontFamily: 'Nunito-Bold', width: '85%'}}
     numberOfLines={3}>{itemData.item.title}</Text>
{/*
     {helloMessage == true && (
       <TouchableOpacity onPress= {()=> this.addtoFav(itemData.item)}>
     <Image style={{width: 25, height: 25, resizeMode: 'contain'}} source={require('./resources/favo.png')}/>
     </TouchableOpacity>)}

     {helloMessage == false && (
       <TouchableOpacity onPress={()=> this.removefromFav(itemData.item)}>
       <Image style={{width: 25, height: 25, resizeMode: 'contain'}} source={require('./resources/unfavo.png')}/>
       </TouchableOpacity>
     )}
*/}
     </View>
     <Text style={{fontSize:13, marginRight:10,  marginTop: 5, fontFamily: 'Nunito-Regular'}} numberOfLines={4}>{itemData.item.youtube_url}</Text>
</View>
</View>

</TouchableOpacity>

    )
  }

showLoading = () => {
  this.setState({ loading: true });
};

hideLoading = () => {
  this.setState({ loading: false });
};


addtoFav =()=>{
  console.log('jj')
}

componentDidMount(){
 // this.props.navigation.addListener('willFocus',this._handleStateChange);
   this.getAllVideos()
}


  getAllVideos(){
     const url = GLOBAL.BASE_URL + "videos";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        videos: 'videos',
        limit_from: "0",
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()
        if (responseJson.status == true) {
              var vid = responseJson.videos
//              var pa = require('./resources/hone.png')
  
              var resultant = vid.map(function(el) {
              var o = Object.assign({'is_bookmarked': 'N'}, el);
              o.isActive = true;
              return o;
            })

          this.setState({newslist : resultant})

        } else {
          alert("Something went wrong!");
        }
      })
      .catch(error => {
        console.error(error);
      });

  }


  render() {
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}
       size="large" color="#e41582" />
        </View>
      )
    }
    return (

      <View style={styles.container}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'ALL VIDEOS'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
    

        {this.state.newslist.length == 0 &&(
            <Text style={{fontSize:20, margin:10,alignSelf:'center'}}>No new video!</Text>
          )}

          {this.state.newslist.length !=0 &&(
              <FlatList style= {{flexGrow:0, marginBottom:10}}
                  data={this.state.newslist}
                  numColumns={1}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this.renderRowItem}
                  extraData={this.state}
                />

            )}




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

export default VideosAll;
