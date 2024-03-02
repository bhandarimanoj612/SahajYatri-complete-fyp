import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen.js";
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 flex justify-end">
      {/* background images */}
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-full w-full absolute"
      />

      {/* content and gradient   */}
      <View className="p-5 pb-10 space-y-8">
        {/* <LinearGradient
          colors={["transparent", "rgba(230,0,0,0.8)"]}
          style={{ width: wp(100), height: hp(40) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        ></LinearGradient> */}

        <View className="space-y-3 mb-5">
          <Text
            className="text-white font-bold text-5xl"
            style={{ fontSize: wp(10) }}
          >
            Traveling is easy!
          </Text>
          <Text
            className="text-neutral-200 font-medium"
            style={{ fontSize: wp(4) }}
          >
            Experience the world's best adventure around the world
          </Text>
          {/* let's go buttom to naviagate to ho */}
          <View className="m-3">
            {/* <TouchableOpacity
              className="bg-red-500 mx-auto p-3 px-12 rounded-full"
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text
                className="text-white font-bold "
                style={{ fontSize: wp(5.5) }}
              >
                Let's go!
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
