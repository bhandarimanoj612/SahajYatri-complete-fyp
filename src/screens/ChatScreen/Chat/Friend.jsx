// FriendsScreen.js

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
    // navigation.navigate("PrivateMessage", {
    navigation.navigate("ChatScreen", {
      sender: route.params.name,
      recipient,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="black" />
      <View style={styles.container} className="dark:bg-neutral-900">
        <TouchableOpacity
          className="bg-gray-200 rounded-xl dark:bg-neutral-800"
          onPress={() => navigation.goBack()}
          style={{ padding: 5 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ChevronDoubleLeftIcon size={wp(6)} strokeWidth={4} color="black" />
          </View>
        </TouchableOpacity>
        <Text className="font-bold text-2xl m-4 text-[#2B3384] ">Friends</Text>

        <FlatList
          data={onlineUsers}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleStartChat(item)}
              className="bg-white rounded-2xl m-3 items-center dark:bg-neutral-800"
            >
              <Image
                source={randomImage()} // Use the randomImage function to get a random image
                style={styles.avatar} // Adjust the dimensions as needed
              />
              <Text
                style={[
                  styles.friendName,
                  item === route.params.name && styles.youText, // Apply different styles for "You"
                ]}
                className="font-Bold text-green-700"
              >
                {item === route.params.name ? "You" : item}
              </Text>
              {/* <Text className="bg-red-400">"hi"</Text> */}
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          className="rounded-2xl bg-[#2B3384] items-center"
          onPress={() => navigation.navigate("GroupPage")}
        >
          <Text className="text-white p-5 font-bold  text-xl">Gobal Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: "#D8D5D5",
    // borderWidth: 1,
    // shadowColor: "black",
    // shadowRadius: 1,
    // shadowOpacity: 1,
    // overflow: "visible",
    // shadowOffset: { width: 1, height: 1 },
    // marginBottom: 50,
    height: 795,
  },
  avatar: {
    width: 100,
    height: 50,
    borderRadius: 40,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 15,

    textAlign: "center",
  },
  youText: {
    color: "blue", // Change color as needed
    // Add more styles if required
  },
});

export default Friend;
