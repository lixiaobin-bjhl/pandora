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
                        v-model="filter.campus">
                    </campus-filter>
                    <teacher-filter
                    v-model="filter.teacherId" 
                    ></teacher-filter>
                    <classroom-filter  v-model="filter.classroomId"></classroom-filter>
                    <el-input
                        style="width:180px"
                        v-model="filter.teacherId" 
                        placeholder="搜索课程">
                        <i slot="suffix" 
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
        <add v-if="$store.state.timetable.showLessonDetailState"></add>
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
    import TeacherFilter from 'src/common/components/TeacherFilter.vue';
    import Add from './components/Add.vue';

    var today = new Date();

    export default {
        data () {
            return {
                loading: false,
                filter: {},
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
                list(filter)
                    .then((res)=> {
                        this.loading = false;
                        this.$refs.timetable.$emit('setlesson', res.data.list);
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
        components: {
            BreadcrumbNav,
            TimeTable,
            ClassroomFilter,
            TeacherFilter,
            Add,
            CampusFilter,
            WeekSelect
        }
    };
</script>