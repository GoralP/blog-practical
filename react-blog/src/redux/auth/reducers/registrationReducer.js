const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
  getSingleUser: { loading: false, user: null, error: false, message: null },
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
    // case "GET_SINGLE_USER_PENDING":
    //   return {
    //     ...state,
    //     getSingleUser: {
    //       loading: true,
    //       user: null,
    //       error: false,
    //       message: null,
    //     },
    //   };
    // case "GET_SINGLE_USER_SUCCESS":
    //   return {
    //     ...state,
    //     getSingleUser: {
    //       loading: false,
    //       user: action.tag,
    //       error: false,
    //       message: null,
    //     },
    //   };
    // case "GET_SINGLE_USER_FAILURE":
    //   return {
    //     ...state,
    //     getSingleUser: {
    //       loading: false,
    //       user: null,
    //       error: true,
    //       message: action.message,
    //     },
    //   };
    default:
      return { ...state };
  }
};

export default registrationReducer;
