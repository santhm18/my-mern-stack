import { Types } from '../_constants/actionTypes';

export function navigatationpath(state = [], action) {
    switch (action.type) {
        case Types.NAVIGATE_PATH:
            return {
               selectedRoute : action.routeNum
            }
        default:
            return state;
    }
}