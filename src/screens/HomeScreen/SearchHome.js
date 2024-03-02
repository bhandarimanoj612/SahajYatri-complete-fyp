import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React from "react";
import All from "./All";
import TravelPlaces from "./TravelPlaces";
import Hotel from "./Hotel";
import Vehicle from "./Vehicle";
import OfferScreen from "./OfferScreen";
import SeachScreen from "./SearchScreen";

const SearchHome = () => {
  return (
    // <View className="bg-[#D7D9E8] h-full w-full">
    <View className="bg-white h-full w-full ">
      {/* // <SafeAreaView className="bg-[#D7D9E8] h-full w-full"> */}
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* we need view for our profile photo  and search bar*/}
        <SeachScreen />
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const style = StyleSheet.create({
  // for adding inner shadow in text field
  Shadow: {
    borderColor: "#6E6C6C",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});
export default SearchHome;
