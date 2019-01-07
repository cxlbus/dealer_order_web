import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './axios';
import crypto from './crypto';
import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import './assets/icon/iconfont.css';
import './assets/icon/iconfont.css';
import '../static/css/self.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import global_ from './components/common/Global'//引用文件
import base_ from './base' //引用自定义全局函数
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(base_);//将全局函数当做插件来进行注册
Vue.prototype.$axios = axios;
Vue.prototype.$crypto = crypto;
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
/*vuex加载*/
import store from './store'

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'root' ? next() : next('/403');
    }
    else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

const i18n = new VueI18n({
    locale: localStorage.getItem("lang")?localStorage.getItem("lang"):"en", // 语言标识
    messages: {
        'zh':Object.assign(require('./publice/lang/zh'), zhLocale),
        'en':Object.assign(require('./publice/lang/en'), enLocale)
    }
})

Vue.use(ElementUI, {
    size: 'small',
    i18n: (key, value) => i18n.t(key, value)
})

let app = new Vue({
    router,
    render: h => h(App),
    i18n,
    store,
}).$mount('#app');
