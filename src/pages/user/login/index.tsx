import Taro from "@tarojs/taro"
import { AtButton, AtDivider, AtInput, AtForm, AtToast, AtMessage } from "taro-ui"
import { wechatLogin } from '../../../services/user'
import userModel from '../../../models/user'
import { View, Button, Navigator } from "@tarojs/components"
import './index.scss'
import React, { useState } from "react"

export default function Login() {
  const { token, setUser, setToken, logout } = userModel()
  const getUserProfile = () => {
    setWechatLoging(true)
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log('@@@@', res)
        const { userInfo } = res
        Taro.login({
          success: async function (res) {
            if (res.code) {
              //发起网络请求
              const loginRes = await wechatLogin({ ...userInfo, code: res.code })
              // console.log('####', loginRes)
              // setItem('user', userInfo)
              // setItem('token', loginRes.data.data.bearer)
              setUser({
                avatar: userInfo.avatarUrl,
                nickname: userInfo.nickName
              })
              setToken(loginRes.data.data)

              Taro.reLaunch({
                url: '/pages/home/index'
              })

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })

      },
      fail(result) {
        console.log('失败了 get user profile', result)
      }
    })
  }

  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const onSubmit = () => {
    if (phone.length !== 11) {
      Taro.atMessage({
        'message': '请输入有效的手机号',
        'type': 'warning',
        duration: 2500
      })
      return
    }
    if (password.length === 0) {
      Taro.atMessage({
        'message': '请输入密码',
        'type': 'warning',
        duration: 2500
      })
      return
    }
    console.log('验证通过准备提交', phone, password)
  }
  const [wechatLoging, setWechatLoging] = useState(false)

  return (
    <View className='pages userLoginPage'>

      <AtMessage />

      {token ?
        <>
          已登陆
          <AtButton onClick={logout}>退出登陆</AtButton>
        </>
        : (<>
          <AtButton onClick={getUserProfile} className='wechatLogin' loading={wechatLoging} type='primary'>微信登录</AtButton>
          <AtDivider content='或 手机号登陆' />

          <AtForm
            onSubmit={onSubmit}
          >
            <AtInput
              required
              name='phone'
              title='手机号'
              type='phone'
              placeholder='请输入'
              value={phone}
              onChange={(val) => setPhone(val as string)}
            />
            <AtInput
              required
              name='password'
              title='密码'
              type='password'
              placeholder='请输入'
              value={password}
              onChange={(val) => setPassword(val as string)}
            />
            <Button className='secondaryBtn' formType='submit'>登录</Button>
          </AtForm>
        </>)}

    </View>
  )
}
