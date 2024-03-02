import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const PopularScreen = () => {
  const [popularHotels, setPopularHotels] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchPopularHotels();
  }, []);

  const fetchPopularHotels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}HotelList/popular`);
      setPopularHotels(response.data);
    } catch (error) {
      console.error("Error fetching popular hotels: ", error);
    }
  };

  return (
    <View className="dark:bg-neutral-900">
      <StatusBar style={"black"} />
      <SafeAreaView
        style={styles.Shadow}
        className={
          "bg-white dark:bg-neutral-800 flex-row justify-between items-center w-full mt-10 absolute rounded-2xl  "
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" bg-white p-2 rounded-full ml-3 dark:bg-neutral-500 "
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomTab")}
          className="p-2 rounded-full  mr-4  "
        >
          <Text className="dark:text-white">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RecommendScreen")}
          className="p-2 rounded-full  mr-6 "
        >
          <Text className="dark:text-white">RecommendScreen</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.container} className=" bg-[#fff] dark:bg-neutral-900">
        <FlatList
          data={popularHotels}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("HotelBook", { item })}
            >
              <View
                style={styles.hotelContainer}
                className="dark:bg-neutral-800"
              >
                <Image source={{ uri: item.image }} style={styles.hotelImage} />
                <View style={styles.hotelDetails}>
                  <Text style={styles.hotelName} className="dark:text-white">
                    {item.name}
                  </Text>
                  <Text
                    style={styles.hotelDescription}
                    className="color-[#555] dark:text-white  "
                  >
                    {item.shortDescription}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 3, height: 2 },
  },
  container: {
    marginTop: 110,
  },
  hotelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  hotelImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  hotelDetails: {
    flex: 1,
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  hotelDescription: {
    fontSize: 14,
  },
});

export default PopularScreen;
