import axios from 'axios'

export default async function ({ $cookies }) {
    axios.interceptors.request.use((config) => {
        config.headers.common = { Authorization: `Bearer ${$cookies.get('token')}` }
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error)
    })
}