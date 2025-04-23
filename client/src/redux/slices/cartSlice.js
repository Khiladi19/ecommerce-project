import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/axios"; // 👈 use custom axios

const BASE_URL = "/cart";

// Get cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/user`);
    // console.log("response :-",res);  
    
    return res.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Add to cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/add`, product);
    return res.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Remove item
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, thunkAPI) => {
  try {
    const res = await axios.delete(`${BASE_URL}/remove/${productId}`);
    thunkAPI.dispatch(fetchCart()); // Refresh cart
    return productId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const res = await axios.delete(`${BASE_URL}/clear`);
    return [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Decrease quantity
export const decreaseQty = createAsyncThunk('cart/decreaseQty', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/--qty`, data);
    // console.log("resdecr:-",decreaseQty);
    
    return res.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// increase quantity
export const increaseQty = createAsyncThunk('cart/increaseQty', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/ing`, data);
    // console.log("resIncrese:-",res)
    return res.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLEAR
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartItems = [];
      })

      // DECREASE QTY
      .addCase(decreaseQty.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
      })
       // Increase  QTY
       .addCase(increaseQty.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
      });
  },
});

export default cartSlice.reducer;
