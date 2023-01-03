import axios from "../../axios";
import {AppDispatch} from "../store";
import {userSlice} from "../slices/userSlice";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export function loginUser() {
    return {
        type: LOGIN
    };
}

export function logoutUser() {
    return {
        type: LOGOUT
    }
}

export const fetchUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.get('/users/me', {withCredentials: true})
            dispatch(userSlice.actions.login(
                response.data
            ))
        } catch (err) {
            dispatch(userSlice.actions.fetchingError(err as Error))
        }
    }
}