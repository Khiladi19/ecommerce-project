// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // export const fetchProducts = createAsyncThunk("product/fetch", async () => {
// //   const res = await axios.get("http://localhost:2000/api/product/all");
// //   // console.log("response:-",res)
// //   return res.data;
// // });

// // export const fetchProducts = createAsyncThunk(
// //   "product/fetch",
// //   async ({ search = "", category = "", minPrice = "", maxPrice = "" } = {}) => {
// //     const queryParams = new URLSearchParams();

// //     if (search) queryParams.append("search", search);
// //     if (category) queryParams.append("category", category);
// //     if (minPrice) queryParams.append("minPrice", minPrice);
// //     if (maxPrice) queryParams.append("maxPrice", maxPrice);

// //     const res = await axios.get(`http://localhost:2000/api/product/filter?${queryParams.toString()}`);

// //     return res.data;
// //   }
// // );


// export const fetchProducts = createAsyncThunk(
//   "product/fetch",
//   async ({ search = "", catagory = "", minPrice = "", maxPrice = "" } = {}) => {
//     try {
//       const hasFilters =
//         search !== "" || catagory !== "" || minPrice !== "" || maxPrice !== "";

//       if (!hasFilters) {
//         // No filters — get all products
//         const res = await axios.get("http://localhost:2000/api/product/all");
//         return res.data;
//       } else {
//         // Filters applied — build query string
//         const queryParams = new URLSearchParams();

//         if (search) queryParams.append("search", search);
//         if (catagory) queryParams.append("catagory", catagory);
//         if (minPrice) queryParams.append("minPrice", minPrice);
//         if (maxPrice) queryParams.append("maxPrice", maxPrice);

//         const res = await axios.get(
//           `http://localhost:2000/api/product/filter?${queryParams.toString()}`
//         );
//         return res.data;
//       }
//     } catch (error) {
//       throw error.response?.data || { message: "Something went wrong" };
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to fetch products";
//       });
//   },
// });

// export default productSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchSingleProduct,
  fetchRelatedProducts
} from "./productThunk";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    relatedProducts:[],
    singleProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Add new product to the beginning
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state?.items?.filter(p => p._id !== action.payload);
      })

      // PRODUCT BY ID
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // RELATED PRODUCT
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

