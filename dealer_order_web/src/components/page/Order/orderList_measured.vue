<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>{{$t('label_order')}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('sidebar_measured_order')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="start"
                    end-placeholder="end"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2" class='mr10'>
                </el-date-picker>
                <el-button type="primary" icon="search" @click="search">{{$t('btn_search')}}</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="id" label="ID" width="50" v-if="is_show">
                </el-table-column>
                <el-table-column prop="order_number" :label="$t('label_orderNumber')" width="120">
                </el-table-column>
                <el-table-column prop="create_time" :label="$t('label_orderCreateTime')" width="170">
                </el-table-column>
                <el-table-column prop="delivery_time" :label="$t('label_orderDeliveryTime')" width="170">
                </el-table-column>
                <el-table-column prop="description" :label="$t('label_orderDesc')" width="150">
                </el-table-column>
                <el-table-column  width="350">
                    <template slot-scope="scope">
                        <el-button size="small" @click="onRoutes(scope.$index, scope.row)">{{$t('label_orderMore')}}</el-button>
                        <el-button size="small" @click="handle_methods(scope.$index, scope.row,'复制')">
                            {{$t('btn_copy')}}
                        </el-button>
                        <el-button size="small" @click="handle_methods(scope.$index, scope.row,'删除')">
                            {{$t('btn_delete')}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderProduction',
        inject: ['reload'],
        data() {
            return {
                serverSrc: this.GLOBAL.serverSrc,
                is_show: process.env.NODE_ENV === 'development',
                tableData: [],
                cur_page: 1,
                cur_page_num: 10,
                unit:localStorage.getItem("unit"),
                total: 0,
                select_word: '',
                orderCode: '',
                is_search: false,
                pickerOptions2: {
                    shortcuts: [{
                        text: 'latest week',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                idx: -1,
                url: '/login_after/order/orders',//获取已测量的订单列表
                url1: '/login_after/order/delete',//删除订单
                url2: '/login_after/order/copy',//复制订单
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data_after() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    d.orderTime = new Date(d.orderTime).Format('yyyy-MM-dd hh:mm')
                    return d
                })
            },
            value8() {
                if (this.value7) {
                    return this.value7
                } else {
                    this.value7 = ''
                    return this.value7
                }
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let data = {
                    "dealer_id": this.dealer_id,
                    "order_number": "",
                    "order_status":[1102],
                    "order_pay_status": this.select_cate_pay,
                    "page_num": this.cur_page - 1,
                    "page_size": "10"
                }
                this.$axios.post(this.url, data).then((res) => {
                    this.total = res.data.data_total
                    this.tableData = res.data.data
                })
            },
            handle_methods(index, row, v) {
                const item = this.tableData[index];
                if (v === '删除') {
                    this.$axios.post(this.url1, {id: item.id}).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(`已经删除了${item.order_number}`);
                            this.getData()
                        }
                    })
                } else if (v === "复制") {
                    let a = {
                        "dealer_id": this.dealer_id,
                        "order_id": item.id,
                        "order_number": item.order_number,
                        "description": "",
                        "unit":this.unit,
                    }
                    this.$axios.post(this.url2, a).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(`已经复制了${item.order_number}`);
                            this.getData()
                        }
                    })
                }
            },
            search() {
                this.is_search = true;
                this.orderCode = this.select_word
                this.getData()
            },
            onRoutes(index, row) {
                const item = this.tableData[index];
                this.reload()
                this.$router.push({
                    name: 'orderInfo',
                    query: {orderid: item.id, type: '0'},
                })
            },


        },
        watch: {
            'value8': function (val, oldval) {
                this.getData();
            },
            '$route': function (val, old) {
                if (val.path == "/orderList_measured") {
                    this.getData()
                }
            },

        }

    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }


</style>
