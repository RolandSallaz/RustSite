import axios from '../../axios'
import { AppDispatch } from '../store'
import { userSlice } from '../slices/userSlice'
import { popupSlice } from '../slices/popupSlice'
import {IServer, ServerData} from '../../utils/Interfaces'
import { useAppDispatch } from '../../hooks/redux'
import {IServerState, serverSlice} from '../slices/serverSlice'
import {AxiosResponse} from "axios";

export const fetchUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.fetching())
    axios
      .get('/users/me', { withCredentials: true })
      .then((res) => {
        dispatch(userSlice.actions.login(res.data))
      })
      .catch((err) => dispatch(userSlice.actions.fetchingError(err as Error)))
  }
}

export const sendServer = (data: ServerData) => {
  return (dispatch: AppDispatch) => {
    axios
      .post('/servers', data, { withCredentials: true })
      .then((res) => {
        dispatch(popupSlice.actions.setAddServerPopupOpened(false))
      })
      .catch(console.log)
  }
}

export const getServers = () => {
  return (dispatch: AppDispatch) => {
    axios
      .get<IServer[]>('/servers', { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        dispatch(serverSlice.actions.getServers(res.data))
      })
      .catch(console.log)
  }
}
