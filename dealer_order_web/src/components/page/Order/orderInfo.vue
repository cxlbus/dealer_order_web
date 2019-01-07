<template>
    <div>

        <el-row :gutter="20">
            <el-col :span="10">
                <div class="grid-content bg-purple">
                    <el-card class="box-card" style="height: 210px">
                        <div>
                            <span class='self_colon'> {{$t('label_orderNumber')}}: </span>
                            <span class='self_colon1'>{{orderinfo.order_number}}</span>
                        </div>
                        <div>
                            <span class='self_colon'>{{$t('label_orderPrice')}} : </span>
                            <span class='self_colon1'>{{orderinfo.original_price}}</span>
                        </div>
                        <div>
                            <span class='self_colon'>{{$t('label_orderDiscount')}} : </span>
                            <span class='self_colon1'>{{orderinfo.discount}}</span>
                        </div>
                        <div>
                            <span class='self_colon'> {{$t('label_orderQuoted')}} : </span>
                            <span class='self_colon1'>{{orderinfo.order_price}}</span>
                        </div>
                        <div>
                            <span class='self_colon'>{{$t('label_taxGST')}}  : </span>
                            <span class='self_colon1'>{{orderinfo.tax_gst}}</span>
                        </div>
                        <div>
                            <span class='self_colon'>{{$t('label_taxTVQ')}} : </span>
                            <span class='self_colon1'>{{orderinfo.tax_tvq}}</span>
                        </div>
                        <div>
                            <span class='self_colon'>{{$t('label_orderTotalPrice')}} : </span>
                            <span class='self_colon1'>{{orderinfo.total_price}}</span>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple">
                    <el-card class="box-card" style="height: 210px">

                    </el-card>

                </div>
            </el-col>
        </el-row>
        <div style="margin-top: 5px;">
        </div>
        <el-collapse v-model="activeName" accordion style="margin-bottom: 5px">
            <el-collapse-item name="1">
                <template slot="title">
                    <span style="padding-left: 12px">{{$t('item_curtainRollshade')}}</span>
                    <el-badge :value="juanlian.length" :max="22" class="item">
                    </el-badge>
                </template>
                <div v-for="o in juanlian" :key="o.id" class="text item">
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 14px;font-weight: 600">{{o.curtain_number}}</span>
                        </div>
                        <div style="margin-bottom: 10px">
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span class="self_label">{{$t('label_curtainMaterial')}} ：</span>
                                        <span class="self_data">{{o.curtain_material}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span class="self_label"> {{$t('label_top_baffle')}}：</span>
                                        <el-select v-model="o.valence" disabled placeholder="" class="self_select">
                                            <el-option
                                                :key="0||''"
                                                label="NO"
                                                value="0">
                                            </el-option>
                                            <el-option
                                                key="1"
                                                label="YES"
                                                value="1">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span class="self_label">   {{$t('label_chord_type')}}：</span>
                                        <el-select v-model="o.chord_type" disabled placeholder=""
                                                   class="self_select">
                                            <el-option
                                                v-for="item in control_type"
                                                :key="item.labelcode"
                                                :label="item.value"
                                                :value="item.labelcode">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span class="self_label">   {{$t('label_curtainMaterialDesc')}} :</span>
                                        <span class="self_data">{{o.curtain_material_desc}}</span>

                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span class="self_label">  {{$t('label_side_baffle')}}：</span>

                                        <el-select v-model="o.returns" disabled placeholder="NO"
                                                   class="self_select">
                                            <el-option
                                                :key="0||''"
                                                label="NO"
                                                value="0">
                                            </el-option>
                                            <el-option
                                                key="1"
                                                label="YES"
                                                value="1">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>

                                <el-col :span="8">
                                    <div class="grid-content bg-purple">

                                        <span class="self_label">  {{$t('label_area_count')}}：</span>
                                        <span class="self_data">  {{o.curtain_count}}</span>

                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!--区域列表-->
                        <template>
                            <el-card class="box-card" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <span style="font-size: 14px;font-weight: 600">{{$t('label_area_size')}} {{$t("label_basic_information")}}</span>
                                </div>
                                <template v-if="o.area&&o.area.length>0">
                                    <div style="width: 100%;height: 150px;margin-bottom: 3px"
                                         v-for="(b,i) in o.area">
                                        <div style="font-size: 20px;color: blue">{{$t('label_area')}} line ：{{i+1}}
                                        </div>
                                        <el-row :gutter="20">
                                            <el-col :span="12">
                                                <div class="grid-content bg-purple">
                                                   <span class="self_label">
                                                       {{$t('label_curtainWidth')}} * {{$t('label_curtainHeight')}} ：
                                                   </span>
                                                    <template v-if="unit=='in'">
                                                        <span class="self_data">
                                                            {{Math.floor(b.width)}} {{in_score(b.width)}}*{{Math.floor(b.height)}} {{in_score(b.height)}}
                                                   </span>

                                                    </template>
                                                    <template v-else>
                                                        <span class="self_data">
                                                          {{b.width}}*{{b.height}}
                                                        </span>
                                                    </template>
                                                </div>
                                            </el-col>

                                            <el-col :span="12">
                                                <div class="grid-content bg-purple">

                                                    <span class="self_label">
                                                          {{$t('label_rolling_direction')}} ：
                                                   </span>
                                                    <el-select v-model="b.rolling_direction" disabled
                                                               class="self_select">
                                                        <el-option
                                                            v-for="item in rolling_direction"
                                                            :key="item.labelcode"
                                                            :label="item.value"
                                                            :value="item.labelcode">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20">
                                            <el-col :span="12">
                                                <span class="self_label">{{$t('label_number')}} ： </span>
                                                <span class="self_data"> {{b.count}}</span>
                                            </el-col>

                                            <el-col :span="12">
                                                <div class="grid-content bg-purple">
                                                    <span class="self_label"> {{$t('label_lift_rope')}} ： </span>
                                                    <el-select v-model="b.lift_rope" disabled class="self_select">
                                                        <el-option
                                                            v-for="item in lift_rope"
                                                            :key="item.labelcode"
                                                            :label="item.value"
                                                            :value="item.labelcode">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </el-col>

                                        </el-row>
                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <div class="grid-content bg-purple">
                                                    <span class="self_label">{{$t('label_desc')}} ：</span>
                                                    <span class="self_data">{{b.description}}</span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                    </div>
                                </template>
                                <template v-else>
                                    <div class="self_content_no" style="font-size: 20px;color:rgba(0,0,0,.25)">
                                        <i class="iconfont icon-icon-test-copy"
                                           style="font-size: 22px;color:rgba(0,0,0,.4);font-weight: 700"></i>
                                        <span>{{$t('label_temporarily_no_data')}}</span>
                                    </div>
                                </template>
                            </el-card>

                        </template>
                        <!--上挡板列表-->
                        <template v-if="o.valence&&o.valence!=0&&o.valence_data.length>0">

                            <el-card class="box-card" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <span style="font-size: 14px;font-weight: 600">{{$t('label_top_baffle')}} {{$t("label_basic_information")}}</span>
                                </div>
                                <div style="width: 100%;"
                                     v-for="(c,i) in o.valence_data">
                                    <div style="font-size: 20px;color: blue">{{$t('label_top_baffle')}} line ：{{i+1}}
                                    </div>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div>
                                                <span class="self_label">{{$t('label_top_baffle_material')}} ：</span>
                                                <el-select v-model="c.valence_material" disabled class="self_select">
                                                    <el-option
                                                        v-for="item in material"
                                                        :key="item.labelcode"
                                                        :label="item.value"
                                                        :value="item.labelcode">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple">
                                                <span class="self_label"> {{$t('label_top_baffle_length')}} ：</span>

                                                <template v-if="unit=='in'">
                                                    <span
                                                        class="self_data">{{Math.floor(c.len)}} {{in_score(c.len)}}</span>
                                                </template>
                                                <template v-else>
                                                    <span class="self_data"> {{c.len}}</span>
                                                </template>

                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div>
                                                <span class="self_label"> {{$t('label_number')}} ：</span>
                                                <span class="self_data"> {{c.count}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple">
                                                <span class="self_label"> {{$t('label_desc')}} ：</span>
                                                <span class="self_data">  {{c.description}}</span>
                                            </div>
                                        </el-col>

                                    </el-row>
                                </div>
                            </el-card>

                        </template>
                        <!--侧盖板列表-->
                        <template v-if="o.returns&&o.returns!=0&&o.returns_data.length>0">

                            <el-card class="box-card" shadow="hover">
                                <div slot="header" class="clearfix">
                                    <span style="font-size: 14px;font-weight: 600">{{$t('label_side_baffle')}} {{$t("label_basic_information")}}</span>
                                </div>
                                <div style="width: 100%;"
                                     v-for="(d,i) in o.returns_data">
                                    <div style="font-size: 20px;color: blue">{{$t('label_side_baffle')}} line ：{{i+1}}
                                    </div>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div>
                                                <span class="self_label">{{$t('label_side_baffle_material')}} ：</span>
                                                <el-select v-model="d.returns_material" disabled class="self_select">
                                                    <el-option
                                                        v-for="item in material"
                                                        :key="item.labelcode"
                                                        :label="item.value"
                                                        :value="item.labelcode">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple">
                                                <span class="self_label"> {{$t('label_side_baffle_length')}} ：</span>
                                                <template v-if="unit=='in'">
                                                    <span
                                                        class="self_data"> {{Math.floor(d.len)}} {{in_score(d.len)}}</span>
                                                </template>
                                                <template v-else>
                                                    <span class="self_data">{{d.len}}</span>
                                                </template>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div>
                                                <span class="self_label"> {{$t('label_number')}} ：</span>
                                                <span class="self_data"> {{d.count}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple">
                                                <span class="self_label"> {{$t('label_desc')}}  ：</span>
                                                <span class="self_data"> {{d.description}}</span>

                                            </div>
                                        </el-col>
                                    </el-row>

                                </div>
                            </el-card>

                        </template>

                    </el-card>
                </div>
            </el-collapse-item>
            <!--<el-collapse-item title="横帘" name="2">-->
            <!--<template slot="title">-->
            <!--<span style="padding-left: 12px">横帘</span>-->
            <!--<el-badge :value="12" :max="22" class="item">-->
            <!--</el-badge>-->
            <!--</template>-->
            <!--</el-collapse-item>-->
            <!--<el-collapse-item title="片帘" name="3">-->
            <!--<template slot="title">-->
            <!--<span style="padding-left: 12px">片帘</span>-->
            <!--<el-badge :value="12" :max="22" class="item">-->
            <!--</el-badge>-->
            <!--</template>-->
            <!--</el-collapse-item>-->
            <!--<el-collapse-item title="纱帘" name="4">-->
            <!--<template slot="title">-->
            <!--<span style="padding-left: 12px">纱帘</span>-->
            <!--<el-badge :value="12" :max="22" class="item">-->
            <!--</el-badge>-->
            <!--</template>-->
            <!--</el-collapse-item>-->
        </el-collapse>


        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="24" class='text_center'>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('label_Email')" prop="email">
                            <el-input v-model="ruleForm.email"
                                      :placeholder="`${$t('label_for_example')}:112334@qq.com`"
                            ></el-input>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
            <el-row :gutter="20">

                <el-col :span="24" class='text_center'>
                    <el-button type="primary" plain @click="send_info('发送报价单')"> {{$t('label_send_quotation_sheet')}}</el-button>
                    <el-button type="primary" @click="send_info('发送发票')">{{$t('label_send_the_invoice')}}</el-button>
                    <el-button type="primary" @click="send_info('撤回编辑')">{{$t('btn_back_edit')}}</el-button>
                    <el-button type="primary" @click="send_info('保存')" >{{$t('btn_save')}}</el-button>
                    <el-button type="primary" @click="send_info('确认购买')">{{$t('btn_buy')}}</el-button>
                </el-col>
            </el-row>
        </el-card>

        <Scroll></Scroll>
    </div>
</template>

<script>
    import Scroll from "../../common/Scroll"

    export default {
        name: 'order_details',
        data() {
            var checkemail = (rule, value, callback) => {
                let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if (!re.test(value)) {
                    return callback(new Error(`${this.$t('label_email_address')}`));
                }else {
                    return callback();
                }

            };

            return {
                is_show: process.env.NODE_ENV === 'development',
                juanlian: [],
                in_unit: [{value: 0, label: '0"'}, {value: 0.125, label: '1/8"'}, {
                    value: 0.25,
                    label: '1/4"'
                }, {value: 0.375, label: '3/8"'}, {value: 0.5, label: '1/2"'}, {
                    value: 0.625, label: '5/8"'
                }, {value: 0.75, label: '3/4"'}, {value: 0.875, label: '7/8"'}],
                email:'',
                order_id: this.$route.query.orderid,
                dealer_id:localStorage.getItem('id'),
                unit: localStorage.getItem('unit'),
                curtain_type: JSON.parse(localStorage.getItem('code'))['116'],
                material: JSON.parse(localStorage.getItem('code'))['112'],
                control_type: JSON.parse(localStorage.getItem('code'))['108'],
                lift_rope: JSON.parse(localStorage.getItem('code'))['102'],
                rolling_direction: JSON.parse(localStorage.getItem('code'))['109'],
                activeName: '1',
                orderinfo:{},
                ruleForm:{},
                delVisible: false,//是否显示删除提示
                rules: {
                    email: [
                        { validator: checkemail, trigger: 'blur' }
                    ]},
                url1: '/login_after/curtain/rollshade/new',//新建卷帘
                url2: '/login_after/curtain/rollshade/get',//获取卷帘
                url3: '/login_after/curtain/valence/get',//获取上挡板
                url4: '/login_after/curtain/returns/get',//获取侧盖板
                url5: '/login_after/curtain/rollshade/delete',//删除卷帘
                url6: '/login_after/order/get',//获取单个订单
                url7: '/login_after/order/send_quote',//发送报价单
                url8: '/login_after/order/send_invoice',//发送发票
                url9: '/login_after/order/modify',//修改订单
            }
        },
        created() {
            this.getData()
            this.getDataprice()
        },
        components: {
            Scroll
        },
        computed: {},
        methods: {
            handleChange(val) {
                // console.log(val);
            },
            getData() {
                let _this = this
                _this.juanlian = []
                let data = {
                    "order_id": this.order_id,
                    "unit": this.unit
                }
                _this.$axios.post(this.url2, data).then((rs) => {
                    return rs.data.data
                }).then((da) => {
                    da.forEach(async (s) => {
                        let data = {
                            "curtain_id": s.id,
                            "curtain_number": s.curtain_number
                        }

                        function getvalence() {
                            return _this.$axios.post(
                                _this.url3, data
                            );
                        }

                        function getreturns() {
                            return _this.$axios.post(
                                _this.url4, data
                            );
                        }

                        await  _this.$axios.all([getvalence(), getreturns()])
                            .then(_this.$axios.spread(function (acct, perms) {
                                // 两个请求现在都执行完成
                                s.valence_data = acct.data.data
                                s.returns_data = (perms.data.data)
                            }));

                        await  _this.juanlian.push(s)
                    })
                })
            },
            getDataprice() {
                let _this = this
                let data = {
                    "id": this.order_id,
                }
                _this.$axios.post(this.url6, data).then((rs) => {
                    if(rs.data.code==200){
                        this.orderinfo=rs.data.data
                    }
                })
            },
            in_score(c) {
                let b;
                let a = c / 1 - Math.floor(c / 1)
                if (a == 0) {
                    b = '0"';
                } else if (a > 0 && a <= 0.125) {
                    b = '1/8"'
                } else if (a > 0.125 && a <= 0.25) {
                    b = '1/4"'
                } else if (a > 0.25 && a <= 0.375) {
                    b = '3/8"'
                } else if (a > 0.375 && a <= 0.5) {
                    b = '1/2"'
                } else if (a > 0.5 && a <= 0.625) {
                    b = '5/8"'
                } else if (a > 0.625 && a < 0.75) {
                    b = '3/4"'
                } else {
                    b = '7/8"'
                }
                return b
            },
            send_info(v){
                let url,data;

                switch (v){
                    case "发送报价单":
                        this.$refs["ruleForm"].validate((valid) => {
                            if (valid) {
                                url=this.url7
                                data={
                                    "dealer_id": this.dealer_id,
                                    "id": this.order_id,
                                    "email": this.ruleForm.email
                                }
                            } else {
                                return false;
                            }
                        });
                        break;
                    case "发送发票":
                        this.$refs["ruleForm"].validate((valid) => {
                            if (valid) {
                                url=this.url8
                                data={
                                    "dealer_id": this.dealer_id,
                                    "id": this.order_id,
                                    "email": this.ruleForm.email
                                }
                            } else {
                                return false;
                            }
                        });
                        break;
                    case "撤回编辑":
                        url=this.url9
                        data={
                            "dealer_id": this.dealer_id,
                            "id": this.order_id,
                            "status":"1101",
                        }
                        break;
                    case "保存":
                        url=this.url9
                        data={
                            "dealer_id": this.dealer_id,
                            "id": this.order_id,
                            "status":"1102",
                        }
                        break;
                    case "确认购买":
                        url=this.url9
                        data={
                            "dealer_id": this.dealer_id,
                            "id": this.order_id,
                            "status":"1103",
                        }
                        break;
                }
                if(url){
                    this.$axios.post(url, data).then((rs) => {
                        if(rs.data.code==200){
                            this.$message.success("请求成功")
                        }
                    })
                }

            },
            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            '$route': function (val, old) {
            },
        }
    }

</script>

<style scoped>
    .self_colon {
        text-align: right;
        color: #1287D0;
    }

    .self_colon1 {
        color: black;
        text-align: left;
    }

    .text_center {
        text-align: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }


    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

</style>
