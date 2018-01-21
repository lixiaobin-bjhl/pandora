<template>
      <el-dialog 
        title="拒绝申请"
        width="640px"
        v-loading="loading"
        :visible.sync="$store.state.arrangement.showAuditApplyState"
        >
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            label-position="right">
           <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item label="" prop="remark">
                        <el-input
                            v-model.trim="form.remark"
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入拒绝理由"></el-input>
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

    export default {
        data () {
            return {
                loading: false,
                form: {
                    status: '',
                    remark: ''
                }
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.arrangement.arrangement;
            }
        },
        methods: {
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_AUDIT_APPLY');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.form;
                        var applyItem = this.applyItem;
                        var params = {
                           id: applyItem.id,
                           status: 3,
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