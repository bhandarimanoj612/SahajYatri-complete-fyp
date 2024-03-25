import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useNavigation } from "@react-navigation/native";
const AllScreen = () => {
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchRecommendedHotels();
  }, []);

  const fetchRecommendedHotels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}Search/all`);
      setRecommendedHotels(response.data);
    } catch (error) {
      console.error("Error fetching recommended hotels: ", error);
    }
  };

  // Assuming 'results' contains 'hotels', 'travel', and 'vehicles' keys
  const allResults = Object.values(recommendedHotels).flat(); // Combine all arrays into one
  console.log(allResults);
  return (
    <View
      className="dark:bg-neutral-900 mb-20
    "
    >
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
        See More
      </Text>
      <View className=" bg-[#fff] dark:bg-neutral-800">
        <FlatList
          data={allResults}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Bookings", { item })}
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
                    className=" color-[#555] dark:text-white"
                  >
                    {item.shortDescription}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item.id}_${typeof item}_${index}`} //for making warnning remove
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

export default AllScreen;
