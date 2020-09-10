import axios from "axios";
import { toast } from "react-toastify";

export const login = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("username", res.data.user.username);
        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
        });
        toast.success("Login successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        history.push("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE", message: error.message });
        toast.error("error.response.data.message[0].messages[0].message", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        console.log(error.response.data);
      });
  };
};
