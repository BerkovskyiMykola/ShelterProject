import EventBus from "../common/EventBus";
import { CREATE_LOGPOINT_ERROR, CREATE_LOGPOINT_SUCCESS, GET_LOGPOINTS_SUCCESS } from "../constants/logPoint";
import logPointService from "../services/logPoint.service";

export const getLogPoints = (id) => (dispatch) => {
    return logPointService.getLogPoints(id).then(
        (responce) => {
            dispatch({
                type: GET_LOGPOINTS_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}

export const createLogPoint = (id) => (dispatch) => {
    return logPointService.createLogPoint(id).then(
        (responce) => {
            dispatch({
                type: CREATE_LOGPOINT_SUCCESS,
                payload: { logPoint: responce.data }
            });


            return Promise.resolve(responce.data);
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_LOGPOINT_ERROR
            });

            return Promise.reject();
        }
    )
}
