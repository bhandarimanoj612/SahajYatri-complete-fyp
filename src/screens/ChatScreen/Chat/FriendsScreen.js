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
import { HubConnectionBuilder } from "@microsoft/signalr";
import randomImage from "../../../../assets/images/Budget/randomImage";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Chat_Url } from "../../utils/config";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const FriendsScreen = ({ navigation, route }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Connect to SignalR hub
    const newConnection = new HubConnectionBuilder()
      .withUrl(Chat_Url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected!");
          connection.on("OnlineUsers", (users) => {
            console.log("Received online users:", users);
            setOnlineUsers(users);
          });
        })
        .catch((error) => {
          console.error("Error starting SignalR connection:", error);
        });

      return () => {
        connection.off("OnlineUsers");
        connection.stop();
      };
    }
  }, [connection]);

  const handleStartChat = async (recipient) => {
    try {
      await axios.post(`${BASE_URL}Chat/CreatePrivateChat`, {
        from: route.params.name,
        to: recipient,
      });
      navigation.navigate("Chat", {
        sender: route.params.name,
        recipient,
      });
    } catch (error) {
      console.error("Error starting private chat:", error);
    }
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
              <Image source={randomImage()} style={styles.avatar} />
              <Text
                style={[
                  styles.friendName,
                  item === route.params.name && styles.youText,
                ]}
                className="font-Bold text-green-700"
              >
                {item === route.params.name ? "You" : item}
              </Text>
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
    color: "blue",
  },
});

export default FriendsScreen;
