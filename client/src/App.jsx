import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { setToken, setUser, logout } from "./redux/slices/authSlice";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./components/AddAddress";
import AllAddresses from "./components/AllAddresses";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import axios from "../src/api/axios";
const BASE_URL = "/user";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      dispatch(setToken(savedToken));

      // Fetch user profile using token
      axios
        .get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        })
        .then((res) => {
          // console.log("res :-",res)
          dispatch(setUser(res.data.user));
        })
        .catch((err) => {
          console.log(
            "Token error: ",
            err.response?.data?.message || err.message
          );
          dispatch(logout()); // Auto logout on token fail
        });
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <AddAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping/list"
          element={
            <PrivateRoute>
              <AllAddresses />
            </PrivateRoute>
          }
        />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin/add" element={<AddProductForm />} />
        <Route path="/admin/list" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
