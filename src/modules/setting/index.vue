<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
         <div class="list-box">
            <el-tabs v-model="activeName" @tab-click="changeTab">
                <el-tab-pane label="眼部" name="1"></el-tab-pane>
                <el-tab-pane label="鼻部" name="2"></el-tab-pane>
                <el-tab-pane label="面部" name="3"</el-tab-pane>
                <el-tab-pane label="胸部" name="4"></el-tab-pane>
                <el-tab-pane label="激光治疗" name="5"></el-tab-pane>
                <el-tab-pane label="注射" name="6"></el-tab-pane>
            </el-tabs>
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input placeholder="请输入内容" style="width: 300px;" v-model.trim="key" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
            <el-table
                ref="table"
                v-if="list && list.length"
                :data="list"
                :highlight-current-row="true">
                <el-table-column
                    label="微信昵称"
                >  
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="showNiticeItem(scope.row)">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="项目">
                </el-table-column>
            </el-table>
            <div v-if="!list.length" class="none-list">
                <span>暂无设置信息</span>
            </div>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
            <notice-item v-if="$store.state.notice.showNoticeItem"></notice-item>
        </div>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import NoticeItem from './components/NoticeItem';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                activeName: '1',
                list: [{}],
                breadcrumb: ['提醒设置'],
                loading: false
            }
        },
        methods: {
            /**
             * 改变tab 
             */
            changeTab (tab) {
                console.log(this.activeName);
            },
            /**
             * 展示项目 
             */
            showNiticeItem () {
                this.$store.commit('SHOW_NOTICE_ITEM');
            }
        },
        components: {
            BreadcrumbNav,
            NoticeItem
        }
    }
</script>
