<template>
    <div>

        <el-card class="box-card">
            <div>
                {{$t('label_orderNumber')}}：{{orderInfo.order_number}}
            </div>
            <div style="height: 300px;">
                <el-steps direction="vertical">
                    <template v-for="a in track">
                        <el-step :title="a.create_time" :description="a.status_desc" :status="a.status1"></el-step>
                    </template>

                </el-steps>
            </div>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: 'order_details',
        data() {
            return {
                is_show: process.env.NODE_ENV === 'development',
                order_id:this.$route.query.orderid,
                type: '',
                orderInfo: '',
                status: -1,
                track: [],
                url: '/login_after/order/get',//获取单个订单
            }
        },
        created() {
            this.track = [
                {
                    "create_time": "2017-06-11T08:40:51.620Z",
                    "create_account": "123",
                    "status": "OC",
                    "status1":"success",
                    "status_desc": "订单状态描述",
                    "update_time": "2017-06-11T08:40:51.620Z",
                    "update_account": "123",
                    "dealer_id": "123",
                },
                {
                    "create_time": "2017-06-11T08:40:51.620Z",
                    "create_account": "123",
                    "status": "OB",
                    "status1":"wait",
                    "status_desc": "订单状态描述",
                    "update_time": "2017-06-11T08:40:51.620Z",
                    "update_account": "123",
                    "dealer_id": "123",
                },
                {
                    "create_time": "2017-06-11T08:40:51.620Z",
                    "create_account": "123",
                    "status": "OA",
                    "status1":"finish",
                    "status_desc": "订单状态描述",
                    "update_time": "2017-06-11T08:40:51.620Z",
                    "update_account": "123",
                    "dealer_id": "123",
                },
                {
                    "create_time": "2017-06-11T08:40:51.620Z",
                    "create_account": "123",
                    "status": "OC",
                    "status1":"success",
                    "status_desc": "订单状态描述",
                    "update_time": "2017-06-11T08:40:51.620Z",
                    "update_account": "123",
                    "dealer_id": "123",
                },


            ]
        },
        components: {
        },
        computed: {},
        methods: {
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                let _this = this
                let data = {
                    "id": this.order_id,
                }
                _this.$axios.post(this.url, data).then((rs) => {
                    if(rs.data.code==200){
                        this.orderInfo=rs.data.data
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            '$route': function (val, old) {
                if (val.path == "/orderInfo_tracking") {

                }
            },
        }
    }

</script>

<style scoped>

</style>
