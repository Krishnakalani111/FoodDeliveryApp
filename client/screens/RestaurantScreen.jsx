import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { host } from "../api";

const RestaurantScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  
  

  useEffect(() => {
    
    const fetchRestaurants = async () => {
      const response = await axios.get(
        `${host}/user/restraunts`
      );
      setRestaurants(response.data);
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantPress = (restaurantId) => {
    navigation.navigate("Dishes", { restaurantId });
  };

  return (
    <ImageBackground
      source={require("../assets/sample2.jpg")}
      style={styles.imageBackground}
    >
      <View style={{marginVertical:10,marginHorizontal:12}}>
        <Text style={styles.name}>Best Restro's in town</Text>
      </View>
      <View style={{marginVertical:10,marginHorizontal:12}}>
        <Text style={{color:"white"}}>Click on any of them below to see their dishes</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={restaurants.reverse()}
          keyExtractor={(restaurant) => restaurant._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item._id}
              style={styles.restaurantContainer}
              onPress={() => handleRestaurantPress(item._id)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/restroo.jpg")}
                  style={styles.image}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={{color:"white"}}>{item.restaurant}</Text>
                <Text style={styles.description}>
                  {item.userName} is the restaurant owner
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height:"100%"
  },
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 100,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    backgroundColor: "black"
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    
  },
  image: {
    width: "90%",
    height: "90%",
  },
  detailsContainer: {
    width: "65%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    color:"white"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color:"white"
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export default RestaurantScreen;
