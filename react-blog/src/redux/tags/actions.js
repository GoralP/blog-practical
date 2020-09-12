import axios from "axios";
import { toast } from "react-toastify";

export const createTag = (data, setModal) => {
  const getToken = localStorage.getItem("token");
  console.log(data);
  return (dispatch) => {
    dispatch({ type: "CREATE_TAG_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/tags", data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "CREATE_TAG_SUCCESS",
        });
        dispatch(allTags());
        toast.success("Create tag successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "CREATE_TAG_FAILURE", message: error.message });
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

export const allTags = () => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "ALL_TAGS_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/tags", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "ALL_TAGS_SUCCESS", tags: res.data });
      })
      .catch((error) => {
        dispatch({ type: "ALL_TAGS_FAILURE", message: error.message });
      });
  };
};

export const getSingleTag = (id) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_TAG_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "GET_SINGLE_TAG_SUCCESS", tag: res.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_SINGLE_TAG_FAILURE", message: error.message });
      });
  };
};

export const deleteTag = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_TAG_SUCCESS" });
        dispatch(allTags());
      })
      .catch((error) => {
        dispatch({ type: "DELETE_TAG_FAILURE", message: error.message });
      });
  };
};

export const updateTag = (data, id, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "UPDATE_TAG_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/tags/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "UPDATE_TAG_SUCCESS",
        });
        dispatch(allTags());
        toast.success("Updated successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_TAG_FAILURE", message: error.message });

        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
