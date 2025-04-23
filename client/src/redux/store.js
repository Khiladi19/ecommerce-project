import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import productReducer from './slices/productSlice.js'
import cartReducer from "./slices/cartSlice";
import addressReducer from './slices/addressSlice';
import orderReducer from "./slices/orderSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
})