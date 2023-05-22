import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminDetails: null,
  isLoggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.adminDetails = action.payload;
      console.log(state.adminDetails)
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAdmin, setLoggedIn } = adminSlice.actions;

export default adminSlice.reducer;
