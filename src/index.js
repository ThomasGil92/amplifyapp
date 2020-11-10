import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setCity } from "./reducers/selectedCityReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(setCity("Paris", 48.8534, 2.3488));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);