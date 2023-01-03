import { IUser } from "./Interfaces"
import axios from "../axios";

const { API_URL = 'http://localhost:8000' } = process.env

type TSettings = {
  readonly url: string
  readonly headers: {}
}

class Api {
  private _url: string
  private _headers: { [key: string]: string }

  constructor({ url, headers }: TSettings) {
    this._url = url
    this._headers = headers
  }
  private checkResponse<T>(res: Response): Promise<T> {
    return res.ok ? res.json() : Promise.reject(res.status)
  }
  public getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
    }).then(this.checkResponse)
  }
}

export const api = new Api({
  url: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
