import { combineReducers } from "@reduxjs/toolkit";
import selectedCity from "./selectedCityReducer";

const rootReducer = combineReducers({
  selectedCity,
});

export default rootReducer;
