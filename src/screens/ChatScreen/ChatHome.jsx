import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Auth from "./Chat/Auth";
import PrivateMessage from "./Message/PrivateMessage";

export default function ChatHome() {
  return (
    // <SafeAreaView className="bg-[#D7D9E8] h-full w-full flex-1">
    <SafeAreaView className="bg-gray-100 h-full w-full dark:bg-neutral-900">
      <View className="rounded-2xl   ml-5">
        {/* <Text className=" text-xl pl-4 mt-10 text-[#CB0A31]"> Friends</Text> */}
      </View>

      <View className="">
        <Auth />
        {/* <PrivateMessage /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
