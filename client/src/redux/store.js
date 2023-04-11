import { legacy_createStore as createStore, applyMiddleware} from 'redux'
// import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from './root-reducer';

// const middleware  = [reduxThunk];

// middleware.push(logger);

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

export default store;