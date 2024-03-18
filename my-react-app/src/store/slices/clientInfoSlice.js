import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedApi } from "../../services/api";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

export const fetchClientInfoAsync = createAsyncThunk(
  "clientInfo/fetchClients",
  async ({clientId}) => {
    const response = await protectedApi.get(`/clientinfo-api/${clientId}`);

    return response.data;
  }
);

const clientInfoSlice = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientInfoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchClientInfoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clientInfoSlice.reducer;
