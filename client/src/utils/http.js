import axios from 'axios'
import { Loading, Message } from 'element-ui'

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



// response 
axios.interceptors.response.use(
    response => {
        // endLoading
        return response;

    },
    error => {
        Message.error(error.response.data);
        return Promise.reject(error);
    }
)

export default axios