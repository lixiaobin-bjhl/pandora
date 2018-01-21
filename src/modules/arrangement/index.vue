<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
                <el-button 
                    type="primary" 
                    @click="showTimetable">查看课表</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <campus-filter
                        v-if="$root.hasAuth(3)"
                        @change="refresh"
                        v-model="filter.schoolId">
                    </campus-filter>
                    <el-select
                        @change="refresh"
                        placeholder="请选择状态" 
                        style="width: 180px;"
                        v-model="filter.status">
                            <el-option label="审批中" v-if="$root.hasAuth(1)" :value="1"></el-option>
                            <el-option label="待审批" v-if="$root.hasAuth(3)" :value="1"></el-option>
                            <el-option label="通过" :value="2"></el-option>
                            <el-option label="拒绝" :value="3"></el-option>
                            <el-option label="撤回" :value="4"></el-option>
                    </el-select>  
                </div>
            </div>
            <el-table 
                ref="table"
                border
                empty-text="没有找到排课信息"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column
                    align="center"
                    prop="schoolName"
                    label="申请校区">  
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="classRoomName"
                    label="申报教室">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="subjectTypeStr"
                    label="申报科目">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申请时间">
                    <template slot-scope="scope">
                        {{scope.row.applyTime|date('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="当前状态">
                     <template slot-scope="scope">
                        <span 
                            :class="{
                                'text-yellow': scope.row.status == 1,
                                'text-success': scope.row.status == 2 || scope.row.status >= 5,
                                'text-danger': scope.row.status == 3}">
                            <template v-if="scope.row.status == 1">
                                <icon name="applying" scale="1.5"></icon>
                            </template>
                            <template v-if="scope.row.status == 2">
                                <icon name="apply-success" scale="1.5"></icon>
                            </template>
                            <template v-if="scope.row.status == 3">
                                <icon name="apply-failed" scale="1.5"></icon>
                            </template> 
                            <template v-if="$root.hasAuth(1) && scope.row.status == 1">
                                审批中
                            </template>
                            <template v-else-if="$root.hasAuth(3) && scope.row.status == 1">
                                待审批
                            </template>
                            <template v-else-if="scope.row.status >= 5">
                                通过
                            </template>
                            <template v-else>
                                {{scope.row.statusStr}}
                            </template>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    :min-width="130"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;"
                                v-if="$root.hasAuth(1) && scope.row.status == 1" 
                                @click="withdraw(scope.row)">撤回</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(3) && scope.row.status == 1" 
                                @click="allow(scope.row)">通过</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(3) && scope.row.status == 1" 
                                @click="refuse(scope.row)">拒绝</a>
                            <a href="javascript:;" @click="detail(scope.row)">详情</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
            <audit 
                v-if="$store.state.arrangement.showAuditApplyState" 
                @save="refresh"></audit>
            <!-- <apply 
                v-if="$store.state.course.showAddCourseState" 
                @save="refresh"></apply> -->
        </div>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    // import Course from '../course/components/Apply.vue';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import {getList, audit} from './request';
    import Audit from './components/Audit.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                    schoolId: '',
                    status: ''
                },
                breadcrumb: ['排课管理'],
                loading: false,
                list: []
            }
        },
        mounted () {
            this.fetchList()
        },
        methods: {
            /**
             * 展示课表 
             */
            showTimetable () {
                this.$router.push('/timetable');
            },
            /**
             *  拒绝申请
             */
            refuse(item) {
                this.$store.commit('SHOW_AUDIT_APPLY', item);
            },
            /**
             * 撤回 
             */
            withdraw (item) {
                this.$confirm('确认撤回?', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        audit({
                            id: item.id,
                            status: 4
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        })
                    });
            },
            /**
             * 通过 
             */
            allow (item) {
                this.$confirm('确认通过?', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        audit({
                            id: item.id,
                            status: 2
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        })
                    });
            },
            /**
             * 刷新列表 
             */
            refresh () {
                this.pageDto.pageNum = 1;
                this.fetchList();
            },
            /**
             * 获取账号列表 
             */
            fetchList () {
                var pageDto = this.pageDto;
                var filter = this.filter;
                this.loading = true;
                getList({
                    status: filter.status,
                    schoolId: filter.schoolId,
                    pageDto: {
                        pageNum: pageDto.pageNum,
                        pageSize: pageDto.pageSize
                    }
                })
                .then((res)=> {
                    this.list = res.data;
                    Object.assign(this.pageDto, res.pageDto);
                    this.loading = false;
                }, ()=> {
                    this.loading = false;
                });
            },
            /**
             * 查看申请详情 
             */
            detail (course) {
                // this.$store.commit('SHOW_ADD_COURSE',{
                //     course: course,
                //     isShowDetail: true
                // });
            }
        },
        components: {
            BreadcrumbNav,
            CampusFilter,
            Audit,
            // Apply
        }
    }
</script>