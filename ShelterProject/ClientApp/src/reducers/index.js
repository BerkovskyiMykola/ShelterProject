import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import profile from "./profile";
import animal from "./animal";
import shelter from "./shelter";
import walk from "./walk";
import logPoint from "./logPoint";

export default combineReducers({
    auth,
    message,
    user,
    profile,
    animal,
    shelter,
    walk,
    logPoint
});