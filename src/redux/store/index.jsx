import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import skillReducer from "../slices/skillSlice";
import authReducer from "../slices/authSlice";
import portfolioReducer, {
  portfolioService,
} from "../services/portfolioService";
import userReducer, { userServices } from "../services/userService";
import experienceReducer, {
  experienceService,
} from "../services/experienceService";
import educationReducer, {
  educationService,
} from "../services/educationService";

const reducer = {
  skill: skillReducer,
  auth: authReducer,
  [portfolioService.reducerPath]: portfolioReducer,
  [userServices.reducerPath]: userReducer,
  [experienceService.reducerPath]: experienceReducer,
  [educationService.reducerPath]: educationReducer,
};

export const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(portfolioService.middleware)
      .concat(userServices.middleware)
      .concat(experienceService.middleware)
      .concat(educationService.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
