<!--
    @file 周选择
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<style lang="scss">
	.week-select {
		> li {
			.week-str {
				margin-right: 5px;
			}
			.el-button {
				margin-right: 3px;
				border: 1px solid #46a0f0;
				color: #46A0FC;
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
</style>

<template>
	<ul class="week-select" v-if="weeks">
		<li class="date-str">
			<span class="week-str">
				{{weeks[6].timestamp | date('yyyy')}}年第{{getYearWeek(weeks[0].timestamp)}}周
			</span>
			<el-button 
				type="default"
				plain
				class="arrow icon-left"  
				@click="forwardWeek('pre')">
				<span class="el-icon-arrow-left"></span>上一周
			</el-button>
			<el-button
				plain
				type="default"
				class="arrow icon-right" 
				@click="forwardWeek('next')">
				下一周
				<span class="el-icon-arrow-right"></span>
			</el-button>
            <el-button 
				@click.native="currentWeek" 
				plain
				type="default">今天</el-button>
		</li>
	</ul>
</template>

<script>

	import getWeekDaysByDay from '../function/getWeekDaysByDay';
	import getYearWeek from '../function/getYearWeek';

	export default {
		props: {
			value: {
				default () {
					return +new Date()
				}
			}
		},
		computed: {
			dateStr () {
				return Vue.filter('date')(this.date, 'yyyy/MM/dd')
			},
			weeks () {
				return getWeekDaysByDay(this.date);
			}
		},
		data () {
			return {
				date: this.value
			};
		},
		methods: {
			getYearWeek (timestamp) {
				return getYearWeek(new Date(timestamp));
			},
			/**
			 * 当前周
			 */
			currentWeek () {
				this.date = new Date();
				this.$emit('input', this.date);
				this.$emit('changedate', this.date);
			},
			/**
			 * 切换上下周
			 */
			forwardWeek (type) {
				var currentDate = new Date(this.date);
				var date =  currentDate.getDate();
				var forwardDate = 0;
				var weekDay = 7;
				if (type == 'pre') {
					forwardDate = date - weekDay;
				} else {
					forwardDate = date + weekDay;
				}
				this.date = new Date(currentDate.setDate(forwardDate));
				this.$emit('input', this.date);
				this.$emit('changedate', this.date);
			}
		}
	}
</script>