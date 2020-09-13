import axios from "axios";
import { toast } from "react-toastify";

export const registration = (data) => {
  return (dispatch) => {
    dispatch({ type: "REGISTRATION_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local/register", data)

      .then((res) => {
        dispatch({
          type: "REGISTRATION_SUCCESS",
        });

        toast.success("Registration successfully done!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE", message: error.message });
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
