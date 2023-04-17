import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

// reducers
import rootReducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = configureStore( {reducer: rootReducer}, composeEnhancers( applyMiddleware(thunk)))

window.store = store;

