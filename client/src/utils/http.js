import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './../router/index'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}

const service = axios.create({
    // baseURL:'',
    timeout: 2000
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request
service.interceptors.request.use(
    config => {
        startLoading();
        if (sessionStorage.eleToken) {
            config.headers.Authorization = sessionStorage.eleToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)



// response 
service.interceptors.response.use(
    response => {
        endLoading();
        return response;

    },
    error => {
        Message.error(error.response.data);

        // 获取错误码
        const { status } = error.response;

        if (status == 401) {
            Message.error('Token过期,请重新登录！');
            sessionStorage.removeItem('eleToken');
            router.push('/login')
        }

        return Promise.reject(error);
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
                params: params
            })
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}



// export default axios