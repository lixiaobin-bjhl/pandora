<template>
    <div class="material-list" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav
                    @back="enterList"
                    :data="breadcrumb" ></breadcrumb-nav>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input placeholder="请输入内容" style="width: 300px;" v-model.trim="key" class="input-with-select">
                        <el-select v-model="type" slot="prepend">
                            <el-option label="微信昵称" value="1"></el-option>
                            <el-option label="姓名" value="2"></el-option>
                            <el-option label="手机" value="3"></el-option>
                            <el-option label="咨询顾问" value="4"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>

            <el-table
                ref="table"
                v-if="list && list.length"
                :data="list"
                :highlight-current-row="true">
                <el-table-column
                    label="微信昵称"
                >  
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="enterDetail">李小斌</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="手机">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="来源">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="正式客户">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="公众号">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="资询顾问">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="已做项目数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="添加时间">
                </el-table-column>
                <el-table-column
                    prop="date"
                    fixed="right"
                    label="操作">
                </el-table-column>
            </el-table>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
        </div>
        <detail
            ref="detail"
            v-if="$store.state.customer.showDetailState"
            ></detail>
    </div>
   
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import Detail from './components/Detail.vue';
    import listPageDto from '../../common/mixin/listPageDto';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                type: '1',
                list: [{}],
                breadcrumb: ['客户档案'],
                loading: false
            }
        },
        methods: {
            /**
             * 返回列表页
             */
            enterList () {
                this.$store.commit('HIDE_DETAIL_DETAIL');
            },
            /**
             * 进入详情
             */
            enterDetail (id) {
                this.$store.commit('SHOW_CUSTOMER_DETAIL', id);
            }
        },
        components: {
            BreadcrumbNav,
            Detail
        }
    }
</script>
