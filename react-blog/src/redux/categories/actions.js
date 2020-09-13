import axios from "axios";
import { toast } from "react-toastify";

export const createCategory = (data, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "CREATE_CATEGORY_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/categories", data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "CREATE_CATEGORY_SUCCESS",
        });
        dispatch(allCategories());
        toast.success("Create category successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "CREATE_CATEGORY_FAILURE", message: error.message });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

export const allCategories = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORIES_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/categories")
      .then((res) => {
        dispatch({ type: "ALL_CATEGORIES_SUCCESS", categoriesData: res.data });
      })
      .catch((error) => {
        dispatch({ type: "ALL_CATEGORIES_FAILURE", message: error.message });
      });
  };
};

export const getSingleCategory = (id) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_CATEGORY_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "GET_SINGLE_CATEGORY_SUCCESS", category: res.data });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SINGLE_CATEGORY_FAILURE",
          message: error.message,
        });
      });
  };
};

export const deleteCategory = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({ type: "DELETE_CATEGORY_SUCCESS" });
        dispatch(allCategories());
      })
      .catch((error) => {
        dispatch({ type: "DELETE_CATEGORY_FAILURE", message: error.message });
      });
  };
};

export const updateCategory = (data, id, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "UPDATE_CATEGORY_PENDING" });
    axios
      .put(
        `https://infblogdemo.herokuapp.com/categories/${id}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "UPDATE_CATEGORY_SUCCESS",
        });
        dispatch(allCategories());
        toast.success("updated successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_CATEGORY_FAILURE", message: error.message });

        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
