export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function loginUser(){
    return {
        type: LOGIN
    };
}

export function logoutUser(){
    return {
        type: LOGOUT
    }
}