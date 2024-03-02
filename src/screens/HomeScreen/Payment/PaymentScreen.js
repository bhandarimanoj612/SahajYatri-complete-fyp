//import liraries
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { KhatiSdk } from "rn-all-nepal-payment";

// create a component
const Comments = () => {
  const navigation = useNavigation();

  //Add a function to display an alert
  const displayAlert = () => {
    Alert.alert(
      "Success",
      "Successfully booked",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("HomeScreen");
          },
        },
      ],
      { cancelable: false }
    );
  };
  //demo of khalti payment

  //     const [isVisible, setIsVisible] = React.useState(false);

  //   const _onPaymentComplete = (data) => {
  //     setIsVisible(false);
  //     const str = data.nativeEvent.data;
  //     const resp = JSON.parse(str);
  //     // console.log({ resp })
  //     if (resp.event === 'CLOSED') {
  //       // handle closed action
  //     } else if (resp.event === 'SUCCESS') {
  //       // console.log({ data: resp.data })
  //     } else if (resp.event === 'ERROR') {
  //       // console.log({ error: resp.data })
  //     }
  // }
  return (
    <SafeAreaView className="bg-[#D7D9E8] h-full w-full">
      <View style={{}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: "rgba(255,255,255,0.5)", marginRight: 20 }}
        >
          <View className="flex flex-row justify-between font-bold font-w-3xl m-4 ">
            <ChevronDoubleLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            <Text className="text-bold font-extralarge text-2xl mr-10 ">
              Payment
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            className="p-1 rounded-xl m-5"
          >
            <Text className="text-2xl font-extrabold p-6 ">
              Select Your Payment
            </Text>
          </View>

          <View
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            className="p-3 rounded-2xl m-5 justify-center items-center"
          >
            <TouchableOpacity>
              <Text className="text-2xl font-light p-6 ">Khalti</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* booking */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2B3384",
            height: wp(15),
            width: wp(50),
            marginTop: 50,
          }}
          onPress={displayAlert} // Call the displayAlert function on press
          // onPress={() => setIsVisible(true)} // Call the displayAlert function on press
          className="mb-6 mx-auto flex justify-center items-center rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Pay now
          </Text>
        </TouchableOpacity>

        {/* khalti api */}
        {/* <KhatiSdk
        amount={100} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'Dragon'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'http://gameofthrones.wikia.com/wiki/Dragons'} // Url of product
        publicKey={'test_public_key_dc74e0fd57cb46cd93832aee0a390234'} // Test or live public key which identifies the merchant
      /> */}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  // Your styles go here
});

// make this component available to the app
export default Comments;
