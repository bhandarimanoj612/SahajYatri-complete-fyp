import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Chat_Url } from "../../utils/config";
import KeyboardAvodingContainer from "../../../components/KeyboardAvodingContainer";

const GroupPage = ({ navigation }) => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${Chat_Url}`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => console.log("SignalR Connected"))
        .catch((err) => console.log("SignalR Connection Error: ", err));

      connection.on("ReceivedMessage", (receivedMessage) => {
        console.log("Received message:", receivedMessage);
        setReceivedMessages((prevMessages) => [
          ...prevMessages,
          receivedMessage,
        ]);
      });
    }
  }, [connection]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await connection.send("SendMessage", message);
        setMessage("");
      } catch (err) {
        console.log("Error sending message: ", err);
      }
    }
  };

  return (
    <KeyboardAvodingContainer
      style={styles.container}
      className="dark:bg-neutral-800 "
    >
      <TouchableOpacity
        className="bg-gray-200 rounded-2xl"
        onPress={() => navigation.goBack()}
        style={{ padding: 20, width: 350, marginBottom: 15 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ChevronDoubleLeftIcon size={wp(5)} strokeWidth={4} color="black" />
          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.messagesContainer}>
        {receivedMessages.map((msg, index) => (
          <Text key={index} style={styles.messageText}>
            {msg}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvodingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  messagesContainer: {
    marginBottom: 10,
    width: "100%",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default GroupPage;
