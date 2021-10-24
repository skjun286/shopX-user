import Taro from "@tarojs/taro"

export function setItem (name:string, value:any) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return Taro.setStorageSync(name, value)
}

export function getItem (name:string):any {
  let value = Taro.getStorageSync(name)
  try {
    value = JSON.parse(value as string)
    return value
  } catch {
    return value
  }
}

export function removeItem (name:string) {
  return Taro.removeStorageSync(name)
}
