<template>
    <el-dialog 
        :title="item ? '编辑活动' : '添加活动'" 
        :visible.sync="$store.state.discounts.showAddActiveState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="100px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="发送卡券">
                <el-select
                v-model="form.name"
                placeholder="请选择发送的卡券"
                ></el-select>
            </el-form-item>
            <el-form-item label="卡券方式">
                <el-select 
                v-model="form.name"
                placeholder="请选择发券方式"></el-select>
            </el-form-item>
            <el-form-item label="是否有分享券">
                <span slot="label">是否有分享券
                    <el-tooltip content="是否有分享券">
                        <span class="el-icon-question text-warning"></span>
                    </el-tooltip>
                </span>
                <el-radio-group v-model="form.radio2">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分享券张数">
                <el-input v-model="form.name" placeholder="如“3”表示每张卡券包含3张同样类型分享券"></el-input>
            </el-form-item>
            <el-form-item label="分享券可再裂变">
                <el-radio-group v-model="form.radio2">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发券时间">
                <el-row>
                    <el-col :span="10">
                        <el-radio-group v-model="form.radio2">
                            <el-radio :label="1">不限</el-radio>
                            <el-radio :label="0">限时</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col span="10">
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="发券总数">
                <el-row>
                    <el-col :span="10">
                        <el-radio-group v-model="form.radio2">
                            <el-radio :label="1">不限</el-radio>
                            <el-radio :label="0">限时</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col span="10">
                        <el-input placeholder="请输入发券总数"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="cancel" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            item: {}
        },
        data() {
            return {
                rules: {},
                form: {}
            };
        },
        mounted () {
        },
        methods: {
            cancel () {
                this.$store.commit('HIDE_ADD_ACTIVE');
            }
        }
    }
</script>