import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const SafetyRulesPage = ({ navigation }) => {
  return (
    <View
      style={styles.container}
      className="bg-[#fff] text-[#333] dark:text-white dark:bg-neutral-800 "
    >
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={20} strokeWidth={4} color="#333" />
          <Text
            style={styles.backButtonText}
            className="text-[#333] dark:text-white"
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading} className="text-[#333] dark:text-white ">
          Safety Tips
        </Text>
        <View
          style={styles.infoContainer}
          className="bg-[#f5f5f5] dark:bg-neutral-800 "
        >
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            1. Carry identification and emergency contact information with you
            at all times.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            2. Secure your belongings and avoid leaving them unattended.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            3. Be cautious about sharing personal information, especially with
            strangers.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            4. Follow safety instructions provided by tour guides or
            authorities.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            5. Stay vigilant and aware of your surroundings.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            6. In case of emergency, call the provided emergency number:{" "}
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            7. Avoid traveling alone, especially at night or in unfamiliar
            areas.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            8. Keep a copy of important documents such as passports and visas in
            a secure location.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            9. Stay hydrated and carry a first aid kit with essential
            medications.
          </Text>
          <Text
            style={styles.infoText}
            className="text-[#333] dark:text-white "
          >
            10. Trust your instincts and avoid situations that feel unsafe.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 20,
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 5,

    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SafetyRulesPage;
