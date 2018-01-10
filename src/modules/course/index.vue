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
            <div class="course-list">
                <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text" @click="detail">详情</el-button>
                        <el-button type="text" @click="setStickStatus">置顶</el-button>
                        <el-button type="text" @click="updateStatus">上架</el-button>
                        <el-button type="text" @click="del">删除</el-button>
                    </li>
                </ul>
                <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
                 <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
                 <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
                 <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
                <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
                <ul>
                    <li><img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg"></li>
                    <li>结构化面试专项班</li>
                    <li class="opt">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">置顶</el-button>
                        <el-button type="text">上架</el-button>
                        <el-button type="text">删除</el-button>
                    </li>
                </ul>
            </div>
            <pager 
                @currentchange="changePage"
                @sizechange="changeSize"
                v-model="pageDto">
            </pager>
            <add 
                v-if="$store.state.course.showAddCourseState">
            </add>
        </div>
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
             * 添加课程 
             */
            add () {
                this.$store.commit('SHOW_ADD_COURSE');
            },
            /**
             * 详情 
             */
            detail () {

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
            Add
        }
    }
</script>