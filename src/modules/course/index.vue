<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               <el-button type="primary" 
                v-if="$root.hasAuth(3)" 
                @click="add">添加课程</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
             <div class="filter-wrap" style="padding-left:20px;">
                <div class="filter-box">
                    <el-input 
                        placeholder="请输入课程名称"
                        @keyup.enter.native="refresh"
                        style="width: 240px;" 
                        v-model.trim="filter.query">
                        <i slot="suffix"
                            @click="refresh"
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <el-select 
                        placeholder="请选择状态" 
                        style="width: 180px;"
                        @change="refresh"
                        clearable
                        v-model.trim="filter.isOnline">
                        <el-option
                            v-for="item,index in statusOptions"
                            :label="item.name"
                            :value="item.id"
                            :key="index">
                        </el-option>
                    </el-select>
                    <el-select 
                        placeholder="请选择科目" 
                        style="width: 180px;"
                        clearable
                        @change="refresh"
                        v-model.trim="filter.subjectType">
                        <el-option
                            v-for="item,index in subjectOption"
                            :label="item.name"
                            :value="item.id"
                            :key="index">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="course-list">
                <ul @click="applyCourse(item)"
                    v-for="item,index in list" 
                    :key="index"
                    :class="{'can-apply': $root.hasAuth(1)}">
                    <li>
                        <img
                        width="250"
                        title="结构化面试专项班"
                        height="166"
                        :src="item.cover|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">{{item.name}}</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail(item)">详情</el-button>
                            <el-button type="text" @click="setStickStatus(item)">{{item.isTop ? '取消置顶': '置顶'}}</el-button>
                            <el-button type="text" @click="updateStatus(item)">{{item.isOnline ? '下架': '上架'}}</el-button>
                            <!-- <el-button type="text" class="danger" @click="del">删除</el-button> -->
                        </li>
                    </div>
                </ul>
            </div>
            <div class="none-list" v-if="list && !list.length">
                <span>暂无课程信息</span>
            </div>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
            <add 
                v-if="$store.state.course.showAddCourseState"
                @save="fetchList"
                >
            </add>
            <apply 
                v-if="$store.state.course.showApplyCourseState"  
                @save="fetchList">
            </apply>
        </div>
    </div>
</template>


<script>

    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import subjectOption from '../../common/config/subjectOption';
    import config  from './config';
    import listPageDto from '../../common/mixin/listPageDto';
    import Add from './components/Add.vue';
    import Apply from './components/Apply.vue';
    import { getList, updateOnlineStatus, updateTopStatus} from './request';

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {
                    query: '',
                    subjectOption: '',
                    isOnline: ''
                },
                subjectOption,
                statusOptions: config.statusOptions,
                breadcrumb: ['课程管理'],
                loading: false,
                list: []
            }
        },
        mounted () {
            this.fetchList()
        },
        methods: {
            /**
             * 申请课程
             * 
             * @parma {Object} course 查看课程详情
             */
            applyCourse (course) {
                // 不是分校就不能申请
                if (!this.$root.hasAuth(1)) {
                    return;
                }
                this.$store.commit('SHOW_APPLY_COURSE', {
                    course: course,
                    isShowDetail: false
                });
            },
            /**
             * 添加课程 
             */
            add () {
                this.$store.commit('SHOW_ADD_COURSE');
            },
            /**
             * 查看详情
             * 
             * @parma {Object} course 查看课程详情
             */
            detail (course) {
                this.$store.commit('SHOW_APPLY_COURSE', {
                    course: course,
                    isShowDetail: true
                });
            },
            /**
             * 更新状态 
             */
            updateStatus (item) {
                var isOnline = item.isOnline;
                var text = isOnline ? '下架': '上架';
                this.$confirm('确认'+ text + '?', '提示', {
                    type: 'warning'
                }).then(() => {
                    updateOnlineStatus({
                        id: item.id,
                        isOnline: isOnline ? 0 : 1
                    })
                    .then(()=> {
                        toast('保存成功', 'success');
                        this.fetchList();
                    })
                });
            },
            /**
             * 删除课程 
             */
            del () {
                this.$confirm('确认删除?', '提示', {
                        type: 'warning'
                    }).then(() => {
                    });
            },
            /**
             * 设置置顶状态 
             */
            setStickStatus (item) {
                var isTop = item.isTop;
                var text = isTop ? '取消置顶' : '置顶';

                this.$confirm('确认' + text + '?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        updateTopStatus({
                            id: item.id,
                            isTop: isTop ? 0 : 1
                        })
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.fetchList();
                        });
                    });
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
                var filter = this.filter;
                this.loading = true;
                getList({
                    query: filter.query,
                    isOnline: filter.isOnline,
                    subjectType: filter.subjectType,
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
            Apply,
            Add
        }
    }
</script>