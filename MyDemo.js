import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Container,
  TextInput,
  Dimensions
} from "react-native";
import Button from "react-native-button";
import Header from "react-native-custom-headers";
import AsyncStorage from "@react-native-community/async-storage";
const window = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

let arrayholder = [];
var mylist = [];

export default class MyDemo extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      mylist: [
        {
          subject: "Item 1",
          body: "Lorem ipsum is a placeholder."
        },
        {
          subject: "Item 2",
          body: "demonstrate the visual form."
        },
        {
          subject: "Item 3",
          body: "text commonly used to demonstrate the visual."
        }
      ],
      modalVisible: false,
      subject: "",
      body: "",
      text: ""
    };
  }

  _keyExtractor = (item, index) => item.productID;

  renderRowItem = itemData => {
    return (
      <View
        style={{
          shadowColor: "#f7f7f7",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 0.5,
          flexDirection: "column",
          height: "auto",
          shadowOpacity: 0.5,
          flex: 1,
          backgroundColor: "white",
          borderRadius: 8,
          width: wp(96),
          marginLeft: hp(1),
          marginRight: hp(1),
          marginTop: hp(1),
          marginBottom: hp(1),
          elevation: 5
        }}
      >
        <View style={{ flexDirection: "column", margin: 10, width: "95%" }}>
          <Text
            style={{
              fontSize: 15,
              color: "#4C5361",
              fontFamily: "Nunito-Bold",
              width: "85%"
            }}
            numberOfLines={3}
          >
            {itemData.item.subject}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginRight: 10,
              marginTop: 5,
              fontFamily: "Nunito-Regular"
            }}
          >
            {itemData.item.body}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    var value = AsyncStorage.getItem("mylist");
    value.then(e => {
      //          alert(e)
      if (e == "" || e == null) {
        mylist = [];
        arrayholder = [];
        AsyncStorage.setItem("mylist", JSON.stringify(this.state.mylist));
      } else {
        //          mylist = JSON.parse(e)
        this.setState({ mylist: JSON.parse(e) });
        arrayholder = JSON.parse(e);
      }
    });
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  searchItem(text) {
    const newData = arrayholder.filter(function(item) {
      const itemData = item.subject.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      mylist: newData,
      text: text
    });
  }

  buttonClickAddMore = () => {
    this.setModalVisible(true);
  };

  buttonClickConfirm = () => {
    var item = {
      subject: this.state.subject,
      body: this.state.body
    };

    arrayholder = [...this.state.mylist, item];
    //      alert(JSON.stringify(arrayholder))
    this.setState({ mylist: arrayholder });
    AsyncStorage.setItem("mylist", JSON.stringify(arrayholder));

    this.setModalVisible(false);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          showHeaderImage={false}
          headerColor={"#E60000"}
          backImagePath={require("./resources/back.png")}
          headerName={"ITEMS"}
          headerTextStyle={{
            fontFamily: "Nunito-SemiBold",
            color: "white",
            marginLeft: 10
          }}
        />

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#e41582",
            borderBottomWidth: 1
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              position: "absolute",
              left: 10,
              top: 12
            }}
            source={require("./resources/search.png")}
          />

          <TextInput
            style={{
              marginLeft: 10,
              marginRight: 10,
              paddingLeft: 25,
              paddingBottom: 5,
              height: 40
            }}
            onChangeText={text => this.searchItem(text)}
            value={this.state.text}
            multiline={false}
            underlineColorAndroid="transparent"
            placeholder="Search item..."
          />
        </View>

        <FlatList
          style={{ backgroundColor: "#f2f2f2", flexGrow: 0 }}
          data={this.state.mylist}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRowItem}
          extraData={this.state}
        />

        <Button
          containerStyle={{
            width: "55%",
            marginTop: hp(5),
            padding: 12,
            height: 50,
            alignSelf: "center",
            overflow: "hidden",
            borderRadius: 40,
            backgroundColor: "#32a852",
            elevation: 8
          }}
          style={{
            fontSize: 18,
            color: "white",
            alignSelf: "center",
            fontWeight: "bold"
          }}
          onPress={this.buttonClickAddMore}
        >
          Add More
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //             Alert.alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              alignItems: "center"
            }}
            activeOpacity={1}
            onPressOut={() => {
              this.setModalVisible(false);
              GLOBAL.image_path = "";
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 300,
                  backgroundColor: "white",
                  height: 300,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <TextInput
                  style={{
                    marginTop: 10,
                    width: "85%",
                    height: 50,
                    fontSize: 16,
                    alignSelf: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#bfbfbf"
                  }}
                  placeholder={"Subject"}
                  autoCapitalize="none"
                  onChangeText={text => this.setState({ subject: text })}
                  placeholderTextColor="#6C6C6C"
                />

                <TextInput
                  style={{
                    marginTop: 10,
                    width: "85%",
                    height: 50,
                    fontSize: 16,
                    alignSelf: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#bfbfbf"
                  }}
                  placeholder={"Body"}
                  autoCapitalize="none"
                  onChangeText={text => this.setState({ body: text })}
                  placeholderTextColor="#6C6C6C"
                />

                <Button
                  containerStyle={{
                    width: "55%",
                    marginTop: hp(5),
                    padding: 12,
                    height: 50,
                    alignSelf: "center",
                    overflow: "hidden",
                    borderRadius: 40,
                    backgroundColor: "#32a852",
                    elevation: 8
                  }}
                  style={{
                    fontSize: 18,
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "bold"
                  }}
                  onPress={this.buttonClickConfirm}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  }
});
