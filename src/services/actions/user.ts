import axios from "../../axios";
import {AppDispatch} from "../store";
import {userSlice} from "../slices/userSlice";
import {useCallback} from "react";

export const fetchUser = () => {
    return (dispatch: AppDispatch) => {
            dispatch(userSlice.actions.fetching())
            axios.get('/users/me', {withCredentials: true})
            .then((res)=>{
                dispatch(userSlice.actions.login(res.data))
            })
            .catch((err)=> dispatch(userSlice.actions.fetchingError(err as Error)))
        } 
    }