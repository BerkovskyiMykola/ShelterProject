import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_SHELTER_ERROR, CREATE_SHELTER_SUCCESS, DELETE_SHELTER_ERROR, DELETE_SHELTER_SUCCESS, EDIT_SHELTER_ERROR, EDIT_SHELTER_SUCCESS, GET_SHELTERS } from "../constants/shelter";
import shelterService from "../services/shelter.service";

export const getShelters = () => (dispatch) => {
    return shelterService.getShelters().then(
        (responce) => {
            dispatch({
                type: GET_SHELTERS,
                payload: { shelters: responce.data }
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

export const editShelter = (shelterId, name, address) => (dispatch) => {
    return shelterService.editShelter(shelterId, name, address).then(
        (responce) => {
            dispatch({
                type: EDIT_SHELTER_SUCCESS,
                payload: { shelterId, name, address }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_SHELTER_ERROR
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

export const createShelter = (name, address) => (dispatch) => {
    return shelterService.createShelter(name, address).then(
        (responce) => {
            dispatch({
                type: CREATE_SHELTER_SUCCESS,
                payload: { shelter: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_SHELTER_ERROR
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

export const deleteShelter = (id) => (dispatch) => {
    return shelterService.deleteShelter(id).then(
        (responce) => {
            dispatch({
                type: DELETE_SHELTER_SUCCESS,
                payload: { shelterId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_SHELTER_ERROR
            });

            return Promise.reject();
        }
    )
}