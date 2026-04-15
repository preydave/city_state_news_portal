import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// 🔥 FETCH ALL ARTICLES
export const fetchAllArticles = createAsyncThunk(
  "admin/fetchAllArticles",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/articles");
      return res.data.data || []; // ✅ FIX
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed"
      );
    }
  }
);

// 🔥 FETCH PENDING
export const fetchPendingArticles = createAsyncThunk(
  "admin/fetchPendingArticles",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/pendingArticles");
      return res.data.data || []; // ✅ FIX
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed"
      );
    }
  }
);

// 🔥 APPROVE
export const approveArticle = createAsyncThunk(
  "admin/approveArticle",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/admin/approveArticle/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔥 REJECT
export const rejectArticle = createAsyncThunk(
  "admin/rejectArticle",
  async ({ id, reason }, thunkAPI) => {
    try {
      const res = await API.put(`/admin/rejectArticle/${id}`, { reason });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔥 PUBLISH
export const publishArticle = createAsyncThunk(
  "admin/publishArticle",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/admin/publishArticle/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SLICE =================

const articleSlice = createSlice({
  name: "adminArticles",
  initialState: {
    articles: [],
    pending: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload || []; // ✅ SAFE
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PENDING
      .addCase(fetchPendingArticles.fulfilled, (state, action) => {
        state.pending = action.payload || [];
      })

      // APPROVE
      .addCase(approveArticle.fulfilled, (state, action) => {
        state.pending = state.pending.filter(
          (a) => a._id !== action.payload._id
        );
        state.articles.unshift(action.payload);
      })

      // REJECT
      .addCase(rejectArticle.fulfilled, (state, action) => {
        state.pending = state.pending.filter(
          (a) => a._id !== action.payload._id
        );
      })

      // PUBLISH
      .addCase(publishArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      });
  },
});

export default articleSlice.reducer;