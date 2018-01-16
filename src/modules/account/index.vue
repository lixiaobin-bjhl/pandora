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
                        placeholder="请输入校区名称" 
                        style="width: 240px;"
                        @keyup.enter="refresh" 
                        v-model.trim="filter.campus">
                        <i slot="suffix" 
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
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
                    align="center"
                    label="账号">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
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
                    label="负责人">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="是否有教室">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="教室个数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    :min-width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" @click="showAccountDetail(scope.row)">查看详情</a>
                            <a href="javascript:;" @click="updateStatus">停用账号</a>
                            <a href="javascript:;" @click="modifyPassword">重置密码</a>
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
        <add v-if="$store.state.account.showAddAccountState">
        </add>
        <batch-import v-if="$store.state.account.showImportAccountState">
        </batch-import>
        <modify-pwd v-if="$store.state.account.showModifyPwdState">
        </modify-pwd>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import BatchImport from './components/BatchImport.vue';
    import ModifyPwd from './components/ModifyPwd';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: '',
                breadcrumb: ['账号管理'],
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
                this.$store.commit('SHOW_ADD_ACCOUNT');
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
                 this.$store.commit('SHOW_ADD_ACCOUNT', account);
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
             * 修改密码 
             */
            modifyPassword () {
                this.$store.commit('SHOW_MODIFY_PWD');
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
            ModifyPwd,
            BatchImport
        }
    }
</script>
