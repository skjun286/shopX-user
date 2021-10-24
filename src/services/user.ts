import { request } from "@tarojs/taro";
import Api from "../utils/api";
import { baseUrl } from "../config";
// 刷新token
let api = new Api()
export const refreshToken = async () => {
  return await api.req('POST', '/user/refresh_token')
  // return await request({
  //   method: 'POST',
  //   url: baseUrl + '/user/refresh_token'
  // })
}
export const logout = async () => {
  return await api.req('POST', '/user/logout')
  // return await request({
  //   method: 'POST',
  //   url: baseUrl + '/user/logout'
  // })
}

export const currentUser = async () => {
  return await api.req('GET', '/user/current')
}

export const wechatLogin = async (data) => {
  return await request({
    method: 'POST',
    url: baseUrl + '/user/wechat_login',
    data
  })
}

// user相关的ts定义

export type TypeUser = {
  id?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  gender?: string;
  age?: number;
  openid?: string;
  updated_at?: string;
  created_at?: string;
}

export type TypeUserList = TypeUser[]