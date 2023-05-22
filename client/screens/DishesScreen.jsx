import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Text, Image, TouchableOpacity,Alert, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/userSlice";
import { host } from "../api";

const DishesScreen = ({ route, navigation }) => {
  const [dishes, setDishes] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state)=>state.user.userDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await axios.get(
        `${host}/user/${route.params.restaurantId}`
      );
      setDishes(response.data);
    };

    fetchDishes();
  }, [route.params.restaurantId]);

  const handleDishPress = async (userId,dishId) => {
    const res = await axios.post(`${host}/user/orderPlace/${userId}/${dishId}`)
    dispatch(setOrders(res.data.order))
    console.log(res.data)
    Alert.alert("order placed successfully")
  };

  return (
    <>
      <ImageBackground source={require("../assets/background.jpeg")} style={styles.imageBackground}>
      <View>
        
        <Text style={styles.headingText}>WadaKam</Text>
      </View>
      <View style={styles.container}>
        {dishes.map((dish) => (
          <View key={dish._id} style={styles.dishContainer}>
            <Image
              source={require("../assets/fooodd.jpg")}
              style={styles.dishImage}
            />
            <View style={styles.dishInfo}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishDescription}>{dish.description}</Text>
              <Text style={styles.dishPrice}>${dish.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDishPress(user._id,dish._id)}
            >
              <Text style={styles.buttonText}>Order</Text>
            </TouchableOpacity>
          </View>
        ))}
           </View>
          </ImageBackground>
       
        
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headingText: {
    color: "#fff",
    padding: 10,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  dishContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    padding: 6,
  },
  dishImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 5,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dishDescription: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  dishPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default DishesScreen;
