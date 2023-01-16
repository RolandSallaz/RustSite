export enum groups {
    USER = 'user',
    ADMIN = 'admin'
}

export interface IUser {
    balance: number
    group: string
    name: string
    photos: Array<{ value: string }>
    steamId: number
}

export interface ServerData {
    ip: string,
    port: number,
    password: string,
}

export interface IServerInfo {
    Hostname: String
    MaxPlayers: Number
    Players: Number
    Queued: Number
    Joining: Number
    EntityCount: Number
    GameTime: String
    Uptime: Number
    Map: String
    Framerate: Number
    Memory: Number
    Collections: Number
    NetworkIn: Number
    NetworkOut: Number
    Restarting: Boolean
    SaveCreatedTime: String
    Version: Number
    Protocol: String
}

export interface IServer {
    ip: String,
    port: Number,
    password: String,
    info: IServerInfo,
    enabled: Boolean,
    _id: string,
}

export interface IServerCommand {
    serverId: String,
    command: String,
}