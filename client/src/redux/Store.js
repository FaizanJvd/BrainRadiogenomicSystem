import { legacy_createStore as createStore } from 'redux';
import {combineReducers} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
// import rootReducer from './Reducers';
import userReducer from './userRedux';
import recepReducer from './recpReducer';
import radiologistReducar from './radiologistReducar';
const rootReducer = combineReducers({ user: userReducer,recp:recepReducer,radiologist:radiologistReducar });

const store = createStore(rootReducer,composeWithDevTools());
export default store;