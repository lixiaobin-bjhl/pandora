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
                    <el-input 
                        placeholder="请输入老师姓名"
                        @keyup.enter.native="refresh"
                        style="width: 240px;" 
                        v-model.trim="filter.name">
                        <i slot="suffix"
                            @click="refresh" 
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <campus-filter
                        @change="refresh"
                        v-model="filter.schoolId">
                    </campus-filter>
                    <el-select 
                        placeholder="请选择科目" 
                        clearable
                        style="width: 180px;" 
                        @change="refresh"
                        v-model.trim="filter.subjectType">
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
                    prop="schoolName"
                    align="center"
                    label="校区">
                </el-table-column>
                <el-table-column
                    prop="subjectTypeStr"
                    align="center"
                    label="科目">
                </el-table-column>
                <el-table-column
                    prop="teacherTypeStr"
                    align="center"
                    label="老师类型">
                </el-table-column>
                <el-table-column
                    prop="finishedLessonCount"
                    align="center"
                    label="已完成课节数">
                </el-table-column>
                <el-table-column
                    prop="unfinishedLessonCount"
                    align="center"
                    label="待完成课节数">
                </el-table-column>
                <el-table-column
                    prop="statusStr"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                       <span
                       :class="{
                            'text-success': scope.row.status == 1,
                            'text-danger': scope.row.status == 2}">
                        <icon v-if="scope.row.status == 1" name="apply-success" scale="1.5"></icon>
                        <icon v-if="scope.row.status == 2" name="apply-failed" scale="1.5"></icon>
                        {{scope.row.statusStr}}  
                       </span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    min-width="120"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" @click="showTeacherDetail(scope.row)">详情</a>
                            <a href="javascript:;" @click="edit(scope.row)">编辑</a>
                            <a href="javascript:;" 
                                :class="{'forbidden': scope.row.status ===1, 'enable': scope.row.status === 2}" 
                                @click="updateStatus(scope.row)">
                                {{scope.row.status === 1? '停用账号': '恢复账号'}}</a>
                            <a href="javascript:;" @click="showLessonTable(scope.row)">课表</a>
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
        <add 
            v-if="$store.state.teacher.showAddTeacherState" 
            @save="refresh">
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
    import { getUserList, modifyStatus } from '../account/request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                    query: '',
                    subjectType: '',
                    schoolId: ''
                },
                subjectOption,
                breadcrumb: ['教师管理'],
                loading: false,
                list: []
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
                this.$store.commit('SHOW_ADD_TEACHER', {
                    teacher: null,
                    isModified: false
                });
            },
            /**
             * 批量导入 
             */
            batchImport () {
                this.$store.commit('SHOW_IMPORT_TEACHER');
            },

            /**
             * 编辑
             */
            edit (teacher) {
                this.$store.commit('SHOW_ADD_TEACHER', {
                    teacher: teacher,
                    isModified: true
                });
            },
            /**
             * 查看教师详情
             */
            showTeacherDetail (teacher) {
                this.$store.commit('SHOW_ADD_TEACHER', {
                    teacher: teacher,
                    isModified: false
                });
            },
            /**
             * 修改状态 
             */
            updateStatus (row) {
                var text = row.status == 1 ? '禁用' : '启用';
                this.$confirm('确认' + text + '账号?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        modifyStatus({
                            id: row.id,
                            status: row.status === 1 ? 2 : 1
                        })
                        .then((res)=> {
                            toast('保存成功');
                            this.fetchList();
                        });
                    });
            },
            /**
             * 查看课表
             */
            showLessonTable (item) {
                this.$root.teacher = {
                    name: item.name,
                    id: item.id
                };
                this.$router.push('/timetable');
            },
            /**
             * 获取账号列表 
             */
            fetchList () {
                var pageDto = this.pageDto;
                var filter = this.filter;
                this.loading = true;
                getUserList({
                    roleType: 2,
                    query: filter.query,
                    subjectType: filter.subjectType,
                    schoolId: filter.schoolId ? [].concat(filter.schoolId): [],
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
