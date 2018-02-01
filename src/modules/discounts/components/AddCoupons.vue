<template>
    <el-dialog 
        width="580px"
        :title="item ? '编辑卡券' : '添加卡券'" 
        :visible.sync="$store.state.discounts.showAddCouponsState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form"
            v-loading="loading"
            label-width="100px">
            <el-form-item 
                label="卡券名称"
                prop="name">
                <el-input
                    :max-length="20"
                    style="width: 360px;"
                    v-model="form.name"
                    :maxlength="20"
                    placeholder="请输入卡券名称，不超过20字"></el-input>
            </el-form-item>
            <el-form-item label="有效期" prop="duration">
                 <el-input
                    type="number"
                    style="width: 360px;"
                    v-model="form.duration"
                    :maxlength="20"
                    placeholder="请输入有效期">
                    <span slot="suffix" class="el-input__icon" style="margin-right: 10px;">天</span>
                    </el-input>
            </el-form-item>
            <el-form-item 
                label="使用规则" 
                prop="ruleDesc">
                <el-row>
                    <el-col :span="24">
                        <el-input v-model.trim="form.ruleDesc"
                            type="textarea" 
                            style="width: 360px;"
                            :maxlength="200" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入使用规则，按回车键可换行，不超过200字"></el-input>
                    </el-col>
                 </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="ok" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    import config from '../config';
    import { couponRuleSave } from '../request';

    export default {
        props: {
            item: {}
        },
        computed: {
            coupons () {
                return this.$store.state.discounts.coupons;
            }
        },
        data() {
            return {
                rules: config.addCouponRule,
                form: {
                    name: '',
                    duration: '',
                    ruleDesc: ''
                }
            };
        },
        mounted () {
        },
        methods: {
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.form;
                        var params = {
                            name: form.name,
                            duration: form.duration,
                            ruleDesc: form.ruleDesc
                        };
                        couponRuleSave(params)
                            .then((res)=> {
                                this.$emit('save');
                                toast('保存成功', 'success');
                                this.cancel();
                                this.loading = false;
                            }, ()=> {
                                this.loading = false;
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            },
            cancel () {
                this.$store.commit('HIDE_ADD_COUPONS');
            }
        }
    }
</script>