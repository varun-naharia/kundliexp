import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createDrawerNavigator } from 'react-navigation-drawer';
//import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
//import { FlexibleTabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
const GLOBAL = require('./Global');
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button, Share} from 'react-native';

import Home from './Home.js';
import Otp from './Otp.js';
import Splash from './Splash.js';
import Login from './Login.js';
import Drawer from './Drawer.js';
import Signup from './Signup.js';
import TenHome from './TenHome.js';
import Wallet from './Wallet.js';
import Cart from './Cart.js';
import EditProfile from './EditProfile.js';
import ProductList from './ProductList.js';
import SubscribeList from './SubscribeList.js';
import SubscribeListIn from './SubscribeListIn.js';
import ProductListIn from './ProductListIn.js';
import ViewVideo from './ViewVideo.js';
import VideosAll from './VideosAll.js';
import VideoCall from './VideoCall.js';
import Horoscope from './Horoscope.js';
import FreeAstro from './FreeAstro.js';
import History from './History.js';
import Payment from './Payment.js';
import KundliList from './KundliList.js';
import BasicDetails from './BasicDetails.js';
import BookingScreen from './BookingScreen.js';
import PanchangDetails from './PanchangDetails.js';
import ProductDetails from './ProductDetails.js';
import KundliForm from './KundliForm.js';
import GhatChakra from './GhatChakra.js';
import AstroDetails from './AstroDetails.js';
import MyDemo from './MyDemo.js';
import Wishlist from './Wishlist.js';
import MyOrders from './MyOrders.js';
import AddressSelect from './AddressSelect.js';
import AddressAdd from './AddressAdd.js';
import ListMember from './ListMember.js';
import Notification from './Notification.js';
import LifePredHistory from './LifePredHistory.js';
import Settings from './Settings.js';
import LifePred from './LifePred.js';
import SelectDateTime from './SelectDateTime.js';
import ViewVideoHoroscope from './ViewVideoHoroscope.js';
import SelectDuration from './SelectDuration.js';
import HoroscopeDetails from './HoroscopeDetails.js';
import SelectPlace from './SelectPlace.js';
import HoroscopeMatching from './HoroscopeMatching.js';
import Chat from './Chat.js';
import MatchMaking from './MatchMaking.js';
import LifePredHistoryDetails from './LifePredHistoryDetails.js';
import Slider from './Slider.js';
import MatchMakingIn from './MatchMakingIn.js';
import MedicalAstrology from './MedicalAstrology.js';
import NumerologyForm from './NumerologyForm.js';
import NumerologyReport from './NumerologyReport.js';
import NumerologyReportSeparate from './NumerologyReportSeparate.js';
import LalKitab from './LalKitab.js';
import SadeSati from './SadeSati.js';
import GemstoneSuggestion from './GemstoneSuggestion.js';
import AddMember from './AddMember.js';
import Thankyou from './Thankyou.js';
import HoroMatchHistory from './HoroMatchHistory.js';
import HoroMatchHistoryDetails from './HoroMatchHistoryDetails.js';
import LiveStream from './LiveStream';
import HistoryInperson from './HistoryInperson.js';
import Support from './Support'
import MyOrdersDetails from './MyOrdersDetails'
import HistoryDetails from './HistoryDetails'
import Chaughadive from './Chaughadive'
import AudioCall from './AudioCall'
import SavedKundli from './SavedKundli'
import Animations from './Animations'
import GandMool from './GandMool'
import KundliListNew from './KundliListNew'
import YearlyPrediction from './YearlyPrediction'
import KpSystem from './KpSystem'
import RahuKalam from './RahuKalam'
import ViewPdf from './ViewPdf'
import PdfYours from './PdfYours'
import PdfYoursIn from './PdfYoursIn'
import DailyPanchang from './DailyPanchang'
import RudrakshSuggestion from './RudrakshSuggestion'
import LifeReports from './LifeReports'
import MatchMakingExtra from './MatchMakingExtra'

import React, {Component} from 'react';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

    navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: 'black',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 280
});


const StackNavigator = createStackNavigator({

    // Animations:{screen:Animations},

  //     Settings:{screen:Settings},

//       SelectDateTime:{screen:SelectDateTime},

//      LifePredHistoryDetails:{screen:LifePredHistoryDetails},


        Splash:{screen:Splash},
        EditProfile:{screen:EditProfile},
        Login:{screen:Login},
        Home:{screen:Home},
        TenHome:{screen:TenHome},
        DrawerNavigator:{screen:DrawerNavigator},
        Otp:{screen:Otp},
        Cart:{screen:Cart},
        Signup:{screen:Signup},
        SubscribeList:{screen:SubscribeList},
        SubscribeListIn:{screen:SubscribeListIn},
        ProductList:{screen:ProductList},
        ProductListIn:{screen:ProductListIn},
        ViewVideo:{screen:ViewVideo},
        ProductDetails:{screen:ProductDetails},
        VideosAll:{screen:VideosAll},
        FreeAstro:{screen:FreeAstro},
        BookingScreen:{screen:BookingScreen},
        Horoscope:{screen:Horoscope},
        Wallet:{screen:Wallet},
        Payment:{screen:Payment},
        BasicDetails:{screen:BasicDetails},
        KundliForm:{screen:KundliForm},
        KundliList:{screen:KundliList},
        PanchangDetails:{screen:PanchangDetails},
        GhatChakra:{screen:GhatChakra},
        AstroDetails:{screen:AstroDetails},
        AddressSelect:{screen:AddressSelect},        
        AddressAdd:{screen:AddressAdd},
        Wishlist:{screen:Wishlist},
        MyOrders:{screen:MyOrders},
        ListMember:{screen:ListMember},
        SelectPlace:{screen:SelectPlace},
        Notification:{screen:Notification},
        Settings:{screen:Settings},
        LifePredHistory:{screen:LifePredHistory},
        HoroscopeMatching:{screen:HoroscopeMatching},
        HoroscopeDetails:{screen:HoroscopeDetails},
        LifePred:{screen:LifePred},
        LifePredHistoryDetails:{screen:LifePredHistoryDetails},
        SelectDuration:{screen:SelectDuration},
        SelectDateTime:{screen:SelectDateTime},
        Chat:{screen:Chat},
        VideoCall:{screen:VideoCall},
        ViewVideoHoroscope:{screen:ViewVideoHoroscope},
        MatchMaking:{screen:MatchMaking},
        Slider:{screen:Slider},
        MatchMakingIn:{screen:MatchMakingIn},
        MedicalAstrology:{screen:MedicalAstrology},
        NumerologyForm:{screen:NumerologyForm},
        NumerologyReport:{screen:NumerologyReport},
        NumerologyReportSeparate:{screen:NumerologyReportSeparate},
        LalKitab:{screen:LalKitab},
        SadeSati:{screen:SadeSati},
        GemstoneSuggestion:{screen:GemstoneSuggestion},
        AddMember:{screen:AddMember},
        Thankyou:{screen:Thankyou},
        HoroMatchHistory:{screen:HoroMatchHistory},
        HoroMatchHistoryDetails:{screen:HoroMatchHistoryDetails},
        LiveStream:{screen:LiveStream},
        History:{screen:History},
        HistoryInperson:{screen:HistoryInperson},
        Support:{screen:Support},
        MyOrdersDetails:{screen:MyOrdersDetails},
        HistoryDetails:{screen:HistoryDetails},
        Chaughadive:{screen:Chaughadive},
        AudioCall:{screen:AudioCall},
        SavedKundli:{screen:SavedKundli},
        GandMool:{screen:GandMool},
        KundliListNew:{screen:KundliListNew},
        YearlyPrediction:{screen:YearlyPrediction},
        KpSystem:{screen:KpSystem},
        RahuKalam:{screen:RahuKalam},
        ViewPdf:{screen:ViewPdf},
        PdfYours:{screen:PdfYours},
        PdfYoursIn:{screen:PdfYoursIn},
        DailyPanchang:{screen:DailyPanchang},
        RudrakshSuggestion:{screen:RudrakshSuggestion},
        LifeReports:{screen:LifeReports},
        MatchMakingExtra:{screen:MatchMakingExtra}
    },

    {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
