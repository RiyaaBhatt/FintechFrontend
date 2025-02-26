import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";
import siteLoaderReducer from "./slices/siteLoaderSlice";

const persistConfig = {
  key: "Fintech",
  storage: sessionStorage,
  whitelist: ["user", "venue"],
};

const rootReducer = combineReducers({
  toast: toastReducer,
  siteLoader: siteLoaderReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
