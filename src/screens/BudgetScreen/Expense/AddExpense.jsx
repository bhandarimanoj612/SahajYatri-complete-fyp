//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component, useContext, useState } from "react";
import { Image, TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios"; // Import Axios for making HTTP requests
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";
import KeyboardAvodingContainer from "../../../components/KeyboardAvodingContainer";

// create a component
const AddExpense = (props, { email }) => {
  const { userInfo } = useContext(AuthContext);
  const { destination } = props.route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  console.log("Destination:", destination);
  const handleAddExpense = async () => {
    try {
      const newExpense = {
        destination: destination,
        title: title,
        amount: parseFloat(amount),
        username: userInfo.email,
        // Replace 1 with the actual trip ID
      };
      await axios.post(`${BASE_URL}BudgetExpenses`, newExpense);
      console.log(userInfo.email);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <View className="mt-10 dark:bg-neutral-900">
      <KeyboardAvodingContainer>
        <Image
          source={require("../../../../assets/images/Budget/4.png")}
          style={{ width: wp(100), height: hp(40) }}
        />
        <SafeAreaView
          className={"flex-row justify-between items-center w-full absolute"}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderColor: "#6E6C6C",
            borderWidth: 1,
            overflow: "visible",
            shadowColor: "black",
            shadowRadius: 1,
            shadowOpacity: 1,
          }}
          className="px-5  justify-between bg-white pt-8 -mt-20 pb-10 dark:bg-neutral-800 "
        >
          <Text className="mt-5 font-medium ml-5 text-2xl dark:text-white ">
            {" "}
            For What?
          </Text>
          <TextInput
            style={style.Shadow}
            placeholderTextColor={"#89858E"}
            placeholder="Hotel"
            value={title}
            onChangeText={setTitle}
            className="p-4 bg-gray-300  rounded-2xl m-5"
          />
          <Text className="mt-5 font-medium ml-4 text-2xl dark:text-white">
            {" "}
            Cost ?
          </Text>
          <TextInput
            style={style.Shadow}
            value={amount}
            onChangeText={setAmount}
            className="p-4 bg-gray-300  rounded-2xl m-5"
            placeholder="Rs 2000"
            placeholderTextColor={"#89858E"}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#2B3384",
              height: wp(15),
              width: wp(50),
            }}
            onPress={() => {
              {
                handleAddExpense();
              }
            }}
            className="mb-6 mx-auto flex justify-center items-center rounded-full mt-28 "
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(5.5) }}
            >
              Add Expenses
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvodingContainer>
    </View>
  );
};

// define your styles
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
//make this component available to the app
export default AddExpense;
