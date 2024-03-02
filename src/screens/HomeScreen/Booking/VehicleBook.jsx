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
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const VehicleBook = ({ route, email }) => {
  const { userInfo } = useContext(AuthContext);
  const { item } = route.params;
  const navigation = useNavigation();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isCheckInDatePickerVisible, setCheckInDatePickerVisibility] =
    useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisibility] =
    useState(false);

  useEffect(() => {
    // Your useEffect code here, if any
  }, []);

  const incrementGuests = () => {
    setNumberOfGuests((prevGuests) => prevGuests + 1);
  };

  const decrementGuests = () => {
    if (numberOfGuests > 1) {
      setNumberOfGuests((prevGuests) => prevGuests - 1);
    }
  };

  const displayAlert = () => {
    Alert.alert(
      "Success",
      "Successfully booked",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            console.log(userInfo.email);
            // Handle navigation or any other action upon successful booking
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(`${BASE_URL}VehicleBooking`, {
        vehicleName: item.name,
        userName: userInfo.email, // Assuming you have a way to get the user's name
        startDate: checkInDate,
        endDate: checkOutDate,
        stripePaymentIntentID: "string",
        totalPrice: 0,
        numberOfGuests: numberOfGuests,
        // Include any other necessary data for the booking
      });
      // Handle successful booking
      console.log(response.data, item.name, checkInDate, numberOfGuests); // Log the response from the backend
      displayAlert(); // Display a success message to the user
    } catch (error) {
      // Handle booking error
      console.log(item.name);
      console.log(checkInDate);
      console.log(checkOutDate);
      console.log(numberOfGuests);
      console.error("Error booking:", error);
      // Display an error message to the user
      // You can also set a state to display the error message in your component
    }
  };

  const showCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(true);
  };

  const hideCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(false);
  };

  const handleCheckInConfirm = (date) => {
    setCheckInDate(date);
    hideCheckInDatePicker();
  };

  const showCheckOutDatePicker = () => {
    setCheckOutDatePickerVisibility(true);
  };

  const hideCheckOutDatePicker = () => {
    setCheckOutDatePickerVisibility(false);
  };

  const handleCheckOutConfirm = (date) => {
    setCheckOutDate(date);
    hideCheckOutDatePicker();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
      <View style={{}} className="bg-white flex-1">
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
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14 dark:bg-neutral-800"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-5"
          >
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
              className="text-black tracking-wide mb-2 dark:text-white "
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
                className="text-black tracking-wide mb-2  dark:text-white "
              >
                {" "}
                <MapPinIcon size={wp(5)} color="#f87171" />
                {item?.location}
              </Text>
            </View>
            <View className="flex-row ">
              <Text
                Text
                style={{ fontSize: wp(5) }}
                className="font-semibold flex-1 text-black dark:text-white"
              >
                Rating
              </Text>
              <Rating
                startingValue={item?.rating}
                readonly={true}
                imageSize={wp(5)}
                style={{ paddingVertical: 2, marginRight: 10 }}
              />
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white"
              >
                {" "}
                ({item?.review} ) Reviews
              </Text>
            </View>
            {/* Date time picker */}
            {Platform.OS === "android" ? (
              <View className="flex flex-col mt-20">
                <View className="flex-row justify-between ">
                  <Text className="font-bold mt-4 dark:text-white">
                    Start Date
                  </Text>
                  <TouchableOpacity
                    onPress={showCheckInDatePicker}
                    style={{ marginTop: 10 }}
                  >
                    <Text>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isCheckInDatePickerVisible}
                    mode="date"
                    textColor="black"
                    onConfirm={handleCheckInConfirm}
                    onCancel={hideCheckInDatePicker}
                  />
                </View>
                <View className="flex-row justify-between mt-5">
                  <Text className="font-bold mt-4 dark:text-white">
                    End Date
                  </Text>
                  <TouchableOpacity
                    onPress={showCheckOutDatePicker}
                    style={{ marginTop: 10 }}
                  >
                    <Text>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isCheckOutDatePickerVisible}
                    mode="date"
                    textColor="black"
                    onConfirm={handleCheckOutConfirm}
                    onCancel={hideCheckOutDatePicker}
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
                    className="mt-10"
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
                <View className="flex-row justify-between mt-5">
                  <Text className="font-bold mt-4 dark:text-white">
                    End Date
                  </Text>
                  <RNDateTimePicker
                    value={checkOutDate}
                    minimumDate={checkInDate}
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
              <View className="mr-10 bg-gray-100 rounded-2xl">
                <TouchableOpacity
                  onPress={incrementGuests}
                  className="bg-[#2B3384] rounded-full mt-4  mb-2 p-1"
                >
                  <Text
                    style={{ fontSize: 24, marginLeft: 10 }}
                    className="text-white"
                  >
                    +
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 24 }}>{numberOfGuests}</Text>

                <TouchableOpacity
                  onPress={decrementGuests}
                  className="bg-[#2B3384] rounded-full mt-4 mb-2 p-1"
                >
                  <Text
                    style={{ fontSize: 24, marginLeft: 10 }}
                    className="text-white"
                  >
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              className="flex flex-row justify-between  mb-8 "
              style={{ alignItems: "center" }}
            >
              <View className="m-2">
                <Text className="font-bold mr-6 dark:text-white">Payment</Text>
              </View>
              <View className=" bg-gray-100 mr-5 rounded-2xl">
                <TouchableOpacity
                  // onPress={initiateKhaltiPayment}
                  className="bg-[#2B3384] rounded-full  mb-2 "
                >
                  <Image
                    source={require("../../../../assets/images/icons/khalti.png")}
                  />
                </TouchableOpacity>
                <Text className="ml-4 font-bold">Khalti</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: "#2B3384",
              height: wp(15),
              width: wp(50),
            }}
            onPress={() => {
              handleBooking();
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

export default VehicleBook;
