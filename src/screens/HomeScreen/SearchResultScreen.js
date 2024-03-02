import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
const SearchResultScreen = ({ results, setIsSearching }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsSearching(false)}
        className="p-2 mr-5 ml-5 rounded-2xl dark:bg-neutral-700 "
        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      >
        <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
      </TouchableOpacity>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.resultItem}
              className="ml-5 mr-5 rounded-2xl dark:bg-neutral-700 "
              onPress={() => {
                navigation.navigate("HotelBook", { item });
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name} className="dark:text-white">
                  {item.name}
                </Text>
                <Text style={styles.location} className="dark:text-white">
                  {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
  },
});

export default SearchResultScreen;
