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
import checkUserReducer, {
  checkUserService,
} from "../services/checkUserService";
import userSkillReducer, {
  userSkillService,
} from "../services/userSkillService";
import userEducationReducer, {
  userEducationService,
} from "../services/userEducationService";
import userExperienceReducer, {
  userExperienceService,
} from "../services/userExperienceService";
import userPortfolioReducer, {
  userPortfolioService,
} from "../services/userPortfolioService";

const reducer = {
  skill: skillReducer,
  auth: authReducer,
  [portfolioService.reducerPath]: portfolioReducer,
  [userServices.reducerPath]: userReducer,
  [experienceService.reducerPath]: experienceReducer,
  [educationService.reducerPath]: educationReducer,
  [checkUserService.reducerPath]: checkUserReducer,
  [userSkillService.reducerPath]: userSkillReducer,
  [userEducationService.reducerPath]: userEducationReducer,
  [userExperienceService.reducerPath]: userExperienceReducer,
  [userPortfolioService.reducerPath]: userPortfolioReducer,
};

export const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(portfolioService.middleware)
      .concat(userServices.middleware)
      .concat(experienceService.middleware)
      .concat(educationService.middleware)
      .concat(checkUserService.middleware)
      .concat(userSkillService.middleware)
      .concat(userEducationService.middleware)
      .concat(userExperienceService.middleware)
      .concat(userPortfolioService.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
