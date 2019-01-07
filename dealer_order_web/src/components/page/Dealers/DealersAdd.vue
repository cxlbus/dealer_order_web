<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 经销商</el-breadcrumb-item>
                <el-breadcrumb-item>添加经销商</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="form-box">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                         class="demo-ruleForm">
                    <div class='commercial_info'>
                        <div>
                            <span>商用信息：</span>
                        </div>
                        <el-row :gutter="40">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <div class='head_portrait'>
                                        <div class="head_portrait_img">
                                            <img :src="`../../../../static/img/user_${ruleForm2.radio}.jpg`" alt="">
                                        </div>
                                        <div style='margin-left: 40px;'>
                                            <el-radio v-model="ruleForm2.radio" label="1">男</el-radio>
                                            <el-radio v-model="ruleForm2.radio" label="2">女</el-radio>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple-light">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label='用户名' prop="account">
                                            <el-input
                                                v-model="ruleForm2.account"
                                                clearable style="width: 200px;">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="password" label='默认密码'>
                                            <el-input v-model="ruleForm2.password"
                                                      auto-complete="off" style="width: 200px;" disabled></el-input>
                                        </el-form-item>

                                        <el-form-item prop="discount" label='提货折扣'>
                                            <el-input
                                                v-model="ruleForm2.discount"
                                                clearable
                                                style="width: 200px;">
                                            </el-input>
                                        </el-form-item>

                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <div class="grid-content bg-purple">
                                        <el-form-item prop="dealer_type">
                                            <el-select v-model="ruleForm2.dealer_type" placeholder="经销商类型"
                                                       style="width: 200px;">
                                                <el-option
                                                    v-for="item in distributor_type_options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="dealer_channel">
                                            <el-select v-model="ruleForm2.dealer_channel" placeholder="所属渠道"
                                                       style="width: 200px;">
                                                <el-option
                                                    key="0"
                                                    label="怀萃"
                                                    value="0"
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
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class='personal_info'>
                        <div>
                            <span>个人信息：</span>
                        </div>
                        <el-form-item prop="phone">
                            <el-input
                                placeholder="手机号码"
                                v-model="ruleForm2.phone"
                                clearable
                                style="width: 250px;"
                            >
                            </el-input>

                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input
                                placeholder="邮箱"
                                v-model="ruleForm2.email"
                                clearable
                                style="width: 250px;"
                            >
                            </el-input>

                        </el-form-item>

                        <el-form-item prop="number">
                            <el-input
                                placeholder="证件号码"
                                v-model="ruleForm2.number"
                                clearable
                                style="width: 250px;"
                            >
                            </el-input>
                        </el-form-item>


                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交
                        </el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <v-scroll>
        </v-scroll>
    </div>
</template>

<script>

    import vScroll from '../../common/Scroll.vue';
    import areaJs from '../../../../static/js/area.js';

    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                if (value.length == 0) {
                    return callback(new Error('不能为空'));
                }
                callback();
            };
            return {
                rules2: {
                    account: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    super_account: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    discount: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    heater_quantity: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    dealer_type: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    dealer_channel: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    number: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    workarea: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                    detailed_address: [
                        {required: true, validator: checkAge, trigger: 'blur'}
                    ],
                },
                options3: areajson,//地址三级联动
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
                url:'/login_after/dealer/',
                url1:'/login_after/dealer/all',//获取所有经销商
                ruleForm2: {
                    radio: '1',
                    account: '',
                    password: '1234567',
                    checkPass: '',
                    email: '',
                    heater_quantity: 0,
                    discount: '',
                    phone: '',
                    pass: '',
                    checkPass: '',
                    number: '',
                    detailed_address: '',
                    dealer_channel: '',
                    workarea: [],
                },
            };
        },
        components: {vScroll},
        created(){
            this.getalldealer()
        },
        methods: {
            handleChange(val) {
                this.ruleForm2.workarea = val
            },
            getalldealer() {
                this.$axios.get(this.url1).then((res) => {
                    this.subordinate_channel_options = res.data.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = {
                            account: this.ruleForm2.account,
                            password: this.$crypto.MD5(16,this.ruleForm2.password),
                            phone: this.ruleForm2.phone,
                            email: this.ruleForm2.email,
                            dealer_type: this.ruleForm2.dealer_type,
                            dealer_channel: this.ruleForm2.dealer_channel,
                            discount: this.ruleForm2.discount,
                            heater_quantity: this.ruleForm2.heater_quantity,
                            dealer_channel: this.ruleForm2.dealer_channel,
                            id_code: this.ruleForm2.number,
                        }
                        this.$axios.post(this.url, {data:data}).then((res) => {
                            if (res.data.code == 200) {
                                this.$refs['ruleForm2'].resetFields();
                                this.$message.success('上传成功');
                                this.$store.dispatch('dealer_add_action')
                            }
                        })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>

    .head_portrait .head_portrait_img {
        width: 200px;
        height: 200px;
        overflow: hidden;
        vertical-align: center;
    }

    .head_portrait .head_portrait_img img {
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: center;
    }

    .personal_info {
        margin-top: 30px;
    }
</style>
