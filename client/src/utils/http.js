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

// request
axios.interceptors.request.use(
    config => {
        startLoading();
        if (sessionStorage.eleToken) {
            config.headers.Authorization = sessionStorage.eleToken;
        }
        return config;
    }
)



// response 
axios.interceptors.response.use(
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

export default axios