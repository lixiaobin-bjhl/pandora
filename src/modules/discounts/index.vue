<template>
    <div class="material-list account-wrap">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
         <div class="list-box">
            <el-tabs v-model="activeName">
                <el-tab-pane label="活动" name="Active"></el-tab-pane>
                <el-tab-pane label="卡劵" name="Coupons"></el-tab-pane>
            </el-tabs>
            <component :is="activeName"></component>         
        </div>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import Active from './components/Active';
    import Coupons from './components/Coupons';

    export default {
        data () {
            return {
                activeName: 'Active',
                breadcrumb: ['活动管理'],
            }
        },
        methods: {
        },
        components: {
            BreadcrumbNav,
            Active,
            Coupons
        }
    }
</script>
