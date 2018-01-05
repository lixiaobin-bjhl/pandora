<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';

    export default {
        data () {
            return {
                breadcrumb: ['活动管理'],
                loading: false
            }
        },
        components: {
            BreadcrumbNav
        }
    }
</script>
