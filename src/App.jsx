import React from "react";
import AppRouter from "./router/Approuter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <AppRouter />
    </>
  );
}

export default App;
