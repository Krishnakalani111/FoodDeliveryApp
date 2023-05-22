import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import SignupScreen from "./screens/SignupScreen";
import SignInScreen from "./screens/SignInScreen";
import { useSelector } from "react-redux";
import AdminSignUp from "./screens/AdminSignUp";
import AdminSignIn from "./screens/AdminSignIn";
import RestaurantStack from "./screens/RestaurantStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function RootComponent() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const username = useSelector((state) => state.user.user);
  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          {isLoggedIn || adminLoggedIn ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = focused ? "home-outline" : "home";
                  } else if (route.name === "Orders") {
                    iconName = focused ? "receipt-outline" : "receipt";
                  } else if (route.name === "Profile") {
                    iconName = focused
                      ? "person-circle"
                      : "person-circle-outline";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: "black", // Background color of the tab bar
                  // borderTopWidth: 1, // Add a border on top
                  // borderTopColor: "lightgray", // Border color
                },
                tabBarLabelStyle: {
                  fontSize: 12, // Font size of the tab labels
                  marginBottom: 5, // Spacing between the icon and label
                },
                tabBarIconStyle: {
                  marginBottom: -3, // Adjust the position of the icons
                },
                tabBarInactiveBackgroundColor: "black", // Background color of inactive tabs
                tabBarActiveBackgroundColor: "black", // Background color of active tabs
              })}
            >
              <Tab.Screen name="Home" component={RestaurantStack} />
              <Tab.Screen name="Orders" component={OrdersScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
          ) : (
            <>
              <Stack.Navigator>
                <Stack.Screen name="Register" component={SignupScreen} />
                <Stack.Screen name="Login" component={SignInScreen} />
                <Stack.Screen name="AdminRegister" component={AdminSignUp} />
                <Stack.Screen name="AdminLogIn" component={AdminSignIn} />
              </Stack.Navigator>
            </>
          )}
        </SafeAreaView>
      </NavigationContainer>
      {/* <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <RestaurantStack/>
        </SafeAreaView>
      </NavigationContainer> */}
    </>
  );
}
