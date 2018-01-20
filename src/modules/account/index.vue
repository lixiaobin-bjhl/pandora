<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               <el-button type="primary" @click="add">添加账号</el-button>
               <el-button type="default" plain @click="batchImport">导入</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input 
                        placeholder="请输入用户姓名"
                        @keyup.enter.native="refresh" 
                        style="width: 240px;" 
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
                empty-text="没有找到账号信息"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column
                    prop="name"
                    align="center"
                    label="账号">  
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    align="center"
                    label="校区">
                </el-table-column>
                <el-table-column
                    prop="chargerName"
                    align="center"
                    label="负责人">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="是否有教室">
                    <template slot-scope="scope">
                       {{scope.row.hasRoom ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="roomCount"
                    align="center"
                    label="教室个数">
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
                    prop="date"
                    :min-width="120"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" @click="showAccountDetail(scope.row)">详情</a>
                            <a href="javascript:;" @click="edit(scope.row)">编辑</a>
                            <a href="javascript:;" class="forbidden" v-if="scope.row.status === 1" @click="updateStatus(scope.row)">禁用账号</a>
                            <a href="javascript:;" class="enable" v-if="scope.row.status === 2" @click="updateStatus(scope.row)">启用账号</a>
                            <a href="javascript:;" @click="modifyPassword(scope.row)">重置密码</a>
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
        <add v-if="$store.state.account.showAddAccountState"  
        @save="refresh">
        </add>
        <batch-import v-if="$store.state.account.showImportAccountState">
        </batch-import>
        <modify-pwd 
            v-if="$store.state.account.showModifyPwdState" 
            @save="refresh">
        </modify-pwd>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import BatchImport from './components/BatchImport.vue';
    import ModifyPwd from './components/ModifyPwd';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import { getUserList, modifyStatus } from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {
                    query: '',
                    schoolId: ''
                },
                breadcrumb: ['账号管理'],
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
                this.$store.commit('SHOW_ADD_ACCOUNT', {
                    account: null,
                    isModified: false
                });
            },
            /**
             * 批量导入 
             */
            batchImport () {
                this.$store.commit('SHOW_IMPORT_ACCOUNT');
            },
            /**
             * 查看账号详情
             */
            showAccountDetail (account) {
                this.$store.commit('SHOW_ADD_ACCOUNT', {
                    account: account,
                    isModified: false
                });
            },

            /**
             * 编辑账号
             */
            edit (account) {
                this.$store.commit('SHOW_ADD_ACCOUNT', {
                    account: account,
                    isModified: true
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
                        });
                    });
            },
            /**
             * 修改密码 
             */
            modifyPassword (account) {
                this.$store.commit('SHOW_MODIFY_PWD', account);
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
                getUserList({
                    roleType: 1,
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
            Add,
            ModifyPwd,
            CampusFilter,
            BatchImport
        }
    }
</script>
