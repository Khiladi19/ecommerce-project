// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "http://localhost:2000/api/product";

// // GET (with optional filters)
// export const fetchProducts = createAsyncThunk(
//   "product/fetchAll",
//   async ({ search = "", catagory = "", minPrice = "", maxPrice = "" } = {}) => {
//     const hasFilters = search || catagory || minPrice || maxPrice;
//     const queryParams = new URLSearchParams();
//     if (search) queryParams.append("search", search);
//     if (catagory) queryParams.append("catagory", catagory);
//     if (minPrice) queryParams.append("minPrice", minPrice);
//     if (maxPrice) queryParams.append("maxPrice", maxPrice);

//     const url = hasFilters
//       ? `${BASE_URL}/filter?${queryParams.toString()}`
//       : `${BASE_URL}/all`;

//     const res = await axios.get(url);
//     // console.log("response :-",res)
//     return res.data;
//   }
// );

// // CREATE
// export const addProduct = createAsyncThunk(
//   "product/add",
//   async (productData) => {
//     const res = await axios.post(`${BASE_URL}/add`, productData);
//     return res.data;
//   }
// );

// // UPDATE
// export const updateProduct = createAsyncThunk(
//   "product/update",
//   async ({ id, productData }) => {
//     const res = await axios.put(`${BASE_URL}/${id}`, productData);
//     console.log("response :- ",res)
//     return res.data;
//   }
// );

// // DELETE
// export const deleteProduct = createAsyncThunk(
//   "product/delete",
//   async (id) => {
//     await axios.delete(`${BASE_URL}/${id}`);
//     return id; // Return ID for local state update
//   }
// );


// src/features/product/productActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"; // 👈 use custom axios

const BASE_URL = "/product"; // No need to write full URL again

// GET (with filters)
export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async ({ search = "", catagory = "", minPrice = "", maxPrice = "" } = {}) => {
    const hasFilters = search || catagory || minPrice || maxPrice;
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (catagory) queryParams.append("catagory", catagory);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);

    const url = hasFilters
      ? `${BASE_URL}/filter?${queryParams.toString()}`
      : `${BASE_URL}/all`;

    const res = await axios.get(url);
    return res.data;
  }
);

// CREATE
export const addProduct = createAsyncThunk(
  "product/add",
  async (productData) => {
    const res = await axios.post(`${BASE_URL}/add`, productData);
    return res.data;
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, productData);
    return res.data;
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// PRODUCT BY ID
export const fetchSingleProduct = createAsyncThunk("product/fetchOne", async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    // console.log("response :-",res)
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to load product");
  }
});

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async (catagory) => {
    const res = await axios.get(`${BASE_URL}/filter?catagory=${catagory}`);
    // console.log("response :-",res)
    return res.data.products;
  }
);
