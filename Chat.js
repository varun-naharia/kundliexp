import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat } from "react-native-gifted-chat";
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Header from 'react-native-custom-headers';
type Props = {};
export default class Chat extends Component<Props> {
    state = {
        messages: []
    };



    renderBubble(props) {

        return (
            <View>
                <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
            </View>
        );
    }
    componentWillMount() {

    }
    render() {
        return (

<View style={{flex:1}}>
           <Header navigation={this.props.navigation}
           showHeaderImage={false}
           headerColor ={'#E60000'}
           backImagePath={require('./resources/back.png')}
           headerName={'CHAT'}
           headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />

            <GiftedChat
                renderUsernameOnMessage = {true}
                messages={this.state.messages}
                onSend={message => {
                    Backend.sendMessage(message);
                }}

                user={{
                    _id: '1',
                    name: 'Harshit Agrawal'
                }}
            />
</View>
        );
    }


    componentDidMount() {
        Backend.loadMessages(message => {
            this.setState(previousState => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}