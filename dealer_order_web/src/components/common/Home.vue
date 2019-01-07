<template>
    <div class="wrapper">
        <v-head :header_message='header_message'></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content" v-if="isRouterAlive">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view v-if="isRouterAlive"></router-view>
                    </keep-alive>
                </transition>
            </div>
            <div class="footer">
                <p>Pro </p>
                <p>
                    Copyright 2018 smartlux chen
                </p>

            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false,
                header_message: '',
                isRouterAlive: true,
                xs:768,
            }
        },
        provide() { // 注册一个方法
            return {
                reload: this.reload
            }
        },
        components: {
            vHead, vSidebar, vTags
        },
        created() {
            let _this=this
            const clientWidth = window.innerWidth;
            localStorage.setItem('is_mobile',clientWidth<=_this.xs)
            this.$store.dispatch('is_mobile', {
                is_mobile: clientWidth<=_this.xs
            })
            window.onresize = function(){
                const clientWidth = window.innerWidth;
                localStorage.setItem('is_mobile',clientWidth<=_this.xs)
                _this.$store.dispatch('is_mobile', {
                    is_mobile: clientWidth<=_this.xs
                })
            }
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            bus.$on('header_message', msg => {
                this.header_message = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                    console.log('reload')
                })
            }
        }
    }
</script>
<style scoped>
    div.footer {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 5px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        color:rgba(0,0,0,.45);
        font-size: 14px;
    }
</style>
