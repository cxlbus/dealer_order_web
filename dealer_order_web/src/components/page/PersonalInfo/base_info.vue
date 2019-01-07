<template>
    <div>

        <el-form :model="dealer_info" status-icon ref="dealer_info" label-width="100px"
                 class="demo-ruleForm self_el_table">
            <h3 style="margin-bottom: 10px">{{$t('label_basic_information')}}</h3>
            <el-row :gutter="30">
                <el-col :span="12" :xs="24">
                    <div class="grid-content bg-purple">
                        <el-form-item :label="$t('label_Alias')" prop="account">
                            <el-input
                                v-model="dealer_info.account"
                                clearable style="max-width: 200px;">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label='$t("label_Country")' prop="account">
                            <el-input
                                v-model="dealer_info.country_code"
                                clearable style="max-width: 200px;">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label='$t("label_Email")' prop="account">
                            <el-input
                                v-model="dealer_info.email"
                                clearable style="max-width: 200px;">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label='$t("label_Tel")' prop="account">
                            <el-input
                                v-model="dealer_info.international_code"
                                clearable style="max-width: 60px;">
                            </el-input>
                            <el-input
                                v-model="dealer_info.phone"
                                clearable style="max-width: 200px;">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label='$t("label_personal_profile")' prop="account">
                            <el-input type="textarea" :placeholder="$t('label_personal_profile')"
                                      style="max-width: 200px;"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12" :xs="24">
                    <div class="grid-content bg-purple-light">
                        <div class="grid-content bg-purple" style="margin: 0 auto">
                            <div class="user-avator">
                                <img :src="imageUrl" alt="">
                                <input class="user-avator_input" type="file" id="upload_file"
                                       @change="handleAvatarSuccess">
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <h3 style="margin-bottom: 10px">{{$t("label_security_settings")}}</h3>
        <el-row :gutter="30">
            <el-col :span="12" :xs="24" :offset="1">
                <div class="grid-content bg-purple">
                    <p style="font-size: 14px;color: rgba(0,0,0,.65);line-height: 22px;margin-bottom: 4px">
                        {{$t("label_the_account_password")}}</p>
                    <p style="font-size: 14px;color: rgba(0,0,0,.45);line-height: 22px;">
                        {{$t("label_the_account_password_strength")}}：：

                        <el-rate
                            v-model="safe"
                            :icon-classes="['iconfont icon-expressionfailure', 'iconfont icon-biaoqing-dai-tianchong','iconfont icon-expressionsuccessful']"
                            disabled-void-icon-class="iconfont icon-wubiaoqing self_rate"
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                            style="float: right;"
                            show-text
                            :texts="[$t('label_weak'),$t('label_general'),$t('label_general'),$t('label_general'),$t('label_strong')]"
                            text-color="#52c41a"
                            disabled
                        >
                        </el-rate>

                    </p>

                </div>

            </el-col>


            <el-col :span="10" :xs="24">
                <p></p>
                <p><span @click="change_pwd" style="color:#1890ff;font-size: 14px">{{$t('btn_tap_modify')}}</span></p>
            </el-col>
        </el-row>

        <el-dialog :title="$t('Credit_Line.Edit')" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="130px" :rules="rules2">
                <el-form-item label="ID" v-if="is_show">
                    <el-input v-model="form.dealer_id"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label_old_psaaword')" prop="oldPwd">
                    <el-input type="password" v-model="form.old_pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label_new_psaaword')" prop="newPwd">
                    <el-input type="password" v-model="form.new_pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label_confirm_password')" prop="ConfirmPwd">
                    <el-input type="password" v-model="form.ConfirmPwd" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit('form')">{{$t('btn_ok')}}</el-button>

            </span>
        </el-dialog>

    </div>
</template>

<script>


    export default {

        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.ConfirmPwd !== '') {
                        this.$refs.form.validateField('ConfirmPwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.new_pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                is_show: process.env.NODE_ENV === 'development',
                dealer_id: localStorage.getItem("id"),
                url: "/login_after/account/password_modify",//修改密码
                url2: '/login_after/dealer/get',//获取经销商基本信息
                dealer_info: {},
                editVisible: false,
                safe: localStorage.getItem('safe'),
                value5: 1,
                value1: null,
                rules2: {
                    newPwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    ConfirmPwd: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                },
                form: {
                    dealer_id: '',
                    old_pwd: '',
                    new_pwd: '',
                    ConfirmPwd: '',
                },

            };
        },
        components: {},
        created() {
            this.getalldealer()
        },

        methods: {
            handleAvatarSuccess() {
                let files = document.getElementById("upload_file").files[0];
            },
            change_pwd() {
                this.form.dealer_id = localStorage.getItem('id')
                this.editVisible = true
            },
            saveEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data_obj = {
                            dealer_id: this.form.dealer_id,
                            old_pwd: this.$crypto.MD5(32, this.form.old_pwd),
                            new_pwd: this.$crypto.MD5(32, this.form.new_pwd),
                            ConfirmPwd: this.form.ConfirmPwd,
                        }
                        this.$axios.post(this.url, data_obj).then((res) => {
                            if (res.data.code == 200) {
                                this.$message.success('密码已修改,为了您的账户安全,请重新登录');
                                this.editVisible = false
                                this.init()
                                this.$router.push('/login');
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            init() {
                localStorage.removeItem("id")
                localStorage.removeItem("phone")
                localStorage.removeItem("ms_username")
                localStorage.removeItem("pwd")
                localStorage.removeItem("token")
                localStorage.removeItem("unit")
                localStorage.removeItem("is_mobile")
                localStorage.removeItem("token")
            },
            getalldealer() {
                let _this = this

                function getdealer() {
                    return _this.$axios.post(_this.url2, {"id": _this.dealer_id});
                }

                _this.$axios.all([getdealer()])
                    .then(_this.$axios.spread(function (dealer) {
                        // 两个请求现在都执行完成
                        _this.dealer_info = dealer.data.data[0]
                    }));

            },
        }
    }
</script>
<style scoped>
    .user-avator {
        width: 120px;
        height: 120px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
    }

    .user-avator img {
        width: 100%;
        height: 100%;
    }

    .user-avator input {
        opacity: 0;
        filter: alpha(opacity=0);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }
    .self_rate {
        font-size: 20px;
        color: yellow;
    }

    </style>
