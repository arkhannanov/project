import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import imagesReducer, {watchFetchImage} from "./images-reducer";
import createSagaMiddleware from "redux-saga";

let reducers = combineReducers({
  imagesPage: imagesReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchFetchImage);
window.__store__ = store;

export default store;