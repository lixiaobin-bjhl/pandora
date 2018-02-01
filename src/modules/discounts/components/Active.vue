<template>
    <div>
        <div class="filter-wrap">
            <div class="filter-box">
                <el-input placeholder="请输入搜索关键词" 
                        style="width: 420px;"
                        @keyup.enter.native="refresh" 
                        v-model.trim="filter.key"
                        class="input-with-select">
                        <el-select v-model="filter.queryNameType" style="width: 100px;" slot="prepend">
                            <el-option label="活动名称" value="CouponActivity"></el-option>
                            <el-option label="卡劵名称" value="CouponRule"></el-option>
                        </el-select>
                        <span slot="suffix" class="el-input__icon el-icon-search pointer" @click="refresh"></span>
                    </el-input>
            </div>
        </div>
        <el-table
            ref="table"
            v-if="list && list.length"
            :data="list"
            empty-text="没有找到活动信息"
            v-loading="loading"
            :highlight-current-row="true">
            <el-table-column
                label="活动名称"
            >  
                <template slot-scope="scope">
                    <a href="javascript:;" @click="showAcitve(scope.row)">{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="couponConcatName"
                label="发送卡劵名">
            </el-table-column>
            <el-table-column
                prop="triggerTypeStr"
                label="发卷方式">
            </el-table-column>
            <el-table-column
                prop="date"
                label="是否有好友卷">
                <template slot-scope="scope">
                    <div :class="{'text-danger': scope.row.hasShareCoupon}">
                        {{scope.row.hasShareCoupon?'是':'否'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="shareCount"
                label="好友卷张数">
            </el-table-column>
            <el-table-column
                prop="canFission"
                label="是否可列变">
                 <template slot-scope="scope">
                    <div :class="{'text-danger': scope.row.canFission}">
                        {{scope.row.canFission?'是':'否'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="sendCount"
                label="已发劵(裂变劵)">
            </el-table-column>
            <el-table-column
                prop="fissionCount"
                label="已使用(裂变劵)">
            </el-table-column>
            <el-table-column
                prop="statusStr"
                label="状态">
            </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <div class="btn-group">
                        <el-tooltip placement="top" content="删除">
                            <icon @click.native="del(scope.row)" scale="2" name="delete"></icon>
                        </el-tooltip>
                        <el-tooltip placement="top" content="开启活动" v-if="scope.row.canRun">
                            <icon @click.native="runActivity(scope.row)" scale="2" name="enable"></icon>
                        </el-tooltip>
                        <el-tooltip placement="top" content="暂停活动" v-if="scope.row.canPause">
                            <icon @click.native="pauseActivity(scope.row)" scale="2" name="stop"></icon>
                        </el-tooltip>
                    </div>
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
        <add-active 
            v-if="$store.state.discounts.showAddActiveState" 
            @save="refresh"></add-active>
    </div>
</template>

<script>

    import listPageDto from '../../../common/mixin/listPageDto';
    import AddActive from './AddActive.vue';
    import { getActivityList, delActivity, pauseActivity, runActivity} from '../request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {
                    key: '',
                    queryNameType: 'CouponActivity'
                },
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
             * 获取活动列表 
             */
            fetchList () {
                var pageInfo = this.pageInfo;
                var filter = this.filter;
                this.loading = true;
                getActivityList({
                    nameKey: filter.key,
                    queryNameType: filter.queryNameType,
                    pageNum: pageInfo.pageNum,
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
             * 添加活动 
             */
            add () {
                this.$store.commit('SHOW_ADD_ACTIVE');
            },
            /**
             * 删除活动 
             */
            del (item) {
                this.$confirm('确认删除?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        delActivity({
                            id: item.id
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        });
                    });
            },
            /**
             * 暂停 
             */
            pauseActivity (item) {
                this.$confirm('确认暂停?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        pauseActivity({
                            id: item.id
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        });
                    });
            },
            /**
             * 运行
             */
            runActivity (item) {
                this.$confirm('确认运行?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        pauseActivity({
                            id: item.id
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        });
                    });
            },
            /**
             * 展示活动 
             */
            showAcitve (active) {
                this.$store.commit('SHOW_ADD_ACTIVE', active);
            }
        },
        components: {
            AddActive
        }
    }
</script>