<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-input placeholder="请输入内容"  v-model.trim="key" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-select
                                placeholder="请选择状态" 
                                v-model="type">
                            </el-select> 
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-table 
                ref="table"
                v-if="list && list.length"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column label="申请校区">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="申报教室">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="申报科目">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="当前状态">
                </el-table-column>
                <el-table-column
                    prop="date"
                    class="btn-group"
                    label="操作">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="updateStatus(scope.row)">同意申请</a>
                        <a href="javascript:;" @click="updateStatus(scope.row)">驳回申请</a>
                        <a href="javascript:;" @click="detail(scope.row)">详情</a>
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

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                breadcrumb: ['排课申请管理'],
                loading: false,
                list: [{}]
            }
        },
        mounted () {
            this.fetchList()
        },
        methods: {
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
            Add
        }
    }
</script>