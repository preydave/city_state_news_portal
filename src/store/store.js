import { configureStore } from "@reduxjs/toolkit";

// USER
import authReducer from "./slices/authSlice";
import articleReducer from "./slices/articleSlice";
import commentReducer from "./slices/commentSlice";
import adReducer from "./slices/adslice";
import dashboardReducer from "./slices/dashboardSlice";

// ADMIN
import adminArticleReducer from "./slices/adminArticleSlice";
import adminDashboardReducer from "./slices/adminDashboardSlice";
import adminRevenueReducer from "./slices/adminRevenueSlice";

// UI
import uiMessageReducer from "./slices/uiMessageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    comments: commentReducer,
    ads: adReducer,

    // ✅ reader dashboard
    dashboard: dashboardReducer,

    adminArticles: adminArticleReducer,
    adminDashboard: adminDashboardReducer,
    adminRevenue: adminRevenueReducer,

    uiMessage: uiMessageReducer,
  },
  devTools: true,
});

export default store;