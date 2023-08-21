import { Types } from '../_constants/actionTypes';
const userDetails = sessionStorage.getItem("userDetails");
const user = userDetails === null ? sessionStorage.getItem("userDetails") : JSON.parse(sessionStorage.getItem("userDetails")) 
// const initialState = user ? { loggedIn: true, user } : { loading: false, user: null };

export function userUpdate (state = {}, action) {
    switch (action.type) {
        case Types.REGISTER_UPDATE_REQUEST: 
        return {
           loading: true
        };
        case Types.REGISTER_UPDATE_SUCCESS:
            return {
                loading: true,
                success: true,
                user : action.payload
            };
        case Types.REGISTER_UPDATE_FAILURE:
            return {loading: false,  success: false, error: action.payload};
        default:
            return state
    }
}