const initialState = {
  createPost: { loading: false, error: false, message: null },
  allPosts: { loading: false, posts: null, error: false, message: null },
  getSinglePost: { loading: false, post: null, error: false, message: null },
  deletePost: { loading: false, error: false, message: null },
  updatePost: { loading: false, error: false, message: null },
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_PENDING":
      return {
        ...state,
        createPost: { loading: true, error: false, message: null },
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        createPost: { loading: false, error: false, message: null },
      };
    case "CREATE_POST_FAILURE":
      return {
        ...state,
        createPost: { loading: false, error: true, message: action.message },
      };
    case "ALL_POSTS_PENDING":
      return {
        ...state,
        allPosts: { loading: true, posts: null, error: false, message: null },
      };
    case "ALL_POSTS_SUCCESS":
      return {
        ...state,
        allPosts: {
          loading: false,
          posts: action.posts,
          error: false,
          message: null,
        },
      };
    case "ALL_POSTS_FAILURE":
      return {
        ...state,
        allPosts: {
          loading: false,
          posts: null,
          error: true,
          message: action.message,
        },
      };
    case "GET_SINGLE_POST_PENDING":
      return {
        ...state,
        getSinglePost: {
          loading: true,
          post: null,
          error: false,
          message: null,
        },
      };
    case "GET_SINGLE_POST_SUCCESS":
      return {
        ...state,
        getSinglePost: {
          loading: false,
          post: action.post,
          error: false,
          message: null,
        },
      };
    case "GET_SINGLE_POST_FAILURE":
      return {
        ...state,
        getSinglePost: {
          loading: false,
          post: null,
          error: true,
          message: action.message,
        },
      };
    case "DELETE_POST_PENDING":
      return {
        ...state,
        deletePost: { loading: true, error: false, message: null },
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        deletePost: { loading: false, error: false, message: null },
      };
    case "DELETE_POST_FAILURE":
      return {
        ...state,
        deletePost: { loading: false, error: true, message: action.message },
      };
    case "UPDATE_POST_PENDING":
      return {
        ...state,
        updatePost: { loading: true, error: false, message: null },
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        updatePost: { loading: false, error: false, message: null },
      };
    case "UPDATE_POST_FAILURE":
      return {
        ...state,
        updatePost: { loading: false, error: true, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default postReducers;
