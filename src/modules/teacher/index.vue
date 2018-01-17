<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12" class="btn-group">
               <el-button type="primary" @click="add">添加教师</el-button>
               <el-button 
                type="default" 
                plain 
                @click="batchImport">导入</el-button>
            </el-col>
        </el-row>
        
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <campus-filter
                        v-model="filter.campus">
                    </campus-filter>
                    <el-input 
                        placeholder="请输入老师姓名"
                        @keyup.enter="refresh"
                        style="width: 180px;" 
                        v-model.trim="filter.name">
                        <i slot="suffix" 
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <el-select 
                        placeholder="科目" 
                        style="width: 180px;" 
                        v-model.trim="filter.subjectId">
                        <el-option
                            v-for="item,index in subjectOption"
                            :label="item.name"
                            :value="item.id"
                            :key="index">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <el-table 
                ref="table"
                border
                empty-text="没有找到老师信息"
                :data="list"
                >
                <el-table-column
                    align="center"
                    label="教师姓名">  
                    <template slot-scope="scope">
                       李小斌
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="校区">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="科目">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="已完成课节数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="待完成课节数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    min-width="100"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" @click="showTeacherDetail(scope.row)">查看详情</a>
                            <a href="javascript:;" 
                                :class="{'forbidden': scope.row.status ===1, 'enable': scope.row.status === 2}" 
                                @click="updateStatus">
                                {{scope.row.status === 1? '停用账号': '恢复账号'}}</a>
                            <a href="javascript:;" @click="showLessonTable">查看课表</a>
                        </div>
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
    import subjectOption from '../../common/config/subjectOption';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import BatchImport from './components/BatchImport.vue';
    import CampusFilter from 'src/common/components/CampusFilter.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                    subjectId: '',
                    name: '',
                    campus: ''
                },
                subjectOption,
                breadcrumb: ['教师管理'],
                loading: false,
                list: [{status:1},{status:2},{status:1},{status:1},{status:1},{status:2},{status:1},{status:1},{status:1},{status:2},{status:1},{status:1},{status:1},{status:2},{status:1},{status:1},{status:1},{status:2},{status:1},{status:1},{status:1},{status:2},{status:1},{status:1}]
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
             * 获取账号列表 
             */
            fetchList () {
                var pageDto = this.pageDto;
            }
        },
        components: {
            BreadcrumbNav,
            Add,
            CampusFilter,
            BatchImport
        }
    }
</script>
