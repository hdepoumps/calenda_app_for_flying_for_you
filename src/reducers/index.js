import {combineReducers} from "redux";
import  taskReducer from "./task.reducer"
import postReducer from "./post.reducer";
export default combineReducers({
    taskReducer,
    postReducer
    // Reducers
})