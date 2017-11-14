import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import DeferredMiddleware from 'redux-deferred';
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'
import {ajaxMiddleware} from './AjaxMiddleware'

export default function configureStore(initialState = {}, history){
    //console.log(6)
    let middleware = applyMiddleware(thunk, ajaxMiddleware)

    const store = createStore(rootReducer, initialState, middleware)
    
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer');            
            store.replaceReducer(nextRootReducer)
        })
    }
    
    return store;
}