export enum groups{
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

export interface ServerResponse {

}