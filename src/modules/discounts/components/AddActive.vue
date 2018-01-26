<template>
    <el-dialog
        width="580px"
        :title="item ? '查看活动' : '添加活动'" 
        :visible.sync="$store.state.discounts.showAddActiveState"
        >
        <el-alert
            v-if="item"
            style="margin-bottom: 20px;"
            :closable="false"
            title="活动一旦创建不能再修改，可【暂停】或者【删除】后再新建活动"
            type="warning">
        </el-alert>
        <el-form
            :rules="item ? {} : rules" 
            ref="form"
            :model="form" 
            label-width="120px">
            <el-form-item label="活动名称" prop="name">
                <template v-if="item">
                    {{item.name}}
                </template>
                <template v-else>
                    <el-input 
                        :maxlength="30"
                        v-model="form.name"
                        style="width: 360px;"
                        placeholder="请输入活动名称"></el-input>
                </template>
            </el-form-item>
            <el-form-item label="发送卡券" 
                prop="couponRuleId">
                <template v-if="item">
                    {{item.couponConcatName}}&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-tooltip>
                        <pre slot="content">{{form.ruleDesc}}</pre>
                        <a href="javascript:;">使用规则</a>
                    </el-tooltip>
                </template>
                <template v-else>
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
                </template>
            </el-form-item>
            <el-form-item 
                label="卡券方式" 
                prop="triggerType">
                <template v-if="item">
                    {{item.triggerTypeStr}}
                </template>
                <template v-else>
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
                </template>
            </el-form-item>
            <p class="span-line"></p>
            <el-form-item label="是否有分享券">
                <span slot="label" v-if="!item">是否有分享券
                    <el-tooltip content="是否有分享券">
                        <span class="el-icon-question text-warning"></span>
                    </el-tooltip>
                </span>
                <template v-if="item">
                    {{item.hasShareCoupon ? '是': '否'}}
                </template>
                <template v-else>
                    <el-radio-group v-model="form.hasShareCoupon">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <template v-if="form.hasShareCoupon">
                <el-form-item 
                    label="分享券张数" 
                    prop="shareCount">
                    <template v-if="item">
                        {{item.shareCount}}
                    </template>
                    <template v-else>
                        <el-input
                            style="width:360px;" 
                            v-model="form.shareCount"
                            :maxlength="5"
                            type="number" 
                            placeholder="如“3”表示每张卡券包含3张同样类型分享券"></el-input>
                    </template>
                </el-form-item>
                <p class="span-line"></p>
                <el-form-item label="分享券可再裂变">
                    <template v-if="item">
                       {{item.canFission ? '是': '否'}}  
                    </template>
                    <template v-else>
                        <el-radio-group v-model="form.canFission">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </template>
                </el-form-item>
                <template v-if="form.canFission">
                    <el-form-item label="发券时间">
                        <template v-if="item">
                            <div v-if="item.beginTime">
                                {{item.beginTime|'yyyy-MM-dd'}} 至 {{item.endTime|'yyyy-MM-dd'}} 
                            </div>
                            <div v-else>不限</div>
                        </template>
                        <template v-else>
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
                                        :picker-options="activityDateOption"
                                        :disabled="form.notLimitTime? true: false"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        >
                                    </el-date-picker>
                                </el-col>
                            </el-row>
                        </template>
                    </el-form-item>
                    <el-form-item label="发券总数">
                        <template v-if="item">
                           {{item.maxCount ? item.maxCount : '不限'}}  
                        </template>
                        <template v-else>
                            <el-row>
                                <el-col :span="8">
                                    <el-radio-group v-model="form.notLimitCount">
                                        <el-radio :label="1">不限</el-radio>
                                        <el-radio :label="0">限时</el-radio>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="16">
                                    <el-input
                                        :disabled="form.notLimitCount?true:false"
                                        style="width: 300px;"
                                        type="number"
                                        placeholder="请输入发券总数" 
                                        v-model="form.maxCount"></el-input>
                                </el-col>
                            </el-row>
                        </template>
                    </el-form-item>
                </template>
            </template>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="ok" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    import config from '../config';
    import { getCouponRuleList, saveCouponActivity, activityDetail} from '../request';

    export default {
        data() {
            return {
                rules: config.addActiveRule,
                couponRuleList: [],
                triggerTypeOption: config.triggerTypeOption,
                activityDateOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                form: {
                    name: '',
                    hasShareCoupon: 0,
                    timeRange: '',
                    canFission: 0,
                    couponRuleId: '',
                    triggerType: '',
                    shareCount: '',
                    notLimitTime: 1,
                    beginTime: '',
                    endTime: '',
                    maxCount: '',
                    ruleDesc: '',
                    notLimitCount: 1,
                }
            };
        },
        computed: {
            item () {
                return this.$store.state.discounts.active;
            }
        },
        mounted () {
            this.getCouponRuleList();
            var item = this.item;
            if (item) {
                Object.assign(this.form, item);
                activityDetail({
                    id: item.id
                })
                .then((res)=>{
                    this.form.ruleDesc = res.data.ruleDesc;
                });
            }
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
                        if (form.hasShareCoupon) {
                            Object.assign(params, {
                                shareCount: form.shareCount
                            });
                        }
                        this.loading = true;

                        if (!form.notLimitTime && !form.timeRange) {
                            toast('请选择发券时间');
                            return;
                        }
                        if (!form.notLimitCount && !form.maxCount) {
                            toast('请填写发券总数');
                            return;
                        }

                        if (form.notLimitTime) {
                            Object.assign(params, {
                                notLimitTime: notLimitTime ? true : false
                            });
                        }
                        var timeRange = form.timeRange;
                        if (timeRange) {
                            Object.assign(params, {
                                beginTime: +timeRange[0],
                                endTime: +timeRange[1]
                            });
                        }
                        if (form.maxCount) {
                            Object.assign(params, {
                                maxCount: form.maxCount
                            });
                        }
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