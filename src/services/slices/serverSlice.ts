import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IServer} from "../../utils/Interfaces";

export interface IServerState {
  servers:IServer[]
}
const initialState: IServerState = {
  servers: [],
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    addServer(state, action: PayloadAction<IServerState>) {
      //state.server = action.payload.server
    },
    getServers(state,action:PayloadAction<IServer[]>){
      state.servers = action.payload
    },
  },
})

export default serverSlice.reducer
