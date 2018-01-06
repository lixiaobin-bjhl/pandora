<template>
    <el-dialog title="脱毛拉医疗美容医院" 
        :visible.sync="$store.state.customer.showCouponState"
        >
        <ul>
            <li>卡券名称</li>
            <li>有效期</li>
            <li>使用规则</li>
        </ul>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
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
                
            };
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