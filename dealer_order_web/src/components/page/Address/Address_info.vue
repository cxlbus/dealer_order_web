<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> {{$t('Address.Title')}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('Address.Sub_Title')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">


            <div>
                <el-button type="primary" icon="add" @click="add_address">{{$t('label_add')}}</el-button>
            </div>
            <el-table :data="this.tableData_after" style="width: 100%" class="self_i">
                <el-table-column prop="id" label="ID" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="dealer_id" label="dealerid" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column :label="this.$t('label_name')" width="130" >
                    <template slot-scope="scope">
                        <span class="self_el_table">
                            {{`${tableData_after[scope.$index].first_name} ${tableData_after[scope.$index].last_name}`}}
                        </span>
                    </template>

                </el-table-column>
                <el-table-column prop="tel" :label="$t('label_Tel')" width="120">
                </el-table-column>
                <el-table-column :label="this.$t('label_default')" width="70" v-if="is_show">
                    <template slot-scope="scope">
                       <span v-if="tableData_after[scope.$index].is_default==1">
                               <el-tooltip class="item" effect="dark" content="已为默认地址" placement="right-start">
                              <i class="el-icon-edit-outline" style="color: #dd6161;font-size: 16px"></i>
                                 </el-tooltip>
                       </span>
                        <span v-else>
                            <el-tooltip class="item" effect="dark" content="不是默认地址" placement="right-start">
                              <i class="el-icon-edit-outline" style="font-size: 16px"></i>
                                 </el-tooltip>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="this.$t('label_address')" width="370">
                    <template slot-scope="scope">
                        <h3>{{`${tableData_after[scope.$index].province} ${tableData_after[scope.$index].city}`}} </h3>
                        <span class="self_el_table">
                          {{tableData_after[scope.$index].address}}
                      </span>
                    </template>
                </el-table-column>
                <el-table-column width="200">

                    <template slot-scope="scope" >
                        <el-tooltip class="item" effect="dark" :content="$t('label_orderEdit')" placement="top-start">
                            <i class="el-icon-edit"
                               @click="handleEdit(scope.$index, scope.row,2)"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" :content="$t('btn_delete')" placement="top-start">
                            <i class="el-icon-delete" style="color: #dd6161;"
                               @click="handleDelete(scope.$index, scope.row)"></i>
                        </el-tooltip>

                    </template>
                </el-table-column>

            </el-table>

        </div>
        <!-- 添加弹出框 -->
        <el-dialog :title="$t('label_add')" :visible.sync="addVisible" width="45%">


            <el-form ref="addform" :model="addform" label-width="27%">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_default')">
                            <el-switch
                                v-model="value3"
                                active-text="yes"
                                inactive-text="no">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Tel')">
                            <el-input v-model="addform.tel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_LastName')">
                            <el-input v-model="addform.last_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_FirstName')">
                            <el-input v-model="addform.first_name"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_Postcode')">
                            <el-input v-model="addform.postcode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_Country')">
                            <el-input v-model="addform.country"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_Province')">
                            <el-input v-model="addform.province"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_City')">
                            <el-input v-model="addform.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_Street')">
                            <el-input v-model="addform.street"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_Bldg')">
                            <el-input v-model="addform.bldg"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="saveAdd">{{$t('btn_ok')}}</el-button>
            </span>

        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog :title="$t('btn_edit')" :visible.sync="editVisible" width="60%">

            <el-form ref="form" :model="form" label-width="25%">
                <el-form-item label="ID" v-if="is_show">
                    <el-input v-model="form.id" readonly></el-input>
                </el-form-item>
                <el-form-item label="dealerid" v-if="is_show" readonly>
                    <el-input v-model="form.dealer_id" readonly></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Tel')">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('label_default')">
                            <el-switch
                                v-model="value2"
                                active-text="yes"
                                inactive-text="no">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_LastName')">
                            <el-input v-model="form.last_name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item :label="$t('label_FirstName')">
                            <el-input v-model="form.first_name"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Postcode')">
                            <el-input v-model="form.postcode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Country')">
                            <el-input v-model="form.country"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Province')">
                            <el-input v-model="form.province"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('label_City')">
                            <el-input v-model="form.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Street')">
                            <el-input v-model="form.street"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('label_Bldg')">
                            <el-input v-model="form.bldg"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit">{{$t('btn_ok')}}</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog :title="$t('btn_delete')" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">{{$t('dialog_confirmDelete')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="deleteRow">{{$t('btn_ok')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'addressinfo',
        data() {
            return {
                value3: false,
                value2: -1,
                dealer_id: localStorage.getItem('id'),
                addform: {
                    "first_name": "David",
                    "last_name": "LI",
                    "country": "Canada",
                    "province": "Ontario",
                    "city": "Montreal",
                    "street": "Rue Drumond 1055",
                    "bldg": "House Mongo",
                    "postcode": "H1K2E3",
                    "tel": "1371234567",
                    "is_default": "1"
                },
                is_show: process.env.NODE_ENV === 'development',
                addVisible: false,
                tableData: [],
                del_list: '',
                editVisible: false,
                delVisible: false,
                form: {
                    "id": "",
                    "dealer_id": "",
                    "first_name": "",
                    "last_name": "",
                    "country": "",
                    "province": "",
                    "city": "",
                    "street": "",
                    "bldg": "",
                    "postcode": "",
                    "tel": "",
                    "is_default": ""
                },
                url: '/login_after/address/get',//获取地址列表
                url1: '/login_after/address/new',//新建地址列表
                url2: '/login_after/address/modify',//修改地址列表
                url3: '/login_after/address/delete',//删除地址列表
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            tableData_after() {
                return this.tableData.filter(function (value) {
                    value.address = `${value.country},${value.province},${value.city},
                                  ${value.street},${value.bldg},${value.postcode}
                                 `
                    return value
                })
            },
        },
        methods: {

            // 获取用户列表
            getData() {
                let data = {
                    "dealer_id": this.dealer_id,
                }
                this.$axios.post(this.url, data).then((res) => {
                    // console.log(JSON.stringify(res.data ))
                    this.tableData = res.data.data
                })
            },

            //编辑按钮
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                // console.log(item)
                if (item.is_default == 1) {
                    this.value2 = true
                } else {
                    this.value2 = false
                }
                this.form = item
                this.editVisible = true;
            },
            /*添加单个数据*/
            add_address(order_id) {
                this.addVisible = true;
            },
            /*确定添加添加单个数据*/
            saveAdd(order_id) {

                if (this.value3) {
                    this.addform.is_default = 1
                } else {
                    this.addform.is_default = 0
                }
                this.addform.dealer_id = this.dealer_id
                this.$axios.post(this.url1, this.addform).then((res) => {
                    if (res.data.code == 200) {
                        this.getData()
                        this.addVisible = false;
                    }
                })

            },

            // 保存编辑
            saveEdit() {
                if (this.value2) {
                    this.form.is_default = 1
                } else {
                    this.form.is_default = 0
                }
                this.$axios.post(this.url2, this.form).then((res) => {
                    if (res.data.code == 200) {
                        this.editVisible = false;
                        this.getData()
                    }
                })

            },
            handleDelete(index, row) {
                const del_item = this.tableData[index];
                this.delVisible = true;
                this.del_list = del_item.id
            },
            // 确定删除
            deleteRow() {
                this.$axios.post(this.url3, {id: this.del_list}).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success(this.$t('table.Delete_successfully'));
                        this.getData()
                        this.delVisible = false;
                    }
                })


            }
        },
        watch: {
            '$route': function (val, old) {
                if (val.path === "addressinfo") {
                    this.getData()
                }
            },

        }
    }

</script>

<style scoped>

    .el-table >>> .success-row {
        background: #409EFF;
    }

    .box-card div {
        margin-top: 5px;
        background-color: #f5f5f6;
        width: 20%;
        height: 30px;
        line-height: 30px;
        color: #9B9EA0;
    }


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
