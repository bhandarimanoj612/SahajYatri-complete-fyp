//import liraries
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-10";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

// create a component
const BookingDetails = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  // adding pop and comment
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
      <View style={{}} className="bg-black flex-1 dark:bg-neutral-900 ">
        {/* image of the places  */}
        <Image
          source={{ uri: item.image }}
          style={{ width: wp(100), height: hp(55) }}
        />
        <StatusBar style={"light"} />
        {/* back button */}
        <SafeAreaView
          className={
            "flex-row justify-between items-center w-full absolute " + topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        {/* title & descritpion & booking button */}
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14 dark:bg-neutral-800"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-5"
          >
            <View className="flex-row justify-between items-start ">
              <Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                {item.name}
              </Text>
              {/* text */}
              <View>
                <Text
                  style={{ fontSize: wp(5), color: "red" }}
                  className="font-semibold dark:text-white"
                >
                  {item?.status}
                </Text>
              </View>
            </View>
            {/* long description */}
            <Text
              style={{ fontSize: wp(3.9) }}
              className="text-black tracking-wide mb-2 dark:text-white"
            >
              Sucess
            </Text>
            {/* Start */}
            <View className="flex-row ">
              <Text
                Text
                style={{ fontSize: wp(4) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                Start Date
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white"
              >
                {item?.startDate}
              </Text>
            </View>
            <View className="flex-row ">
              <Text
                Text
                style={{ fontSize: wp(4) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                End Date
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white "
              >
                {item?.endDate}
              </Text>
            </View>

            {/* Rating */}
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(5) }}
                className="font-semibold flex-1 text-black dark:text-white"
              >
                Guess
              </Text>
              {/* using rating  from the back */}

              <Text
                style={{ fontSize: wp(5) }}
                className="text-black tracking-wide mb-2 dark:text-white"
              >
                {item?.numberOfGuests}
              </Text>
            </View>

            {/* add comment        */}
            {/* Comment Section */}
            <ScrollView style={{ marginTop: 20 }}>
              <View className="flex-row justify-between">
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                  className="dark:text-white"
                >
                  UserName
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    marginBottom: 10,
                  }}
                  className="font-light dark:text-white "
                >
                  {item.userName}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  PricePerNight
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "red",
                  }}
                >
                  {item.pricePerDay}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Number of Days
                </Text>
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(4),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {item.numberOfDays}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                  className="dark:text-white"
                >
                  Total Price
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {item.totalPrice}
                </Text>
              </View>
            </ScrollView>
            <View className="mb-11 p-4 ">
              <Text className="font-medium text-blue-500 text-center">
                Thank You For Choosing {item.hotelName}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

//

//make this component available to the app
export default BookingDetails;
