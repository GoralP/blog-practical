const initialState = {
  createTag: { loading: false, error: false, message: null },
  allTags: { loading: false, tagsData: null, error: false, message: null },
  getSingleTag: { loading: false, tag: null, error: false, message: null },
  deleteTag: { loading: false, error: false, message: null },
  updateTag: { loading: false, error: false, message: null },
};

const tagReducers = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TAG_PENDING":
      return {
        ...state,
        createTag: { loading: true, error: false, message: null },
      };
    case "CREATE_TAG_SUCCESS":
      return {
        ...state,
        createTag: { loading: false, error: false, message: null },
      };
    case "CREATE_TAG_FAILURE":
      return {
        ...state,
        createTag: { loading: false, error: true, message: action.message },
      };
    case "ALL_TAGS_PENDING":
      return {
        ...state,
        allTags: { loading: true, tagsData: null, error: false, message: null },
      };
    case "ALL_TAGS_SUCCESS":
      return {
        ...state,
        allTags: {
          loading: false,
          tagsData: action.tagsData,
          error: false,
          message: null,
        },
      };
    case "ALL_TAGS_FAILURE":
      return {
        ...state,
        allTags: {
          loading: false,
          tagsData: null,
          error: true,
          message: action.message,
        },
      };
    case "GET_SINGLE_TAG_PENDING":
      return {
        ...state,
        getSingleTag: { loading: true, tag: null, error: false, message: null },
      };
    case "GET_SINGLE_TAG_SUCCESS":
      return {
        ...state,
        getSingleTag: {
          loading: false,
          tag: action.tag,
          error: false,
          message: null,
        },
      };
    case "GET_SINGLE_TAG_FAILURE":
      return {
        ...state,
        getSingleTag: {
          loading: false,
          tag: null,
          error: true,
          message: action.message,
        },
      };
    case "DELETE_TAG_PENDING":
      return {
        ...state,
        deleteTag: { loading: true, error: false, message: null },
      };
    case "DELETE_TAG_SUCCESS":
      return {
        ...state,
        deleteTag: { loading: false, error: false, message: null },
      };
    case "DELETE_TAG_FAILURE":
      return {
        ...state,
        deleteTag: { loading: false, error: true, message: action.message },
      };
    case "UPDATE_TAG_PENDING":
      return {
        ...state,
        updateTag: { loading: true, error: false, message: null },
      };
    case "UPDATE_TAG_SUCCESS":
      return {
        ...state,
        updateTag: { loading: false, error: false, message: null },
      };
    case "UPDATE_TAG_FAILURE":
      return {
        ...state,
        updateTag: { loading: false, error: true, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default tagReducers;
