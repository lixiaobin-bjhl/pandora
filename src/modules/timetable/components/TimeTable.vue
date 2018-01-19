
<template>
	<div class="time-table-wrap">
		<table class="time-table" cellspacing="0">
			<tr>
				<td></td>
				<td v-for="item in weekDates" :class="{'today': isToday(item)}">
					<span class="date">{{item | date('MM月dd日')}}</span>
					<span class="day">周{{item | week}}</span>
				</td>
			</tr>
			<tr v-for="(num, row) in [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]">
				<td>
					<span v-if="num < 13">上午</span>
					<span v-if="num > 12 && num < 18">下午</span>
					<span v-if="num > 17">晚上</span>
					<span class="time">{{num}}:00</span>
				</td>
				<td v-for="(n, col) in 7" class="grid-td" :data-index="row + '-' + col">
					<div :id="row + '-' + col + '-tmpl'" class="time-table-tmpl">
					</div>
					<div :class="'grid-column grid-column-' + index + '-clip'" v-for="(d, index) in 2" 
						:data-index="index" 
						:data-key="row + '-' + col" 
						:data-time="row + '-' + col + '-' +index">
						<!-- <span class="btn btn-add btn-add-large" @click.stop="schedule($event)">
							<i class="icon-btn_add" title="排课"></i>
						</span> -->
						<!-- <span class="btn btn-add btn-add-small" @click.stop="schedule($event)">
							<i class="iconfont icon-plus"></i>
						</span> -->
					</div>
				</td>
			</tr>
		</table>
		<div class="mask-wrap" v-show="showMask">
			<div class="item" 
				:key="index"
				v-for="item, index in selectLessons" 
				:data-id="item.id" 
				:data-index="item.arrayIndex">
				<p class="item-p">
					<span class="icon-info-circle" style="color: #ff3824;" v-if="item.teacherConflict||item.classroomConflict"></span>
					{{item.name}}
				</p>
				<p class="item-p">{{item.staffName}}</p>
				<p class="item-p">{{item.classroomName}}</p>
				<p class="item-p">{{item.startTimeStr}}~{{item.endTimeStr}}</p>
			</div>
		</div>
		<div class="lesson-tip tooltip" v-show="showTip"
			:class="{
				'top':    placement === 'top',
			    'left':   placement === 'left',
			    'right':  placement === 'right',
			    'bottom': placement === 'bottom'
			}"
			:style="{'left': tipLeft+'px', 'top': tipTop+'px'}">
			<div class="arrow"></div>
			<div class="tip-inner">
				<p>{{lesson.name}}</p>
				<p>{{lesson.staffName}}</p>
				<p>{{lesson.classroomName}}</p>
				<p>{{lesson.subTypeName}}{{lesson.index}}</p>
				<p>{{lesson.startTimeStr}}~{{lesson.endTimeStr}}</p>
				<p v-if="lesson.teacherConflict" style="color: red;">老师冲突</p>
				<p v-if="lesson.classroomConflict" style="color: red;">教室冲突</p>
			</div>
		</div>
	</div>
</template>
<script>

    import changeTime from '../../../common/function/changeTime';
    import Vue from 'vue';

	export default {
		name: 'timetable',
		props: {
			time: {
				default: function() {
					return new Date();
				}
			}
		},
		watch: {
			time(val) {
				this.calcWeekDates();
			},
			lessons(val, old) {
				if (val && val instanceof Array) {
					this.showMask = false;
					this.fillGrid();
					this.renderGrid();
				}
			},
			// saveLessonStatus(newValue) {
			// 	if (newValue === true) {
			// 		this.refresh();
			// 		this.$store.commit('RESET_SAVE_LESSON_EDIT');
			// 	}
			// }
		},
		created() {
			this.calcWeekDates();
			this.clearGrid();
		},
		computed: {
			// saveLessonStatus() {
			// 	return this.$store.state.lesson.saved;
			// }
		},
		mounted() {
            this.$on('setlesson', (data)=> {
                this.lessons = data;
            });
			this.$nextTick(() => {
				let $table = $('.time-table');
				let $wrap = $('.time-table-wrap');
				let $lessonTip = $('.lesson-tip');
				let $document = $(document);
				let self = this;
				self.addBtn = null;
				$document.on('click', function(event) {
					let target = $(event.target);
					// 从课节详情dialog里面 点击关闭icon冒泡事件阻止
					if (self.showClazzInfo) {
						return;
					}
					self.showMask = false;
				});
				$table.on('click', '.grid-column', function(event) {
					if (self.showClazzInfo) {
						return;
					}
					let target = $(event.currentTarget);
					let index = target.attr('data-index');
					let key = target.attr('data-key');
					self.addBtn && self.addBtn.css('display', 'none');
					if (self.grid[key][`_${index}_fill`]) {
						target.find('.btn-add-small').css('display', 'inline-block');
						self.addBtn = target.find('.btn-add-small');
					} else {
						target.find('.btn-add-large').css('display', 'inline-block');
						self.addBtn = target.find('.btn-add-large');
					}
				});
				$table.on('click', '.expand', function(event) {
					event.stopPropagation();
					let target = $(event.currentTarget);
					let key = target.attr('data-key');
					self.selectLessons = self.grid[key].lessons;
					self.showMask = true;
				});
				$table.on('click', '.item', function(event) {
					event.stopPropagation();
					self.showLessonDetail(event);
				});
				$wrap.on('click', '.item', function(event) {
					event.stopPropagation();
					self.showLessonDetail(event);
				});
				$wrap.on('mouseenter', '.item', function(event) {
					event.stopPropagation();
					if (self.showClazzInfo) {
						return;
					}
					let target = $(event.currentTarget);
					let index = target.attr('data-index');
					self.lesson = self.lessons[index];

					self.$nextTick(function() {
						self.setTipPlacement(target, $wrap, $lessonTip);
						self.showTip = true;
					})
				});
				$wrap.on('mouseleave', '.item', function(event) {
					event.stopPropagation();
					if (self.showClazzInfo) {
						return;
					}
					self.showTip = false;
				});
				$wrap.on('click', '.mask-wrap', function(event) {
					self.showMask = false;
					event.stopPropagation();
				});
			});
		},
		data() {
			return {
				showClazzInfo: false,
				grid: {},
				tdWidth: 0,
				tdHeight: 0,
                weekDates: [],
				showMask: false,
				tipLeft: 0,
				tipTop: 0,
				showTip: false,
				placement: 'top',
				lessons: [],
				lesson: {},
				selectId: 0,
				addBtn: null,
                selectLessons: [],
                lessons: []
			}
		},
		methods: {
			showLessonsGird() {
				this.showMask = false;
				this.fillGrid();
				this.renderGrid();
			},
			showLessonDetail(event) {
				let target = event.currentTarget;
				this.$emit('editlesson', {
					id: target.dataset.id
				});
			},
			clearGrid() {
				this.addBtn && this.addBtn.css('display', 'none');
				for (let i = 0; i < 19; i++) {
                    for (let j = 0; j < 7; j++) {
                    	this.grid[`${i}-${j}`] = {
                    		lessons: [],
							template: ``,
							_0_fill: false,
							_1_fill: false
                    	};
                    }
                }
			},
			renderGrid() {
				for (let i = 0; i < 19; i++) {
                    for (let j = 0; j < 7; j++) {
                    	let l = this.grid[`${i}-${j}`].lessons.length;
                    	if (l > 10) {
                    		$(`#${i}-${j}-tmpl`)
                    			.html(
	                    			`<div class="overlay-wrap">
	                    				<div>
	                    					<p class="msg">共有${l}节课</p>
	            							<p class="expand" data-key="${i}-${j}"><span class="icon-zoom"></span>展开全部</p>
	                    				</div>
	                    				<div class="shadow shadow-1"></div>
	                    				<div class="shadow shadow-2"></div>
									</div>`);
                    	} else {
                    		$(`#${i}-${j}-tmpl`)
                    			.html(this.grid[`${i}-${j}`].template);
                    	}
                    }
                }
			},
			getItemTemplate(item) {
				let key = item.startKey;
				let maxNum = 10;
				let lessons = this.grid[key].lessons;
				let overlay = false;
				let length = lessons.length;
				let curIndex = -1;
				if (length > maxNum) {
					overlay = true;
					length = maxNum;
				}
				for (let i = 0; i < length; i++) {
					if (lessons[i].id === item.id) {
						curIndex = i;
					}
				};
				if (overlay || curIndex == -1 || curIndex > maxNum - 1) {
					return ``;
				}
				let totalWidth = this.tdWidth - 2;
				let width = totalWidth / length;
				let left = curIndex * width;
				let withPercent = width / this.tdWidth * 100;
				let leftPercent = left / this.tdWidth * 100;

				let clazzName = ``;
				item.leftPercent = leftPercent;
				item.withPercent = withPercent;
				let top = item.top;
                let height = item.height;
				let borderColor = item.courseType == 1 ? '#B6D6C0' : '#AED1E6';
				let bgColor = item.courseType == 1 ? 'rgba(233, 247, 230, .75)' : 'rgba(199, 235, 255, .75)';
				let spanHtml = item.isConflict ? `<span class="iconfont icon-warn-copy" style="color: #ff3824;"></span>` : ``;
				let color = '#666';
				item.rendered = true;
				let jDomObj = $(`<div class="item ${clazzName}" data-id="${item.id}" data-index="${item.arrayIndex}" style="left: ${leftPercent}%; width: ${withPercent}%; top: ${top}px; height: ${height}px; color: ${color}; background: ${bgColor}; border-color: ${borderColor}">
						<p class="item-p">${spanHtml}<span class="course"></span></p>
						<p class="item-p teacher"></p>
						<p class="item-p room"></p>
						<p class="item-p theme"></p>
						<p class="item-p">${item.startTimeStr}~${item.endTimeStr}</p>
					</div>`);
				jDomObj.find('.course').text(item.name);
				jDomObj.find('.teacher').text(item.staffName);
				jDomObj.find('.room').text(item.classroomName);
				return jDomObj.prop("outerHTML");
			},
			fillGrid() {
				this.clearGrid();
				this.tdWidth = $('.grid-column')[0].offsetWidth;
				this.tdHeight = $('.grid-column')[0].offsetHeight;
				this.lessons.forEach((item, index) => {
					if (typeof item === 'object') {
						let res = this.resolveLesson(item);
						item.arrayIndex = index;
                        this.grid[`${res.startRow}-${res.col}`].lessons.push(item);
						item.height += 1;
					}
				});
				this.lessons.forEach((item) => {
					let template = this.getItemTemplate(item);
					this.grid[item.startKey].template += template;
				})
			},
			resolveLesson(lesson) {
				let date = new Date(lesson.startTime);
				let day = date.getDay();
				let hour = date.getHours();
				let minute = date.getMinutes();
				if (day === 0) {
					day = 7;
				}
				let startRow = hour - 8;
				if (startRow < 0) {
					return;
				}
				let col = day - 1;
				let startIndex = minute > 30 ? 1 : 0;
				lesson.top = parseInt((minute / 60) * 2 * this.tdHeight) + this.tdHeight;
				lesson.height = parseInt(((lesson.endTime - lesson.startTime) / (60 * 60 * 1000)) * (this.tdHeight * 2 + 1)) - 1;
				lesson.startKey = `${startRow}-${col}`;
				lesson.startTimeStr = Vue.filter('date')(date, 'HH:mm');
				date = new Date(lesson.endTime);
				hour = date.getHours();
				minute = date.getMinutes();
				let endRow = hour - 5;
				let endIndex = minute > 30 ? 1 : 0;
				if (minute === 0) {
					endRow = endRow - 1;
					endIndex = 1;
				}
				lesson.endKey = `${endRow}-${col}`;
				lesson.endTimeStr =  Vue.filter('date')(date, 'HH:mm');
				this.grid[`${startRow}-${col}`][`_${startIndex}_fill`] = true;
				if (endRow > startRow) {
					if (startIndex == 0) {
						this.grid[`${startRow}-${col}`][`_1_fill`] = true;
					}
					for (let i = startRow + 1; i < endRow; i++) {
						this.grid[`${i}-${col}`][`_0_fill`] = true;
						this.grid[`${i}-${col}`][`_1_fill`] = true;
					};
					this.grid[`${endRow}-${col}`][`_0_fill`] = true;
				}
				this.grid[`${endRow}-${col}`][`_${endIndex}_fill`] = true;
				return {
					startRow: startRow,
					endRow: endRow,
					startIndex: startIndex,
					endIndex: endIndex,
					col: col
				}
			},
			schedule(event) {
				let target = $(event.currentTarget);
				let key = target.parent().attr('data-time');
				let array = key.split('-');
				let hour = parseInt(array[0]) + 5;
				let date = this.weekDates[parseInt(array[1])];
				let index = parseInt(array[2]);
				date.setHours(hour);
				date.setSeconds(0);
				date.setMinutes(0);
				if (index === 1) {
					date.setMinutes(30);
				}
				this.$emit('scheduleclass', date.getTime());
			},
 			isToday(date) {
				let today = new Date();
				if (date.getFullYear() === today.getFullYear()
					&& date.getMonth() === today.getMonth()
					&& date.getDate() === today.getDate()
					) {
					return true;
				} else {
					return false;
				}
			},
			setTipPlacement(target, parent, tip) {
				let placement = 'top';
				let offset = target.offset();
				let parentOffset = parent.offset();
				let tipLeft = offset.left - parentOffset.left - tip.width() / 2 + target[0].offsetWidth / 2;
				let tipTop = offset.top - parentOffset.top - tip.height() - 10;
				if (tipTop < 0) {
					placement = 'right';
					tipTop = offset.top - parentOffset.top;
					tipLeft = offset.left - parentOffset.left + target[0].offsetWidth + 5;
					if ((tipLeft + tip.width()) > parent.width()) {
						placement = 'left';
						tipLeft = offset.left - parentOffset.left - tip.width() - 5;
					}
				}
				this.placement = placement;
				this.tipTop = tipTop;
				this.tipLeft = tipLeft;
			},
			calcWeekDates() {
				var weekdays = [];
				var nowDay = this.time.getDay();
               	weekdays.push(this.time);
               	var d = null;
                if (nowDay === 0) {
                    for (var i = 6; i > 0; i--) {
                       	d = changeTime(this.time, i - 7);
                        weekdays.splice(0, 0, d);
                    }
                } else {
                    for (var i = nowDay - 1; i > 0; i--) {
                        d = changeTime(this.time, i - nowDay);
                        weekdays.splice(0, 0, d);
                    }
                    for (var j = nowDay + 1; j < 8; j++) {
                        d = changeTime(this.time, j - nowDay);
                        weekdays.push(d);
                    }
                }
                this.weekDates = weekdays;
			},
			refresh() {
				this.$emit('refresh');
			},
			closeLessonDetail() {
				this.showClazzInfo = false;
				removeBodyModal();
			}
		},
		components: {
		}
	}
</script>