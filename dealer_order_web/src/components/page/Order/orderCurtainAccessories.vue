<template>
    <div>
        <!--窗帘列表-->
        <template>
            <el-card class="box-card">
                <p style="margin:5px 0">
                    {{$t('label_orderMore')}}：
                <p/>
                <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="20px"
                         class="demo-ruleForm">
                    <!--基本信息-->
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple ">
                                <el-form-item prop="curtain_material">
                                    <el-select
                                        v-model="ruleForm2.curtain_material"
                                        :placeholder="$t('label_curtainMaterial')"
                                        @change="curtain_material_des_data"
                                    >
                                        <el-option
                                            v-for="item in curtain_material"
                                            :key="item.material_code"
                                            :label="`${item.material_code}(${item.material_desc})`"
                                            :value="item.material_code"
                                            class="self_el_option"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="returns">
                                    <span>{{$t('label_side_baffle')}}：</span>
                                    <el-radio v-model="ruleForm2.returns" label="0">{{$t('btn_no')}}</el-radio>
                                    <el-radio v-model="ruleForm2.returns" label="1">{{$t('btn_yes')}}</el-radio>
                                </el-form-item>
                                <el-form-item prop="valence">
                                    <span>{{$t('label_top_baffle')}}：</span>
                                    <el-radio v-model="ruleForm2.valence" label="0">{{$t('btn_no')}}</el-radio>
                                    <el-radio v-model="ruleForm2.valence" label="1">{{$t('btn_yes')}}</el-radio>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="control_type">
                                    <el-select v-model="ruleForm2.chord_type" :placeholder="$t('label_chord_type')"
                                               style="width: 200px;">
                                        <el-option
                                            v-for="item in control_type"
                                            :key="item.labelcode"
                                            :label="item.value"
                                            :value="item.labelcode"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>

            </el-card>

            <div style="margin-top: 5px;">
            </div>

            <el-card class="box-card">
                <div class="handle-box">
                    <el-button type="primary" icon="search" @click="new_size">{{$t('label_curtain_areas')}}</el-button>
                </div>
                <el-table :data="new_size_data_area" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="id" label="ID" width="50" v-if="is_show">
                    </el-table-column>
                    <el-table-column prop="curtain_id" label="窗帘id" width="70" v-if="is_show">
                    </el-table-column>
                    <el-table-column :label="$t('label_serial_number')" width="50">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('label_curtainWidth')" width="100">
                        <template slot-scope="scope">
                            <template v-if="unit=='in'">
                            <span>
                              {{scope.row.width}}
                            </span>
                                <el-select v-model="scope.row.width_yu" disabled class="self_select">
                                    <el-option
                                        v-for="item in in_unit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <span>
                                    {{scope.row.width}}
                                </span>
                            </template>
                        </template>

                    </el-table-column>
                    <el-table-column :label="$t('label_curtainHeight')" width="100">
                        <template slot-scope="scope">
                            <template v-if="unit=='in'">
                            <span>
                              {{scope.row.height}}
                            </span>

                                <el-select v-model="scope.row.height_yu" disabled class="self_select">
                                    <el-option
                                        v-for="item in in_unit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <span>
                                    {{scope.row.height}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('label_lift_rope')" width="130">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.lift_rope" disabled
                                       placeholder="" class="self_select">
                                <el-option
                                    v-for="item in lift_rope"
                                    :key="item.labelcode"
                                    :label="item.value"
                                    :value="item.labelcode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('label_rolling_direction')" width="130">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.rolling_direction" disabled
                                       class="self_select"
                                       placeholder="">
                                <el-option
                                    v-for="item in rolling_direction"
                                    :key="item.labelcode"
                                    :label="item.value"
                                    :value="item.labelcode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="count" :label="$t('label_number')" width="70">
                    </el-table-column>
                    <el-table-column prop="description" :label="$t('label_desc')" width="120">
                    </el-table-column>
                    <el-table-column :label="$t('label_operation')" width="250">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit_size(scope.$index, scope.row)">
                                {{$t('btn_edit')}}
                            </el-button>
                            <el-button size="small" type="danger" @click="handleDelete('区域',scope.$index, scope.row)">
                                {{$t('btn_delete')}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

            <div style="margin-top: 5px;">
            </div>
            <!--&lt;!&ndash;新建侧盖板&ndash;&gt;-->
            <template v-if="ruleForm2.returns==='1'">
                <el-card class="box-card">
                    <div class="handle-box">
                        <el-button type="primary" icon="search" @click="new_returns">{{$t('label_side_baffle')}}
                        </el-button>
                    </div>

                    <el-table :data="returns_tableData" style="width: 100%" ref="multipleTable">
                        <el-table-column prop="id" label="ID" width="50" v-if="is_show">
                        </el-table-column>
                        <el-table-column :label="$t('label_serial_number')" width="70">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="curtain_number" :label="$t('label_curtain_number')" width="120">
                        </el-table-column>
                        <el-table-column :label="$t('label_side_baffle_material')" width="150">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.returns_material" disabled
                                           placeholder="" class="self_select">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode">
                                    </el-option>
                                </el-select>
                            </template>

                        </el-table-column>
                        <el-table-column :label="$t('label_side_baffle_length')" width="110">
                            <template slot-scope="scope">
                                <template v-if="unit=='in'">
                                 <span>
                                  {{scope.row.len}}
                                 </span>
                                    <el-select v-model="scope.row.len_yu" disabled class="self_select">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                <span>
                                    {{scope.row.len}}
                                </span>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="count" :label="$t('label_number')" width="100">
                        </el-table-column>
                        <el-table-column prop="description" :label="$t('label_desc')" width="120">
                        </el-table-column>
                        <el-table-column :label="$t('label_operation')" width="250">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit_returns(scope.$index, scope.row)">
                                    {{$t('btn_edit')}}
                                </el-button>
                                <el-button size="small" type="danger"
                                           @click="handleDelete('侧盖板',scope.$index, scope.row)">{{$t('btn_delete')}}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </template>
            <!--&lt;!&ndash;新建上挡板&ndash;&gt;-->
            <div style="margin-top: 5px;">
            </div>
            <template v-if="ruleForm2.valence==='1'">
                <el-card class="box-card">
                    <div class="handle-box">
                        <el-button type="primary" icon="search" @click="new_valence">{{$t('label_top_baffle')}}
                        </el-button>
                    </div>

                    <el-table :data="valence_tableData" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="id" label="ID" width="50" v-if="is_show">
                        </el-table-column>
                        <el-table-column prop="line" :label="$t('label_serial_number')" width="70">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="curtain_number" :label="$t('label_curtain_number')" width="120">
                        </el-table-column>
                        <el-table-column :label="$t('label_top_baffle_material')" width="140">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.valence_material" disabled
                                           class="self_select">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('label_top_baffle_length')" width="120">
                            <template slot-scope="scope">
                                <template v-if="unit=='in'">
                                      <span>
                                         {{scope.row.len}}
                                        </span>

                                    <el-select v-model="scope.row.len_yu" disabled class="self_select">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                <span>
                                    {{scope.row.len}}
                                </span>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="count" :label="$t('label_number')" width="100">
                        </el-table-column>
                        <el-table-column prop="description" :label="$t('label_desc')" width="120">
                        </el-table-column>
                        <el-table-column :label="$t('orderProduction.Caozuo')" width="250">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit_valence(scope.$index, scope.row)">
                                    {{$t("btn_edit")}}
                                </el-button>
                                <el-button size="small" type="danger"
                                           @click="handleDelete('上挡板',scope.$index, scope.row)">{{$t('btn_delete')}}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </template>
        </template>

        <div style="margin-top: 5px;">
        </div>

        <el-card class="box-card">
            <el-row>
                <el-col :span="12" class='text_center'>
                    <el-button type="primary" plain @click='goBack'>{{$t('btn_previous')}}</el-button>
                    <el-button type="primary" @click="continues_add">{{$t('btn_ok')}}</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!--&lt;!&ndash; 新增区域信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('label_add')} ${$t('label_curtain_areas')}`"
                   :visible.sync="new_size_dialog" width='60%' lock-scroll
        >
            <el-form :model="new_size_data" ref="new_size_data" label-width="150px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item :label="$t('label_curtainWidth')" prop="name">
                                <template v-if="unit=='in'">
                                    <el-input v-model="new_size_data.width" @keyup.native="number" style="width: 120px">
                                    </el-input>
                                    <el-select v-model="new_size_data.width_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model.number="new_size_data.width">
                                    </el-input>
                                </template>
                            </el-form-item>
                            <el-form-item :label="$t('label_curtainHeight')" prop="name">

                                <template v-if="unit=='in'">
                                    <el-input v-model="new_size_data.height" @keyup.native="number" style="width: 120px">
                                    </el-input>
                                    <el-select v-model="new_size_data.height_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="new_size_data.height">
                                    </el-input>
                                </template>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="new_size_data.count" @change="handleChange" :min="1"
                                                 :max="10">
                                </el-input-number>
                            </el-form-item>
                            <el-form-item :label="$t('label_lift_rope')" prop="name">

                                <el-select v-model="new_size_data.lift_rope" placeholder=""
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in lift_rope"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('label_rolling_direction')" prop="name">

                                <el-select v-model="new_size_data.rolling_direction" placeholder=""
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in rolling_direction"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="new_size_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="new_size_dialog = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="new_size_confirm">{{$t('btn_ok')}}</el-button>
            </span>
        </el-dialog>
        <!--&lt;!&ndash; 编辑区域信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('btn_edit')} ${$t('label_curtain_areas')}`"
                   :visible.sync="editor_size_dialog" width='60%' lock-scroll
        >
            <el-form :model="editor_size_data" ref="editor_size_data" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="窗帘id" prop="name" v-if="is_show">
                                <el-input v-model="editor_size_data.id">

                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('label_curtainWidth')">
                                <template v-if="unit=='in'">
                                    <el-input v-model="editor_size_data.width" style="width: 150px">
                                    </el-input>
                                    <el-select v-model="editor_size_data.width_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="editor_size_data.width">
                                    </el-input>
                                </template>


                            </el-form-item>
                            <el-form-item :label="$t('label_curtainHeight')" prop="name">
                                <template v-if="unit=='in'">
                                    <el-input v-model="editor_size_data.height" style="width: 150px">
                                    </el-input>
                                    <el-select v-model="editor_size_data.height_yu" style="width:70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="editor_size_data.height">
                                    </el-input>
                                </template>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="editor_size_data.count" @change="handleChange" :min="1"
                                                 :max="10"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item :label="$t('label_lift_rope')" prop="name">

                                <el-select v-model="editor_size_data.lift_rope"
                                           placeholder="">
                                    <el-option
                                        v-for="item in lift_rope"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item :label="$t('label_rolling_direction')" prop="name">
                                <el-select v-model="editor_size_data.rolling_direction"
                                           placeholder="">
                                    <el-option
                                        v-for="item in rolling_direction"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="editor_size_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editor_size_dialog = false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="editor_size_confirm">{{$t('btn_ok')}}</el-button>
            </span>
        </el-dialog>
        <!--&lt;!&ndash; 新增侧盖板信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('label_add')} ${$t('label_side_baffle')}`"
                   :visible.sync="new_returns_dialog" width='60%' lock-scroll>
            <el-form :model="new_returns_data" ref="new_returns_data" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item :label="$t('label_side_baffle_length')" prop="name">

                                <template v-if="unit=='in'">
                                    <el-input v-model="new_returns_data.len" @keyup.native="number" style="width:150px">
                                    </el-input>
                                    <el-select v-model="new_returns_data.len_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="new_returns_data.len">
                                    </el-input>
                                </template>

                            </el-form-item>
                            <el-form-item prop="returns_material">
                                <el-select v-model="new_returns_data.returns_material"
                                           :placeholder="$t('label_side_baffle_material')"
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="new_returns_data.count" @change="handleChange" :min="1"
                                                 :max="10"
                                ></el-input-number>
                            </el-form-item>

                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="new_returns_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="new_returns_dialog = false">{{$t('btn_cancel')}}</el-button>
        <el-button type="primary" @click="new_returns_confirm">{{$t('btn_ok')}}</el-button>
        </span>
        </el-dialog>
        <!--&lt;!&ndash; 编辑侧盖板信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('btn_edit')} ${$t('label_side_baffle')}`"
                   :visible.sync="editor_returns_dialog" width='60%' lock-scroll
        >
            <el-form :model="editor_returns_data" ref="editor_returns_data" label-width="150px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="窗帘id" prop="name" v-if="is_show">
                                <el-input v-model="editor_returns_data.id"></el-input>
                            </el-form-item>
                            <el-form-item label="窗帘号" prop="name" v-if="is_show">
                                <el-input v-model="editor_returns_data.curtain_number"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('label_top_baffle_length')" prop="name">
                                <template v-if="unit=='in'">
                                    <el-input v-model="editor_returns_data.len" style="width: 150px">
                                    </el-input>
                                    <el-select v-model="editor_returns_data.len_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="editor_returns_data.len">
                                    </el-input>
                                </template>

                            </el-form-item>
                            <el-form-item prop="returns_material">
                                <el-select v-model="editor_returns_data.returns_material"
                                           :placeholder="$t('label_side_baffle_material')"
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="editor_returns_data.count" @change="handleChange" :min="1"
                                                 :max="10"
                                ></el-input-number>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="editor_returns_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editor_returns_dialog = false">{{$t('btn_cancel')}}</el-button>
        <el-button type="primary" @click="editor_returns_confirm">{{$t('btn_ok')}}</el-button>
        </span>
        </el-dialog>
        <!--&lt;!&ndash; 新增上挡板信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('label_add')} ${$t('label_top_baffle')}`"
                   :visible.sync="new_valence_dialog" width='60%' lock-scroll
        >
            <el-form :model="new_valence_data" ref="new_valence_data" label-width="120px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item :label="$t('label_top_baffle_length')" prop="name">

                                <template v-if="unit=='in'">
                                    <el-input v-model="new_valence_data.len" @keyup.native="number" style="width: 150px">
                                    </el-input>
                                    <el-select v-model="new_valence_data.len_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="new_valence_data.len" >
                                    </el-input>
                                </template>
                            </el-form-item>
                            <el-form-item prop="returns_material">
                                <el-select v-model="new_valence_data.valence_material"
                                           :placeholder="$t('label_top_baffle_material')"
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="new_valence_data.count" @change="handleChange" :min="1"
                                                 :max="10"
                                ></el-input-number>
                            </el-form-item>

                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="new_valence_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="new_valence_dialog = false">{{$t('btn_cancel')}}</el-button>
        <el-button type="primary" @click="new_valence_confirm">{{$t('btn_ok')}}</el-button>
        </span>
        </el-dialog>
        <!--&lt;!&ndash; 编辑上档板信息 &ndash;&gt;-->
        <el-dialog :title="`${$t('btn_edit')} ${$t('label_side_baffle')}`"
                   :visible.sync="editor_valence_dialog" width='60%' lock-scroll
        >
            <el-form :model="editor_valence_data" ref="editor_valence_data" label-width="120px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="窗帘id" prop="name" v-if="is_show">
                                <el-input v-model="editor_valence_data.id"></el-input>
                            </el-form-item>
                            <el-form-item label="窗帘号" prop="name" v-if="is_show">
                                <el-input v-model="editor_valence_data.curtain_number"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('label_top_baffle_length')" prop="name">
                                <template v-if="unit=='in'">
                                    <el-input v-model="editor_valence_data.len" style="width:150px">
                                    </el-input>
                                    <el-select v-model="editor_valence_data.len_yu" style="width: 70px">
                                        <el-option
                                            v-for="item in in_unit"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                    <el-input v-model="editor_valence_data.len">
                                    </el-input>
                                </template>
                            </el-form-item>
                            <el-form-item prop="returns_material">
                                <el-select v-model="editor_valence_data.valence_material"
                                           :placeholder="$t('label_top_baffle_material')"
                                           style="width: 200px;">
                                    <el-option
                                        v-for="item in material"
                                        :key="item.labelcode"
                                        :label="item.value"
                                        :value="item.labelcode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('label_number')" prop="name">
                                <el-input-number v-model="editor_valence_data.count" @change="handleChange" :min="1"
                                                 :max="10"
                                ></el-input-number>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('label_desc')" prop="name">
                    <el-input v-model="editor_valence_data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editor_valence_dialog = false">{{$t('btn_cancel')}}</el-button>
        <el-button type="primary" @click="editor_valence_confirm">{{$t('btn_ok')}}</el-button>
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
        name: 'order_details',
        data() {

            return {
                is_show: process.env.NODE_ENV === 'development',
                curtain_id: this.$route.query.curtain_id,
                curtain_number: this.$route.query.curtain_number,
                orderid: this.$route.query.orderid,
                unit: localStorage.getItem('unit'),
                curtain_material: "",
                m: new Map(),
                material: JSON.parse(localStorage.getItem('code'))['112'],
                control_type: JSON.parse(localStorage.getItem('code'))['108'],
                lift_rope: JSON.parse(localStorage.getItem('code'))['102'],
                rolling_direction: JSON.parse(localStorage.getItem('code'))['109'],
                is_save: false,
                new_size_dialog: false,//是否显示新建尺寸dialog
                editor_size_dialog: false,//是否显示编辑尺寸dialog
                new_returns_dialog: false,//是否显示新建尺寸dialog
                editor_returns_dialog: false,//是否显示编辑尺寸dialog
                new_valence_dialog: false,//是否显示新建尺寸dial og
                editor_valence_dialog: false,//是否显示编辑尺寸dialog
                in_unit: [{value: 0, label: '0"'}, {value: 0.125, label: '1/8"'}, {value: 0.25,label: '1/4"'}, {value: 0.375, label: '3/8"'}, {value: 0.5, label: '1/2"'}, {value: 0.625, label: '5/8"'
                }, {value: 0.75, label: '3/4"'}, {value: 0.875, label: '7/8"'}],
                delVisible: false,//是否显示删除提示
                is_select: false,
                returns_tableData: [],
                valence_tableData: [],
                new_size_data_area: [],
                ruleForm2: {
                    "curtain_number": "",
                    "curtain_material": "",
                    "curtain_material_desc": "",
                    "curtain_desc": "",
                    "curtain_count": "",
                    "chord_type": "",
                    "valence": "0",
                    "returns": "0"
                },
                new_size_data: {
                    "width": "",
                    "height": "",
                    "count": "",
                    "width_yu": 0,
                    "height_yu": 0,
                    "lift_rope": "",
                    "rolling_direction": "",
                    "description": ""
                },
                new_returns_data: {
                    "line": "",
                    "returns_material": "",
                    "len": "",
                    "len_yu":0,
                    "count": "",
                    "description": ""
                },
                new_valence_data: {
                    "line": "",
                    "valence_material": "",
                    "len": "",
                    "len_yu":0,
                    "count": "",
                    "description": ""
                },
                editor_size_data: {},
                editor_returns_data: {},
                editor_valence_data: {},
                row: "",
                deleteurl: "",
                url: '/login_after/material/get',//查询材料
                url1: '/login_after/curtain/rollshade/get',//查所有卷帘
                url3: '/login_after/curtain/valence/get',//获取上挡板
                url4: '/login_after/curtain/returns/get',//获取侧盖板
                url5: '/login_after/curtain/rollshade/area/get',//获取区域、
                url6: '/login_after/curtain/rollshade/area/new',//新建卷帘区域
                url7: '/login_after/curtain/rollshade/area/modify',//修改卷帘区域
                url8: '/login_after/curtain/returns/new',//新建侧盖板
                url9: '/login_after/curtain/returns/modify',//修改侧盖板
                url10: '/login_after/curtain/rollshade/area/delete',//删除卷帘区域
                url11: '/login_after/curtain/returns/delete',//删除侧盖板
                url12: '/login_after/curtain/valence/delete',//删除上挡板
                url13: "/login_after/curtain/valence/new",//新建上挡板
                url14: "/login_after/curtain/valence/modify",//修改上挡板
                url15: "/login_after/curtain/rollshade/modify",//修改卷帘
            }
        },
        created() {
            this.getData()
            this.getDatamaterial()
        },
        components: {},
        computed: {
            returns_tableData_after() {
                return this.returns_tableData.map((i) => {
                    if (this.unit == 'in') {
                        i.len_yu = this.jinsi(i.len - Math.floor(i.len / 1))
                        i.len = Math.floor(i.len / 1)
                    }
                    return i
                })
            },
            valence_tableData_after() {
                return this.valence_tableData.map((i) => {
                    if (this.unit == 'in') {
                        i.len_yu = this.jinsi(i.len - Math.floor(i.len / 1))
                        i.len = Math.floor(i.len / 1)
                    }
                    return i
                })
            }
        },

        beforeRouteLeave(to, from, next) {
            if (this.is_save) {
                next()
            } else {
                this.$confirm(this.$t('label_not_saved'), this.$t('label_prompt'), {
                    confirmButtonText: this.$t('btn_ok'),
                    cancelButtonText: this.$t('btn_cancel'),
                    type: 'warning'
                }).then(() => {
                    next()
                }).catch(() => {
                    next(false)
                })
            }

        },
        methods: {
            handleChange(val) {
                // console.log(val);
            },
            number() {
                if (this.unit == 'in') {
                    this.new_size_data.width = this.new_size_data.width.replace(/[^\.\d]/g, '');
                    this.new_size_data.width = this.new_size_data.width.replace('.', '');
                    this.new_size_data.height = this.new_size_data.height.replace(/[^\.\d]/g, '');
                    this.new_size_data.height = this.new_size_data.height.replace('.', '');
                    this.new_returns_data.len = this.new_returns_data.len.replace(/[^\.\d]/g, '');
                    this.new_returns_data.len = this.new_returns_data.len.replace('.', '');
                    this.new_valence_data.len = this.new_valence_data.len.replace(/[^\.\d]/g, '');
                    this.new_valence_data.len = this.new_valence_data.len.replace('.', '');
                }
            },
            jinsi(a) {
                let b;
                if (a == 0) {
                    b = 0;
                } else if (a > 0 && a <= 0.125) {
                    b = 0.125
                } else if (a > 0.125 && a <= 0.25) {
                    b = 0.25
                } else if (a > 0.25 && a <= 0.375) {
                    b = 0.375
                } else if (a > 0.375 && a <= 0.5) {
                    b = 0.5
                } else if (a > 0.5 && a <= 0.625) {
                    b = 0.625
                } else if (a > 0.625 && a < 0.75) {
                    b = 0.75
                } else {
                    b = 0.875
                }
                return b
            },
            handleAvatarSuccess() {
            },

            /*提交编辑*/
            continues_add() {
                console.log(this.ruleForm2)
                this.$axios.post(this.url15, this.ruleForm2).then(async (rs) => {
                    if (rs.data.code) {
                        this.is_save = true
                        this.$message.success('修改卷帘好了')
                        this.$router.go(-1);
                    }
                })
            },
            /*获取材料*/
            getDatamaterial() {
                let _this = this
                let data = {
                    "curtain_type": "1163",
                    "language": "zh"
                }

                this.$axios.post(this.url, data).then(async (rs) => {
                    await  rs.data.data.forEach(function (e) {
                        _this.m.set(e.material_code, e)
                    })

                    await  (function () {
                        _this.curtain_material = rs.data.data
                    })()

                    return

                })
            },
            /*为材料说明赋值*/
            curtain_material_des_data() {
                this.ruleForm2.curtain_material_desc = this.m.get(this.ruleForm2.curtain_material).material_desc
            },
            /*新建尺寸*/
            new_size() {
                this.new_size_dialog = true
            },
            /*确认新建尺寸*/
            new_size_confirm() {
                let _this = this
                if (this.unit == 'in') {
                    this.new_size_data.width = this.new_size_data.width / 1 + this.new_size_data.width_yu,
                        this.new_size_data.height = this.new_size_data.height / 1 + this.new_size_data.height_yu
                }
                let data = {
                    "order_id": this.orderid,
                    "curtain_id": this.curtain_id,
                }

                Object.assign(data, this.new_size_data)
                this.$axios.post(this.url6, data).then(async (rs) => {
                    if (rs.data.code === 200) {
                        _this.$message.success('新建尺寸成功')
                        _this.new_size_data = {
                            "width": "",
                            "height": "",
                            "width_yu": 0,
                            "height_yu": 0,
                            "count": "",
                            "lift_rope": "",
                            "rolling_direction": "",
                            "description": ""
                        }
                        _this.getData_pei()

                    }
                })
                this.new_size_dialog = false
            },
            /*新建侧盖板*/
            new_returns() {
                this.new_returns_dialog = true
            },
            /*确认侧盖板*/
            new_returns_confirm() {
                let _this = this
                if (this.unit == "in") {
                    this.new_returns_data.len = this.new_returns_data.len / 1 + this.new_returns_data.len_yu
                }
                let data = {
                    "order_id": this.orderid,
                    "curtain_id": this.curtain_id,
                    "curtain_number": this.curtain_number,
                }
                Object.assign(data, this.new_returns_data)
                this.$axios.post(this.url8, data).then(async (rs) => {
                    if (rs.data.code === 200) {
                        _this.$message.success('新建侧盖板成功')
                        _this.new_returns_data = {
                            "line": "",
                            "returns_material": "",
                            "len": "",
                            "len_yu":0,
                            "count": "",
                            "description": ""
                        },
                        _this.getData_pei()

                    }
                })
                this.new_returns_dialog = false
            },
            /*新建上档板*/
            new_valence() {
                this.new_valence_dialog = true
            },
            /*确认上挡板*/
            new_valence_confirm() {
                let _this = this
                if (this.unit == "in") {
                    this.new_valence_data.len = this.new_valence_data.len / 1 + this.new_valence_data.len_yu
                }
                let data = {
                    "order_id": this.orderid,
                    "curtain_id": this.curtain_id,
                    "curtain_number": this.curtain_number,
                }
                Object.assign(data, this.new_valence_data)
                this.$axios.post(this.url13, data).then(async (rs) => {
                    if (rs.data.code === 200) {
                        _this.$message.success('新上挡板成功')
                        _this.new_valence_data = {
                            "line": "",
                            "returns_material": "",
                            "len": "",
                            "len_yu":0,
                            "count": "",
                            "description": ""
                        },
                        _this.getData_pei()

                    }
                })
                this.new_valence_dialog = false
            },

            //编辑尺寸
            handleEdit_size(index, row, type) {
                const item = row;
                this.editor_size_data = row
                this.editor_size_dialog = true;
            },
            //编辑侧盖板
            handleEdit_returns(index, row, type) {
                this.editor_returns_data = row
                this.editor_returns_dialog = true;
            },
            //编辑上挡板
            handleEdit_valence(index, row, type) {
                this.editor_valence_data = row
                this.editor_valence_dialog = true;
            },
            // 保存编辑尺寸
            editor_size_confirm() {
                if(this.unit=='in'){
                    this.editor_size_data.width=this.editor_size_data.width/1+this.editor_size_data.width_yu
                    this.editor_size_data.height=this.editor_size_data.height/1+this.editor_size_data.height_yu
                }
                this.$axios.post(this.url7, this.editor_size_data).then((res) => {
                    if (res.data.code == 200) {
                        this.editor_size_dialog = false;
                        this.getData_pei()
                    }
                })

            },
            // 保存上挡板编辑
            editor_valence_confirm() {
                if(this.unit=='in'){
                    this.editor_valence_data.len=this.editor_valence_data.len/1+this.editor_valence_data.len_yu
                }
                this.$axios.post(this.url14, this.editor_valence_data).then((res) => {
                    if (res.data.code == 200) {
                        this.editor_valence_dialog = false;
                        this.getData_pei()
                    }
                })
            },
            // 保存侧盖板编辑
            editor_returns_confirm() {
                if(this.unit=='in'){
                    this.editor_returns_data.len=this.editor_returns_data.len/1+this.editor_returns_data.len_yu
                }
                this.$axios.post(this.url9, this.editor_returns_data).then((res) => {
                    if (res.data.code == 200) {
                        this.editor_returns_dialog = false;
                        this.getData_pei()
                    }
                })
            },
            //删除按钮
            handleDelete(type, index, row) {
                if (type === '区域') {
                    this.deleteurl = this.url10
                } else if (type === '侧盖板') {
                    this.deleteurl = this.url11
                } else if (type === '上挡板') {
                    this.deleteurl = this.url12
                } else {

                }
                this.row = {id: row.id}
                this.delVisible = true;
            },
            // 确定删除
            deleteRow() {
                this.$axios.post(this.deleteurl, this.row).then((res) => {
                    if (res.data.code == 200) {
                        this.delVisible = false;
                        this.getData_pei()
                    }
                })

            },
            getData() {
                let _this = this
                let data = {
                    "curtain_id": this.curtain_id,
                    "curtain_number": this.curtain_number
                }
                let data1 = {
                    "order_id": this.orderid,
                    "unit": this.unit
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

                function getarea() {
                    return _this.$axios.post(
                        _this.url5, data
                    );
                }

                _this.$axios.post(_this.url1, data1).then((rs) => {
                    rs.data.data.forEach((s) => {
                        if (s.id == this.curtain_id) {
                            _this.ruleForm2 = s
                        }
                    })
                })
                _this.$axios.all([getvalence(), getreturns(), getarea()])
                    .then(_this.$axios.spread(function (acct, perms, ssss) {
                        // 两个请求现在都执行完成
                        _this.valence_tableData = acct.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.len_yu = _this.jinsi(i.len - Math.floor(i.len / 1))
                                i.len = Math.floor(i.len / 1)
                            }
                            return i
                        })
                        _this.returns_tableData = perms.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.len_yu = _this.jinsi(i.len - Math.floor(i.len / 1))
                                i.len = Math.floor(i.len / 1)
                            }
                            return i
                        })
                        _this.new_size_data_area = ssss.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.width_yu = _this.jinsi(i.width - Math.floor(i.width / 1))
                                i.height_yu = _this.jinsi(i.height - Math.floor(i.height / 1))
                                i.width = Math.floor(i.width / 1)
                                i.height = Math.floor(i.height / 1)
                            }
                            return i
                        })
                    }));
            },
            getData_pei() {
                let _this = this
                let data = {
                    "curtain_id": this.curtain_id,
                    "curtain_number": this.curtain_number
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

                function getarea() {
                    return _this.$axios.post(
                        _this.url5, data
                    );
                }

                _this.$axios.all([getvalence(), getreturns(), getarea()])
                    .then(_this.$axios.spread(function (acct, perms, ssss) {
                        // 两个请求现在都执行完成
                        _this.valence_tableData = acct.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.len_yu = _this.jinsi(i.len - Math.floor(i.len / 1))
                                i.len = Math.floor(i.len / 1)
                            }
                            return i
                        })
                        _this.returns_tableData = perms.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.len_yu = _this.jinsi(i.len - Math.floor(i.len / 1))
                                i.len = Math.floor(i.len / 1)
                            }
                            return i
                        })
                        _this.new_size_data_area = ssss.data.data.map((i) => {
                            if (_this.unit == 'in') {
                                i.width_yu = _this.jinsi(i.width - Math.floor(i.width / 1))
                                i.height_yu = _this.jinsi(i.height - Math.floor(i.height / 1))
                                i.width =''+ Math.floor(i.width / 1)
                                i.height =''+ Math.floor(i.height / 1)
                            }
                            return i
                        })
                    }));
            },
            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            '$route': function (val, old) {
                if (val.path == "/orderCurtainAccessories") {

                }
            },
        }
    }

</script>

<style scoped>
    .button {
        padding: 0;
        float: right;
    }

    .bottom {
        margin-top: 4px;
        line-height: 12px;
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
