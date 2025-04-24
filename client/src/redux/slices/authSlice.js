import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"; 

const BASE_URL = "/user"; 

// 🔹 Register
export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Registration failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// 🔹 Login
export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("visited"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;

