import EventBus from "../common/EventBus";
import { CREATE_WALK_ERROR, CREATE_WALK_SUCCESS, DELETE_WALK_ERROR, DELETE_WALK_SUCCESS, EDIT_WALK_ERROR, EDIT_WALK_SUCCESS, GET_WALKS } from "../constants/walk";
import { SET_MESSAGE } from "../constants/message";
import walkService from "../services/walk.service";

export const getWalks = (id) => (dispatch) => {
    return walkService.getWalks(id).then(
        (responce) => {
            dispatch({
                type: GET_WALKS,
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

export const editWalk = (walkId, volunteer, dateEnd) => (dispatch) => {
    return walkService.editWalk(walkId, volunteer, dateEnd).then(
        (responce) => {
            dispatch({
                type: EDIT_WALK_SUCCESS,
                payload: { walkId, volunteer, dateEnd }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_WALK_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const createWalk = (volunteer, dateStart, animalId) => (dispatch) => {
    return walkService.createWalk(volunteer, dateStart, animalId).then(
        (responce) => {
            dispatch({
                type: CREATE_WALK_SUCCESS,
                payload: { walk: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_WALK_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deleteWalk = (id) => (dispatch) => {
    return walkService.deleteWalk(id).then(
        (responce) => {
            dispatch({
                type: DELETE_WALK_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_WALK_ERROR
            });

            return Promise.reject();
        }
    )
}