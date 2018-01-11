<!--
    @file 周选择
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<style lang="scss">
	.week-select {
		display: flex;
		margin: 20px;
	
		> li {
			flex: 1;
			&:nth-of-type(2) {
				text-align: center;
			}
			&:last-of-type {
				text-align: right;
			}
			.current-date-btn {
				border-radius: 71px;
			}
		}
		.arrow {
			color: #888;
			cursor: pointer;
			&:hover {
				&:before {
					color: #999;
				}
			}
		}
		.date-str {
			font-size: 18px;
		}
	}
</style>

<template>
	<ul class="week-select" v-if="weeks">
		<li class="date-str">
			<el-button class="arrow icon-left"  @click="forwardWeek('pre')">上一周</el-button>
			<el-button class="arrow icon-right" @click="forwardWeek('next')">下一周</el-button>
            <el-button @click.native="currentWeek" class="current-date-btn" size="small" type="default">今天</el-button>
            {{weeks[6].timestamp | date('yyyy')}}年第{{getYearWeek(weeks[0].timestamp)}}周{{weeks[0].timestamp | date('MM.dd')}}
			-
			{{weeks[6].timestamp | date('MM.dd')}}
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