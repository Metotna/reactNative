import AppStore from "./reducer/index";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const store = createStore(AppStore, applyMiddleware(thunk))
export default store 