<template>
    <div class="material-list" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
                <el-button 
                    type="primary" 
                    @click="apply">申请教室</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <campus-filter
                        v-model="filter.campus">
                    </campus-filter>
                    <el-input 
                        placeholder="请输入教室名称" 
                        style="width: 240px;"
                        @keyup.enter="refresh" 
                        v-model.trim="filter.campus">
                        <i slot="suffix" 
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <el-select
                    v-model="filter.status"
                    style="width: 180px;" 
                    placeholder="请选择状态">

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
                        <a href="javascript:;">李小斌</a>
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
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" @click="updateStatus(scope.row)">更新状态</a>
                            <a href="javascript:;" @click="showDetail(scope.row)">查看详情</a>
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
            },
            /**
             * 查看申请详情 
             */
            showDetail (applyItem) {
                this.$store.commit('SHOW_APPLY_EQUIPMENT', applyItem);
            },
            /**
             * 申请教室 
             */
            apply () {
                this.$store.commit('SHOW_APPLY_EQUIPMENT');
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