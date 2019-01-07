<template>
    <div class="login-wrap">
        <div class="ms-title">dealer system</div>
        <div class="ms-login">

            <el-row :gutter="60">
                <el-col :span="12" style="padding-left: 61px;padding-right: 28px;">
                    <div class="grid-content bg-purple">
                        <a :class="{'ms-login-change':true,'ms-login-changea':login_change==1}" @click="login_change=1">
                            username login</a>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <a :class="{'ms-login-change':true,'ms-login-changea':login_change==2}" @click="login_change=2">
                            phone login
                        </a>
                    </div>
                </el-col>
            </el-row>

            <div style="margin-top: 20px">

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

                <el-form-item prop="username" v-if="login_change==1">
                    <el-input v-model="ruleForm.account" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="username1" v-if="login_change==2">
                    <el-input v-model="ruleForm.phone" placeholder="phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="unit">
                    <!--<el-radio v-model="ruleForm.unit" label="cm">CM</el-radio>-->
                    <el-radio v-model="ruleForm.unit" label="in">IN</el-radio>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">login</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : Please fill in the correct user name and password。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                url: '/login_before/account/login',
                url1:"/login_before/code/get_code_table",
                login_change: 1,
                ruleForm: {
                    username: '',
                    password: '',
                    unit:'in',
                },
                rules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
             this.get_code()
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let da
                    if (this.login_change == 1) {
                        da = {
                            "account": this.ruleForm.account,
                            'pwd': this.$crypto.MD5(32, this.ruleForm.password)
                        }
                    }
                    if (this.login_change == 2) {
                        da = {
                            'phone': this.ruleForm.phone,
                            'pwd': this.$crypto.MD5(32, this.ruleForm.password)
                        }
                    }
                    if (valid) {
                        this.$axios.post(this.url, da).then((res) => {
                            if (res.data.code == 200) {
                                let strings = res.data.permission
                                // localStorage.setItem('role', Array.from(new Set(strings.split(','))));
                                localStorage.setItem('id', res.data.id);
                                localStorage.setItem('phone', this.ruleForm.phone);
                                localStorage.setItem('ms_username',this.ruleForm.account);
                                localStorage.setItem('pwd', this.$crypto.MD5(32, this.ruleForm.password));
                                localStorage.setItem('token', res.data.token);
                                localStorage.setItem('unit', this.ruleForm.unit);
                                localStorage.getItem('lang')?'':localStorage.setItem('lang', 'en');
                                localStorage.setItem('safe',this.ruleForm.password=='1234567'?1:3)
                                this.$router.push('/');
                            } else {
                                this.$message.error('登录失败！请检查用户名或密码');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            get_code(){
                let da={
                    "code": "",
                    "label_code": "",
                    "language":localStorage.getItem('lang')?localStorage.getItem('lang'):"en"
                }
                this.$axios.post(this.url1, da).then((res) => {
                    if (res.data.code == 200) {
                        let c={}
                        res.data.data.map(function (s) {
                            if(c[s.code]){
                                c[s.code].push(s)
                            }else {
                                c[s.code]=[]
                                c[s.code].push(s)
                            }
                        })
                        localStorage.setItem('code', JSON.stringify(c));
                    } else {
                        this.$message.error('code获取失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../../static/img/loginback.jpg");

    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: darkorange;
    }

    .ms-login {
        position: absolute;
        left: 46%;
        top: 50%;
        width: 400px;
        height: 250px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .ms-login-change {
        color: #666;
        width: 20px;
        height: 30px;
        /*background-color: blue;*/
        font-weight: 600;
    }

    .ms-login-changea {
        color: #409EFF;
    }

    .ms-login-change:hover {
        color: #409EFF;
        cursor: pointer;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
