import axios from "axios";
import { toast } from "react-toastify";

export const createPost = (data, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "CREATE_POST_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/posts", data, 
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "CREATE_POST_SUCCESS",
        });
        dispatch(allPosts());
        toast.success("Create post successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "CREATE_POST_FAILURE", message: error.message });
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

export const allPosts = () => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "ALL_POSTS_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/posts")
      .then((res) => {
        dispatch({ type: "ALL_POSTS_SUCCESS", posts: res.data });
      })
      .catch((error) => {
        dispatch({ type: "ALL_POSTS_FAILURE", message: error.message });
      });
  };
};

export const getSinglePost = (id) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_POST_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "GET_SINGLE_POST_SUCCESS", post: res.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_SINGLE_POST_FAILURE", message: error.message });
      });
  };
};

export const deletePost = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_POST_SUCCESS" });
        dispatch(allPosts());
        toast.success("Deleted successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_POST_FAILURE", message: error.message });
      });
  };
};

export const updatePost = (data, id, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "UPDATE_POST_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "UPDATE_POST_SUCCESS",
        });
        dispatch(allPosts());
        toast.success("Updated successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_POST_FAILURE", message: error.message });

        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
