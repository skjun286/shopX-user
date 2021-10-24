import Taro, { request } from "@tarojs/taro"
import { baseUrl } from "../config"
import { getItem, setItem } from "./storage"

export type methodT = 'GET' | 'POST' | 'PUT' | 'DELETE'
export default class Api {
  req(method:methodT, url:string, data={},  header={}) {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]['route']
    console.log('发起请求的当前页面: ', currentPage)
    const token = getItem('token')

    return new Promise(async function(resolve, reject){
      if (token) {
        if (token.expire > Date.now()) {          
          header['Authorization'] = 'Bearer '+token.bearer
        } else {
          // token过期了
          const newToken = await refresh(token.bearer)
          header['Authorization'] = 'Bearer ' + newToken?.bearer
          // setToken(newToken)
          setItem('token', newToken)
        }
      }
      //  else {
      //   Taro.reLaunch({
      //     url: '/pages/user/login/index'
      //   })
      // }

      request({
        method,
        url: baseUrl + url,
        data,
        header
      }).then(({data}) => {
        // console.log('@@@', data)
        if (token && data.code && data.code === 2001) {
          reject('token过期了')
        }
        resolve(data)
      }).catch(err => reject(err))
    })
  }
}

const refresh = async(oldToken) => {
  console.log('开始refresh')
  const {data} = await request({
    method: 'POST',
    url: baseUrl + '/user/refresh_token',
    header: {
      'Authorization': 'Bearer '+ oldToken
    }
  })
  console.log('刷新的返回data', data)
  if (data.status === 'ok') {
    // setToken(data.data)
    return data.data as {bearer:string, expire:number}
  }
}