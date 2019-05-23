export default function ({ route, store, redirect, app }) {
  if (!store.state.userStatus) {
    return redirect('/user/login')
  }
}