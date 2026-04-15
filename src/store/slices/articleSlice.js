import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

const initialState = {
  articles: [],
  article: null,
  allArticles: [],
  loading: false,
  error: null,
  message: null,
};

// ✅ SAFE NORMALIZE
const normalizeArticles = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.articles) return payload.articles;
  return [];
};

// ✅ ERROR HELPER
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
};

// ================= FETCH ALL =================
export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get(`/articles`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= FETCH SINGLE =================
export const fetchArticleDetails = createAsyncThunk(
  "articles/fetchDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/articles/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= LIKE =================
export const toggleLikeArticle = createAsyncThunk(
  "articles/toggleLike",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/articles/like/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= VIEW =================
export const viewArticle = createAsyncThunk(
  "articles/view",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/articles/view/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= SEARCH =================
export const searchArticles = createAsyncThunk(
  "articles/search",
  async (query, thunkAPI) => {
    try {
      const res = await API.get(`/articles?search=${query}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= FILTER =================
export const filterArticles = createAsyncThunk(
  "articles/filter",
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await API.get(`/articles?${params}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= DELETE =================
export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/articles/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= SUBMIT =================
export const submitArticle = createAsyncThunk(
  "articles/submit",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/articles/submit/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= SLICE =================
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticleState: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        const data = normalizeArticles(action.payload);
        state.articles = data;
        state.allArticles = data;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH DETAILS
      .addCase(fetchArticleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIKE
      .addCase(toggleLikeArticle.fulfilled, (state, action) => {
        if (!action.payload?._id) return;

        state.article = action.payload;
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })

      // VIEW
      .addCase(viewArticle.fulfilled, (state, action) => {
        if (!action.payload?._id) return;

        state.article = action.payload;
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })

      // SEARCH
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = normalizeArticles(action.payload);
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FILTER
      .addCase(filterArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = normalizeArticles(action.payload);
      })
      .addCase(filterArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (a) => a._id !== action.payload
        );
        state.message = "Article deleted ✅";
      })

      // SUBMIT
      .addCase(submitArticle.fulfilled, (state) => {
        state.message = "Article submitted successfully ✅";
      });
  },
});

export const { clearArticleState } = articleSlice.actions;
export default articleSlice.reducer;