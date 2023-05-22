// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { setOrders } from '../store/userSlice';
// import { useDispatch } from 'react-redux';


// const OrderApi = () => {
//   const user = useSelector((state) => state.user.userDetails);
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const response = await axios.get(`http://192.168.29.228:5324/api/user/orders/${user._id}`);
//       dispatch(setOrders(response.data.order))
//     };

//     fetchOrders();
//   }, [user._id]);
// }