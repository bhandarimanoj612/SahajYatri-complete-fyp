import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Chat_Url } from "../../utils/config";

const ChatScreen = ({ route, navigation }) => {
  const { sender, recipient, id } = route.params;

  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${Chat_Url}`)
      .withAutomaticReconnect()
      .build();

    setConnection(hubConnection);
    hubConnection
      .start()
      .then(() => console.log("SignalR Connected!"))
      .catch((error) =>
        console.error("Error starting SignalR connection:", error)
      );

    hubConnection.on("NewPrivateMessage", (message) => {
      console.log("NewPrivateMessage");
      console.log(message);
      // Ensure that the received message has the required properties
      const formattedMessage = {
        _id: id, // Unique identifier for the message
        text: message.text, // Text content of the message
        createdAt: new Date(message.createdAt), // Date when the message was created
        user: {
          _id: message.recipient, // Unique identifier for the user who sent the message
          text: message.text, // Unique identifier for the user who sent the message
          // Additional user properties such as name and avatar can also be included here
        },
      };

      // Append the formatted message to the chat
      setMessages(() =>
        GiftedChat.append(previousMessages, [formattedMessage])
      );
    });

    return () => {
      if (hubConnection) {
        hubConnection.off("NewPrivateMessage");
        hubConnection.stop();
      }
    };
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#2B3384", //CB0A31// Customizing background color for outgoing messages
        },
        left: {
          backgroundColor: "#CB0A31", // Customizing background color for incoming messages
        },
      }}
    />
  );

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    const message = newMessages[0];
    if (connection && message.text.trim() !== "") {
      // my message is successfully shown to console
      console.log(`from[${sender}] --to[${recipient}] ==${message.text}`);

      connection.invoke("ReceivePrivateMessage", {
        from: sender,
        to: recipient,
        content: message.text,
        // createdAt: new Date().getTime(),
      });
    }
  };

  return (
    <View style={styles.container} className="dark:bg-neutral-900">
      <TouchableOpacity
        className="bg-gray-200 rounded-2xl dark:bg-neutral-800"
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 20, marginTop: 50, padding: 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ChevronDoubleLeftIcon size={wp(5)} strokeWidth={4} color="black" />
          <Text
            style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}
          ></Text>
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: "bold" }}>
            {/* Aryasn */}
          </Text>
        </View>
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        renderAvatarOnTop
        renderBubble={renderBubble}
        showUserAvatar
        onSend={(newMessages) => onSend(newMessages)}
        renderUsernameOnMessage
        bottomOffset={0}
        user={{
          _id: sender, // Assuming sender is a unique ID for the current user
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
