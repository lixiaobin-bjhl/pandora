<template>
    <el-dialog
        width="800px;"
        :title="item ? '编辑活动' : '添加活动'" 
        :visible.sync="$store.state.discounts.showAddActiveState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="120px">
            <el-form-item label="活动名称" prop="name">
                <el-input 
                    :maxlength="30"
                    v-model="form.name"
                    style="width: 360px;"
                    placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="发送卡券" 
                prop="couponRuleId">
                <el-select
                    filterable
                    style="width: 360px;"
                    v-model="form.couponRuleId"
                    placeholder="请选择发送的卡券"
                >
                 <el-option 
                        v-for="item, index in couponRuleList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                label="卡券方式" 
                prop="triggerType">
                <el-select 
                v-model="form.triggerType"
                filterable
                style="width: 360px;"
                placeholder="请选择发券方式">
                    <el-option 
                        v-for="item, index in triggerTypeOption" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有分享券">
                <span slot="label">是否有分享券
                    <el-tooltip content="是否有分享券">
                        <span class="el-icon-question text-warning"></span>
                    </el-tooltip>
                </span>
                <el-radio-group v-model="form.hasChareCoupon">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分享券张数">
                <el-input
                    style="width:360px;" 
                    v-model="form.shareCount" 
                    placeholder="如“3”表示每张卡券包含3张同样类型分享券"></el-input>
            </el-form-item>
            <el-form-item label="分享券可再裂变">
                <el-radio-group v-model="form.hasFission">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发券时间">
                <el-row>
                    <el-col :span="8">
                        <el-radio-group v-model="form.notLimitTime">
                            <el-radio :label="1">不限</el-radio>
                            <el-radio :label="0">限时</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker
                            v-model="form.timeRange"
                            type="daterange"
                            style="width: 300px;"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            >
                        </el-date-picker>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="发券总数">
                <el-row>
                    <el-col :span="8">
                        <el-radio-group v-model="form.notLimitCount">
                            <el-radio :label="1">不限</el-radio>
                            <el-radio :label="0">限时</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="16">
                        <el-input 
                            placeholder="请输入发券总数" 
                            v-model="form.maxCount"></el-input>
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
    import { getCouponRuleList, saveCouponActivity } from '../request';

    export default {
        props: {
            item: {}
        },
        data() {
            return {
                rules: config.addActiveRule,
                couponRuleList: [],
                triggerTypeOption: config.triggerTypeOption,
                form: {
                    name: '',
                    hasChareCoupon: '',
                    timeRange: '',
                    hasFission: '',
                    couponRuleId: '',
                    triggerType: '',
                    shareCount: '',
                    notLimitTime: '',
                    beginTime: '',
                    endTime: '',
                    maxCount: '',
                    notLimitCount: '',
                }
            };
        },
        mounted () {
            this.getCouponRuleList();
        },
        methods: {
            /**
             * 获取规则列表 
             */
            getCouponRuleList () {
                getCouponRuleList({
                    pageNum: 1,
                    pageSize: 2000
                })
                .then((res)=> {
                    this.couponRuleList = res.data.list;
                });
            },
            cancel () {
                this.$store.commit('HIDE_ADD_ACTIVE');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.form;
                        var params = {
                            name: form.name,
                            couponRuleId: form.couponRuleId,
                            triggerType: form.triggerType
                        };
                        // 有分享劵
                        if (form.hasChareCoupon) {
                            
                        }
                        this.loading = true;
                        saveCouponActivity(params)
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
            }
        }
    }
</script>