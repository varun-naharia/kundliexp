import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Container,
  Linking,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import moment from 'moment';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import RazorpayCheckout from 'react-native-razorpay';
import IndicatorCustom from './IndicatorCustom.js';

type Props = {};

export default class PaymentBackup extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      name: '',
      debit:false,
      wallet: false,
      refer: false,
      value: 0,
      prices: '',
      referralrs: GLOBAL.userDetails.refferal_wallet,
    // referralrs : "40",
      walletAmount: GLOBAL.walletAmount,
     // walletAmount: "500.00",
      t_ax : '0',
      finalRef: "0",
      finalWall : "0",
      coupan_code: '0',
      coupan_code_id: '0',
      radio_props: [
        {label: 'Debit/Credit Card/Netbanking', value: 0},
        {label: 'Wallet ' + `(₹ ${GLOBAL.walletAmount})`, value: 1},
        {label: 'Referral Wallet (Max. 10% can be applied)', value: 2},
      ],
    };
  }

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    this.setState({loading: false});
  }


debitstate = () => {
    this.setState({ debit: !this.state.debit });
    setTimeout(() => {
      // write your functions
      this.calculation();
    }, 100);
  };

walletStateChange = () => {
    var w = parseFloat(this.state.walletAmount)

    if( w == 0){
      alert('You dont have any wallet balance')      

    }else{

    this.setState({ wallet: !this.state.wallet });

    setTimeout(() => {
      // write your functions
      this.calculation();
    }, 100);

    }

  };

  referalState = () => {
    var a = parseFloat(this.state.referralrs)
    if(a == 0){
      alert('You dont have any referral balance')      
    }else{
    this.setState({ refer: !this.state.refer });
    setTimeout(() => {
      // write your functions
      this.calculation();
    }, 100);

    }
  };

  componentDidMount() {
   // console.log(this.props.navigation.state.params.params);

    this.getReviews();
  }

  getReviews = () => {
    //      console.warn(GLOBAL.user_id + '|' + 'online' +'|' + '1')
    const url = GLOBAL.BASE_URL + 'master_prices';
    //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'list',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //       this.hideLoading()

        // console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          this.setState({prices: responseJson.response});

  var get_price = '';
  var tax_calc
    if (
      this.props.navigation.state.params.params.previous_screen ==
      'horo_matching'
    ) {
      get_price = responseJson.response.match_making_price;
    } else if(this.props.navigation.state.params.params.previous_screen =='life_pred'){
      get_price = responseJson.response.life_prediction_price;
//      alert('hi')
    }else if(this.props.navigation.state.params.params.previous_screen =='astro_classes'){
      var get_tax = parseFloat(GLOBAL.classTax)
      var getItem =this.props.navigation.state.params.params.item
      get_price = getItem.base_price;
      tax_calc = parseFloat(get_price) * (get_tax/ 100)
      get_price = parseFloat(get_price) + tax_calc
     // alert(price_with_tax)
      console.log('astro_classess', this.props.navigation.state.params.params.item)
    }else if(this.props.navigation.state.params.params.previous_screen =='chat'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('chat pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='video'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('video pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='inperson'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('inperson pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='from_cart'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('from cart', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='audio'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('audio call book', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='paid_pdf'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = responseJson.response.varshphal_pdf;

      console.log('paid pdf', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='medical_astro'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.total_amount;

      console.log('medical_astro', this.props.navigation.state.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='financial_astro'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.total_amount;

      console.log('financial_astro', this.props.navigation.state.params)
    }
//    alert(get_price)
    this.setState({finalCheckoutPrice: get_price,
      totalPay: get_price - tax_calc,
      t_ax: get_tax
    })   
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };



  payNow = payType => {

    var decide_for = '';
    var decide_module = '';

    var get_price = '';

    var navigation=this.props.navigation;

      if (this.state.wallet == false && this.state.debit == false && this.state.refer == false) {
        alert("Please choose the paymeny method to continue");
        return;
      }else{

            if (navigation.state.params.params.previous_screen =='horo_matching') {
              decide_for = '4';
              decide_module = 'matchmaking';
              get_price = this.state.prices.match_making_price;


              if(this.state.finalCheckoutPrice == 0){

                const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    from_payment_gateway:"0",
                    payment_from:"normal",
                    discount_amount: '0',                    
                    total_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }

//                alert(JSON.stringify(navigation.state.params.params.finalData))
                // const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var finalBody = {...body , ...navigation.state.params.params.finalData}
                console.log(JSON.stringify(finalBody))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      // var commonHtml = `${GLOBAL.user_id}|emergency|${responseJson.id}`;

                      // this.rajorPay(commonHtml)

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });


              }else{
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    payment_from:"normal",
                    discount_amount: '0',                    
                    total_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }

//                alert(JSON.stringify(navigation.state.params.params.finalData))
                // const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var finalBody = {...body , ...navigation.state.params.params.finalData}
                console.log("temp"+JSON.stringify(finalBody))

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

  //                    this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });


              }              
            }

            else if(navigation.state.params.params.previous_screen=='life_pred'){
//              alert('life_pred')

              decide_for = '5';
              decide_module = 'lifeprediction';
              get_price = this.state.prices.life_prediction_price;


              if(this.state.finalCheckoutPrice == 0){
                const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    from_payment_gateway:"0",
                    payment_from:"normal",
                    discount_amount: '0',                    
                    order_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }

//                alert(JSON.stringify(navigation.state.params.params.finalData))
                // const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var finalBody = {...body , ...navigation.state.params.params.finalData}
                console.log(JSON.stringify(finalBody))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      // var commonHtml = `${GLOBAL.user_id}|emergency|${responseJson.id}`;

                      // this.rajorPay(commonHtml)

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

              }else{

                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    payment_from:"normal",
                    discount_amount: '0',                    
                    total_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }

//                alert(JSON.stringify(navigation.state.params.params.finalData))
                // const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var finalBody = {...body , ...navigation.state.params.params.finalData}
                console.log("temp"+JSON.stringify(finalBody))

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

//                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });


              }
            }
            else if(navigation.state.params.params.previous_screen=='astro_classes'){
              //alert('astro_classes')
              var getItem = navigation.state.params.params.item
              console.log(JSON.stringify(navigation.state.params.params.item))
              decide_for ='7'
              decide_module = 'classpackage'
              get_price = getItem.base_price
              var package_id = getItem.id


              if(this.state.finalCheckoutPrice == 0){
               // alert('perm')
                const url = GLOBAL.BASE_URL + "add_permanent_booking";
                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    package_id: package_id,
                    total_amount: get_price.toString(),
                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    payment_gateway_amount:"0",
                    payment_from:"normal",
                    discount_amount: '0',                    
                    order_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }
                    console.log(JSON.stringify(body))

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

              }else{
              var commonHtml = `${GLOBAL.user_id}|${decide_module}|${package_id}|${get_price}|${get_price}|${this.state.finalWall.toString()}|${this.state.finalRef.toString()}|${'0'}|${decide_module}|${'0'}|${'0'}`;
              console.log(commonHtml)
              this.rajorPay(commonHtml)

              }





            }else if(navigation.state.params.params.previous_screen=='chat'){
              console.log('---------------chat pay')
              var getItem = navigation.state.params.params.finalData
              console.log(JSON.stringify(getItem))
              decide_for ='2'
              decide_module = 'chat'
              var decide_booking_type='2' //1 = ask for question, 2 = for online counsult
              get_price = getItem.price
              var decide_type = 'online'
              var decide_booking_for = GLOBAL.dec_single_sel_member
              var mem_ids= GLOBAL.single_sel_member

              if(this.state.finalCheckoutPrice == 0){
                
              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              } 

              console.log('---perm++'+JSON.stringify(body))

                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }else{
               // alert('temp')
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                
                var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway: this.state.finalCheckoutPrice.toString(),
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              }

              console.log('---temp++'+JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_type}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }
            }else if(navigation.state.params.params.previous_screen=='video'){
              console.log('---------------video pay')
              var getItem = navigation.state.params.params.finalData
              console.log(JSON.stringify(getItem))
              decide_for ='2'
              decide_module = 'video'
              var decide_booking_type='2' //1 = ask for question, 2 = for online counsult
              get_price = getItem.price
              var decide_type = 'online'
              var decide_booking_for = GLOBAL.dec_single_sel_member
              var mem_ids= GLOBAL.single_sel_member

          
              if(this.state.finalCheckoutPrice == 0){
                
              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              } 
                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }else{
               // alert('temp')
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                
                var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway: this.state.finalCheckoutPrice.toString(),
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              }

              console.log('---temp++'+JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_type}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }

      }else if(navigation.state.params.params.previous_screen=='inperson'){
              console.log('---------------inperson pay')
              var getItem = navigation.state.params.params.finalData
              console.log(JSON.stringify(getItem))
              decide_for ='6'
              decide_module = 'inperson'
              get_price = getItem.price


        if(this.state.finalCheckoutPrice==0){
            const url = GLOBAL.BASE_URL + "add_permanent_booking";
            var body ={
                for: decide_for,
                module: decide_module,
                user_id: GLOBAL.user_id,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                event_id: getItem.event_id,
                multiple_members: GLOBAL.sel_members,
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                payment_from: 'normal',
                from_payment_gateway: '0',
                coupan_code:'0',
                coupan_code_id:'0',                
              }
              console.log(JSON.stringify(body))
             fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
        }else{
            const url = GLOBAL.BASE_URL + "add_temporary_booking";
              var body ={
                for: decide_for,
                module: decide_module,
                user_id: GLOBAL.user_id,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                event_id: getItem.event_id,
                multiple_members: GLOBAL.sel_members,
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                coupan_code:'0',
                coupan_code_id:'0',                
              }

              console.log('---temp++'+JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
        }

      }else if(navigation.state.params.params.previous_screen=='from_cart'){
         console.log('---------------cart pay')
        var getItem = navigation.state.params.params.finalData
        console.log(JSON.stringify(getItem))
        decide_for ='3'
        decide_module = 'gems'
        var decide_booking_type='2'
        get_price = getItem.price


        if(this.state.finalCheckoutPrice==0){
            const url = GLOBAL.BASE_URL + "add_permanent_booking";
            var body ={
                for: decide_for,
                user_id: GLOBAL.user_id,
                module: decide_module,
                total_amount: get_price,
                tax_amount: GLOBAL.gemsTax,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                name:GLOBAL.userDetails.name,
                email:GLOBAL.userDetails.email,
                mobile:GLOBAL.userDetails.phone,
                address: getItem.address,
                area: getItem.area,
                pincode: getItem.pincode,
                city_state: getItem.city_state,
                payment_from: 'normal',
                from_payment_gateway: '0',
                coupan_code:'0',
                coupan_code_id:'0',                
              }
              console.log(JSON.stringify(body))

             fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

        }else{

           const url = GLOBAL.BASE_URL + "add_temporary_booking";
            var body ={
                for: decide_for,
                user_id: GLOBAL.user_id,
                module: decide_module,
                total_amount: get_price,
                tax_amount: GLOBAL.gemsTax,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                name:GLOBAL.userDetails.name,
                email:GLOBAL.userDetails.email,
                mobile:GLOBAL.userDetails.phone,
                address: getItem.address,
                area: getItem.area,
                pincode: getItem.pincode,
                city_state: getItem.city_state,
                payment_from: 'rajorpay',
                from_payment_gateway: '0',
                coupan_code:'0',
                coupan_code_id:'0',                
              }
              console.log('---temp++'+JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

        }

      }else if(navigation.state.params.params.previous_screen=='audio'){

              console.log('---------------audio pay')
              var getItem = navigation.state.params.params.finalData
              console.log(JSON.stringify(getItem))
              decide_for ='2'
              decide_module = 'audio'
              var decide_booking_type='2' //1 = ask for question, 2 = for online counsult
              get_price = getItem.price
              var decide_type = 'online'
              var decide_booking_for = GLOBAL.dec_single_sel_member
              var mem_ids= GLOBAL.single_sel_member

          


              if(this.state.finalCheckoutPrice == 0){
                
              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              } 
                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }else{
               // alert('temp')
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                
                var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                expert_id: GLOBAL.expId,
                booking_for: decide_booking_for,
                member_id: mem_ids,
                booking_time: getItem.booking_time,
                booking_date: getItem.booking_date,
                total_minutes: getItem.minutes,
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway: this.state.finalCheckoutPrice.toString(),
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                discount_amount: '0',
                trxn_mode:'normal'
              }

              console.log('---temp++'+JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_type}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }

      }else if(navigation.state.params.params.previous_screen=='paid_pdf'){

              decide_for = '8';
              decide_module = 'varshfhal';
              get_price = this.state.prices.varshphal_pdf;
              var FULL_DOB = GLOBAL.glyear +'-'+GLOBAL.glmonth +'-'+GLOBAL.gldate
              var FULL_TOB = GLOBAL.glhour + ':'+ GLOBAL.glminute

              console.log(JSON.stringify(GLOBAL.userDetails))
              if(this.state.finalCheckoutPrice == 0){
                const url = GLOBAL.BASE_URL + "add_permanent_booking";

                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    name: GLOBAL.userDetails.name,
                    dob: FULL_DOB,
                    tob: FULL_TOB,
                    pob: GLOBAL.glLocationName,
                    lat: GLOBAL.gllat,
                    long: GLOBAL.gllong,
                    lat_long_address: GLOBAL.glLocationName,
                    timezone: GLOBAL.glzone,
                    mobile: GLOBAL.userDetails.phone,
                    email: GLOBAL.userDetails.email,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    from_payment_gateway:"0",
                    payment_from:"normal",
                    discount_amount: '0',                    
                    order_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }


                console.log(JSON.stringify(body))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

              }else{

                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                var body = {
                    user_id: GLOBAL.user_id,
                    for: decide_for,
                    module: decide_module,

                    name: GLOBAL.userDetails.name,
                    dob: FULL_DOB,
                    tob: FULL_TOB,
                    pob: GLOBAL.glLocationName,
                    lat: GLOBAL.gllat,
                    long: GLOBAL.gllong,
                    lat_long_address: GLOBAL.glLocationName,
                    timezone: GLOBAL.glzone,
                    mobile: GLOBAL.userDetails.phone,
                    email: GLOBAL.userDetails.email,

                    coupan_code: this.state.coupan_code,
                    coupan_code_id: this.state.coupan_code_id,
                  
                    payment_from:"normal",
                    discount_amount: '0',                    
                    total_amount: get_price.toString(),
                    wallet_amount: this.state.finalWall.toString(),
                    referral_amount: this.state.finalRef.toString(),
                  }

                console.log("temp"+JSON.stringify(body))

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${'pdfbooking'}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

//                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });


              }

      }else if(navigation.state.params.params.previous_screen=='medical_astro'){

              console.log('---------------medical_astro pay')
              var getItem = navigation.state.params.params.finalData
              // console.log(JSON.stringify(getItem))
              decide_for ='9'
              decide_module = 'medical'
              get_price = getItem.total_amount


              if(this.state.finalCheckoutPrice == 0){
                
              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                tax_amount: '2',
                discount_amount: '0',
                payment_from:'normal'
              } 

              var finalBody = {...body , ...navigation.state.params.params.finalData}

              console.log('---perm++'+JSON.stringify(finalBody))

                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }else{
               // alert('temp')
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                
                var body={
                for: decide_for,
                user_id: GLOBAL.user_id,
                module: decide_module,
                coupan_code:'0',
                coupan_code_id:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                tax_amount:'2',
                discount_amount: '0',
              }
              var finalBody = {...body , ...navigation.state.params.params.finalData}

              console.log('---temp++'+JSON.stringify(finalBody))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }

      }else if(navigation.state.params.params.previous_screen=='financial_astro'){

              console.log('---------------financial_astro pay')
              var getItem = navigation.state.params.params.finalData
              // console.log(JSON.stringify(getItem))
              decide_for ='10'
              decide_module = 'financial'
              get_price = getItem.total_amount


              if(this.state.finalCheckoutPrice == 0){
                
              const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: decide_for,
                booking_type: decide_booking_type,
                user_id: GLOBAL.user_id,
                module: decide_module,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                tax_amount: '2',
                discount_amount: '0',
                payment_from:'normal'
              } 

              var finalBody = {...body , ...navigation.state.params.params.finalData}

              console.log('---perm++'+JSON.stringify(finalBody))

                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {

                      this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }else{
               // alert('temp')
                const url = GLOBAL.BASE_URL + "add_temporary_booking";
                
                var body={
                for: decide_for,
                user_id: GLOBAL.user_id,
                module: decide_module,
                coupan_code:'0',
                coupan_code_id:'0',
                total_amount: get_price,
                wallet_amount: this.state.finalWall.toString(),
                referral_amount: this.state.finalRef.toString(),
                tax_amount:'2',
                discount_amount: '0',
              }
              var finalBody = {...body , ...navigation.state.params.params.finalData}

              console.log('---temp++'+JSON.stringify(finalBody))
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(finalBody)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      var commonHtml = `${GLOBAL.user_id}|${decide_module}|${responseJson.id}`;

                       this.rajorPay(commonHtml)

                      //this.props.navigation.navigate("Thankyou");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });
              }
}


      }


    console.log(decide_for +'--'+ decide_module + '--'+ get_price)


  };


  testings=()=>{
    console.log('finalCheckoutPrice--> '+ this.state.finalCheckoutPrice+
                'finalref-->  '+this.state.finalRef+
                'finalWall-->  '+ this.state.finalWall+
                'totalPay-->  '+ this.state.totalPay)
  }


  calculation = (value) => {
    var get_price = '';

    if (
      this.props.navigation.state.params.params.previous_screen ==
      'horo_matching'
    ) {
      get_price = this.state.prices.match_making_price;
    } else if(this.props.navigation.state.params.params.previous_screen =='life_pred'){
      get_price = this.state.prices.life_prediction_price;
//      alert('hi')
    }else if(this.props.navigation.state.params.params.previous_screen =='astro_classes'){
      var getItem =this.props.navigation.state.params.params.item
      get_price = getItem.base_price;
      console.log('astro_classess', this.props.navigation.state.params.params.item)
    }else if(this.props.navigation.state.params.params.previous_screen =='chat'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('chat pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='video'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('video pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='inperson'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('inperson pay', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='from_cart'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('from cart', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='audio'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.price;

      console.log('from audio', this.props.navigation.state.params.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='paid_pdf'){
      get_price = this.state.prices.varshphal_pdf;
    }else if(this.props.navigation.state.params.params.previous_screen =='medical_astro'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.total_amount;

      console.log('medical_astro', this.props.navigation.state.params)
    }else if(this.props.navigation.state.params.params.previous_screen =='financial_astro'){
      var getItem =this.props.navigation.state.params.params.finalData
      get_price = getItem.total_amount;

      console.log('financial_astro', this.props.navigation.state.params)
    }

    if(this.state.wallet == false && this.state.debit== false && this.state.refer ==false){
   //     alert('none')
        this.setState({finalCheckoutPrice: get_price,
          totalPay: get_price,
          finalWall : 0,
          finalRef : 0
        })
    }else if(this.state.wallet == true && this.state.debit== false && this.state.refer ==false){
        var aa = parseFloat(get_price);
        var bb = parseFloat(this.state.walletAmount);

        // var total = 0;

        // if(aa <= bb){

        //   bb=bb-aa
        // }else{
        //   aa = aa -bb
        //   total = aa
        //   bb = 0
        // }
//        bb=50

        var cc = bb-aa
        if(cc > 0){
        this.setState({finalCheckoutPrice: 0,
          finalWall: get_price,
          totalPay: get_price,          
          finalRef: 0
        })

        }else{
          var ss = aa - bb
        this.setState({finalCheckoutPrice: ss,
          finalWall: bb,
          totalPay: get_price,
          finalRef: 0
        })

        }


            // if (c>0){
            //    this.setState({finalwal :this.state.finalPrice})
            //     this.setState({finalPrice:0})
            //     this.setState({finalref :"0"})
            // }else{
            //     var s = a - b
            //     this.setState({finalwal :b})
            //     this.setState({finalPrice:s})
            //     this.setState({finalref :"0"})
            // }


      //  alert('wallet' + bb)

        // this.setState({finalCheckoutPrice: total,
        //   finalWall: get_price,
        //   totalPay: get_price,          
        //   finalRef: 0
        // })

    }else if(this.state.wallet == false && this.state.debit== true && this.state.refer ==false){

        // var aa = parseFloat(this.state.walletAmount);
        var bb = parseFloat(get_price);
        // var cc = aa - bb
        this.setState({finalCheckoutPrice:     bb,
          finalWall: 0,
          totalPay: get_price,          
          finalRef: 0
            })

       // alert('debit' +bb)
    }else if(this.state.wallet == false && this.state.debit== false && this.state.refer ==true){
      // use only 10% of balance
        var aa = ((parseFloat(this.state.referralrs))*10)/100;
        var bb = parseFloat(get_price);
//        var cc = bb - aa
        if (bb >= aa){

          this.setState({finalCheckoutPrice: bb-aa,
          finalRef: aa,
          totalPay: get_price,          
          finalWall: 0
        })


        }else{
          this.setState({finalCheckoutPrice: 0,
          finalRef: bb,
          totalPay: get_price,          
          finalWall: 0
        })
        }
      //  alert('referral' + cc)

    }else if(this.state.wallet == false && this.state.debit== true && this.state.refer ==true){

        var aa = ((parseFloat(this.state.referralrs))*10)/100;
        var bb = parseFloat(get_price);
//        var cc = bb - aa
        if (bb >= aa){

          this.setState({finalCheckoutPrice: bb-aa,
          finalRef: aa,
          totalPay: get_price,          
          finalWall: 0
        })


        }else{
          this.setState({finalCheckoutPrice: 0,
          finalRef: bb,
          totalPay: get_price,          
          finalWall: 0
        })
        }
        // this.setState({finalCheckoutPrice: cc,
        //   finalRef: aa,
        //   totalPay: get_price,          
        //   finalWall: 0
        // })

       // alert('debit refer' +total)
    }else if(this.state.wallet == true && this.state.debit== true && this.state.refer ==false){
        var aa = parseFloat(get_price);
        var bb = parseFloat(this.state.walletAmount);

        // var total = 0;

        // if(aa <= bb){

        //   bb=bb-aa
        // }else{
        //   aa = aa -bb
        //   total = aa
        //   bb = 0
        // }
//        bb=50

        var cc = bb-aa
        if(cc > 0){
        this.setState({finalCheckoutPrice: 0,
          finalWall: get_price,
          totalPay: get_price,          
          finalRef: 0
        })

        }else{
          var ss = aa - bb
        this.setState({finalCheckoutPrice: ss,
          finalWall: bb,
          totalPay: get_price,
          finalRef: 0
        })

        }


            // if (c>0){
            //    this.setState({finalwal :this.state.finalPrice})
            //     this.setState({finalPrice:0})
            //     this.setState({finalref :"0"})
            // }else{
            //     var s = a - b
            //     this.setState({finalwal :b})
            //     this.setState({finalPrice:s})
            //     this.setState({finalref :"0"})
            // }

        // this.setState({finalCheckoutPrice: total,
        //   finalWall: get_price,
        //   totalPay: get_price,          
        //   finalRef: 0
        // })
//        alert('wallet debit'+ total)
    }else if(this.state.wallet == true && this.state.debit== true && this.state.refer ==true){

        var aa = ((parseFloat(this.state.referralrs))*10)/100;
        var bb = parseFloat(get_price);
        var zz = parseFloat(this.state.walletAmount);      
        // var sum = aa+zz
        // var total = 0;
        var cc = bb - (aa+zz)

        if(cc < 0){

        this.setState({finalCheckoutPrice: 0,
          finalWall: get_price - aa,
          totalPay: get_price,       
          finalRef: aa
        })

        }else{
        this.setState({finalCheckoutPrice: cc,
          finalWall: zz,
          totalPay: get_price,          
          finalRef: aa
        })

        }

       // alert('wallet debit refer' +zz)
    }else if(this.state.wallet == true && this.state.debit== false && this.state.refer ==true){
        var aa = ((parseFloat(this.state.referralrs))*10)/100;
        var bb = parseFloat(get_price);
        var zz = parseFloat(this.state.walletAmount);      
        // var sum = aa+zz
        // var total = 0;
        var cc = bb - (aa+zz)

        if(cc < 0){

        this.setState({finalCheckoutPrice: 0,
          finalWall: get_price - aa,
          totalPay: get_price,       
          finalRef: aa
        })

        }else{
        this.setState({finalCheckoutPrice: cc,
          finalWall: zz,
          totalPay: get_price,          
          finalRef: aa
        })

        }


            // var a = parseInt(GLOBAL.price)
            // var b = parseInt(this.state.walletrs)
            // var s = parseInt(this.state.referralrs)
            // var c =  a - (b + s)

            // if (c <= 0){
            //     this.setState({finalPrice:0})
            //     this.setState({finalwal :b})
            //     this.setState({finalref :s})

            // }else{


            //     this.setState({finalPrice:c})
            //     this.setState({finalwal :b})
            //     this.setState({finalref :s})
            // }

        // if(sum <= bb){
        //   bb= bb-sum
        //   total =bb
        // }else{
        //   sum= sum-bb
        //   bb=0
        // total =sum
        // }


        // if(zz< bb){
        //     total =  bb-zz
        // }else{
        //   total = zz-bb
        // }
//        total = (aa+zz)-bb



        // this.setState({finalCheckoutPrice: bb,
        //   finalWall: get_price-aa,
        //   totalPay: get_price,          
        //   finalRef: aa
        // })

     //   alert('wallet refer' + total)
    }

    console.log('finalCheckoutPrice--> '+ this.state.finalCheckoutPrice+
                '  finalref-->  '+this.state.finalRef+
                '  finalWall-->  '+ this.state.finalWall+
                '  totalPay-->  '+ this.state.totalPay)

  };






  rajorPay = para => {
    var finalPrice = parseFloat(this.state.finalCheckoutPrice) * 100;
    // var desc = GLOBAL.user_id + '|' + 'online' + '|' + responseJson.id;
    var desc = para
    var options = {
      description: desc,
      image: {uri: require('./resources/kundli_logo.png')},
      currency: 'INR',
      key: 'rzp_test_XSUYUlOXU9O4AG',
      amount: finalPrice,
      name: GLOBAL.userDetails.name,
      prefill: {
        email: GLOBAL.userDetails.email,
        contact: GLOBAL.userDetails.email.phone,
        name: 'Razorpay Software',
      },
      theme: {color: '#E60000'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log(`Success: ${data.razorpay_payment_id}`);
        this.props.navigation.navigate('Thankyou')
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  render() {
    var radio_props = [
      {label: 'Debit/Credit Card/Netbanking', value: 0},
      {label: 'Wallet ' + `(₹ ${GLOBAL.walletAmount})`, value: 1},
      {label: 'Referral Wallet (Max. 10% can be applied)', value: 2},
    ];

    // var finalCheckoutPrice = '';

    // if (
    //   this.props.navigation.state.params.params.previous_screen ==
    //   'horo_matching'
    // ) {
    //   finalCheckoutPrice = this.state.prices.match_making_price;
    // } else {
    // }
    // console.log('checkout_price--->' + finalCheckoutPrice);

    if (this.state.loading) {
      return <IndicatorCustom />;
    }
    return (
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#F5F5F5'}}>
        <Header
          navigation={this.props.navigation}
          showHeaderImage={false}
          headerColor={'#E60000'}
          backImagePath={require('./resources/back.png')}
          headerName={'PAYMENT'}
          headerTextStyle={{
            fontFamily: 'Nunito-SemiBold',
            color: 'white',
            marginLeft: 10,
          }}
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#F5F5F5',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: wp(100),
                marginTop: hp(3),
                backgroundColor: 'white',
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  marginLeft: wp(3),
                  marginTop: hp(1),
                  fontFamily: 'Nunito-Bold',
                }}>
                Payment Options
              </Text>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: hp(1),
                  width: wp(95),
                  alignSelf: 'center',
                }}
              />
              <View style={{flexDirection: 'row'}}>
                    <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: wp(5),
                    marginTop: hp(2),
                    marginRight: wp(2),
                  }}>
                  <Image
                    style={{height: 40, width: 40, resizeMode: 'contain'}}
                    source={require('./resources/cardlogo.png')}
                  />

                  <Image
                    style={{height: 40, width: 40, resizeMode: 'contain'}}
                    source={require('./resources/cardlogo.png')}
                  />

                  <Image
                    style={{height: 40, width: 40, resizeMode: 'contain'}}
                    source={require('./resources/cardlogo.png')}
                  />

                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: wp(1),
                    marginTop: hp(2),
                  }}>


 <TouchableOpacity onPress={() => this.debitstate()}>
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Text
                    style={{
                      fontFamily: "Nunito-SemiBold",
                      color: "black",
                      fontSize: 14,
                      width: wp(67),
                      marginTop: 6
                    }}
                  >
                    Debit/Credit/NetBanking
                  </Text>

                  {this.state.debit == false && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_untick.png")}
                    />
                  )}
                  {this.state.debit == true && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_tick.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>                  


              <TouchableOpacity onPress={() => this.referalState()}>
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Text
                    style={{
                      fontFamily: "Nunito-SemiBold",
                      color: "black",
                      fontSize: 14,
                      width: wp(67),
                      marginTop: 6
                    }}
                  >
                    Use 10% Referral Bonus Rs {this.state.referralrs}
                  </Text>

                  {this.state.refer == false && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_untick.png")}
                    />
                  )}
                  {this.state.refer == true && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_tick.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.walletStateChange()}>
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Text
                    style={{
                      fontFamily: "Nunito-SemiBold",
                      color: "black",
                      fontSize: 14,
                      width: wp(67),
                      marginTop: 6
                    }}
                  >
                    Use Wallet Rs {this.state.walletAmount}
                  </Text>

                  {this.state.wallet == false && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_untick.png")}
                    />
                  )}
                  {this.state.wallet == true && (
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 12,
                        marginTop: 6
                      }}
                      source={require("./resources/ic_tick.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>

{/*                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    animation={false}
                    selectedButtonColor={'#E60000'}
                    buttonColor={'#00000040'}
                    buttonSize={13}
                    radioStyle={{paddingTop: wp(1.5), paddingBottom: wp(0.5)}}
                    buttonOuterSize={25}
                    labelStyle={{fontFamily: 'Nunito-SemiBold', width: wp(70)}}
                    onPress={value => {
                      this.calculation(value);
                    }}
                  /> */}
                </View>

              </View>
            </View>

            <Text
              style={{
                fontSize: 17,
                color: 'black',
                marginLeft: wp(3),
                marginTop: hp(2),
                fontFamily: 'Nunito-Bold',
              }}>
              Payment Summary
            </Text>

            <View
              style={{
                width: wp(100),
                marginTop: 17,
                backgroundColor: 'white',
                flexDirection: 'column',
              }}>

              <View
                style={{
                  marginTop: hp(2),
                  flexDirection: 'row',
                  height: hp(3),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginRight: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  ₹ {this.state.totalPay}/-
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />

              <View
                style={{
                  marginTop: hp(2),
                  flexDirection: 'row',
                  height: hp(3),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  From Wallet
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginRight: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  - ₹ {this.state.finalWall}/-
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />

              <View
                style={{
                  marginTop: hp(2),
                  flexDirection: 'row',
                  height: hp(3),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  From Referral Wallet
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginRight: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  - ₹ {this.state.finalRef}/-
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />

              <View
                style={{
                  marginTop: hp(2),
                  flexDirection: 'row',
                  height: hp(3),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  Tax
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 0.5)',
                    marginRight: wp(5),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  {this.state.t_ax}%
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />

              <View
                style={{
                  marginTop: hp(2),
                  flexDirection: 'row',
                  height: hp(3),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 1)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Bold',
                  }}>
                  Amount Payable
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 1)',
                    marginRight: wp(5),
                    fontFamily: 'Nunito-Bold',
                  }}>
                  ₹ {this.state.finalCheckoutPrice}/-
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />
            </View>

            <View
              style={{
                width: wp(100),
                backgroundColor: 'white',
                height: hp(8),
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
              }}>
              <View
                style={{
                  width: wp(45),
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(0, 0, 0, 1)',
                    marginLeft: wp(5),
                    fontFamily: 'Nunito-Bold',
                  }}>
                  Total Pay
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#E60000',
                    marginLeft: wp(3),
                    fontFamily: 'Nunito-Bold',
                  }}>
                  ₹ {this.state.finalCheckoutPrice}/-
                </Text>
              </View>
              <Button
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-Regular',
                  color: 'white',
                }}
                containerStyle={{
                  height: hp(6),
                  width: wp(40),
                  borderRadius: 25,
                  marginRight: wp(3),
                  backgroundColor: '#E60000',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.payNow('payType');
                }}>
                PAY NOW
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
