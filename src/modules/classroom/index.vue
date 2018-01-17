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
                    <campus-filter
                        v-model="filter.campus">
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
                    align="center"
                    label="教室名称">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="所属校区">
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="date"
                    :min-width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <a href="javascript:;" class="enable" @click="edit(scope.row)">启用</a>
                            <a href="javascript:;"  class="forbidden" @click="del">删除</a>
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

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: {},
                breadcrumb: ['教室管理'],
                loading: false,
                list: [{}]
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
             * 删除 
             */
            del () {
                this.$confirm('确认删除校区?', '提示', {
                        type: 'warning'
                    }).then(() => {
                    });
            },
            /**
             * 获取列表 
             */
            fetchList () {
                var pageDto = this.pageDto;
            }
        },
        components: {
            BreadcrumbNav,
            CampusFilter
        }
    }
</script>
