import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen.js";
import BottomTab from "../navigation/BottomTab.js";
import { getItem } from "../screens/utils/asyncStorage.js";
import LoginScreen from "../screens/LoginSignup/LoginScreen.js";
import Budget from "../screens/BudgetScreen/Expense/Budget.jsx";
import RegisterScreen from "../screens/LoginSignup/RegisterScreen.js";
import TravelPlacesScreen from "../screens/HomeScreen/TravelPlacesScreen.js";
import PaymentScreen from "../screens/HomeScreen/Payment/PaymentScreen.js";
import HelpPage from "../screens/ProfileScreen/button/HelpPage.js";
import SafetyRulesPage from "../screens/ProfileScreen/button/SafetyRulesPage.js";
import PrivacyPolicyPage from "../screens/ProfileScreen/button/PrivacyPolicyPage.js";
import UserDetailsPage from "../screens/ProfileScreen/button/UserDetailsPage.js";
import AddExpense from "../screens/BudgetScreen/Expense/AddExpense.jsx";
import AddTrip from "../screens/BudgetScreen/Expense/AddTrip.jsx";
import CategoryList from "../screens/BudgetScreen/CategoryList.jsx";
import TripExpensesScreen from "../screens/BudgetScreen/Expense/TripExpensesScreen.jsx";
import ProfileSign from "../screens/ProfileScreen/ProfileSign.js";
import UserProfile from "../screens/ProfileScreen/UserProfile.js";
import { AuthContext } from "../Context/AuthContext.js";
import HomeScreen from "../screens/HomeScreen/HomeScreen.js";
import SearchResultScreen from "../screens/HomeScreen/SearchResultScreen.js";
import SearchHome from "../screens/HomeScreen/SearchHome.js";
import ChatHome from "../screens/ChatScreen/ChatHome.jsx";
import Friend from "../screens/ChatScreen/Chat/Friend.jsx";
import Auth from "../screens/ChatScreen/Chat/Auth.jsx";
import GroupPage from "../screens/ChatScreen/Chat/GroupPage.jsx";
import ChatScreen from "../screens/ChatScreen/Chat/ChatScreen.jsx";
import HotelBook from "../screens/HomeScreen/Booking/HotelBook.jsx";
import VehicleBook from "../screens/HomeScreen/Booking/VehicleBook.jsx";
import TravelBook from "../screens/HomeScreen/Booking/TravelBook.jsx";
import BookingDetails from "../screens/ProfileScreen/button/BookingDetails/BookingDetails.jsx";
import ProfileHome from "../screens/ProfileScreen/ProfileHome.js";
import PopularScreen from "../screens/HomeScreen/Popular/PopularScreen.jsx";
import RecommendScreen from "../screens/HomeScreen/Popular/RecommendScreen.jsx";
import PrivateMessage from "../screens/ChatScreen/Message/PrivateMessage.jsx";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");

    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ButtomTab">
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          {/* Onboarding Screen */}
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          {/* Login Screen */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          {/* Sin Up */}
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          {/* Budget */}
          <Stack.Screen
            name="Budget"
            component={Budget}
            options={{ headerShown: false }}
          />
          {/* travel place screen */}
          <Stack.Screen
            name="TravelPlacesScreen"
            component={TravelPlacesScreen}
            options={{ headerShown: false }}
          />
          {/* comment review screen */}
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />

          {/* HelpPage */}
          <Stack.Screen
            name="HelpPage"
            component={HelpPage}
            options={{ headerShown: false }}
          />
          {/* SafetyRulesPage */}
          <Stack.Screen
            name="SafetyRulesPage"
            component={SafetyRulesPage}
            options={{ headerShown: false }}
          />
          {/* PrivacyPolicyPage */}
          <Stack.Screen
            name="PrivacyPolicyPage"
            component={PrivacyPolicyPage}
            options={{ headerShown: false }}
          />
          {/* UserDetailsPage */}
          <Stack.Screen
            name="UserDetailsPage"
            component={UserDetailsPage}
            options={{ headerShown: false }}
          />
          {/* add expenses */}
          <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            options={{ headerShown: false }}
          />
          {/* add trip */}
          <Stack.Screen
            name="AddTrip"
            component={AddTrip}
            options={{ headerShown: false }}
          />
          {/* Category  */}
          <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={{ headerShown: false }}
          />
          {/* TripExpensesScreen  */}
          <Stack.Screen
            name="TripExpenses"
            component={TripExpensesScreen}
            options={{ headerShown: false }}
          />
          {/* profile sign */}
          <Stack.Screen
            name="ProfileSign"
            component={ProfileSign}
            options={{ headerShown: false }}
          />
          {/* user profile */}
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthContext"
            component={AuthContext}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchResultScreen"
            component={SearchResultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchHome"
            component={SearchHome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatHome"
            component={ChatHome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Friend"
            component={Friend}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HotelBook"
            component={HotelBook}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VehicleBook"
            component={VehicleBook}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TravelBook"
            component={TravelBook}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookingDetails"
            component={BookingDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileHome"
            component={ProfileHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PopularScreen"
            component={PopularScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecommendScreen"
            component={RecommendScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivateMessage"
            component={PrivateMessage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;
