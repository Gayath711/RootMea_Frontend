import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../../apiConfig";
export const fetchUserPermissions = createAsyncThunk(
  "userInfo/fetchUserPermissions",
  async (_, { getState }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${apiURL}/profile-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user_type;
    } catch (error) {
      console.error("Error fetching User Permissions:", error);
      throw error;
    }
  }
);

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userType: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        state.userType = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userInfo.reducer;
