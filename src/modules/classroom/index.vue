<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               &nbsp;
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input 
                        placeholder="请输入教室名称" 
                        style="width: 240px;"
                        @keyup.enter.native="refresh" 
                        v-model.trim="filter.query">
                        <i slot="suffix"
                            @click="refresh"
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <campus-filter
                        @change="refresh"
                        v-model="filter.schoolId">
                    </campus-filter>
                </div>
            </div>
            <el-table 
                ref="table"
                border
                empty-text="没有找到教室信息"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column
                    prop="name"
                    align="center"
                    label="教室名称">
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    align="center"
                    label="所属校区">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="教室类型">
                    <template slot-scope="scope">
                        {{scope.row.roomType === 1 ? '学生端' : '老师端'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="schoolName"
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
                    prop="date"
                    :min-width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" 
                                :class="{'forbidden': scope.row.status ===1, 'enable': scope.row.status === 2}" 
                                @click="updateStatus(scope.row)">
                                {{scope.row.status === 1? '停用': '恢复'}}</a>
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
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import { getList, modifyStatus } from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                    query: '',
                    schoolId: ''
                },
                loading: false,
                breadcrumb: ['教室管理'],
                loading: false,
                list: []
            }
        },
        mounted () {
            this.fetchList()
        },
        methods: {
            /**
             * 添加
             */
            add () {
                this.$store.commit('SHOW_ADD_CAMPUS');
            },
            /**
             * 编辑
             */
            edit (campus) {
                this.$store.commit('SHOW_ADD_CAMPUS', campus);
            },
            /**
             * 修改状态 
             */
            updateStatus (row) {
                var text = row.status == 1 ? '禁用' : '启用';
                this.$confirm('确认' + text + '教室?', '提示', {
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
             * 获取列表 
             */
            fetchList () {
                var pageDto = this.pageDto;
                var filter = this.filter;
                this.loading = true;
                getList({
                    query: filter.query,
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
            CampusFilter
        }
    }
</script>
