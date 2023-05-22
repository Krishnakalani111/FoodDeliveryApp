import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, SpaceMono_700Bold } from "@expo-google-fonts/space-mono";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const User = useSelector((state) => state.user.userDetails);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const admin = useSelector((state) => state.admin.adminDetails);

  let [fontsLoaded] = useFonts({
    SpaceMono_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        source={require("../assets/sample2.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Ionicons name="restaurant" size={50} />
          {User && !admin ? (
            <Text style={styles.welcomeText}>
              Welcome {User.userName} to RESTRO!
            </Text>
          ) : (
            <Text style={styles.welcomeText}>Welcome owner of {admin.restaurant}.</Text>
          )}
          <View style={styles.container}>

            <Text style={styles.title}>{isAdminLoggedIn ? "Earn money?":"Hungry?"}</Text>
            <View style={styles.subcontainer}>
              {isAdminLoggedIn ? (
                <Text style={styles.subtitle}>
                  Add the dishes of your restro
                </Text>
              ) : (
                <Text style={styles.subtitle}>
                  Order food from this restaurants
                </Text>
              )}

              {isAdminLoggedIn ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddDish");
                 }} 
                >
                  <Ionicons name="arrow-forward-outline" size={30} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Restaurant")}
                >
                  <Ionicons name="arrow-forward-outline" size={30} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "SpaceMono_700Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 24,
    fontFamily: "SpaceMono_700Bold",

    marginTop: 30,
    marginBottom: 50,
    color: "#faf7f7",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontFamily: "SpaceMono_700Bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "SpaceMono_700Bold",
    color: "#fff",
    fontWeight:"500"
  },
});

export default HomeScreen;
