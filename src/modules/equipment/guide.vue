<template>
    <div style="background: #fff">
        <div style="width: 200px; margin:0 auto;">
            <div>当前校区没有双师教室，请先申请由厦门校区安排安装后才能够使用本系统</div>
            <el-button type="primary" @click="apply">去申请</el-button>
        </div>
        <apply v-if="$store.state.equipment.showApplyEquipmentState"></apply>
    </div>
</template>

<script>

    import Apply from './components/Apply';

    export default {
        methods: {
            /**
             * 申请教室 
             */
            apply () {
                this.$store.commit('SHOW_APPLY_EQUIPMENT');
            }
        },
        components: {
            Apply
        }
    }
</script>