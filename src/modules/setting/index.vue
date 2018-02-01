<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
        <div class="list-box">
            <el-tabs v-model="activeName" 
                @tab-click="changeTab" 
                style="margin-bottom: 16px;">
                <el-tab-pane 
                    v-for="item, index in porjectList" 
                    :label="item.categoryName" 
                    :name="''+item.id" 
                    :key="index"></el-tab-pane>
            </el-tabs>
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input placeholder="请输入项目名称" 
                        style="width: 360px;"
                        @keyup.enter.native="refresh" 
                        v-model.trim="filter.key"
                        class="input-with-select">
                        <span slot="suffix" class="el-input__icon el-icon-search pointer" @click="refresh"></span>
                    </el-input>
                </div>
            </div>
            <el-table
                ref="table"
                :data="list"
                empty-text="没有找到关怀计划信息"
                :highlight-current-row="true">
                <el-table-column
                    prop="name"
                    label="项目"
                > 
                <template slot-scope="scope">
                    <div>
                        <a href="javascript:;" @click="showNiticeItem(scope.row)">{{scope.row.name}}</a>
                    </div>
                </template>

                </el-table-column>
                <el-table-column
                    label="术前、术后提醒事项">
                    <template slot-scope="scope">
                       <template v-if="scope.row.carePlans.length"> 
                            <ul style="padding: 5px 0;">  
                                <li  
                                    v-for="item, index in scope.row.carePlans"
                                    v-if="index < 5"
                                    :key="index">
                                        {{item.noticeTime}}：{{item.noticeDesc}}
                                    </li>
                                    <li v-if="scope.row.carePlans.length > 5">……</li>
                            </ul>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div v-if="!list.length" class="none-list">
                <span>暂无设置信息</span>
            </div> -->
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageInfo">
            </pager>
            <notice-item v-if="$store.state.notice.showNoticeItem"></notice-item>
        </div>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import NoticeItem from './components/NoticeItem';
    import xxx from './components/xxx.vue';
    import { listProjectCarePlan } from './request';
    import {getProjectList} from '../customer/request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {
                    key: ''
                },
                activeName: null,
                list: [],
                porjectList: [],
                breadcrumb: ['关怀计划'],
                loading: false
            }
        },
        mounted () {
            this.getProjectList();
        },
        methods: {
            getProjectList () {
                getProjectList()
                    .then((res)=> {
                        var list = res.data.tree;
                        this.porjectList = res.data.tree;
                        this.activeName = '' + list[0].id;
                        this.fetchList();
                    });
            },
            /**
             * 获取列表 
             */
            fetchList () {
                var pageInfo = this.pageInfo;
                var filter = this.filter;
                this.loading = true;
                listProjectCarePlan({
                    nameKey: filter.key,
                    categoryId: +this.activeName,
                    pageNum: pageInfo.pageNum,
                    pageSize: pageInfo.pageSize
                })
                .then((res)=> {
                    this.list = res.data.list;
                    Object.assign(this.pageInfo, res.pageInfo);
                    this.loading = false;
                }, ()=> {
                    this.loading = false;
                });
            },
            /**
             * 改变tab 
             */
            changeTab (tab) {
                this.fetchList();
            },
            /**
             * 展示项目 
             */
            showNiticeItem (project) {
                this.$store.commit('SHOW_NOTICE_ITEM', project);
            }
        },
        components: {
            BreadcrumbNav,
            NoticeItem,
            xxx
        }
    }
</script>
