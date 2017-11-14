import login from '../modules/login/LoginReducer'
import { routerReducer as router } from 'react-router-redux'
import app from '../modules/app/AppReducer.js'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    login,
    app,
})
export default rootReducer