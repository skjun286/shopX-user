import userModel from '../../../models/user'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtAvatar, AtButton } from 'taro-ui'
import './index.scss'

export default function Contact() {
  const { user } = userModel()
  return (
    <View className='pages userContactPage'>
      投诉建议
    </View>
  )
}
