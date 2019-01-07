<template>
    <div>
        <!--窗帘列表-->
        <template>
            <el-card class="box-card">


                <p style="margin-bottom: 10px;;height: 30px;line-height: 30px">
                    <img :src="require('../../../../static/img/logo.png')"
                         style="width: 30px;height:100%;vertical-align: top" alt="">
                    <span style="font-size: 20px;color: black;font-weight: 500;padding-left: 3px">{{$t('label_orderNumber')}} ：{{calcprice.order_number}}
                    </span>
                </p>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple"
                             style="padding-left: 30px;margin-bottom: 3px;height: 100%;line-height: 30px">
                            <p>
                                <span class="span_left">{{$t('label_orderPrice')}}：</span>
                                <span class="span_right">{{calcprice.original_price}}</span>
                            </p>
                            <p>
                                <span class="span_left">{{$t('label_orderDiscount')}} :</span>
                                <span class="span_right"> {{calcprice.discount}}</span>
                            </p>
                            <p>
                                <span class="span_left">{{$t('label_orderQuoted')}} ：</span>
                                <span class="span_right"> {{calcprice.order_price}}</span>
                            </p>

                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple"
                             style="padding-left: 30px;margin-bottom: 3px;height: 100%;line-height: 30px">
                            <div>
                                <span class="span_left">{{$t('label_taxGST')}}：</span>
                                <span class="span_right"> {{calcprice.tax_gst}}</span>
                            </div>
                            <div>
                                <span class="span_left">{{$t('label_taxTVQ')}}  ：</span>
                                <span class="span_right"> {{calcprice.tax_tvq}}</span>
                            </div>
                            <div>
                                <span class="span_left">{{$t('label_orderTotalPrice')}} ：</span>
                                <span class="span_right" style="color: #1890ff"> {{calcprice.total_price}}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>


            </el-card>

        </template>

        <div style="margin-top: 5px;">
        </div>
        <el-card class="box-card">
            <!--配送时间-->
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <span>{{$t('label_orderDeliveryTime')}} ：</span></div>
                </el-col>
                <el-col :span="6" :offset="6">
                    <div class="grid-content bg-purple">
                        <div class="block">
                            <el-date-picker
                                v-model="time"
                                type="datetime"
                                align="right"
                                :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div style="margin-top: 9px;">
            </div>
            <!--配送地址-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><span>{{$t('label_chooseDeliveryAddress')}}：</span></div>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="select_address(1)">{{$t('label_address_book')}}
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-form ref="default_form" :model="default_form" label-width="27%">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="$t('label_Tel')">
                                <el-input v-model="default_form.tel"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="is_show">
                        <el-col :span="12">
                            <el-form-item label="ID">
                                <el-input v-model="default_form.id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_LastName')">
                                <el-input v-model="default_form.last_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_FirstName')">
                                <el-input v-model="default_form.first_name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Postcode')">
                                <el-input v-model="default_form.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Country')">
                                <el-input v-model="default_form.country"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Province')">
                                <el-input v-model="default_form.province"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_City')">
                                <el-input v-model="default_form.city"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Street')">
                                <el-input v-model="default_form.street"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Bldg')">
                                <el-input v-model="default_form.bldg"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
            </div>
            <!--账单寄送地址-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><span>{{$t('label_chooseBillAddress')}}：</span></div>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="select_address(2)">{{$t('label_address_book')}}
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-form ref="default_form1" :model="default_form1" label-width="27%">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="$t('label_Tel')">
                                <el-input v-model="default_form1.tel"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="ID" v-if="is_show">
                                <el-input v-model="default_form1.id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">

                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_LastName')">
                                <el-input v-model="default_form1.last_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_FirstName')">
                                <el-input v-model="default_form1.first_name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Postcode')">
                                <el-input v-model="default_form1.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Country')">
                                <el-input v-model="default_form1.country"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Province')">
                                <el-input v-model="default_form1.province"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_City')">
                                <el-input v-model="default_form1.city"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Street')">
                                <el-input v-model="default_form1.street"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$t('label_Bldg')">
                                <el-input v-model="default_form1.bldg"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
            </div>
        </el-card>


        <el-card class="box-card">
            <el-row>
                <el-col :span="12" class='text_center'>
                    <el-button type="primary" @click="comite_order(2)">{{$t('btn_save')}}</el-button>
                    <el-button type="primary" plain @click='comite_order(1)'>{{$t('btn_commit')}}</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!--邮寄地址-->
        <el-dialog :title="$t('label_chooseDeliveryAddress')" :visible.sync="outerVisible" width="80%">
            <div>
                <el-button type="primary" icon="add" @click="add_address(1)">{{$t('label_add')}}</el-button>
            </div>
            <el-table :data="tableData_after" border style="width: 100%" :row-class-name="tableRowClassName"
                      @current-change="handleCurrentChange" highlight-current-row>
                <el-table-column prop="id" label="ID" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="dealer_id" label="dealerID" v-if="is_show" width="80">
                </el-table-column>
                <el-table-column prop="last_name" :label="this.$t('label_LastName')" width="85">
                </el-table-column>
                <el-table-column prop="first_name" :label="this.$t('label_FirstName')" width="85">
                </el-table-column>
                <el-table-column prop="tel" :label="$t('label_Tel')" width="90">
                </el-table-column>
                <el-table-column prop="is_default" :label="this.$t('label_default')" width="70" v-if="is_show">
                </el-table-column>
                <el-table-column prop="address" :label="this.$t('label_address')" width="350">
                </el-table-column>
                <el-table-column :label="this.$t('label_operation')" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row,1)">
                            {{$t('btn_edit')}}
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            {{$t('btn_delete')}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑地址-->
            <el-dialog
                width="60%"
                :visible.sync="innerVisible"
                append-to-body>

                <el-form ref="form" :model="form" label-width="25%">
                    <el-form-item label="ID" v-if="is_show">
                        <el-input v-model="form.id" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="dealerID" v-if="is_show" readonly>
                        <el-input v-model="form.dealer_id" readonly></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="6" :offset="18">
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
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="$t('label_Tel')">
                                <el-input v-model="form.tel"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit">{{$t('btn_ok')}}</el-button>
            </span>

            </el-dialog>
            <!--新增地址-->
            <el-dialog :visible.sync="addVisible" width="45%" append-to-body>
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

            <div slot="footer" class="dialog-footer">
                <el-button @click="queren_select_address">{{$t('btn_ok')}}</el-button>
            </div>
        </el-dialog>
        <!--报价单地址-->
        <el-dialog :title="$t('label_chooseBillAddress')" :visible.sync="outerVisible1" width="80%">
            <div>
                <el-button type="primary" icon="add" @click="add_address(2)">{{$t('label_add')}}</el-button>
            </div>
            <el-table :data="tableData_after" border style="width: 100%" :row-class-name="tableRowClassName"
                      @current-change="handleCurrentChange1" highlight-current-row>
                <el-table-column prop="id" label="ID" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="dealer_id" label="dealerid" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="last_name" :label="this.$t('label_LastName')" width="80">
                </el-table-column>
                <el-table-column prop="first_name" :label="this.$t('label_FirstName')" width="80">
                </el-table-column>
                <el-table-column prop="tel" :label="$t('label_Tel')" width="70">
                </el-table-column>
                <el-table-column prop="is_default" :label="this.$t('label_default')" width="70" v-if="is_show">
                </el-table-column>
                <el-table-column prop="address" :label="this.$t('label_address')" width="350">
                </el-table-column>
                <el-table-column :label="this.$t('label_operation')" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row,2)">
                            {{$t('btn_edit')}}
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            {{$t('btn_delete')}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--新增地址-->
            <el-dialog :title="$t('label_add')" :visible.sync="addVisible1" width="45%" append-to-body>
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
            <!--&lt;!&ndash;编辑地址&ndash;&gt;-->
            <el-dialog
                width="60%"
                :visible.sync="innerVisible1"
                append-to-body>
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
                <el-button @click="innerVisible1 = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit">{{$t('btn_ok')}}</el-button>
            </span>
            </el-dialog>


            <div slot="footer" class="dialog-footer">
                <el-button @click="queren_select_address">{{$t('btn_ok')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'order_details',
        data() {
            return {
                is_show: process.env.NODE_ENV === 'development',
                value3: false,
                value2: false,
                orderid: this.$route.query.orderid,
                unit: localStorage.getItem('unit'),
                dealer_id: localStorage.getItem('id'),
                time: "",
                tableData: [],
                innerVisible: false,
                innerVisible1: false,
                pickerOptions1: {
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
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
                outerVisible: false,
                outerVisible1: false,
                addVisible: false,
                addVisible1: false,
                juanlian: [],
                order_info: "",
                addform: {
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
                default_form: {},
                default_form1: {},
                INDEX: -1,
                calcprice: "",
                url: '/login_after/curtain/rollshade/get',//获取卷帘
                url1: '/login_after/order/get',// 获取单个订单
                url2: '/login_after/order/getprice',//获取订单报价
                url3: "/login_after/address/get",//获取地址
                url4: "/login_after/order/calculatePrice",//计算价格
                url5: "/login_after/address/new",//新建地址
                url6: "/login_after/address/modify",//编辑地址
                url7: "/login_after/address/delete",//删除地址
                url8: "/login_after/order/modify",//修改订单
            }
        },
        created() {
            this.getData()
        },
        components: {},
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
            handleChange(val) {
                // console.log(val);
            },
            handleCurrentChange(v) {
                if (v) {
                    this.default_form = v
                }

            },
            handleCurrentChange1(v) {
                if (v) {
                    this.default_form1 = v
                }

            },
            /*确认编辑*/
            saveEdit() {
                if (this.value2) {
                    this.form.is_default = 1
                } else {
                    this.form.is_default = 0
                }
                this.$axios.post(this.url6, this.form).then((res) => {
                    if (res.data.code == 200) {
                        this.getaddressall()
                        this.innerVisible = false;
                        this.innerVisible1 = false;
                    }
                })
            },
            saveAdd(v) {
                if (this.value3) {
                    this.addform.is_default = 1
                } else {
                    this.addform.is_default = 0
                }
                this.addform.dealer_id = this.dealer_id
                this.$axios.post(this.url5, this.addform).then((res) => {
                    if (res.data.code == 200) {
                        this.getaddressall()
                        this.addform = {
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
                        }
                        this.addVisible = false
                        this.addVisible1 = false
                    }
                })


            },
            /*标记特殊状态*/
            tableRowClassName({row, rowIndex}) {
                if (row.addressIsDefault === 1) {
                    return 'success-row';
                }
                return '';
            },
            select_address(v) {
                if (v == 1) {
                    this.outerVisible = true

                } else {
                    this.outerVisible1 = true
                }
                this.getaddressall()
            },
            queren_select_address() {
                this.outerVisible = false
                this.outerVisible1 = false
            },
            add_address(v) {
                if (v == 1) {
                    this.addVisible = true
                } else {
                    this.addVisible1 = true
                }
            },
            //编辑按钮
            handleEdit(index, row, v) {
                let item = this.tableData[index];
                // console.log(item)
                if (item.is_default == 1) {
                    this.value2 = true
                } else {
                    this.value2 = false
                }
                this.form = item
                if (v == 1) {
                    this.innerVisible = true;
                } else {
                    this.innerVisible1 = true;
                }

            },
            //删除按钮
            handleDelete(index, row) {
                this.INDEX = this.tableData[index].id;
                this.$axios.post(this.url7, {id: this.INDEX}).then((res) => {
                    if (res.data.code == 200) {
                        this.getaddressall()
                    }
                })
            },
            getData() {
                let _this = this
                let data = {
                    "order_id": this.orderid,
                    "unit": this.unit
                }
                let data1 = {
                    "dealer_id": this.dealer_id,
                    "is_default": "1"
                }
                let data2 = {
                    "dealer_id": this.dealer_id,
                }
                let data3 = {
                    id: this.orderid
                }

                function getaddress() {
                    return _this.$axios.post(
                        _this.url3, data1
                    );
                }

                function getaddressall() {
                    return _this.$axios.post(
                        _this.url3, data2
                    );
                }

                function calcprice() {
                    return _this.$axios.post(
                        _this.url4, data3
                    );
                }


                _this.$axios.all([getaddress(), calcprice(), getaddressall()])
                    .then(_this.$axios.spread(function (acct, perms, s) {
                        // 两个请求现在都执行完成
                        _this.default_form1 = acct.data.data[0]
                        _this.default_form = acct.data.data[0]
                        _this.calcprice = perms.data.data
                        _this.time = perms.data.data.delivery_time
                        _this.tableData = s.data.data
                    }));

            },
            getaddressall() {
                let data2 = {"dealer_id": this.dealer_id}
                this.$axios.post(
                    this.url3, data2
                ).then((rs) => {
                    this.tableData = rs.data.data
                })
            },
            comite_order(type) {
                this.calcprice.ship_address = this.default_form.id
                this.calcprice.bill_address = this.default_form1.id
                this.calcprice.delivery_time = this.time
                if (type == 1) {
                    this.calcprice.status = '1102'
                } else {
                    this.calcprice.status = '1101'
                }
                console.log(this.calcprice)
                this.$axios.post(
                    this.url8, this.calcprice
                ).then((rs) => {
                    if (rs.data.code == 200) {
                        this.$message.success('订单请求成功');
                        this.$router.push({
                            path: 'orderList_new',
                        })
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            '$route': function (val, old) {
                if (val.path === "/orderCurtainAdd") {
                    // window.confirm('确定离开？')
                    this.getData()
                }
            },
        }
    }

</script>

<style scoped>
    .span_left {
        color: rgba(0, 0, 0, .85);
        white-space: nowrap;
        line-height: 20px
    }

    .span_right {
        color: rgba(0, 0, 0, .65);
        white-space: nowrap;
        line-height: 20px
    }

    .text_center {
        text-align: center;
    }

</style>
