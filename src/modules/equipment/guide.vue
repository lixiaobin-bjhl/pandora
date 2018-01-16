<template>
    <section>
        <div class="equipment-guide">
            <div class="none-equipment"></div>
            <div>当前校区没有双师教室，请先申请由厦门校区安排安装后才能够使用本系统</div>
            <el-button 
                type="primary" 
                class="apply-btn" 
                @click="apply" 
                style="width:95px">去申请</el-button>
        </div>
     <apply v-if="$store.state.equipment.showApplyEquipmentState"></apply>
    </section>
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

<style lang="scss">
    .none-equipment {
        background: url('../../assets/img/none-equipment.png') no-repeat center center;
        width: 161px;
        height: 140px;
        margin: 0 auto 36px auto;
    }
    .apply-btn {
        margin-top: 25px;
    }
</style>