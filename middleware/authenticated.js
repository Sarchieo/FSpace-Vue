export default function ({ route, store, redirect, app }) {
  if (!store.state.userStatus) {
    return redirect('/user/login')
  }
  
  if(route.name !== 'user-personal' && (!store.state.user.comp ||!store.state.user.comp.authenticationStatus || store.state.user.comp.authenticationStatus !== 256)) {
    return redirect('/user/personal')
  }
}