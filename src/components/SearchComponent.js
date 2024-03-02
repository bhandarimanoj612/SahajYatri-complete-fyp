import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../screens/utils/config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchComponent = ({ setIsSearching, onSearch }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userImage, setUserImage] = useState(null);
  const isFocused = useIsFocused();

  const handleSearch = () => {
    axios
      .get(`${BASE_URL}HotelSearch?name=${searchQuery}`)
      .then((response) => {
        onSearch(response.data);
        setIsSearching(true);
      })
      .catch((error) => {
        console.error("Error searching hotels:", error);
      });
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      if (isFocused) {
        try {
          const imageFilePath = await AsyncStorage.getItem("userImageFilePath");
          if (imageFilePath) {
            setUserImage(imageFilePath);
          }
        } catch (error) {
          console.error("Error fetching user image:", error);
        }
      }
    };

    fetchUserImage();
  }, [isFocused]); // Fetch image whenever component is focused

  useEffect(() => {
    const updateUserImage = async () => {
      try {
        const imageFilePath = await AsyncStorage.getItem("userImageFilePath");
        if (imageFilePath) {
          setUserImage(imageFilePath);
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    updateUserImage();
  }, [userImage]); // Update image whenever userImage changes

  return (
    <View className="max-5 flex-row justify-between items-center mt-16 mb-4">
      <View className="mx-5 mb-4">
        <View
          onPress={handleSearch}
          style={styles.Shadow}
          // className="bg-[#D9D9D9] flex-row items-center rounded-full p-4 space-x-2 pl-6"
          className="bg-white flex-row items-center rounded-full p-4 space-x-2 pl-6 dark:bg-neutral-700"
        >
          <TouchableOpacity onPress={handleSearch}>
            <Image source={require("../../assets/images/search.png")} />
          </TouchableOpacity>
          <TextInput
            placeholder="Mustang"
            className=" text-base w-56 tracking-wider "
            // placeholderTextColor={"#89858E"}
            placeholderTextColor={"#9b9c9e"}
            onPress={() => setIsSearching(true)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <Image
        source={
          userImage
            ? { uri: userImage }
            : require("../../assets/images/welcome.png")
        }
        style={{
          height: wp(13),
          width: wp(13),
          borderRadius: wp(50),
          marginTop: wp(-4),
          paddingRight: wp(1),
          marginRight: wp(25),
          shadowOpacity: 10,
          shadowColor: "black",
          shadowOffset: { width: 3, height: 2 },
          shadowRadius: 8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "#6E6C6C",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});

export default SearchComponent;
