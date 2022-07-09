import { Types } from '../_constants/actionTypes';

export function memoriespost(state = [], action) {
    switch (action.type) {
        case Types.FETCH_ALL_MEMORIES:
            return action.payload;
        case Types.CREATE_MEMORY:
            return [...state, action.payload];
        case Types.UPDATE_MEMORY:
            return [...state, action.payload];
        case Types.DELETE_MEMORY:
            return state.filter((state) => state._id !== action.payload);
        default:
            return state;
    }
}