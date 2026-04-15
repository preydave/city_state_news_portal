import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ================= LOCAL STORAGE =================
const token = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

// ================= INITIAL STATE =================
const initialState = {
  user: storedUser || null,
  token: token || null,
  isAuthenticated: !!token,
  role: storedUser?.role || null,
  loading: false,
  error: null,
  message: null,
};

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", formData);
      const data = res.data;

      const userData = {
        name: data.name,
        email: data.email,
        role: data.role || null,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      return { ...data, user: userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", formData);
      const data = res.data;

      console.log("LOGIN DATA:", data);

      // ✅ FIXED: role ko null force nahi kar rahe
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role || null, // 🔥 important fix
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      return { ...data, user: userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ================= CHANGE PASSWORD =================
export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (formData, thunkAPI) => {
    try {
      const res = await API.put("/auth/change-password", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Change password failed"
      );
    }
  }
);

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ================= LOGOUT =================
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // ================= CLEAR STATUS =================
    clearStatus: (state) => {
      state.message = null;
      state.error = null;
    },

    // ================= SET ROLE =================
    setRole: (state, action) => {
      if (state.user) {
        const updatedUser = {
          ...state.user,
          role: action.payload,
        };

        state.user = updatedUser;
        state.role = action.payload;

        // ✅ sync localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;

        state.user = data.user;
        state.token = data.token;
        state.role = data.user.role;
        state.isAuthenticated = true;

        state.message = "Login successful ✅";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REGISTER =================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;

        state.user = data.user;
        state.token = data.token;
        state.role = data.user.role;
        state.isAuthenticated = true;

        state.message = "Registered successfully ✅";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CHANGE PASSWORD =================
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.message = "Password changed successfully ✅";
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearStatus, setRole } = authSlice.actions;
export default authSlice.reducer;