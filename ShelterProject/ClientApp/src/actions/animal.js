import EventBus from "../common/EventBus";
import { CREATE_ANIMAL_ERROR, CREATE_ANIMAL_SUCCESS, DELETE_ANIMAL_ERROR, DELETE_ANIMAL_SUCCESS, EDIT_ANIMAL_ERROR, EDIT_ANIMAL_SUCCESS, GET_ANIMALS } from "../constants/animal";
import { SET_MESSAGE } from "../constants/message";
import animalService from "../services/animal.service";

export const getAnimals = (id) => (dispatch) => {
    return animalService.getAnimals(id).then(
        (responce) => {
            dispatch({
                type: GET_ANIMALS,
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

export const editAnimal = (animalId, name, category, type) => (dispatch) => {
    return animalService.editAnimal(animalId, name, category, type).then(
        (responce) => {
            dispatch({
                type: EDIT_ANIMAL_SUCCESS,
                payload: { animalId, name, category, type }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_ANIMAL_ERROR
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

export const createAnimal = (name, category, type, shelterId) => (dispatch) => {
    return animalService.createAnimal(name, category, type, shelterId).then(
        (responce) => {
            dispatch({
                type: CREATE_ANIMAL_SUCCESS,
                payload: { animal: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_ANIMAL_ERROR
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

export const deleteAnimal = (id) => (dispatch) => {
    return animalService.deleteAnimal(id).then(
        (responce) => {
            dispatch({
                type: DELETE_ANIMAL_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_ANIMAL_ERROR
            });

            return Promise.reject();
        }
    )
}