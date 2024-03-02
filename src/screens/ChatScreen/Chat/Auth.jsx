// AuthScreen.js
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Auth = () => {
  const [name, setname] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    // making api response to handle  register api
    axios
      .post(`${BASE_URL}Chat/register-user`, {
        name,
      })
      .then((response) => {
        //handle succssfully
        Alert.alert("Registration Successful", response.data);
        console.log("Registration Successful");
        navigation.navigate("Friend", { name });
        // navigation.navigate("MessageScreen");
      })
      .catch((error) => {
        Alert.alert("Registration Failure", error.response.data);
      });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/Budget/1.png")}
      style={styles.backgroundImage}
      className="dark:bg-neutral-900"
    >
      <View style={styles.container} className="dark:bg-neutral-900">
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setname(text)} //for connnecting backend and frontend
        />
        <Button title="Join Chat" onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    width: "90%",
    height: "70%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Auth;
