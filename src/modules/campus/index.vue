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
                        @keyup.enter.native="refresh" 
                        v-model.trim="filter.query">
                        <i slot="suffix"
                            @click="refresh"
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
                    prop="name"
                    align="center"
                    label="校区名称">  
                </el-table-column>
                <!-- <el-table-column
                    prop="date"
                    align="center"
                    label="负责人">
                </el-table-column> -->
                <el-table-column
                    prop="address"
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
                            <a href="javascript:;" class="forbidden" @click="del(scope.row)">删除</a>
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
            v-if="$store.state.campus.showAddCampusState" 
            @save="refresh">
        </add>
    </div>
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import { getList, del } from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {
                    query: ''
                },
                breadcrumb: ['校区管理'],
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
             * 删除 
             */
            del (row) {
                this.$confirm('确认删除校区?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        del({
                            id: row.id
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
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
            Add
        }
    }
</script>
