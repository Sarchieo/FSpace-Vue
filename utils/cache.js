const UserKey = 'User' 

export function loadUser () {
  return JSON.parse(localStorage.getItem(UserKey))
}

export function saveUser (userInfo) {
  localStorage.setItem(UserKey, JSON.stringify(userInfo))
  return userInfo
}

export function removeUser () {
  localStorage.removeItem(UserKey)
  return {}
}