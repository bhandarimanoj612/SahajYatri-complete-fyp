import { StatusBar, Platform } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Hotel from "../Hotel";
import LoginModal from "../../../components/LoginModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import TravelPlaces from "../TravelPlaces";
import Vehicle from "../Vehicle";

const Bookings = ({ route, email }) => {
  const { userName } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { item } = route.params;
  const navigation = useNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isCheckInDatePickerVisible, setCheckInDatePickerVisibility] =
    useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisibility] =
    useState(false);
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme(); //for using react native dark mode with tailwind css

  useEffect(() => {
    if (isFocused) {
      // Show the login modal if user is not logged in or email is empty when the screen is focused
      if (!userInfo || !userInfo.email) {
        setShowLoginModal(true);
      }
    }
  }, [isFocused]);
  const incrementGuests = () => {
    setNumberOfGuests((prevGuests) => prevGuests + 1);
  };

  const decrementGuests = () => {
    if (numberOfGuests > 1) {
      setNumberOfGuests((prevGuests) => prevGuests - 1);
    }
  };

  // Function to initiate Khalti payment
  const initiateKhaltiPayment = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/KhaltiPayment`, {
        customer_info: {
          name: userName,
          email: userInfo.email,
          phone: 9876543210,
        },
        amount: item.totalPrice,
        purchase_order_name: item.name,
        product_details: [
          {
            name: item.name,
            total_price: item.totalPrice,
          },
        ],
      });

      console.log(response.data); // Log response for debugging

      // Handle the response and redirect user accordingly
    } catch (error) {
      console.error("Error initiating Khalti payment:", error);
      Alert.alert(
        "Error",
        "Failed to initiate payment. Please try again later."
      );
    }
  };
  console.log(item.id, item.name);

  const renderRecommendations = () => {
    switch (item.category) {
      case "HotelBooking":
        return (
          <View className="dark:bg-neutral-800">
            <Text
              className="text-black font-extralight rounded-2xl m-6 dark:text-white"
              style={{
                paddingLeft: wp(2),
                fontSize: wp(4),
                borderColor: "white",
                borderWidth: 1,
                shadowColor: "grey",
                shadowRadius: 1,
                borderRadius: 12,
                shadowOpacity: 1,
                overflow: "visible",
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              Similar Hotel
            </Text>
            <Hotel />
          </View>
        );
      case "VehicleBooking":
        return (
          <View className="dark:bg-neutral-800">
            <Text
              className="text-black font-extralight rounded-2xl m-6 dark:text-white"
              style={{
                paddingLeft: wp(2),
                fontSize: wp(4),
                borderColor: "white",
                borderWidth: 1,
                shadowColor: "grey",
                shadowRadius: 1,
                borderRadius: 12,
                shadowOpacity: 1,
                overflow: "visible",
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              Similar Vehicle
            </Text>
            <Vehicle />
          </View>
        );
      case "TravelBooking":
        return (
          <View className="dark:bg-neutral-800">
            <Text
              className="text-black font-extralight rounded-2xl m-6 dark:text-white"
              style={{
                paddingLeft: wp(2),
                fontSize: wp(4),
                borderColor: "white",
                borderWidth: 1,
                shadowColor: "grey",
                shadowRadius: 1,
                borderRadius: 12,
                shadowOpacity: 1,
                overflow: "visible",
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              Similar Travel Destination
            </Text>
            <TravelPlaces />
          </View>
        );
      default:
        return null;
    }
  };
  // const handleBooking = async () => {
  //   try {
  //     if (userInfo && userInfo.email) {
  //       const response = await axios.post(`${BASE_URL}${item.category}`, {
  //         name: item.name,
  //         userName: userInfo.email,
  //         startDate: checkInDate,
  //         endDate: checkOutDate,
  //         stripePaymentIntentID: "string",
  //         totalPrice: 100,
  //         numberOfGuests: numberOfGuests,
  //       });
  //       console.log(response.data, item.name, checkInDate, numberOfGuests);
  //       displayAlert();
  //     } else {
  //       setShowLoginModal(true); // Show login modal if user is not logged in or email is empty
  //       console.error("User information not available.");
  //     }
  //   } catch (error) {
  //     console.error("Error booking:", error);
  //   }
  // };

  const handleBooking = async () => {
    try {
      if (userInfo && userInfo.email) {
        // Check if start date and end date are the same
        if (checkInDate.getTime() === checkOutDate.getTime()) {
          Alert.alert(
            "Invalid Dates",
            "Start and end dates cannot be the same. Please choose different dates."
          );
          return; // Exit function if dates are the same
        }

        // Navigate to PaymentScreen with booking data
        navigation.navigate("PaymentScreen", {
          item: item,
          checkInDate: checkInDate.toISOString(), // Convert to ISO string
          checkOutDate: checkOutDate.toISOString(), // Convert to ISO string
          numberOfGuests: numberOfGuests,
          image: item.image,
          price: item.price,
        });
      } else {
        setShowLoginModal(true); // Show login modal if user is not logged in or email is empty
        console.error("User information not available.");
      }
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="space-y-5 dark:bg-neutral-900"
    >
      <View className="bg-white flex-1">
        <LoginModal
          visible={showLoginModal}
          onPressLogin={() => {
            setShowLoginModal(false); // Close login modal
            navigation.navigate("LoginScreen"); // Navigate to login screen
          }}
        />
        <Image
          source={{ uri: item.image }}
          style={{ width: wp(100), height: hp(55) }}
        />
        <StatusBar style={"light"} />
        <SafeAreaView
          className={"flex-row justify-between items-center w-full absolute "}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4 dark:bg-black"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14 dark:bg-neutral-800"
        >
          <View showsVerticalScrollIndicator={false} className="space-y-5">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                {item.name}
              </Text>
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
            <Text
              style={{ fontSize: wp(3.9) }}
              className="text-black tracking-wide mb-2 dark:text-white"
            >
              {item?.longDescription}
            </Text>
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                location
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white "
              >
                {" "}
                <MapPinIcon size={wp(5)} color="#f87171" />
                {item?.location}
              </Text>
            </View>
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(5) }}
                className="font-semibold flex-1 text-black dark:text-white"
              >
                Rating
              </Text>

              <Rating
                tintColor={colorScheme === "dark" ? "#262626" : undefined} //this part of line is used to change the background of image
                startingValue={item?.rating}
                // readonly={true}
                imageSize={wp(5)}
                // style={{ paddingVertical: 2, marginRight: 10 }}
              />

              {/* <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                // onFinishRating={handleRating}
                style={{ backgroundColor: "transparent" }}
              /> */}

              {console.log(colorScheme)}
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white "
              >
                {" "}
                ({item?.review} ) Reviews
              </Text>
            </View>

            {/* Date time picker for android*/}
            {Platform.OS === "android" ? (
              <View className="flex flex-col mt-20">
                <View className="flex-row justify-between ">
                  <Text className="font-bold mt-4 dark:text-white ">
                    Start Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => setCheckInDatePickerVisibility(true)}
                    style={{ marginTop: 10 }}
                    className="dark:bg-neutral-700"
                  >
                    <Text>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isCheckInDatePickerVisible}
                    mode="date"
                    textColor="black"
                    onConfirm={(date) => {
                      setCheckInDate(date);
                      setCheckInDatePickerVisibility(false);
                    }}
                    onCancel={() => setCheckInDatePickerVisibility(false)}
                  />
                </View>
                <View className="flex-row justify-between mt-5">
                  <Text className="font-bold mt-4 dark:text-white ">
                    End Date
                  </Text>
                  <TouchableOpacity
                    className="dark:bg-neutral-700"
                    onPress={() => setCheckOutDatePickerVisibility(true)}
                    style={{ marginTop: 10 }}
                  >
                    <Text>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isCheckOutDatePickerVisible}
                    mode="date"
                    textColor="black"
                    onConfirm={(date) => {
                      setCheckOutDate(date);
                      setCheckOutDatePickerVisibility(false);
                    }}
                    onCancel={() => setCheckOutDatePickerVisibility(false)}
                  />
                </View>
              </View>
            ) : (
              <View className="flex flex-col mt-20">
                <View className="flex-row justify-between ">
                  <Text className="font-bold mt-4 dark:text-white">
                    Start Date
                  </Text>
                  <RNDateTimePicker
                    className="mt-10 bg-light-50  dark:text-white "
                    value={checkInDate}
                    maximumDate={checkInDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || checkInDate;
                      setCheckInDate(currentDate);
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-5 ">
                  <Text className="font-bold mt-4 dark:text-white ">
                    End Date
                  </Text>
                  <RNDateTimePicker
                    value={checkOutDate}
                    color="black"
                    className="bg-light-50 dark:text-white"
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (event.type === "set") {
                        const currentDate = selectedDate || checkOutDate;
                        setCheckOutDate(currentDate);
                      }
                    }}
                  />
                </View>
              </View>
            )}

            {/* Number of Guests */}
            <View
              className="flex flex-row justify-between  "
              style={{ alignItems: "center" }}
            >
              <View className="m-2">
                <Text className="font-bold dark:text-white">
                  Number of Guests
                </Text>
              </View>
              <View className="flex-row justify-between  ">
                <TouchableOpacity
                  onPress={incrementGuests}
                  className="bg-[#2B3384] rounded-full   m-2   dark:bg-black "
                >
                  <Text className="text-white">
                    <Icon
                      name="arrow-up-drop-circle-outline"
                      size={40}
                      color="white"
                    />
                  </Text>
                </TouchableOpacity>
                <View className="bg-gray-300 dark:bg-neutral-950  p-2 m-3 rounded-xl">
                  <Text
                    style={{ fontSize: 20 }}
                    className=" dark:bg-neutral-900 dark:text-white"
                  >
                    {numberOfGuests}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={decrementGuests}
                  className="bg-[#2B3384] rounded-full m-2 dark:bg-black"
                >
                  <Text style={{}} className="text-white">
                    <Icon
                      name="arrow-down-drop-circle-outline"
                      size={40}
                      color="white"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              height: wp(15),
              width: wp(50),
            }}
            onPress={() => {
              handleBooking();
            }}
            className="bg-[#2B3384] mb-6 mt-24 mx-auto flex justify-center items-center rounded-full dark:bg-black"
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(5.5) }}
            >
              Book now
            </Text>
          </TouchableOpacity>
        </View>
        {renderRecommendations()}
      </View>
    </ScrollView>
  );
};

export default Bookings;
