import axios from 'axios'

// export default async function (obj,data) {
//   console.log(obj)
// }

export default async function ({ $cookies, redirect, route }) {
  localStorage.clear()
  const user = $cookies.get('user')
  axios.defaults.baseURL = 'http://localhost:8000'
  if (user) {
    if (route.path === '/login' || route.path === '/register') {
      return redirect('/dashboard')
    }
  } else {
    try {
      console.log('Guest API')
      const res = await axios.get('/getGuestToken')
      $cookies.set('token', res.data.token)
      $cookies.set('guest', true)
    } catch (error) {
      console.log(error)
    }
    return redirect('/')
  }
}