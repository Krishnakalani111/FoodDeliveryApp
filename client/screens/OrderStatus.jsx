// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
// import { useSelector } from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';
// import MapView, { Marker } from 'react-native-maps';

// const OrderStatusScreen = ({orderStatus}) => {
  
//   const [animation] = useState(new Animated.Value(0));
//   const [trackingInfo, setTrackingInfo] = useState(null);

//   useEffect(() => {
//     // Animate when order is accepted
//     if (orderStatus) {
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     }

//     // Fetch order tracking information
//     fetchOrderTrackingInfo();
//   }, [order.accepted]);

//   const fetchOrderTrackingInfo = async () => {
//     try {
//       // Make API request to fetch order tracking information
//       const response = await fetch(`https://example.com/api/orders/${order.id}/tracking`);
//       const data = await response.json();
//       setTrackingInfo(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.animationContainer, { opacity: animation }]}>
//         <Text style={styles.animationText}>Order Accepted!</Text>
//         <Ionicons name="checkmark-circle" size={50} color="#008000" />
//       </Animated.View>

//       {trackingInfo ? (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: trackingInfo.latitude,
//               longitude: trackingInfo.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//           >
//             <Marker
//               coordinate={{ latitude: trackingInfo.latitude, longitude: trackingInfo.longitude }}
//               title="Order Location"
//               description="Estimated delivery time: 30 mins"
//             />
//           </MapView>
//           <TouchableOpacity style={styles.trackButton}>
//             <Text style={styles.trackButtonText}>Track Order</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <Text>Loading tracking information...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   animationContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   animationText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   mapContainer: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '80%',
//   },
//   trackButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   trackButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default OrderStatusScreen;
