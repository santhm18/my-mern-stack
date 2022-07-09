import { Types } from '../_constants/actionTypes';
const userDetails = sessionStorage.getItem("userDetails");
const user = userDetails === null ? sessionStorage.getItem("userDetails") : JSON.parse(sessionStorage.getItem("userDetails")) 
const initialState = user ? { loggedIn: true, user } : { registered: false, user: null };
export function registration (state = initialState, action) {
    switch (action.type) {
        case Types.REGISTER_REQUEST: 
        return {
            registered: false
        };
        case Types.REGISTER_SUCCESS:
            return {
                ...state,
                registered: true,
                user : action.user
            };
        case Types.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}