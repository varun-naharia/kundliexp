import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
//import Interactable from '../../Interactable';
var randomHexColor = require('random-hex-color')
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Screen = Dimensions.get('window');
const {
  set,
  cond,
  eq,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Value,
  event,
} = Animated;

export default class CollapsibleFilter extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state={
      dec:'red'
    }
  }



  componentDidMount(){
   //      this.timeoutCheck = setTimeout(() => {
   //        this.
   // }, 1100);
 // this._interval = setInterval(() => {
 //      this.setState({dec: randomHexColor()})
 //  }, 500);

this.interval = setInterval(
    () => {  //alert('hi')
this.setState({ dec: randomHexColor() })},
    1000
  );
  }

  render() {
    return (
      <>
<TouchableOpacity>
<LinearGradient colors={['#d093f3','#a046d4']}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{margin:20, width:250, height:100, borderRadius:10, 
  justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}
 >
<View style={{flexDirection:'column'}}>
 <Text style={{fontSize:18, color:'white', marginLeft:10, fontFamily:'Nunito-ExtraBold'}}>MATCHING PDF</Text>
 <Text style={{fontSize:14, color:'white', marginLeft:10, fontFamily:'Nunito-Regular'}}>Compatibility Report</Text>
</View>
      <Animatable.Image style={{width:75, height:75, resizeMode:'contain', marginRight:9, zIndex:0}}
      source={require('./resources/heart.png')}
      animation='pulse'
      easing='ease-out-sine'
      direction ='alternate-reverse'
      iterationCount="infinite"
      delay={500}/>

       <Animatable.Image style={{height:100, width:5, position:'absolute',
       right:135}}
      animation='slideInLeft'
      iterationCount="infinite"
      easing='linear'
      imageOpacity={0.5}      
      duration={3700}
      source={require('./resources/line.png')}
      />


</LinearGradient> 
     </TouchableOpacity>



<TouchableOpacity>
<LinearGradient colors={['#d093f3','#a046d4']}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{margin:20, width:250, height:100, borderRadius:10, 
  justifyContent:'center', flexDirection:'row', alignItems:'center'}}
 >

 <Text style={{fontSize:25, color:'white',  fontFamily:'Nunito-ExtraBold', alignSelf:'center', textAlign:'center'}}>Matching{`\n`} PDF</Text>
 <Animatable.Text style={{fontSize:36, color:'rgba(255,255,255,0.5)',textAlign:'center', fontFamily:'Nunito-ExtraBold', 
 position:'absolute', alignSelf:'center'}}
animation='pulse'
      easing='ease-out-sine'
      direction ='alternate-reverse'
      iterationCount="infinite"
      delay={500} >
 Matching</Animatable.Text>




</LinearGradient> 
     </TouchableOpacity>


<TouchableOpacity>
<LinearGradient colors={['#d093f3','#a046d4']}
start={{x: 0, y: 0}} end={{x: 1, y: 0}}
 style={{margin:20, width:250, height:100, borderRadius:10, 
  justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}
 >
<View style={{flexDirection:'column'}}>
 <Text style={{fontSize:18, color:'white', marginLeft:10, fontFamily:'Nunito-ExtraBold'}}>MATCHING PDF</Text>
 <Text style={{fontSize:14, color:'white', marginLeft:10, fontFamily:'Nunito-Regular'}}>Compatibility Report</Text>
</View>
      <Animatable.Image style={{width:75, height:75, resizeMode:'contain', marginRight:9, zIndex:0}}
      source={require('./resources/pdf.png')}
      animation='rotate'
      easing='linear'      
      iterationCount="infinite"
      duration={5500}/>

       <Animatable.Image style={{height:100, width:5, position:'absolute',
       right:135}}
      animation='slideInLeft'
      iterationCount="infinite"
      easing='linear'
      imageOpacity={0.5}      
      duration={2500}
      source={require('./resources/line.png')}
      />






</LinearGradient> 
     </TouchableOpacity>



      <Animated.View style={{width:250, height:100, backgroundColor:this.state.dec, margin:30, justifyContent:'center', borderRadius:10}}>

      <Animatable.Image style={{width:30, height:30, resizeMode:'contain', alignSelf:'flex-end', marginRight:30}}
      source={require('./resources/down.png')}
      animation='rotate'
      iterationCount="infinite"
      delay={500}/>

      <Animatable.Image style={{height:100, backgroundColor:'white', width:2, position:'absolute',
       opacity:100,right:65}}
      animation='slideInLeft'
      iterationCount="infinite"
      imageOpacity={0.5}      
      />
      </Animated.View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  filterContainer: {
    backgroundColor: '#278485',
    paddingTop: 10,
  },
  filterTop: {
    height: 36,
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26,
  },
  filterField: {
    height: 40,
    backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  filterFieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 30,
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: Screen.width - 40,
    height: 190,
    marginBottom: 20,
  },
});