import { get, post } from './../utils/http'

// 登录
export function login(params) {
    return post('/api/users/login', params)
}
