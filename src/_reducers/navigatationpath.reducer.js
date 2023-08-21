import { Types } from '../_constants/actionTypes';
const initialState = 1;
export function navigatationpath(state = initialState, action) {
    switch (action.type) {
        case Types.NAVIGATE_PATH:
            return {
               selectedRoute : action.routeNum
            }
        default:
            return state;
    }
}