import userModel from '../../../models/user'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtAvatar, AtButton, AtDivider, AtList, AtListItem, AtTag } from 'taro-ui'

import './index.scss'
import React from 'react'

export default function Index() {
  const { user, logout } = userModel()
  const handleLogout = () => {
    logout()
    Taro.reLaunch({ url: '/pages/user/index/index' })
  }
  return (
    <View className='pages userIndexPage'>
      {user? 
      <View className='at-row userInfo'>
        <AtTag size='small' circle disabled>微信用户</AtTag>
        <Text>{user.nickname}</Text>
        <AtAvatar size='small' circle image={user.avatar}></AtAvatar>
      </View>
      : null}
      <AtList>
        <AtListItem title='个人资料' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
        <AtListItem title='订单历史' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
        <AtListItem title='收藏夹' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
        <AtListItem title='通知' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
        <AtListItem title='投诉建议' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
        <AtListItem title='关于我们' onClick={() => Taro.navigateTo({ url: '/pages/user/profile/index' })} arrow='right' />
      </AtList>

      <View className='log-in-outWrap'>
        {
          user?
          <AtButton type='secondary' circle onClick={handleLogout}>
            <View className='fa fa-sign-out'></View>
            <Text>&nbsp;退出登录</Text>
          </AtButton>
          :
          <AtButton type='primary' circle onClick={() => Taro.navigateTo({url:'/pages/user/login/index'})}>
            <View className='fa fa-sign-in'></View>
            <Text>&nbsp;用户登录</Text>
          </AtButton>
        }
      </View>

    </View>
  )
}
