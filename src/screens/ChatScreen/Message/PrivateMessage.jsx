import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// create a component
const PrivateMessage = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { sender, recipient } = route.params;
  useEffect(() => {
    setMessages([
      {
        //this is  the the the one who is sending message to us
        _id: 1, //here i should add the user id who is sending messageing to us
        text: "hii", //this is the text send by the  user
        createdAt: new Date(),
        user: {
          _id: 2,
          name: recipient, //this is the place where the sender name is shown or image
        },
      },
      {
        _id: 2, //i need to add this 2 with connection id of my
        text: "Hello world", //this is my message send by me
        createdAt: new Date(),
        user: {
          _id: 1,
          name: recipient,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons //this is used for custimizing the send message icons
            name="arch"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={42}
            color="#2B3384"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    //this is the section where user send message
    return (
      <Bubble //this below is used for customizing the color of message
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2B3384",
          },
          left: {
            backgroundColor: "white",
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "black",
          },
        }}
      />
    );
  };
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={32} color="#333" />;
  };

  return (
    // <View className="dark:bg-gray-900">
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend //for making send button display on the home screen
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
    // </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default PrivateMessage;
