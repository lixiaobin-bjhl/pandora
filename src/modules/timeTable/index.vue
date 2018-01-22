<!--
	@file matteo-课表
-->

<template>
    <div class="material-list" v-loading.fullscreen.lock="loading">
        <el-row class="module-title">
            <el-col :span="12">
                <breadcrumb-nav :data="breadcrumb"></breadcrumb-nav>
            </el-col>
            <el-col :span="12" class="btn-group">
            <el-button 
                type="default" 
                plain 
                >导出</el-button>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-wrap">
                <div class="filter-box clearfix">
                    <campus-filter
                        @change="refresh"
                        placeholder="请选择校区"
                        v-model="filter.schoolId">
                    </campus-filter>
                    <user-filter
                        :role-type="2"
                        @change="refresh"
                        placeholder="请选择教师"
                        :name="filter.teacherName"
                        :is-multiple="true"
                        v-model="filter.teacherId" 
                    ></user-filter>
                    <classroom-filter
                        @change="refresh"
                        placeholder="请选择教室"
                        :room-type="2"  
                        v-model="filter.classRoomId"></classroom-filter>
                    <el-input
                        style="width:180px"
                        v-model="filter.query"
                        @keyup.enter.native="refresh"
                        placeholder="输入课程搜索">
                        <i slot="suffix"
                            @click="refresh"
                            class="el-input__icon el-icon-search pointer">
                        </i>
                        </el-input>
                    <span class="pull-right">
                        <week-select 
                            @changedate="changeDate"
                            v-model="date"></week-select>
                    </span>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <time-table 
                    ref="timetable"
                    :time="date"
                    @editlesson="editLesson"
                    v-on:refresh="refresh">
                </time-table>
            </transition>
        </div>
        <add v-if="$store.state.timetable.showLessonDetailState" 
            @save="refresh"></add>
    </div>
</template>

<script>

    import TimeTable from './components/TimeTable';
    import BreadcrumbNav from '../../common/components/BreadcrumbNav.vue';
    import { list } from './request';
    import WeekSelect from '../../common/components/WeekSelect';
    import getWeekDaysByDay from '../../common/function/getWeekDaysByDay';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import ClassroomFilter from 'src/common/components/ClassroomFilter.vue';
    import UserFilter from 'src/common/components/UserFilter.vue';
    import Add from './components/Add.vue';

    var today = new Date();

    export default {
        data () {
            var teacher = this.$root.teacher;
            return {
                loading: false,
                filter: {
                    query: '',
                    classRoomId: '',
                    teacherId: teacher ? [].concat(teacher.id) : [],
                    teacherName: teacher ? teacher.name : '',
                    schoolId: ''
                },
                breadcrumb: ['查看课表'],
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
        },
        created () {
            this.getList();
        },
        methods: {
            /**
             * 改变日期 
             */
            changeDate (date) {
                this.date = date;
                this.getList();
            },
            /**
             * 编辑课节 
             */
            editLesson (event) {
                this.$store.commit('SHOW_LESSON_DETAIL', event.id);
            },
            /**
             * 获取课节信息 
             */
            getList () {
                var filter = this.filter;
                var days = getWeekDaysByDay(this.date);
                this.loading = true;
                var startTime = new Date(days[0].timestamp);
                var endTime = new Date(days[6].timestamp);
                list({
                    schoolId: filter.schoolId,
                    teacherId: filter.teacherId,
                    classRoomId: filter.classRoomId,
                    courseName: filter.query,
                    startTime: +new Date(
                        startTime.getFullYear(), 
                        startTime.getMonth(),
                        startTime.getDate(),
                        0,
                        0,
                        0
                    ),
                    endTime: +new Date(
                        endTime.getFullYear(), 
                        endTime.getMonth(),
                        endTime.getDate(),
                        23,
                        59,
                        59
                    )
                })
                    .then((res)=> {
                        this.loading = false;
                        this.$refs.timetable.$emit('setlesson', res.data);
                    })
                    .then(()=> {
                        this.loading = false;
                    });
            },
            /**
             * 刷新列表
             */
            refresh () {
                this.getList();
            }
        },
        beforeDestroy () {
            this.$root.teacher = null;
        },
        components: {
            BreadcrumbNav,
            TimeTable,
            ClassroomFilter,
            UserFilter,
            Add,
            CampusFilter,
            WeekSelect
        }
    };
</script>