const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FETCH_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGIN_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case "LOGIN_FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
