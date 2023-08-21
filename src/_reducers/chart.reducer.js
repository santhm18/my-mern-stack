import { Types } from '../_constants/actionTypes';

export function chart(state = [], action) {
    switch (action.type) {
        case Types.FETCH_ALL_CHART_MEMORIES:
            return action.payload;
        default:
            return state;
    }
}