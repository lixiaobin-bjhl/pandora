<template>
    <el-dialog 
        :title="id ? '编辑项目' : '添加项目'" 
        :visible.sync="$store.state.customer.showAddItemState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="80px">
            <el-form-item label="项目名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目医生">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
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
        computed: {
            id () {
                return this.$store.state.customer.id;
            }
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
                this.$store.commit('HIDE_ADD_ITEM_DETIAL');
            }
        }
    }
</script>