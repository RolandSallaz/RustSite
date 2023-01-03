export interface IUser {
  balance: number
  group: string
  name: string
  photos: Array<{ value: string }>
  steamId: number
}
