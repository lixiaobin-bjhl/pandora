<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               <el-button type="primary" @click="add">添加账号</el-button>
               <el-button type="primary" @click="batchImport">导入</el-button>
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
            <el-table 
                ref="table"
                v-if="list && list.length"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column label="教师姓名">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="校区">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="科目">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="已完成课节数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="待完成课节数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    class="btn-group"
                    label="操作">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="showTeacherDetail(scope.row)">查看详情</a>
                        <a href="javascript:;" @click="updateStatus">停用账号</a>
                        <a href="javascript:;" @click="showLessonTable">查看课表</a>
                    </template>
                </el-table-column>
            </el-table>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
        </div>
        <add v-if="$store.state.teacher.showAddTeacherState">
        </add>
        <batch-import v-if="$store.state.teacher.showImportTeacherState">
        </batch-import>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import BatchImport from './components/BatchImport.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                breadcrumb: ['教师管理'],
                loading: false,
                list: [{}]
            }
        },
        mounted () {
            this.fetchList()
        },
        methods: {
            /**
             * 添加账号 
             */
            add () {
                this.$store.commit('SHOW_ADD_TEACHER');
            },
            /**
             * 批量导入 
             */
            batchImport () {
                this.$store.commit('SHOW_IMPORT_TEACHER');
            },
            /**
             * 查看账号详情
             */
            showTeacherDetail (teacher) {
                 this.$store.commit('SHOW_ADD_TEACHER', teacher);
            },
            /**
             * 修改状态 
             */
            updateStatus () {
                this.$confirm('确认启用账号?', '提示', {
                        type: 'warning'
                    }).then(() => {
                    });
            },
            /**
             * 查看课表
             */
            showLessonTable () {
             
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
            }
        },
        components: {
            BreadcrumbNav,
            Add,
            BatchImport
        }
    }
</script>
