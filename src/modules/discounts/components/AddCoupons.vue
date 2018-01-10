<template>
    <el-dialog 
        :title="item ? '编辑卡券' : '添加卡券'" 
        :visible.sync="$store.state.discounts.showAddCouponsState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="100px">
            <el-form-item label="卡券名称">
                <el-input
                    :max-length="20"
                    v-model="form.name" 
                    placeholder="请输入卡券名称，不超过20字"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
                <el-select
                v-model="form.name"
                placeholder="请输入有效期"
                ></el-select>
            </el-form-item>
            <el-form-item label="使用规则">
                <el-row>
                    <el-col :span="24">
                        <el-input v-model.trim="form.remark"
                            type="textarea" 
                            :maxlength="200" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入使用规则，包括条件、限制等，不超过200字"></el-input>
                    </el-col>
                 </el-row>
            </el-form-item>
             <el-form-item label=" ">
                <span class="text-gray-light">注意卡券信息修改后，已发出的卡券不受影响</span>
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
        computed: {
            coupons () {
                return this.$store.state.discounts.coupons;
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
                this.$store.commit('HIDE_ADD_COUPONS');
            }
        }
    }
</script>