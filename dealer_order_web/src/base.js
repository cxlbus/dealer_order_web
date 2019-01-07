exports.install = function (Vue, options) {
    /*获取cookie*/
    Vue.prototype.$getCookie = function (name, defaultValue) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return defaultValue;
    };
    Vue.prototype.$map=function(){
        let a=''
        function myFun(result){
            let cityName = result.name;
             a=cityName
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
        return a
    }
    /*设置日期*/
    Date.prototype.Format = function (fmt) {
        let o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    /*获取多语言*/
    Vue.prototype.$getlang = function () {
        let lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
        lang = lang.substr(0, 2);//截取lang前2位字符
        return lang
    }

};
