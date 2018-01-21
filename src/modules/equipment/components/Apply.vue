<template>
      <el-dialog 
        :title="title"
        width="640px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showApplyEquipmentState"
        >
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            :class="{'detail-from': applyItem && !isModified}"
            :rules="(applyItem && isModified) || !applyItem ? applyRules : {}"
            label-position="right">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="校区" prop="schoolId">
                        <template v-if="applyItem && !isModified">
                            {{applyItem.schoolName}}
                        </template>
                        <campus-filter
                            v-else
                            placeholder="请选择校区"
                            v-model="form.schoolId"
                            :name="form.schoolName"
                            width="100%"
                            >
                        </campus-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教室个数" prop="applyCount">
                        <template v-if="applyItem && !isModified">
                            {{applyItem.applyCount}}
                        </template>
                        <el-input
                        type="number"
                        v-model.trim="form.applyCount"
                        v-else 
                        :maxlength="5" placeholder="请输入申请个数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="申报人" prop="applyUserId">
                        <template v-if="applyItem && !isModified">
                            {{applyItem.applyUserName}}
                        </template>
                        <user-filter
                            v-else
                            placeholder="请选择申报人"
                            v-model="form.applyUserId"
                            :name="form.applyUserName"
                            width="100%"
                            >
                        </user-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址" prop="address">
                        <template v-if="applyItem && !isModified">
                            {{applyItem.address}}
                        </template>
                        <el-autocomplete
                            v-else
                            class="inline-input"
                            v-model.trim="form.address"
                            :fetch-suggestions="getAddress"
                            placeholder="例如：湖北省武汉市珞喻路419号清和广场5楼"
                            style="width: 100%;"
                            :maxlength="100"
                            :trigger-on-focus="false"
                            @select="selectAddress">
                            <template slot-scope="props">
                                <div class="name">{{ props.item.city }}{{props.item.district}}{{ props.item.name }}</div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                         <template v-if="applyItem && !isModified">
                            <pre>{{applyItem.remark}}</pre>
                        </template>
                        <el-input
                            v-else
                            v-model.trim="form.remark"
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <div slot="footer" v-if="!applyItem || (applyItem && isModified)">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import { getAddressSuggestion, reApply, apply} from '../request';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import UserFilter from 'src/common/components/UserFilter.vue';
    import config from '../config';

    export default {
        data () {
            return {
                loading: false,
                form: {
                    schoolId: '',
                    applyCount: '',
                    schoolName: '',
                    applyUserName: '',
                    applyUserId: '',
                    address: '',
                    remark: ''
                },
                applyRules: config.applyRules
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.equipment.applyItem;
            },
            isModified () {
                return this.$store.state.equipment.isModified;
            },
            title () {
                if (this.isModified) {
                    return '编辑报装申请';
                } else {
                    if (this.applyItem) {
                        return '申报详情';
                    } else {
                        return '报装申请';
                    }
                }
            }
        },
        mounted () {
            var applyItem = this.applyItem;
            if (applyItem) {
                Object.assign(this.form, applyItem);
            }
        },
        methods: {
            /**
             * 选择地址
             */
            selectAddress (item) {
                setTimeout(()=> {
                    this.form.address = item.city + item.city + item.name;
                });
            },
            /**
             * 获取地址
             */
            getAddress (query, cb) {
                getAddressSuggestion({
                    query
                })
                .then((res)=> {
                    cb(res.result);
                });
            },
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_APPLY_EQUIPMENT');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var applyItem = this.applyItem;
                        var isEdit = this.isModified ? true : false;
                        var form = this.form;
                        var params = {
                           schoolId: form.schoolId,
                           applyUserId: form.applyUserId,
                           applyCount: form.applyCount,
                           remark: form.remark,
                           address: form.address
                        };
                        if (isEdit) {
                            Object.assign(params, {
                                id: applyItem.id
                            });
                        }
                        var request = isEdit ? reApply : apply;
                        request(params)
                            .then((res)=> {
                                this.visiable = false;
                                this.$emit('save');
                                toast('保存成功', 'success');
                                this.cancel();
                            }, () => {
                                this.changeLoading();
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        },
        components: {
            CampusFilter,
            UserFilter
        }  
    };
</script>