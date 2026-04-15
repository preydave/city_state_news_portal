import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ✅ Dashboard summary
export const fetchDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/dashboard");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Revenue
export const fetchMonthlyRevenue = createAsyncThunk(
  "admin/revenue",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/revenue");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Campaigns
export const fetchTopCampaigns = createAsyncThunk(
  "admin/campaigns",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/top-campaigns");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Location analytics
export const fetchLocationAnalytics = createAsyncThunk(
  "admin/location",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/location-analytics");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    dashboard: null,
    revenue: [],
    campaigns: [],
    location: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // DASHBOARD
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REVENUE
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
      })

      // CAMPAIGNS
      .addCase(fetchTopCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
      })

      // LOCATION
      .addCase(fetchLocationAnalytics.fulfilled, (state, action) => {
        state.location = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;