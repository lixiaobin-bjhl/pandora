<template>
    <div>
        <div class="filter-wrap">
            <div class="filter-box">
                 <el-input placeholder="请输入卡券名称搜索" 
                        style="width: 360px;"
                        @keyup.enter.native="refresh" 
                        v-model.trim="filter.key"
                        class="input-with-select">
                        <span slot="suffix" class="el-input__icon el-icon-search pointer" @click="refresh"></span>
                    </el-input>
            </div>
        </div>
        <el-table
            ref="table"
            empty-text="没有找到优惠券信息"
            :data="list"
            v-loading="loading"
            :highlight-current-row="true">
            <el-table-column
                label="卡劵名称"
            >  
                <template slot-scope="scope">
                   {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column
                prop="periodStr"
                label="卡券有效期">
            </el-table-column>
            <el-table-column
                prop="ruleDesc"
                label="卡券规则">
                <template slot-scope="scope">
                   <pre>{{scope.row.ruleDesc}}</pre>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="添加时间">
                <template slot-scope="scope">
                    {{scope.row.createTime|date('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column
                prop="sendCount"
                label="已发券">
            </el-table-column>
            <el-table-column
                prop="usedCount"
                label="已使用">
            </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <div class="btn-group">
                        <el-tooltip placement="top" content="删除">
                            <icon @click.native="del(scope.row)" scale="2" name="delete"></icon>
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
        <add-coupons
            @save="refresh"
            v-if="$store.state.discounts.showAddCouponsState">
        </add-coupons>
    </div>
</template>

<script>

    import listPageDto from '../../../common/mixin/listPageDto';
    import AddCoupons from './AddCoupons.vue';
    import { couponRuleList, couponRuleDelete } from '../request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {}, 
                list: [],
                loading: false
            }
        },
        mounted () {
            this.$on('add', this.add);
            this.fetchList();
        },
        methods: {
             /**
             * 获取列表 
             */
            fetchList () {

                var pageInfo = this.pageInfo;
                var filter = this.filter;

                this.loading = true;
                couponRuleList({
                    nameKey: filter.key,
                    pageNum: pageInfo.pageNum,
                    pageSize: pageInfo.pageSize
                })
                .then((res) => {
                    this.list = res.data.list;
                    Object.assign(this.pageInfo, res.pageInfo);
                    this.loading = false;
                }, ()=> {
                    this.loading = false;
                });
            },
            /**
             * 添加活动 
             */
            add () {
                this.$store.commit('SHOW_ADD_COUPONS');
            },
            /**
             * 删除优惠券
             */
            del (item) {
                this.$confirm('确认删除?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        couponRuleDelete({
                            id: item.id
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        })
                    });
            },
            /**
             * 查看卡券
             */
            showCoupons (coupons) {
                this.$store.commit('SHOW_ADD_COUPONS', coupons);
            },
        },
        components: {
            AddCoupons
        }
    }
</script>