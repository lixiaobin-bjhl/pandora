<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input placeholder="请输入内容" style="width: 300px;" v-model.trim="key" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
        </div>
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
