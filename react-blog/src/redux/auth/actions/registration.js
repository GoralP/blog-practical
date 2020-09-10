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

        console.log(res.data);

        toast.success("Registration successfully done!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE", message: error.message });

        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

// export const getSingleUser = (id) => {
//   const getToken = localStorage.getItem("token");
//   return (dispatch) => {
//     dispatch({ type: "GET_SINGLE_USER_PENDING" });

//     axios
//       .get(`https://infblogdemo.herokuapp.com/auth/local/register/${id}`, {
//         headers: {
//           Authorization: `Bearer ${getToken}`,
//         },
//       })
//       .then((res) => {
//         dispatch({ type: "GET_SINGLE_USER_SUCCESS", user: res.data });
//       })
//       .catch((error) => {
//         dispatch({ type: "GET_SINGLE_USER_FAILURE", message: error.message });
//       });
//   };
// };
