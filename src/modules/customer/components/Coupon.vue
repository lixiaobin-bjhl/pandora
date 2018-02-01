<template>
    <el-dialog title="卡券详情" 
        :visible.sync="$store.state.customer.showCouponState"
        >
        <el-form>
            <el-form-item label="卡券名称">
                {{couponRule.couponName}}
            </el-form-item>
            <el-form-item label="有效期">
                {{couponRule.periodStr || '--'}}
            </el-form-item>
            <el-form-item label="使用规则">
                <pre style="line-height: 1.5">{{couponRule.ruleDesc}}</pre>
            </el-form-item>
        </el-form> 
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                
            };
        },
        computed: {
            couponRule () {
                return this.$store.state.customer.couponRule || {};
            }
        },
        mounted () {
        },
        methods: {
            cancel () {
                this.$store.commit('HIDE_COUPON_DETIAL');
            }
        }
    }
</script>