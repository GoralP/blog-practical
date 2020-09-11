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
        localStorage.setItem("userid", res.data.user.id);

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
        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};
