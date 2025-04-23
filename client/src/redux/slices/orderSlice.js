import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// 🔹 Create a new order
// export const createOrder = createAsyncThunk(
//   "order/createOrder",
//   async (orderData, thunkAPI) => {
//     try {
//     //   const token = localStorage.getItem("token");
//       const res = await axios.post("/orders/create", orderData);
//       return res.data;
//     } catch (error) {
//       const msg = error.response?.data?.msg || "Order creation failed";
//       return thunkAPI.rejectWithValue(msg);
//     }
//   }
// );

// 🔹 Fetch user's orders
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
    //   const token = localStorage.getItem("token");
      const res = await axios.get("/orders/my-order");
      // console.log("response fetch data :- ",res)
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.msg || "Fetching orders failed";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// 🔹 Order Slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    latestOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔸 Create Order
      // .addCase(createOrder.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createOrder.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.latestOrder = action.payload;
      //   state.orders.unshift(action.payload); // Add new order to the top
      // })
      // .addCase(createOrder.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // 🔸 Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
