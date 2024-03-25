import { StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "#D8D5D5",
    borderWidth: 3,
    overflow: "visible",
    shadowColor: "#6E6C6C",
    shadowRadius: 9,
    shadowOpacity: 1,
  },
});
export default function TravelPlaces({ item }) {
  // const [favouriteIndexes, setFavouriteIndexes] = useState([]);
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}TravelList`);
        setPlaces(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <View>
      <FlatList
        data={places}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          // const isFavourite = favouriteIndexes.includes(index);
          return (
            <View className="p-3">
              <TouchableOpacity
                styles={styles.Shadow}
                style={{ height: wp(50), width: wp(45) }}
                className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
                onPress={() => {
                  navigation.navigate("Bookings", { item });
                }}
              >
                <Image
                  //   styles={styles.Shadow}
                  source={{ uri: item.image }}
                  className="absolute "
                  style={{
                    height: wp(50),
                    width: wp(40),
                    borderRadius: wp(5),
                  }}
                />
                {/* For making color look visible */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={{
                    width: wp(40),
                    height: hp(20),
                    borderBottomLeftRadius: 19,
                    borderBottomRightRadius: 19,
                  }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute bottom-0"
                />
                <TouchableOpacity
                  className="absolute top-0 right-1 p-3 rounded-full"
                  onPress={() => toggleFavourite(index)}
                >
                  {/* <HeartIcon
                    size={wp(5)}
                    color={isFavourite ? "red" : "white"}
                  /> */}
                </TouchableOpacity>
                <Text
                  style={{ fontSize: wp(4) }}
                  className="text-white font-extrabold "
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontSize: wp(3) }}
                  className="text-white font-light "
                >
                  {item.shortDescription}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
