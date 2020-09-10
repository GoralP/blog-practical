import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import BlogRouter from "./routing/BlogRouter";
import "antd/dist/antd.css";

function App() {
  return (
    <Provider store={store}>
      <BlogRouter></BlogRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
