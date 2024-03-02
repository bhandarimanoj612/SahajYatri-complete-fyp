import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Button,
  View,
  FlatList,
} from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CategoryChart from "../CategoryChart";
import CategoryList from "../CategoryList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EmptyList from "../../../components/emptyList";
import randomImage from "../../../../assets/images/Budget/randomImage";
import { categoryBG } from "../../../components/theme";
import axios from "axios"; // Import Axios for making HTTP requests
import { useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";

const TripExpensesScreen = (props, { email }) => {
  const { userInfo } = useContext(AuthContext); //this is for getting username
  //fetching the total value of the expeses
  const [totalExpenses, setTotalExpenses] = useState(0);
  // console.log("props : ", props);
  const { tripId, city, destination } = props.route.params;
  console.log("id of place", tripId);
  console.log("id of place", city);
  console.log("id of place", destination);
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused(); //this is used for making the item auto refresh
  useEffect(() => {
    if (isFocused) fetchExpensesForTrip(), fetchTotalExpenses();
  }, [isFocused]);

  const fetchExpensesForTrip = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}BudgetExpenses/destination/${destination}/${userInfo.email}`
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}BudgetExpenses/total/${destination}/${userInfo.email}`
      );
      setTotalExpenses(response.data);
    } catch (error) {
      console.error("Error fetching total expenses:", error);
    }
  };

  const getRandomColor = (category) => {
    if (categoryBG[category]) {
      return categoryBG[category];
    } else {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  };
  return (
    <View className="bg-[#D7D9E8] h-full w-full dark:bg-neutral-900">
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

      <View className="mt-40">
        <View className="flex flex-row justify-between pb-4">
          <Text className=" ml-2 mt-14 font-bold text-3xl dark:text-white">
            {" "}
            {city}
          </Text>
          <Text className=" font-medium text-xl pr-5 mt-12 pt-2 dark:text-white">
            {destination}
          </Text>
        </View>

        <View className="bg-white rounded-t-3xl  mt-3 pt-10 border-black h-full dark:bg-neutral-800">
          {/* for category and chart */}

          <View className="flex-row justify-between">
            <View className="">
              <Text className="m-3 text-xl text-red-500">
                Expenses :Rs {totalExpenses}
              </Text>
            </View>
            <View className="  " style={{ paddingRight: 16 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#2B3384",
                }}
                onPress={() =>
                  navigation.navigate("AddExpense", { destination, city })
                }
              >
                <Text className=" text-white p-2  "> Add Expenses</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* for adding trips   */}
          <View className="px-4 mt-4 space-y-4" style={{ height: 430 }}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              // data={[]}
              data={expenses}
              ListEmptyComponent={<EmptyList />} //this will be used when there is no data
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <View>
                      <View
                        className="flex-row justify-between mt-3 items-center p-3 px-5  rounded-2xl mb-3"
                        style={{
                          backgroundColor: getRandomColor(),
                          borderColor: "#6E6C6C",
                          borderWidth: 1,
                          overflow: "visible",
                          shadowColor: "black",
                          shadowRadius: 1,
                          shadowOpacity: 4,
                        }}
                        //   style={style.Shadow}
                      >
                        <View>
                          <Text className="font-bold text-white ">
                            {item.title}
                          </Text>
                        </View>
                        <View>
                          <Text className="font-bold text-white">
                            Rs {item.amount}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TripExpensesScreen;
