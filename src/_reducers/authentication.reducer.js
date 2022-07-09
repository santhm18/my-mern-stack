import { Types } from '../_constants/actionTypes';

const userDetails = sessionStorage.getItem("userDetails");
const user = userDetails === null ? sessionStorage.getItem("userDetails") : JSON.parse(sessionStorage.getItem("userDetails")) 
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_REQUEST:
            return {
                loggedIn: false,
                user: action.user
            };
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case Types.LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                message: action.message,
                user: null
            };
            case Types.LOGOUT_REQUEST:
            return {
                ...state,
                loggedIn: true,
                message: action.message
            };
            case Types.LOGOUT_SUCCESS:
            return {
                loggedIn: false,
                user: null
            };
            case Types.LOGOUT_FAILURE:
            return {
                ...state,
                loggedIn: false,
                user: action.user
            };
        default:
            return state
    }
}