import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./auth/reducers/loginReducer";
import RegistrationReducer from "./auth/reducers/registrationReducer";
// import fetchAllPostReducers from "./posts/reducers/postReducers";
import tagReducers from "./tags/reducers";
import categoryReducers from "./categories/reducers";
import postReducers from "./posts/reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  loginReducer,
  RegistrationReducer,
  postReducers,
  tagReducers,
  categoryReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
