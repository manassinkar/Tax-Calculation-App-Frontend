export default function ({ $cookies, redirect, route }) {
    const guest = $cookies.get('guest');
    const user = $cookies.get('user')
    const loggedInRestrictPaths = ['/','/login','/register','/changePassword','/forgotPassword']
    if(!guest && user)
    {
        if(loggedInRestrictPaths.includes(route.path))
        {
            return redirect('/dashboard')
        }
    }
    else
    {
        if (route.path==='/dashboard' && !route.query.code) {
            return redirect('/')
        } else if (route.path.substring(0,11)==='/dashboard/') {
            return redirect('/')
        }
    }
}