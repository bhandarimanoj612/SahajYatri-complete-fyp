//import liraries
import React, { Component, useContext } from "react";
import { View, Text, StyleSheet, Image, Alert, FlatList } from "react-native";
import { Button } from "react-native";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import randomImage from "../../../assets/images/Budget/randomImage";
import EmptyList from "../../components/emptyList";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext, AuthProvider } from "../../Context/AuthContext";
import { useColorScheme } from "nativewind";

// create a component
const CategoryList = ({ email }) => {
  //for using dark mode we are using native wind colors steams
  const { colorScheme, toggleColorScheme } = useColorScheme(); //we are using tailwind so we need native colors scheme
  const { userInfo } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchTrips(); //this isfocused hook will trigger to make update
  }, [isFocused]);
  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}BudgetTrip/user/${userInfo.email}`
      );
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  const navigation = useNavigation();

  return (
    <View>
      <View className="pt-4 bg-white dark:bg-neutral-800">
        <View className="flex-row justify-between">
          <View className="">
            <Text className="dark:text-white"> Recent Trip:</Text>
          </View>
          <View className="  " style={{ paddingRight: 16 }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: "#2B3384",
              }}
              onPress={() => navigation.navigate("AddTrip")}
            >
              <Text className=" text-white p-2  "> Add Trip</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* for adding trips   */}
        <View className="px-4 mt-4 space-y-4 " style={{ height: 430 }}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // data={[]}
            data={trips}
            ListEmptyComponent={<EmptyList />} //this will be used when there is no data
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.Shadow}
                  onPress={() =>
                    navigation.navigate("TripExpenses", {
                      tripId: item.id,
                      city: item.city,
                      destination: item.destination,
                    })
                  } //I AM CONFUSED HERE SHOUDL BE TRIPS I THINK
                  className="bg-gray-100 p-2 rounded-2xl mb-8 shadow-sm h-48 dark:bg-neutral-800 s"
                >
                  <View>
                    <Image source={randomImage()} className="w-36 h-28 mb-2 " />

                    <Text className="text-black font-bold dark:text-white">
                      {item.city}
                    </Text>
                    <Text className="text-black mt-2 dark:text-white">
                      {item.destination}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  // for adding inner shadow in text field
  Shadow: {
    borderColor: "#2B3384",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 2,
  },
});

//make this component available to the app
export default CategoryList;
