// import Cookies from 'js-cookie'
// import Storage from 'good-storage'

const UserKey = 'User' 

export function loadUser () {
  return Cookies.get(UserInfoKey, {})
}

export function saveUser (userInfo) {
  Cookies.set(UserInfoKey, userInfo)
  return userInfo
}

export function removeUser () {
  Cookies.remove(UserKey)
  return {}
}