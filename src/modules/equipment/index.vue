<template>
    <div class="material-list" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
                <el-button 
                    type="primary"
                    v-if="$root.hasAuth(1)"
                    @click="apply">申请教室</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <campus-filter
                        v-model="filter.campus">
                    </campus-filter>
                    <el-select
                    v-model="filter.status"
                    clearable
                    @change="refresh"
                    style="width: 180px;" 
                    placeholder="请选择状态">
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
                :data="list"
                empty-text="没有找到报装信息"
                >
                <el-table-column
                    align="center"
                    label="报装校区">  
                    <template slot-scope="scope">
                       李小斌
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申报人">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="申报个数">
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
                    prop="date"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;"
                                v-if="$root.hasAuth(3)" 
                                @click="updateStatus(scope.row)">更新状态</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(3) && scope.row.status == 1" 
                                @click="updateStatus(scope.row)">通过</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(3) && scope.row.status == 1" 
                                @click="updateStatus(scope.row)">拒绝</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(1) && scope.row.status == 1" 
                                @click="withdraw(scope.row)">撤回</a>
                            <a href="javascript:;"
                                v-if="$root.hasAuth(1) && scope.row.status == 4" 
                                @click="edit(scope.row)">编辑</a>
                            <a href="javascript:;"
                                v-if="scope.row.status == 2 || scope.row.status == 3" 
                                @click="updateStatus(scope.row)">状态记录</a>
                            <a href="javascript:;" @click="showDetail(scope.row)">详情</a>
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
        <equipment-status-list 
            v-if="$store.state.equipment.showEquipmentStatusListState">
        </equipment-status-list>
        <apply v-if="$store.state.equipment.showApplyEquipmentState"></apply>
    </div>
</template>


<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import EquipmentStatusList from './components/EquipmentStatusList';
    import Apply from './components/Apply';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import { getApplyList } from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                breadcrumb: ['报装管理'],
                loading: false,
                filter: {
                    key: ''
                },
                list: []
            }
        },
        mounted () {
            this.fetchList();
        },
        methods: {
            /**
             * 修改状态 
             */
            updateStatus () {
                this.$store.commit('SHOW_EQUIPMENT_STATUS_LIST');
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
                this.loading = true;
                getApplyList({
                    pageSize: pageDto.pageSize,
                    pageNum: pageDto.pageNum
                })
                    .then((res)=> {
                        this.list = res.data;
                        this.loading = false;
                    }, ()=> {
                        this.loading = false;
                    });
            },
            /**
             * 查看申请详情 
             */
            showDetail (applyItem) {
                this.$store.commit('SHOW_APPLY_EQUIPMENT', {
                    applyItem: applyItem,
                    isModified: false
                });
            },
            /**
             * 编辑申请 
             */
            edit (applyItem) {
                this.$store.commit('SHOW_APPLY_EQUIPMENT', {
                    applyItem: applyItem,
                    isModified: true
                });
            },
            /**
             * 撤回 
             */
            withdraw () {
                this.$confirm('确认撤回?', '提示', {
                        type: 'warning'
                    }).then(() => {
                    });
            },
            /**
             * 申请教室 
             */
            apply () {
                this.$store.commit('SHOW_APPLY_EQUIPMENT', {
                    applyItem: null,
                    isModified: false
                });
            }
        },
        components: {
            BreadcrumbNav,
            EquipmentStatusList,
            Apply,
            CampusFilter
        }
    }
</script>