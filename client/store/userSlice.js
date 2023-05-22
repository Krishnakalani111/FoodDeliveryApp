import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  isLoggedIn: false,
  orders: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
      console.log(state.userDetails)
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = [action.payload,...state.orders];
      console.log(state.orders)
    },
  },
});

export const { setUser, setLoggedIn, setOrders } = userSlice.actions;

export default userSlice.reducer;
