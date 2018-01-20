<template>
    <el-dialog 
        title="修改密码" 
        width="500px"
        :visible.sync="$store.state.account.showModifyPwdState"
        > 
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            label-position="right"
            :rules="addAccountRule">
            <el-form-item prop="newPwd" label="新密码" style="margin-top: 20px;">
                <el-input v-model.trim="form.newPwd" type="password" :maxlength="50" placeholder="请输入新密码"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button :disabled="loading" @click="ok" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { reset } from '../request';

    export default   {
        data () {
            return  {
                addAccountRule: config.addAccountRule,
                form: {
                    newPwd: '',
                },
                loading: false,
                visiable: false
            }
        },
        computed: {
            accountItem () {
                return this.$store.state.account.account;
            }
        },
        methods: {
            /**
             * 取消重置密码 
             */
            cancel () {
                this.$store.commit('HIDE_MODIFY_PWD');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var form = this.form;
                        var params = {
                            id: accountItem.id,
                            password: form.newPwd
                        };
                        reset(params)
                            .then((res)=> {
                                this.visiable = false;
                                this.$emit('save');
                                this.cancel();
                                toast('保存成功', 'success');
                            });
                    } else {
                        toast('表单验证失败!');
                        this.changeLoading();
                    }
                });
            }
        }
    }
</script>