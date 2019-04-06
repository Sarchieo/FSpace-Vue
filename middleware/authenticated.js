export default function ({ store, redirect, app }) {
  if (!store.getters.userStatus(app)) {
    return redirect('/user/login')
  }
}