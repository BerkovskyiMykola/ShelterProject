import { CREATE_LOGPOINT_SUCCESS, GET_LOGPOINTS_SUCCESS } from "../constants/logPoint";

const initialState = {
    volunteer: "",
    dateStart: "",
    dateEnd: "",
    logPoints: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_LOGPOINTS_SUCCESS:
            return {
                volunteer: payload.volunteer,
                dateStart: payload.dateStart,
                dateEnd: payload.dateEnd,
                logPoints: payload.logPoints
            }
        case CREATE_LOGPOINT_SUCCESS:
            return {
                ...state,
                logPoints: [payload.logPoint, ...state.logPoints]
            }
        default:
            return state;
    }
}