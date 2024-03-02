//import liraries
import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

// create a component
const EmptyList = () => {
  return (
    <View className="flex justify-content items-center my-9 mr-10">
      <Image
        source={require("../../assets/images/Budget/empty.png")}
        className="w-48 h-48"
      />
      <Text className="font-medium m-6 text-red-400">
        No Trip has been added{" "}
      </Text>
    </View>
  );
};

// define your styles

//make this component available to the app
export default EmptyList;
