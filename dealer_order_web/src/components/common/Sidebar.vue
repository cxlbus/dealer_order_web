<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324155"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router collapse-transition>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{$t(item.title)}}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{$t(subItem.title)}}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{$t(item.title)}}</span>
                    </el-menu-item>
                </template>

            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';


    export default {
        data() {
            return {
                collapse: false,
                items: [],
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getData()

        },
        methods: {
            getData() {
                const data = localStorage.getItem('role')
                let items = [
                    {
                        icon: 'el-icon-setting',
                        index: 'dashboard',
                        title: "sidebar_home_page",
                        id: 1,
                        show: true,
                    },
                    {
                        icon: 'el-icon-service',
                        index: '0',
                        title: 'sidebar_administrator',
                        show: true,
                        id: 2,
                        subs: [
                            {
                                id: 7,
                                index: 'staff_search',
                                title: 'sidebar_check_staff'
                            },
                            {
                                id: 8,
                                index: 'staff_modify',
                                title: 'sidebar_modify_staff'
                            },
                            {
                                id: 9,
                                index: 'to_allocate',
                                title: 'sidebar_allocate'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '1',
                        title: 'sidebar_dealer',
                        show: true,
                        id: 3,
                        subs: [
                            {
                                id: 10,
                                index: 'Dealers_add',
                                title: 'sidebar_add_dealer'
                            },
                            {
                                id: 11,
                                index: 'Dealers_search',
                                title: 'sidebar_search_dealer'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-edit-outline',
                        index: '4',
                        title: 'sidebar_order',
                        id: 4,
                        subs: [
                            {
                                id: 12,
                                index: 'orderList_new',
                                title: 'sidebar_add_order'
                            },
                            {
                                id: 13,
                                index: 'orderList_measured',
                                title: 'sidebar_measured_order'
                            },
                            {
                                id: 14,
                                index: 'orderList_have_order',
                                title: 'sidebar_have_order'
                            },
                            {
                                id: 15,
                                index: 'orderList_over',
                                title: 'sidebar_completed'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: '5',
                        title: 'sidebar_address',
                        id: 5,
                        subs: [
                            {
                                id: 16,
                                index: 'addressList',
                                title: 'sidebar_address_info'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: '6',
                        title: 'sidebar_personal_info',
                        id: 6,
                        subs: [
                            {
                                id: 17,
                                index: 'personal',
                                title: 'sidebar_personal_info'
                            },
                        ]
                    },
                ]
                let a=[1,4,5,6,12,13,14,15,16,17]
                // let a= data.split(',').sort((a, b) => {return a-b})
                let tinjia = function (e) {
                    let arr = new Array()
                   a.filter((el, i) => {
                        for(let h=0;h<items.length;h++){
                            if(el==items[h].id){
                                let obj=new Object()
                                obj.id=items[h].id
                                obj.icon=items[h].icon
                                obj.index=items[h].index
                                obj.title=items[h].title
                                if(items[h].subs){
                                    let subs=items[h].subs
                                    let subs_arr=new Array()
                                    a.filter(function (ml,i) {
                                        for (let j=0;j<subs.length;j++){
                                            if(ml==subs[j].id){
                                                subs_arr.push(subs[j])
                                            }
                                        }
                                    })

                                    obj.subs=subs_arr
                                }
                                arr.push(obj)
                            }

                        }
                    })
                   return arr
                }
                this.items=tinjia(items)
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .icon-cangkumingcheng {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
