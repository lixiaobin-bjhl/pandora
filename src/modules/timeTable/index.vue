<!--
	@file matteo-课表
-->

<template>
	<div>
        <div>
            <el-row>
                <el-col :span="3">
                    <el-select v-model="filter.teacherId" placeholder="请选择老师"></el-select>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="filter.classroomId" placeholder="请选择教室"></el-select>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="filter.teacherId" placeholder="搜索课程"></el-input>
                </el-col>
                <span class="pull-right">
                    <week-select 
                        @changedate="changeDate"
                        v-model="date"></week-select>
                </span> 
            </el-row>
        </div>
		<transition name="fade" mode="out-in">
			<time-table 
				ref="timetable"
				:time="date"
				v-on:refresh="refresh">
			</time-table>
		</transition>
	</div>
</template>

<script>

    import TimeTable from './components/TimeTable';
    import { list } from './request';
    import WeekSelect from '../../common/components/WeekSelect';
    import getWeekDaysByDay from '../../common/function/getWeekDaysByDay';

    var today = new Date();

    export default {
        data () {
            return {
                filter: {},
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
        },
        components: {
            TimeTable,
            WeekSelect
        },
        created () {
            this.getList();
        },
        methods: {
            /**
             * 改变日期 
             */
            changeDate (date) {
                console.log(getWeekDaysByDay(date));
            },
            /**
             * 获取课节信息 
             */
            getList () {
                var filter = this.filter;
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
        }
    };
</script>