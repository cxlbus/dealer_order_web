<template>
    <div>
        <!--窗帘列表-->
        <el-row :gutter="20">
            <template v-for="item in curtain_type_after">
                <el-col :span="24/curtain_type_after.length" :xs="24">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card" shadow="hover">
                            <img :src="item.img_src" class="image">
                            <div style="padding: 14px;">
                                <h3>{{item.value}}</h3>
                                <p>
                                    {{$t('label_introduce')}}：
                                    <span style="font-size: 15px;color:#606266">
                                      {{item.des}}
                                    </span>
                                </p>
                                <div class="" style="color: blue;font-size: 15px;float: right">
                                    <template v-if="item.value=='卷帘'||item.value=='rollshade'">
                                        <el-tooltip effect="dark" :content="$t('label_orderEdit')"
                                                    placement="right-start">
                                            <i class="el-icon-edit"
                                               @click="select_curtain_new(item.value,item.labelcode)"
                                            >
                                            </i>
                                        </el-tooltip>
                                    </template>
                                    <template v-else>
                                        <i class="iconfont icon-icon-test-copy"
                                           style="font-weight: 600;font-size: 16px;color:#606266">
                                        </i>
                                        <span style="font-size: 15px;color:#606266">{{$t('label_function_to_be_opened')}}...</span>
                                    </template>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </template>
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
                            <el-button style="float: right; padding: 3px 2px" type="text"
                                       @click="select_curtain(o.order_id,o.id,o.curtain_number,activeName)">
                                {{$t('label_operation')}}
                            </el-button>
                            <el-button style="float: right; padding: 3px 2px" type="text"
                                       @click="dele_curtain(o.order_id,o.id,o.curtain_number,activeName)">
                                {{$t('btn_delete')}}
                            </el-button>
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
            <el-row>
                <el-col :span="12" :offset="4" class='text_center'>
                    <el-button type="primary" icon="el-icon-arrow-left" plain @click='goBack'> {{$t('btn_previous')}}
                    </el-button>
                    <el-button type="primary" icon="el-icon-arrow-right" @click="continues_add">{{$t('btn_next')}}
                    </el-button>
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
        inject: ['reload'],
        data() {
            return {
                is_show: process.env.NODE_ENV === 'development',
                juanlian: [],
                in_unit: [{value: 0, label: '0"'}, {value: 0.125, label: '1/8"'}, {
                    value: 0.25,
                    label: '1/4"'
                }, {value: 0.375, label: '3/8"'}, {value: 0.5, label: '1/2"'}, {
                    value: 0.625, label: '5/8"'
                }, {value: 0.75, label: '3/4"'}, {value: 0.875, label: '7/8"'}],
                order_id: this.$route.query.orderid,
                unit: localStorage.getItem('unit'),
                curtain_type: JSON.parse(localStorage.getItem('code'))['116'],
                material: JSON.parse(localStorage.getItem('code'))['112'],
                control_type: JSON.parse(localStorage.getItem('code'))['108'],
                lift_rope: JSON.parse(localStorage.getItem('code'))['102'],
                rolling_direction: JSON.parse(localStorage.getItem('code'))['109'],
                activeName: '1',
                delVisible: false,//是否显示删除提示
                url1: '/login_after/curtain/rollshade/new',//新建卷帘
                url2: '/login_after/curtain/rollshade/get',//获取卷帘
                url3: '/login_after/curtain/valence/get',//获取上挡板
                url4: '/login_after/curtain/returns/get',//获取侧盖板
                url5: '/login_after/curtain/rollshade/delete',//删除卷帘
            }
        },
        created() {
            this.getData()
        },
        components: {
            Scroll
        },
        computed: {
            /*过滤卷帘布帘横帘片帘*/
            curtain_type_after() {
                let arr = []
                for (let i = 0; i < this.curtain_type.length; i++) {
                    let a = this.curtain_type[i].labelcode
                    let b = {}
                    if (a == 1161 || a == 1162 || a == 1163 || a == 1164) {
                        b.des = "asdfasd ad asdfasdfasfas dfasdf asfda asf sadfsadf sadfa as fa"
                        b.value = this.curtain_type[i].value
                        b.labelcode = this.curtain_type[i].labelcode
                        b.img_src = require('../../../../static/img/' + this.curtain_type[i].labelcode + '.jpg')
                        arr.push(b)
                    }
                }
                return arr
            },
        },
        methods: {
            /*提交订单*/
            continues_add() {
                this.reload()
                this.$router.push({
                    name: 'orderCurtainAdd',
                    query: {orderid: this.order_id, type: '提交订单页面'},
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
            select_curtain(orderid, id, curtain_number, type) {
                this.reload()
                this.$router.push({
                    name: 'orderCurtainAccessories',
                    query: {
                        orderid: orderid,
                        curtain_id: id,
                        curtain_number: curtain_number,
                        type: type,
                        methods: "modify"
                    },
                })
            },

            dele_curtain(orderid, id, curtain_number, type) {
                let _this = this
                let data = {
                    "id": id,
                }
                _this.$axios.post(this.url5, data).then((rs) => {
                    if (rs.data.code == 200) {
                        this.$message.success(this.$t('table.Delete_successfully'));
                        this.getData()
                    }
                })
            },
            select_curtain_new(title, type) {
                let _this = this
                let data = {
                    "order_id": this.order_id,
                }
                _this.$axios.post(this.url1, data).then((rs) => {
                    this.reload()
                    this.$router.push({
                        name: 'orderCurtainAccessories',
                        query: {
                            curtain_id: rs.data.id,
                            curtain_number: rs.data.curtain_number,
                            type: type,
                            tag: title,
                            methods: "new"
                        },
                    })
                })


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
                    da.forEach(async (s, i) => {
                        let data = {
                            "curtain_id": s.id,
                            "curtain_number": s.curtain_number
                        }
                        console.log(data)

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
                        await _this.$set(_this.juanlian, i, s)
                    })

                })
            },

            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            '$route': function (val, old) {
                if (val.path === "/orderCurtain") {
                    this.order_id = val.query.orderid
                    this.getData()
                }
            },
        }
    }

</script>

<style scoped>
    .self_label {
        font-size: 14px;
        color: rgba(0, 0, 0, .85);
        line-height: 20px;
        white-space: nowrap;
    }

    .self_data {
        font-size: 12px;
        color: rgba(0, 0, 0, .65);
        line-height: 20px;
    }

    .image {
        width: 100%;
        display: block;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .text_center {
        text-align: center;
    }

</style>
