import Vue from 'vue';
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
import crypto from '../crypto'

// axios.defaults.baseURL = 'http://www.smartlux.com.cn:4000/stock';
axios.defaults.baseURL = 'http://10.0.0.2:3300/app_dealer';
// axios.defaults.baseURL = 'http://127.0.0.1:3300/app_dealer';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Authorization'] = 12123244;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let encrypt = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    var token = localStorage.getItem('token')
    var pwd = localStorage.getItem('pwd')+''
    localStorage.getItem('pwd') ? pwd = pwd : pwd = 'smartMI'

    if (encrypt) {
        config.data = {
            data: crypto.cipher_rc4(JSON.stringify(config.data), pwd)
        }
    }
    token ? config.headers.token = token : config.headers.token = "8eea162a4fbe0d4b4a92485d80a47bc4"
    showFullScreenLoading();//开始加载动画
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    var pwd = localStorage.getItem('pwd')
    localStorage.getItem('pwd') ? pwd = pwd : pwd = 'smartMI'
    if (encrypt) {
        response.data = JSON.parse(crypto.decrypt_rc4(response.data, pwd))
    }

    var b_string = response.config.baseURL
    var c_string = response.config.url
    var d_string = c_string.replace(b_string, '')
    // console.log('响应拦截的数据' + d_string + ' : ' + JSON.stringify(response.data))
    // 对响应数据做点什么
    setTimeout(function () {
        tryHideFullScreenLoading()//结束加载动画
    }, 100)
    ;
    return response;
}, function (error) {
    tryHideFullScreenLoading()//结束加载动画
    // 对响应错误做点什么
    // console.log(JSON.stringify(error))
    Message.error('数据错误，请退出再次登录');
    // if(error.response){
    //     switch (error.response.status) {
    //         case 404:
    //             Message.error('请再次登录');
    //             localStorage.clear();
    //             setTimeout(function () {
    //                 router.push('/login')
    //             }, 500)
    //             break;
    //         case 401:
    //             Message.error('数据错误，请退出再次登录');
    //             localStorage.clear();
    //             setTimeout(function () {
    //                 router.push('/login')
    //             }, 500)
    //             break;
    //     }
    // }


    return Promise.reject(error);

});
let loading;

function startLoading() {
    loading = Vue.prototype.$loading({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.8)"
    });
}

function endLoading() {
    loading.close();
}

let needLoadingRequestCount = 0;

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
};
export default axios
