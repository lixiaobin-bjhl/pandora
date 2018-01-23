<template>
    <div>
        <div class="filter-wrap">
            <div class="filter-box">
                <el-input placeholder="请输入内容" style="width: 300px;" v-model.trim="key" class="input-with-select">
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
                label="卡劵名称"
            >  
                <template slot-scope="scope">
                    <a href="javascript:;" @click="showCoupons(scope.row)">李小斌</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="卡券有效期">
            </el-table-column>
            <el-table-column
                prop="date"
                label="卡券规则">
            </el-table-column>
            <el-table-column
                prop="date"
                label="添加时间">
            </el-table-column>
            <el-table-column
                prop="date"
                label="已发卷">
            </el-table-column>
            <el-table-column
                prop="date"
                label="已使用">
            </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-tooltip placement="top" content="删除">
                        <span
                            @click="del"
                            class="el-icon-edit-outline"></span>
                    </el-tooltip>
                    <el-tooltip placement="top" content="更新状态">
                        <span 
                            @click="updateStatus"
                            class="el-icon-circle-plus"></span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="!list.length" class="none-list">
            <span>暂无设置信息</span>
        </div>
        <pager 
            @currentchange="changePage"
            @sizechange="changeSize"
            v-model="pageInfo">
        </pager>
        <add-coupons 
            v-if="$store.state.discounts.showAddCouponsState">
        </add-coupons>
    </div>
</template>

<script>

    import listPageDto from '../../../common/mixin/listPageDto';
    import AddCoupons from './AddCoupons.vue';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                key: '',
                activeName: '1',
                view: 'Active',
                list: [{}],
                loading: false
            }
        },
        mounted () {
            this.$on('add', this.add);
        },
        methods: {
            /**
             * 添加活动 
             */
            add () {
                this.$store.commit('SHOW_ADD_COUPONS');
            },
            /**
             * 删除活动 
             */
            del () {
                this.$confirm('确认删除?', '提示', {
                        type: 'warning'
                    }).then(() => {
                    });
            },
            /**
             * 更新状态 
             */
            updateStatus () {
                this.$confirm('确认启用?', '提示', {
                        type: 'warning'
                    }).then(() => {
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