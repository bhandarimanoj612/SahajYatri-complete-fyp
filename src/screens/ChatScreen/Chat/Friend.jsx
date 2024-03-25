import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import randomImage from "../../../../assets/images/Budget/randomImage";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Chat_Url } from "../../utils/config";
import { StatusBar } from "expo-status-bar";

const Friend = ({ navigation, route }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Connect to SignalR hub
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${Chat_Url}`)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log("SignalR Connected!");
      })
      .catch((error) => {
        console.error("Error starting SignalR connection:", error);
      });

    hubConnection.on("OnlineUsers", (users) => {
      console.log("Received online users:", users); // Log received online users
      setOnlineUsers(users);
    });

    return () => {
      hubConnection.off("OnlineUsers");
      hubConnection.stop();
    };
  }, []);

  const handleStartChat = (recipient) => {
    navigation.navigate("PrivateMessage", {
      sender: route.params.name,
      receiver: recipient,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="black" />
      <Text style={styles.title}>Friends</Text>

      <FlatList
        data={onlineUsers}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleStartChat(item)}
            style={styles.friendContainer}
          >
            <Image
              source={randomImage()} // Use the randomImage function to get a random image
              style={styles.avatar} // Adjust the dimensions as needed
            />
            <Text
              style={[
                styles.friendName,
                item === route.params.name && styles.youText,
              ]}
            >
              {item === route.params.name ? "You" : item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.globalChatButton}
        onPress={() => navigation.navigate("GroupPage")}
      >
        <Text style={styles.globalChatButtonText}>Global Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2B3384",
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  friendName: {
    fontSize: 18,
    color: "#000000",
  },
  youText: {
    color: "#00f", // Change color as needed
    fontWeight: "bold",
  },
  globalChatButton: {
    backgroundColor: "#2B3384",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  globalChatButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Friend;
