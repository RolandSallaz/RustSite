import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IServer} from "../../interfaces";

export interface IServerState {
    servers: IServer[]
}

const initialState: IServerState = {
    servers: [],
}

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        getServers(state, action: PayloadAction<IServer[]>) {
            state.servers = action.payload
        },
        deleteServer(state, action: PayloadAction<IServer>) {
            state.servers = state.servers.filter(server => server._id !== action.payload._id)
        },
        addServer(state, action: PayloadAction<IServer>) {
            state.servers = [...state.servers, action.payload]
        },
        rconMessage(state, action: PayloadAction<{ message: string }>) {

        }
    },
})

export default serverSlice.reducer
