const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTRATION_PENDING":
      return { ...state, loading: true, data: null };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "REGISTRATION_FAILURE":
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

export default registrationReducer;
