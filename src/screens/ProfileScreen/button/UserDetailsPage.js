import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useColorScheme } from "nativewind";

const UserDetailsPage = ({ navigation, email }) => {
  //for using dark mode we are using native wind colors steams
  const { colorScheme, toggleColorScheme } = useColorScheme(); //we are using tailwind so we need native colors scheme

  const { userInfo } = useContext(AuthContext);
  const { userName } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); // State variable to force re-render
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imagePath = await AsyncStorage.getItem("userImageFilePath");
        if (imagePath) {
          setImage(imagePath);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [forceUpdate]);

  const updateUserDetails = () => {
    console.log("User details updated successfully!");
    alert("User details updated successfully!");
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const fileName = uri.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.moveAsync({
          from: uri,
          to: newPath,
        });

        await AsyncStorage.setItem("userImageFilePath", newPath);
        setImage(newPath); // Update image state here
      } catch (error) {
        console.error("Error moving image file:", error);
      }
    }
  };

  const deleteImage = async () => {
    try {
      await FileSystem.deleteAsync(image);
      await AsyncStorage.removeItem("userImageFilePath");
      setImage(null);
    } catch (error) {
      console.error("Error deleting image file:", error);
    }
  };

  return (
    <View style={styles.container} className="bg-[#fff] dark:bg-neutral-900">
      <SafeAreaView>
        <TouchableOpacity
          className="text-[#333] dark:text-white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon
            size={20}
            strokeWidth={4}
            color="#333"
            className="text-[#333] dark:text-white"
          />
          <Text
            style={styles.backButtonText}
            className="text-[#333] dark:text-neutral-300"
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading} className="text-[#333] dark:text-white">
          User Details
        </Text>
        <View
          style={styles.infoContainer}
          className="bg-[#f5f5f5] dark:bg-neutral-900"
        >
          <View style={styles.field}>
            <Text style={styles.label} className="text-[#333] dark:text-white">
              Name
            </Text>
            <TextInput
              style={[styles.input]}
              className="text-[#333] dark:bg-neutral-300 bg-neutral-300"
              value={userName}
              editable={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label} className="text-[#333] dark:text-white ">
              Email
            </Text>
            <TextInput
              className="text-[#333] dark:bg-neutral-300 bg-neutral-300"
              style={[styles.input]}
              value={userInfo.email}
              editable={false}
            />
          </View>
          <View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[#333] dark:text-white">
                  Pick an image
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={pickImage}>
                  <Icon name="file-image-plus-outline" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                  className="rounded-full"
                />
                <TouchableOpacity
                  onPress={deleteImage}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={updateUserDetails} style={styles.button}>
            <Icon name="content-save" size={24} color="white" />
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
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
    marginRight: 60,
    alignItems: "center",
  },
  backButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    paddingRight: 70,
    paddingLeft: 70,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 3,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#CB0A31",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserDetailsPage;
