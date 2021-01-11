export default function ({ $cookies, redirect, route }) {
    const guest = $cookies.get('guest');
    const loggedInRestrictPaths = ['/','/login','/register','/changePassword','/forgotPassword']
    if (!guest && loggedInRestrictPaths.includes(route.path)) {
        return redirect('/dashboard')
    } else if (route.path==='/dashboard' && !route.query.code && guest) {
        return redirect('/')
    } else if (route.path.substring(0,11)==='/dashboard/' && !$cookies.get('user')) {
        return redirect('/')
    }
}