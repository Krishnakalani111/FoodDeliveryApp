import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
//import OrderStatusScreen from "./OrderStatus";
import { host } from "../api";

const OrdersScreen = ({navigation}) => {
  const user = useSelector((state) => state.user.userDetails);
  const admin = useSelector((state) => state.admin.adminDetails);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const handleOrderStatus = async (itemId) => {
    try {
      console.log(itemId);
      const res = await axios.put(
        `${host}/admin/acceptOrder/${itemId}`
      );
      console.log(res.data.message);
      setIsAccepted(true);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.log(err.message);
      setIsAccepted(false);
    }
  };

  const fetchOrders = async () => {
    const response = await axios.get(
      `${host}/user/orders/${user._id}`
    );
    setOrders(response.data);
  };

  const fetchOrdersForAdmin = async () => {
    const response = await axios.get(
      `${host}/admin/orders/${admin._id}`
    );
    setOrders(response.data.orders);
  };

  if (isAdminLoggedIn) {
    useEffect(() => {
      fetchOrdersForAdmin();

      fetchOrders();
    }, [admin._id]);
  } else {
    useEffect(() => {
      fetchOrders();

      fetchOrders();
    }, [user._id]);
  }
  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Dish Name: {item.dish.name}</Text>
      <Text style={styles.orderText}>Total Price: {item.dish.price}</Text>
      <Text style={styles.orderText}>Order Status: "{item.status}"</Text>
      {isAdminLoggedIn ? (
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            isAccepted ? null : handleOrderStatus(item._id);
          }}
        >
          <Text style={styles.refreshButtonText}>
            {isAccepted ? "Already Accepted" : "Accept the order"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    
      <ImageBackground
        source={require("../assets/sample2.jpg")}
        style={styles.imageBackground}
      >
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Here are all your orders</Text>
        </View>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No orders found.</Text>}
        />
        <View>
          <Text style={styles.orderText}>{message}</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() =>
              isAdminLoggedIn ? fetchOrdersForAdmin() : fetchOrders()
            }
          >
            <Text style={styles.refreshButtonText}>Referesh!</Text>
          </TouchableOpacity>
          {/* {!isAdminLoggedIn ? (
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() =>
                navigation.navigate(<OrderStatusScreen orderStatus={true}/>)
              }
            >
              <Text style={styles.refreshButtonText}>Find order status</Text>
            </TouchableOpacity>
          ) : null} */}
        </View>
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
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color:"white"
  },
  container: {
    flex: 1,
    marginVertical: 40,
    alignItems: "center",
  },
  orderContainer: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    alignSelf: "center",
    marginTop: 20,
  },
  refreshButton: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#dce2e7",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#050505",
  },
});

export default OrdersScreen;
