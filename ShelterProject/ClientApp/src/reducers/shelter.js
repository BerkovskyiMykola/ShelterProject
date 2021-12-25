import { CREATE_SHELTER_SUCCESS, DELETE_SHELTER_SUCCESS, EDIT_SHELTER_SUCCESS, GET_SHELTERS } from "../constants/shelter";

const initialState = {
    shelters: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHELTERS:
            return {
                shelters: payload.shelters
            }
        case CREATE_SHELTER_SUCCESS:
            return {
                shelters: [...state.shelters, payload.shelter]
            }
        case DELETE_SHELTER_SUCCESS:
            return {
                shelters: state.shelters.filter(x => x.shelterId !== payload.shelterId)
            }
        case EDIT_SHELTER_SUCCESS:
            return {
                shelters: state.shelters.map(shelter => {
                    if (shelter.shelterId === payload.shelterId)
                        return {
                            ...shelter,
                            name: payload.name,
                            address: payload.address
                        }
                    return shelter;
                })
            }
        default:
            return state;
    }
}