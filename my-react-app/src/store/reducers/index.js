import { combineReducers } from "redux";
import auth from "../slices/authSlice";
import clientsInfo from "../slices/clientsInfoSlice";
import clientInfo from "../slices/clientInfoSlice";
import socialVitalSigns from "../slices/socialVitalSignsSlice";
import medication from "../slices/medicationSlice";
import diagnoses from "../slices/diagnosesSlice";
import userInfo from "../slices/userInfoSlice";

const reducers = combineReducers({
  auth,
  clientInfo,
  clientsInfo,
  socialVitalSigns,
  medication,
  diagnoses,
  userInfo,
});

export default reducers;
