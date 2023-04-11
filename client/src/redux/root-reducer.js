import {combineReducers} from 'redux';
import productReducer from './productReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    products: productReducer,
    authReducer,
})


export default rootReducer;