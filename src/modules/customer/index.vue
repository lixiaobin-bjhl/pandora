<template>
    <div class="material-list" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav
                    @back="enterList"
                    :data="breadcrumb"></breadcrumb-nav>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box">
                    <el-input placeholder="请输入搜索关键词" 
                        style="width: 420px;" 
                        v-model.trim="filter.key"
                        suffix-icon="el-icon-search"
                        class="input-with-select">
                        <el-select v-model="type" slot="prepend">
                            <el-option label="微信昵称" value="1"></el-option>
                            <el-option label="姓名" value="2"></el-option>
                            <el-option label="手机" value="3"></el-option>
                            <el-option label="咨询顾问" value="4"></el-option>
                        </el-select>
                    </el-input>
                </div>
            </div>

            <el-table
                ref="table"
                :data="list"
                empty-text="没有找到客户信息"
                fixed="left"
                :highlight-current-row="true">
                <el-table-column
                    label="微信昵称"
                >  
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="enterDetail">{{scope.row.id}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                   
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    :min-width="90"
                    label="手机">
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.gender === 0">未知</span>
                        <span v-if="scope.row.gender === 1">男</span>
                        <span v-if="scope.row.gender === 2">女</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="source"
                    label="来源">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="公众号">
                    <template slot-scope="scope">
                       {{scope.row.subscribe? '已关注': '未关注'}} 
                    </template>
                </el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="consulterName"
                    label="资询顾问">
                </el-table-column>
                <el-table-column
                    prop="patientProjectCnt"
                    label="已做项目数">
                </el-table-column>
                <el-table-column
                    prop="date"
                    :min-width="120"
                    label="添加时间">
                    <template slot-scope="scope">
                       {{scope.row.createTime|date('yyyy-MM-dd HH:mm')}} 
                    </template>
                    
                </el-table-column>
                <el-table-column
                    prop="date"
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="btn-group">
                            <el-tooltip placement="top" content="编辑客户">
                                <icon @click.native="modifyCustomer(scope.row)" scale="2" name="edit"></icon>
                            </el-tooltip>
                            <el-tooltip placement="top" content="添加项目">
                                <icon @click.native="addItem(scope.row)" scale="2" name="add-project"></icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageInfo">
            </pager>
        </div>
        <detail
            ref="detail"
            v-if="$store.state.customer.showDetailState"
            ></detail>
        <coupon 
            v-if="$store.state.customer.showCouponState"></coupon>
        <add-item 
            v-if="$store.state.customer.showAddItemState"
            @save="updateList"
            ></add-item>
        <customer 
            v-if="$store.state.customer.showAddCustomerState" 
            @save="updateList"></customer>
    </div>
   
</template>

<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import Detail from './components/Detail.vue';
    import Coupon from './components/Coupon.vue';
    import AddItem from './components/AddItem.vue';
    import Customer from './components/Customer.vue';
    import listPageDto from '../../common/mixin/listPageDto';
    import {getList} from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {
                    key: ''   
                },
                type: '1',
                list: [],
                breadcrumb: ['客户档案'],
                loading: false
            }
        },
        mounted () {
            this.fetchList();
        },
        methods: {
            /**
             * 编辑客户 
             */
            modifyCustomer (item) {
                this.$store.commit('SHOW_ADD_CUSTOMER_DETIAL', item.id);
            },
            /**
             * 添加项目 
             */
            addItem (item) {
                this.$store.commit('SHOW_ADD_ITEM_DETIAL', item.id);
            },
            /**
             * 更新列表 
             */
            updateList () {
                this.refresh();
                this.$refs.detail.$emit('updatedetail');
            },
            /**
             * 获取列表 
             */
            fetchList () {
                var pageInfo = this.pageInfo;
                var filter = this.filter;
                this.loading = true;
                getList({
                    key: filter.key,
                    pageNum: pageInfo.pageNum,
                    showCount: true,
                    pageSize: pageInfo.pageSize
                })
                .then((res)=> {
                    this.list = res.data.list;
                    Object.assign(this.pageInfo, res.pageInfo);
                    this.loading = false;
                }, ()=> {
                    this.loading = false;
                });
            },
            /**
             * 返回列表页
             */
            enterList () {
                this.$store.commit('HIDE_DETIAL_DETIAL');
            },
            /**
             * 进入详情
             */
            enterDetail (id) {
                this.$store.commit('SHOW_CUSTOMER_DETIAL', id);
            }
        },
        components: {
            BreadcrumbNav,
            Detail,
            AddItem,
            Customer,
            Coupon
        }
    }
</script>
