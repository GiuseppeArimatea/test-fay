import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
