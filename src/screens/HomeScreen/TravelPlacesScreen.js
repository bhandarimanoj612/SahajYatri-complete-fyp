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
import { MapPinIcon } from "react-native-heroicons/solid";
import { Rating } from "react-native-ratings";

// create a component
const TravelPlacesScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  // adding pop and comment
  const [isModalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Dummy comments data
  const comments = [
    {
      id: 1,
      date: "2023-11-20",
      user: "Manoj Bhandari",
      rating: 4,
      comment:
        "This is my best place of Nepal.It is so much beautiful.Everyone were very helpful and .",
    },
  ];

  const addComment = () => {
    if (newComment.trim() !== "") {
      // Add the new comment to the comments state
      setComments((prevComments) => [
        ...prevComments,
        {
          id: prevComments.length + 1,
          date: new Date().toISOString().slice(0, 10),
          user: "YourUserName", // Replace with the actual user name
          rating: 5, // Replace with the actual rating
          comment: newComment,
        },
      ]);

      // Clear the input field
      setNewComment("");

      // Close the modal
      toggleModal();
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
      <View style={{}} className="bg-white flex-1">
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
          className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-5"
          >
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black"
              >
                {item.name}
              </Text>
              {/* text */}
              <View>
                <Text
                  style={{ fontSize: wp(4), color: "red" }}
                  className="font-semibold"
                >
                  Rs
                </Text>

                <Text
                  style={{ fontSize: wp(5), color: "red" }}
                  className="font-semibold"
                >
                  {item?.price}
                </Text>
              </View>
            </View>
            {/* long description */}
            <Text
              style={{ fontSize: wp(3.9) }}
              className="text-black tracking-wide mb-2 "
            >
              {item?.longDescription}
            </Text>
            {/* location */}
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black"
              >
                location
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 "
              >
                {" "}
                <MapPinIcon size={wp(5)} color="#f87171" />
                {item?.location}
              </Text>
            </View>

            {/* Rating */}
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(5) }}
                className="font-semibold flex-1 text-black"
              >
                Rating
              </Text>
              {/* using rating  from the back */}
              <Rating
                startingValue={item?.rating} // Using the rating value from our data
                readonly={true} // Assuming it's a read-only display of the rating
                imageSize={wp(5)} // Adjust the size of the stars
                style={{ paddingVertical: 2, marginRight: 10 }}
              />

              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 "
              >
                {" "}
                ({item?.review} ) Reviews
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
                >
                  Comments
                </Text>
                {/* comments buttom */}
                <TouchableOpacity
                  className="bg-[#2B3384] rounded-xl  justify-center mb-3 p-2"
                  onPress={() => {
                    navigation.navigate("PaymentScreen");
                  }}
                >
                  <Text className="text-white font-light">Add</Text>
                </TouchableOpacity>
              </View>

              {comments.map((comment) => (
                <View
                  key={comment.id}
                  className="bg-neutral-100 rounded-2xl tracking-wide p-3"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/manoj.jpg")}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <View className="flex-row justify-between">
                      <Text style={{ fontSize: wp(4), fontWeight: "bold" }}>
                        {comment.user}
                      </Text>
                      {/* using rating  from the back */}
                      <Rating
                        startingValue={comment.rating} // Using the rating value from our data
                        readonly={true} // Assuming it's a read-only display of the rating
                        imageSize={wp(3)} // Adjust the size of the stars
                        style={{ paddingVertical: 2, marginRight: 10 }}
                      />
                      {/* date of comment */}
                      <Text style={{ fontSize: wp(2.9) }}>{comment.date}</Text>
                    </View>

                    <Text style={{ fontSize: wp(3.5), marginTop: 7 }}>
                      {comment.comment}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View></View>
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: "#2B3384",
              height: wp(15),
              width: wp(50),
            }}
            onPress={() => {
              navigation.navigate("PaymentScreen");
            }}
            className="mb-6 mx-auto flex justify-center items-center rounded-full"
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(5.5) }}
            >
              Book now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

//

//make this component available to the app
export default TravelPlacesScreen;
