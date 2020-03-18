import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';

import { DrawerActions } from 'react-navigation';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
type props={};
export default class SelectPlace extends Component<Props>{
    state = {
        location: '',

    };
    onPressFemale(){
        //   this.props.navigation.navigate('Duration')
    }

    componentDidMount(){
//        alert(+"")
        console.log(this.props.navigation.state)
    }    

    render(){
        return(

            <View style={{ flex: 1 }}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'SELECT PLACE OF BIRTH'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

                <GooglePlacesAutocomplete
                    placeholder="Search..."
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={"search"}
                    listViewDisplayed="false"
                    fetchDetails={true}
                    renderDescription={row =>
                        row.description || row.formatted_address || row.name

                    }
                    onPress={(data, details = null) => {
                    //    console.log(JSON.stringify(details))

                        var navigation = this.props.navigation.state.params
                        if(navigation.params.previous_screen == 'MaleMatchMaking'){
                           // alert("MaleMatchMaking")
                            navigation.params.returnDataMale(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen == 'FemaleMatchMaking'){

                            navigation.params.returnDataFeMale(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen == 'male_horo_match'){

                            navigation.params.returnDataMale(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen == 'female_horo_match'){

                            navigation.params.returnDataFeMale(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen == 'life_pred'){

                            navigation.params.returnLifePred(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen == 'add_member'){

                            navigation.params.returnMemberPlace(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            this.props.navigation.goBack()

                        }else if(navigation.params.previous_screen=='KundliForm'){

                        GLOBAL.gllat =  details.geometry.location.lat
                        GLOBAL.gllong =  details.geometry.location.lng
                        GLOBAL.glLocationName = details.formatted_address
                        this.props.navigation.goBack()

                        }

                        // if(GLOBAL.like==2){
                        // GLOBAL.lat =  details.geometry.location.lat
                        // GLOBAL.long =  details.geometry.location.lng
                        // GLOBAL.locationliketogo =  data.description

                        // this.props.navigation.goBack()
                        // }else if(GLOBAL.like==1){
                        // GLOBAL.lat =  details.geometry.location.lat
                        // GLOBAL.long =  details.geometry.location.lng
                        // GLOBAL.currLoc =  data.description

                        // this.props.navigation.goBack()
     
                        // }else{
                        // GLOBAL.lat =  details.geometry.location.lat
                        // GLOBAL.long =  details.geometry.location.lng
                        // GLOBAL.location =  data.description

                        // this.props.navigation.goBack()

                        // }

                    }}
                    getDefaultValue={() => {
                        return ""; // text input default value
                    }}
                    query={{
                        key: "AIzaSyBWX-QNm_gVzt6U2K6xeU4cmF5dkX8XUQ0",
                        language: "en", // language of the results
                        types: "(cities)" // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb"
                        }
                    }}
                    enablePoweredByContainer={true}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: ""
                    }}
                    filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                    ]}
                    debounce={200}
                />
            </View>
        );
    }
}