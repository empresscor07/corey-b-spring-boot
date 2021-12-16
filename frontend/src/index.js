import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {logger} from "redux-logger/src";
import user from './modules/UserMod';
import event from './modules/eventMod';
import invite from './modules/inviteModule'

const asyncMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    // Otherwise, it's a normal action - send it onwards
    next(action)
}

//The syntax of using applyMiddleware API is −
const middlewareEnhancer = applyMiddleware(asyncMiddleware, logger) //logger passed here if needed


//Combines all reducers to allow one root reducer to be sent to the store
const rootReducer = combineReducers({user, event, invite})

//MIDDLEWARE AND REDUCER can be applied to store as follows −
export const store = createStore(rootReducer, middlewareEnhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);