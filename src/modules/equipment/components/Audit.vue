<template>
      <el-dialog 
        title="审批"
        width="640px"
        v-loading="loading"
        :visible.sync="$store.state.equipment.showApplyEquipmentAuditState"
        >
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            :rules="auditRules"
            label-position="right">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="审批状态" prop="status">
                        <el-select
                        v-model="form.status"
                        clearable
                        style="width: 180px;" 
                        placeholder="请选择审批状态">
                            <el-option label="通过" :value="2"></el-option>
                            <el-option label="拒绝" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input
                            v-model.trim="form.remark"
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import {audit} from '../request';
    import config from '../config';

    export default {
        data () {
            return {
                loading: false,
                form: {
                    status: '',
                    remark: ''
                },
                auditRules: config.auditRules
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.equipment.applyItem;
            }
        },
        methods: {
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_APPLY_EQUIPMENT_AUDIT');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var applyItem = this.applyItem;
                        var form = this.form;
                        var params = {
                           id: applyItem.id,
                           status: form.status,
                           remark: form.remark
                        };
                        this.loading = true;
                        audit(params)
                            .then((res)=> {
                                this.$emit('save');
                                this.loading = false;
                                toast('保存成功', 'success');
                                this.cancel();
                            }, ()=> {
                                this.loading = false;
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        }
    };
</script>