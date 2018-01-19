<template>
    <div class="material-list teacher-wrap" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12">
               <el-button type="primary" @click="add">添加课程</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
             <div class="filter-wrap" style="padding-left:20px;">
                <div class="filter-box">
                    <el-input 
                        placeholder="请输入课程名称"
                        @keyup.enter="refresh"
                        style="width: 180px;" 
                        v-model.trim="filter.name">
                        <i slot="suffix" 
                            class="el-input__icon el-icon-search pointer">
                        </i>
                    </el-input>
                    <el-select 
                        placeholder="请选择状态" 
                        style="width: 180px;"
                        clearable
                        v-model.trim="filter.status">
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
                        v-model.trim="filter.subjectId">
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
                <ul @click="applyCourse" :class="{'can-apply': this.$root.hasAuth(1)}">
                    <li><img
                        width="250"
                        title="结构化面试专项班"
                        height="166"
                        :src="'http://img.gsxservice.com/36218_w4bny0tf.jpeg'|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">结构化面试专项班</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail">详情</el-button>
                            <el-button type="text" @click="setStickStatus">置顶</el-button>
                            <el-button type="text" @click="updateStatus">上架</el-button>
                            <el-button type="text" class="danger" @click="del">删除</el-button>
                        </li>
                    </div>
                </ul>
                <ul>
                    <li><img
                        width="250"
                        height="166"
                        :src="'http://img.gsxservice.com/36218_w4bny0tf.jpeg'|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">结构化面试专项班</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail">详情</el-button>
                            <el-button type="text" @click="setStickStatus">置顶</el-button>
                            <el-button type="text" @click="updateStatus">上架</el-button>
                            <el-button type="text" class="danger" @click="del">删除</el-button>
                        </li>
                    </div>
                </ul>
                <ul>
                    <li><img
                        width="250"
                        height="166"
                        :src="'http://img.gsxservice.com/36218_w4bny0tf.jpeg'|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">结构化面试专项班</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail">详情</el-button>
                            <el-button type="text" @click="setStickStatus">置顶</el-button>
                            <el-button type="text" @click="updateStatus">上架</el-button>
                            <el-button type="text" class="danger" @click="del">删除</el-button>
                        </li>
                    </div>
                </ul>
                <ul>
                    <li><img
                        width="250"
                        height="166"
                        :src="'http://img.gsxservice.com/36218_w4bny0tf.jpeg'|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">结构化面试专项班</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail">详情</el-button>
                            <el-button type="text" @click="setStickStatus">置顶</el-button>
                            <el-button type="text" @click="updateStatus">上架</el-button>
                            <el-button type="text" class="danger" @click="del">删除</el-button>
                        </li>
                    </div>
                </ul>
                <ul>
                    <li><img
                        width="250"
                        height="166"
                        :src="'http://img.gsxservice.com/36218_w4bny0tf.jpeg'|compressImage(250, 166)"></li>
                    <div>
                        <li class="title">结构化面试专项班</li>
                        <li class="opt" v-if="$root.hasAuth(3)">
                            <el-button type="text" @click="detail">详情</el-button>
                            <el-button type="text" @click="setStickStatus">置顶</el-button>
                            <el-button type="text" @click="updateStatus">上架</el-button>
                            <el-button type="text" class="danger" @click="del">删除</el-button>
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
                v-if="$store.state.course.showAddCourseState">
            </add>
            <apply 
                v-if="$store.state.course.showApplyCourseState">
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
    import Apply from './components/apply.vue'

    export default {
        mixins: [listPageDto],
        data () {
            return {
                filter: {},
                subjectOption,
                statusOptions: config.statusOptions,
                breadcrumb: ['课程管理'],
                loading: false,
                list: [{}]
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
            updateStatus () {
                this.$confirm('确认上架?', '提示', {
                        type: 'warning'
                    }).then(() => {
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
            setStickStatus () {
                this.$confirm('确认置顶?', '提示', {
                        type: 'warning'
                    }).then(() => {
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
            }
        },
        components: {
            BreadcrumbNav,
            Apply,
            Add
        }
    }
</script>