export default function ({ route, store, redirect, app }) {
  if (!store.state.userStatus) {
    return redirect('/user/login')
  }
  
  if((!store.state.user.comp.authenticationStatus || store.state.user.comp.authenticationStatus !== 256) && route.name !== 'user-personal') {
    return redirect('/user/personal')
  }
}