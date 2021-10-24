import userModel from '../../../models/user'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtAvatar, AtButton } from 'taro-ui'
import './index.scss'

export default function Profile() {
  const { user } = userModel()
  return (
    <View className='pages userProfilePage'>

      {user? (
        <>
          <AtAvatar size='small' circle image={user.avatar}></AtAvatar>
          <Text>你好，{user.nickname}</Text>
        </>
      ) : <AtButton onClick={() => Taro.reLaunch({url: '/pages/user/login/index'})}>去登陆</AtButton>}
    </View>
  )
}
