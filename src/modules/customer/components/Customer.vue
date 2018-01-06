<template>
    <el-dialog 
        :title="item ? '编辑客户' : '添加客户'" 
        :visible.sync="$store.state.customer.showAddCustomerState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="80px">
            <el-form-item label="微信昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="客户手机">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
                <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="客户生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="客户年龄">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="咨询顾问">
                <el-select v-model="form.region" placeholder="请选择顾问">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户来源">
                <el-select v-model="form.region" placeholder="请选择来源">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
                this.$store.commit('HIDE_ADD_CUSTOMER_DETIAL');
            }
        }
    }
</script>