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
                        v-model="filter.campus">
                    </campus-filter>
                    <el-select
                        placeholder="请选择状态" 
                        style="width: 180px;"
                        v-model="filter.type">
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
                    label="申请校区">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申报教室">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申报科目">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="当前状态">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    :min-width="130"
                    label="操作">
                    <template slot-scope="scope">
                        <div  class="btn-group">
                            <a href="javascript:;" @click="updateStatus(scope.row)">同意申请</a>
                            <a href="javascript:;" class="forbidden" @click="updateStatus(scope.row)">驳回申请</a>
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
            <add v-if="$store.state.course.showAddCourseState"></add>
        </div>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from '../course/components/Add.vue';
    import CampusFilter from 'src/common/components/CampusFilter.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                },
                breadcrumb: ['排课管理'],
                loading: false,
                list: [{}]
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
             * 修改状态 
             */
            updateStatus () {
                this.$confirm('确认删除?', '提示', {
                        type: 'warning'
                    }).then(() => {
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
            },
            /**
             * 查看申请详情 
             */
            detail (arrangement) {
                this.$store.commit('SHOW_ADD_COURSE', arrangement);
            }
        },
        components: {
            BreadcrumbNav,
            CampusFilter,
            Add
        }
    }
</script>