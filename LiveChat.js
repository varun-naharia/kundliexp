import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat } from "react-native-gifted-chat";
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
type Props = {};
export default class LiveChat extends Component<Props> {
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


            <GiftedChat
                renderUsernameOnMessage = {true}
                messages={this.state.messages}
                onSend={message => {

                            Backend.sendMessage(message);

                }}

                user={{
                    _id: GLOBAL.user_id,
                    name: GLOBAL.userDetails.name
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