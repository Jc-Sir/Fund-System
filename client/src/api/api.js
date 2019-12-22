import {get, post } from './../utils/http'

// 登录
export function login(params) {
    return post('/api/users/login', params)
}

// 列表
export function get_profile_list(params) {
    return get('/api/profile', params)
}

// 删除数据
export function delete_profile(params) {
    return post('/api/profile/delete', params)
}

// 新增数据
export function add_profile(params) {
    return post('/api/profile/add', params)
}

// 编辑数据
export function edit_profile(params) {
    return post('/api/profile/edit', params)
}