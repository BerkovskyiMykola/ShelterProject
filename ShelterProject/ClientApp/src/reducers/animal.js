import { CREATE_ANIMAL_SUCCESS, DELETE_ANIMAL_SUCCESS, EDIT_ANIMAL_SUCCESS, GET_ANIMALS } from "../constants/animal";

const initialState = {
    name: "",
    address: "",
    animals: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ANIMALS:
            return {
                name: payload.name,
                address: payload.address,
                animals: payload.animals
            }
        case CREATE_ANIMAL_SUCCESS:
            return {
                ...state,
                animals: [...state.animals, payload.animal]
            }
        case DELETE_ANIMAL_SUCCESS:
            return {
                ...state,
                animals: state.animals.filter(x => x.animalId !== payload.id)
            }
        case EDIT_ANIMAL_SUCCESS:
            return {
                ...state,
                animals: state.animals.map(item => {
                    if (item.animalId === payload.animalId)
                        return {
                            ...item,
                            animalName: payload.name,
                            category: payload.category,
                            type: payload.type
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}