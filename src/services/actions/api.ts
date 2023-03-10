import axios from '../../axios'
import {AppDispatch} from '../store'
import {userSlice} from '../slices/userSlice'
import {popupSlice} from '../slices/popupSlice'
import {IProductData, IServer, IServerCommand, IServerData} from '../../interfaces'
import {useAppDispatch} from '../../hooks/redux'
import {IServerState, serverSlice} from '../slices/serverSlice'
import {AxiosResponse} from "axios";
import {productSlice} from "../slices/productSlice";
import {ISelectValues} from "../../components/RconManager";

interface IServerResponse {
    data: {
        message: string,
        server: IServer,
    }
}

interface IRconCommandResponse {
    Indentifier: number,
    Stacktrace: string,
    Type: string,
    content: string
}

export const fetchUser = () => {
    return (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.fetching())
        axios
            .get('/users/me', {withCredentials: true})
            .then((res) => {
                dispatch(userSlice.actions.login(res.data))
            })
            .catch((err) => dispatch(userSlice.actions.fetchingError(err as Error)))
    }
}

export const sendProduct = (data: HTMLFormElement) => {
    const formData = new FormData(data);
    return (dispatch: AppDispatch) => {
        axios
            .post('/products', formData, {
                withCredentials: true, headers: {"Content-Type": "multipart/form-data"},
            })
            .then()
            .catch(console.log)
    }
}

export const sendServer = (data: IServerData) => {
    return (dispatch: AppDispatch) => {
        axios
            .post('/servers', data, {withCredentials: true})
            .then((res: IServerResponse) => {
                dispatch(serverSlice.actions.addServer(res.data.server))
                dispatch(popupSlice.actions.setAddServerPopupOpened(false))
            })
            .catch(console.log)
    }
}

export const getServers = () => {
    return (dispatch: AppDispatch) => {
        axios
            .get<IServer[]>('/servers', {withCredentials: true})
            .then((res) => {
                dispatch(serverSlice.actions.getServers(res.data))
            })
            .catch(console.log)
    }
}

export const deleteServer = (id: string) => {
    return (dispatch: AppDispatch) => {
        axios
            .delete(`/servers/${id}`, {withCredentials: true})
            .then((res: IServerResponse) => {
                dispatch(serverSlice.actions.deleteServer(res.data.server))
            })
            .catch(console.log)
    }
}

export const sendRconCommand = ({serverId, command}: IServerCommand) => {

        return axios
            .post(`/servers/${serverId}`, {command}, {withCredentials: true})
            .then((res: AxiosResponse<IRconCommandResponse>) => {
                if (command == 'plugins') {
                    const removeNumbersRegex = / \d\d /;
                    const selectPlugin = /.*-/;
                    const data = res.data.content.replace("Listing 40 plugins:", "").split('\n ').slice(1)
                    return data.map((item) => {
                        const value = item.match(/- .*/g)
                        const name = item.match(/".*"/g)
                        return {
                            value: value ? value[0].replace('- ', '').replace('.cs', '') : '',
                            label: name ? name[0].replace(/"/g, '') : ''
                        }

                    })
                } else {
                    console.log(res)
                }
            })
            .catch(console.log)

}

export const getProducts = () => {
    return (dispatch: AppDispatch) => {
        axios
            .get<IProductData[]>('/products', {withCredentials: true})
            .then((res) => {
                dispatch(productSlice.actions.getProducts(res.data))
            })
            .catch(console.log)
    }
}