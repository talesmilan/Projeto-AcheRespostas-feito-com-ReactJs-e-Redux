import { combineReducers } from "redux";
import loginReducer from './login'
import messageSuccessReducer from "./messageSuccess";


const rootReducer = combineReducers({loginReducer, messageSuccessReducer})

export default rootReducer