import { CREATE_WALK_SUCCESS, DELETE_WALK_SUCCESS, EDIT_WALK_SUCCESS, GET_WALKS } from "../constants/walk";

const initialState = {
    name: "",
    category: "",
    type: "",
    walks: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_WALKS:
            return {
                name: payload.name,
                category: payload.category,
                type: payload.type,
                walks: payload.walks
            }
        case CREATE_WALK_SUCCESS:
            return {
                ...state,
                walks: [...state.walks, payload.walk]
            }
        case DELETE_WALK_SUCCESS:
            return {
                ...state,
                walks: state.walks.filter(x => x.walkId !== payload.id)
            }
        case EDIT_WALK_SUCCESS:
            return {
                ...state,
                walks: state.walks.map(item => {
                    if (item.walkId === payload.walkId)
                        return {
                            ...item,
                            volunteer: payload.volunteer,
                            dateEnd: payload.dateEnd
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}