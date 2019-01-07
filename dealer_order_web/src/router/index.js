import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/personal',
            redirect: '/base'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/System/System.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/staff_search',
                    component: resolve => require(['../components/page/Staff/StaffSearch.vue'], resolve),
                    meta: { title: '查看员工' }
                },
                {
                    path: '/staff_modify',
                    component: resolve => require(['../components/page/Staff/StaffModify.vue'], resolve),
                    meta: { title: '修改员工' }
                },
                {
                    path: '/to_allocate',
                    component: resolve => require(['../components/page/Staff/Allocate.vue'], resolve),
                    meta: { title: '权限分配' }
                },
                {
                    path: '/Dealers_add',
                    component: resolve => require(['../components/page/Dealers/DealersAdd.vue'], resolve),
                    meta: { title: '添加经销商' }
                },
                {
                    path: '/Dealers_add',
                    component: resolve => require(['../components/page/Dealers/DealersAdd.vue'], resolve),
                    meta: { title: '添加经销商' }
                },
                {
                    path: '/Dealers_search',
                    component: resolve => require(['../components/page/Dealers/DealersSearch.vue'], resolve),
                    meta: { title: '查找经销商' }
                },
                {
                    path: '/orderList_new',
                    component: resolve => require(['../components/page/Order/orderList_new.vue'], resolve),
                    meta: { title: '新建订单列表' }
                },
                {
                    path: '/orderList_measured',
                    component: resolve => require(['../components/page/Order/orderList_measured.vue'], resolve),
                    meta: { title: '已测量订单列表' }
                },
                {
                    path: '/orderList_have_order',
                    component: resolve => require(['../components/page/Order/orderList_have_order.vue'], resolve),
                    meta: { title: '已下单订单列表' }
                },
                {
                    path: '/orderList_over',
                    component: resolve => require(['../components/page/Order/orderList_over.vue'], resolve),
                    meta: { title: '已完成订单列表' }
                },
                {
                    path: '/orderInfo',
                    name:'orderInfo',
                    component: resolve => require(['../components/page/Order/orderInfo.vue'], resolve),
                    meta: { title: '单个订单详情' }
                },
                {
                    path: '/orderCurtain',
                    name:'orderCurtain',
                    component: resolve => require(['../components/page/Order/orderCurtain.vue'], resolve),
                    meta: { title: '基本配置信息' }
                },
                {
                    path: '/orderCurtainAccessories',
                    name:'orderCurtainAccessories',
                    component: resolve => require(['../components/page/Order/orderCurtainAccessories.vue'], resolve),
                    meta: { title: '窗帘数据' }
                },
                {
                    path: '/orderCurtainAdd',
                    name:'orderCurtainAdd',
                    component: resolve => require(['../components/page/Order/orderCurtainAdd.vue'], resolve),
                    meta: { title: '提交订单' }
                },
                {
                    path: '/addressList',
                    component: resolve => require(['../components/page/Address/Address_info.vue'], resolve),
                    meta: { title: '地址信息' }
                },
                {
                    path: '/personal',
                    component: resolve => require(['../components/page/PersonalInfo/PersonalInfo.vue'], resolve),
                    meta: { title: '个人信息' },
                    children:[
                        {
                            path: '/base',
                            name:"base",
                            component: resolve => require(['../components/page/PersonalInfo/base_info.vue'], resolve),
                            meta: { title: '基本信息' },
                        },
                        {
                            path: '/safe',
                            component: resolve => require(['../components/page/PersonalInfo/safe_info.vue'], resolve),
                            meta: { title: '安全信息' },
                        }
                    ]
                },
                {
                    path: '/orderInfo_tracking',
                    name:'orderInfo_tracking',
                    component: resolve => require(['../components/page/Order/orderInfo_tracking.vue'], resolve),
                    meta: { title: '订单追踪' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' ,drag: true}
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})
