export default function ({ store, redirect, app }) {
  if (!store.state.userStatus) {
    return redirect('/user/login')
  }
}