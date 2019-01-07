<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 经销商</el-breadcrumb-item>
                <el-breadcrumb-item>查询经销商</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model.trim="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">{{$t('staff_search.Search')}}</el-button>
            </div>
            <el-table :data="this.tableData" border style="width: 100%">
                <el-table-column prop="id" label="经销商ID" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="account" label="用户名" width="100">
                </el-table-column>
                <el-table-column prop="dealer_type" label="经销商类型" width="100">
                </el-table-column>
                <el-table-column prop="heater_quantity" label="现有库存" width="170">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="100">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="180">
                </el-table-column>
                <el-table-column :label="this.$t('staff_search.Operation')" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="$t('staff_search.Edit')" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="100px">

                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="经销商ID" v-if="is_show">
                                <el-input v-model="form.id"></el-input>
                            </el-form-item>
                            <el-form-item label="经销商">
                                <el-input v-model="form.account"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="form.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="折扣">
                                <el-input v-model="form.discount"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="类型">
                                <el-select v-model="form.dealer_type" placeholder="经销商类型" style="width: 200px;">
                                    <el-option
                                        v-for="item in distributor_type_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="渠道">


                                <el-select v-model="form.dealer_channel" placeholder="所属渠道" style="width: 200px;">
                                    <el-option
                                        key="0"
                                        label="怀萃"
                                        :value="0"
                                        style="width: 250px;">
                                    </el-option>
                                    <el-option
                                        v-for="item in subordinate_channel_options"
                                        :key="item.id"
                                        :label="item.account"
                                        :value="item.id"
                                        style="width: 250px;">
                                    </el-option>
                                </el-select>
                            </el-form-item>


                        </div>
                    </el-col>
                </el-row>

                <!--<el-form-item label="所属区域">-->
                <!--<el-cascader-->
                <!--:options="options3"-->
                <!--change-on-select-->
                <!--v-model="workarea"-->
                <!--expand-trigger="hover"-->
                <!--@change	="handleChange"-->
                <!--class="wd400">-->
                <!--</el-cascader>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="detailed_address" label="详细地址">-->
                <!--<el-input-->
                <!--type="textarea"-->
                <!--autosize-->
                <!--placeholder="请输入内容"-->
                <!--v-model="form.dealer_address.street"-->
                <!--&gt;-->
                <!--</el-input>-->
                <!--</el-form-item>-->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">{{$t('staff_search.Cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit">{{$t('staff_search.Ok')}}</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog :title="$t('table.Tishi')" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">{{$t('table.Mes')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">{{$t('table.Quxiao')}}</el-button>
                <el-button type="primary" @click="deleteRow">{{$t('table.Queding')}}</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import areaJs from '../../../../static/js/area.js';

    export default {
        name: 'basetable',
        data() {
            return {
                select_word: '',
                is_search: false,
                options3: areajson,//地址三级联动
                url: '/login_after/dealer/all',//获取所有经销商
                url1: '/login_after/dealer/',//修改经销商
                url2: '/login_after/dealer/',//删除经销商
                is_show: process.env.NODE_ENV === 'development',
                distributor_type_options: [
                    {
                        value: 'CEO',
                        label: 'CEO'
                    }, {
                        value: '经销商',
                        label: '经销商'
                    },
                    {
                        value: '合作伙伴',
                        label: '合作伙伴'
                    }
                ],

                subordinate_channel_options: [],
                tableData: [],
                workarea: [],
                old_password: '',
                editVisible: false,
                delVisible: false,
                form: {
                    "id": "",
                    "super_account": "",
                    "account": "",
                    "password": "",
                    "phone": "",
                    "id_code": "",
                    "email": "",
                    "dealer_type": "",
                    "dealer_channel": "",
                    "discount": "",
                    "address_id": "",
                    "heater_quantity": "",
                    "dealer_address": {
                        "id": "",
                        "name": "",
                        "phone": "",
                        "province": "",
                        "city": "",
                        "district": "",
                        "street": "",
                        "bldg": "",
                        "postcode": ""
                    }
                },
                idx: -1,
                del_idex: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {},
        methods: {
            handleChange(val) {
                this.workarea = val
            },
            // 获取用户列表
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                this.$axios.get(this.url).then((res) => {
                    this.tableData = res.data.data;
                    this.subordinate_channel_options = this.tableData
                    let _this = this

                    this.$store.dispatch('dealer', _this.tableData)
                })

            },

            search() {
                this.is_search = true;
                this.getData()
            },

            //编辑按钮
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.old_password = item.password
                this.form = {
                    id: item.id,
                    account: item.account,
                    phone: item.phone,
                    email: item.email,
                    password: item.password,
                    dealer_type: item.dealer_type,
                    dealer_channel: item.dealer_channel,
                    discount: item.discount,
                    heater_quantity: item.heater_quantity,
                },
                    this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                let dataJson = this.form
                let _this = this
                if (this.old_password != this.form.password) {
                    dataJson.password = this.$crypto.MD5(16, _this.form.password)
                }
                this.$axios.put(this.url1, {data:dataJson}).then((res) => {
                    if (res.data.code == 200) {
                        this.editVisible = false;
                        this.getData();
                    }
                })

            },
            //删除按钮
            handleDelete(index, row) {
                const del_item = this.tableData[index];
                this.delVisible = true;
                this.idx = index
                this.del_idex = this.tableData[index].id
            },
            // 确定删除
            deleteRow() {
                this.$axios.delete(this.url2 + this.del_idex).then((res) => {
                    if (res.data.code == 200) {
                        this.delVisible = false;
                        this.getData();
                    }
                })

            }
        },
        watch: {
            "$route": function (val, oldval) {
                if (val && val.path == '/Dealers_search') {
                    this.getData()
                }
            }
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
