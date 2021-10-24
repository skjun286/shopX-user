import useModel from 'flooks'
import { logout } from '../services/user'
import { getItem, removeItem, setItem } from '../utils/storage'

export type userT = {
  avatar: string
  nickname: string
}
export type tokenT = {
  bearer: string
  expire: number
}

const userModel = ({ get, set }) => ({
  user: getItem('user'),
  token: getItem('token'),
  // async token_refresh() {
  //   const res = await refreshToken()
  //   console.log('refreshToken', res)
  // },
  async logout() {
    await logout()

    set({
      user: undefined,
      token: undefined
    })
    removeItem('token')
    removeItem('user')

  },
  setUser(user:userT) {
    set({user})
    setItem('user', user)
  },
  setToken(token:tokenT) {
    set({token})
    setItem('token', token)
  }
})

export default () => <{user:userT, token:tokenT
setUser: (user:userT) => void,
setToken: (token:tokenT) => void,
logout: () =>void
}>useModel(userModel)