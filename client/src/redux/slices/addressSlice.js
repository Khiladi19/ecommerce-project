import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/axios"; // 👈 use custom axios

const BASE_URL = "/address"; // No need to write full URL again

// Add address thunk
export const addAddressThunk = createAsyncThunk(
  'address/add',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, addressData);
      return response.data.userAddress;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get address thunk
export const getAddressThunk = createAsyncThunk(
  'address/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get`);
      // console.log("response :-",response)
      return response.data.addresses;
      // return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: null,
    addresses: [], 
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAddressState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Add Address
    builder
      .addCase(addAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.address = action.payload;
      })
      .addCase(addAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Address
    builder
      .addCase(getAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.success = true;
      })
      .addCase(getAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;
