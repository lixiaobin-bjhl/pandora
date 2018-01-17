<template>
    <div class="material-list account-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               <el-button type="primary" @click="add">添加校区</el-button>
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
                empty-text="没有找到校区信息"
                :data="list"
                :highlight-current-row="true"
                >
                <el-table-column
                    align="center"
                    label="校区名称">  
                    <template slot-scope="scope">
                        <a href="javascript:;">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    align="center"
                    label="负责人">
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
                            <a href="javascript:;" @click="edit(scope.row)">编辑</a>
                            <a href="javascript:;" class="forbidden" @click="del">删除</a>
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
        <add v-if="$store.state.campus.showAddCampusState">
        </add>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                filter: '',
                breadcrumb: ['校区管理'],
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
            Add
        }
    }
</script>
