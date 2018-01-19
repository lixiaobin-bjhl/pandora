<!--
	@file 设置重复
	@author xuguanlong
-->
<template>
	<div class="set-repeat-wrap">
		<div class="top">
			<label>设置重复规则</label>
            <el-select 
                @click.native.stop="clickOption"
                v-model="repeatType" 
                size="small">
                <el-option
                    v-for="item,index in typeOptions"
                    :key="index"
                    :label="item.label" 
                    :value="item.value">
                </el-option>
            </el-select>
		</div>
		<div v-if="repeatType === 1" class="center">
			<div>
				<span>间隔</span>
				<input type="text" v-model="grepDayNum" placeholder="间隔天数">
				<span>天</span>
			</div>
			<div>
				<span>结束</span>
				<input type="text" v-model="repeatDayCounts" placeholder="重复次数">
				<span>次之后</span>
			</div>
		</div>
		<div v-if="repeatType === 2" class="center">
			<div>
				<span>间隔</span>
				<input type="text" v-model="grepWeekNum" placeholder="间隔周数">
				<span>周</span>
			</div>
			<div class="week">
				<span 
                    v-for="n,index in weekDays" @click="toggleSet($event, n)"
                    :key="index"
                    :data-text="n.label"
                    :class="{'active': isActive(n)}">
					{{n.label}}
				</span>
			</div>
			<div>
				<span>结束</span>
				<input type="text" v-model="repeatWeekCounts" placeholder="重复次数">
				<span>次之后</span>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        created:function(){
        },
    	data () {
    		return {
                repeatType: 0,
                grepDayNum: null,
                grepWeekNum: null,
                repeatWeekCounts: null,
                repeatDayCounts: null,
                repeatDays: [],
                weekDays: [
                    {
                        label: '一',
                        value: 1
                    },
                    {
                        label: '二',
                        value: 2
                    },
                    {
                        label: '三',
                        value: 3
                    },
                    {
                        label: '四',
                        value: 4
                    },
                    {
                        label: '五',
                        value: 5
                    },
                    {
                        label: '六',
                        value: 6
                    },
                    {
                        label: '日',
                        value: 7
                    }
                ],
    			typeOptions: [
	                {
	                    value: 0,
	                    label: '不重复'
	                },
	                {
	                    value: 1,
	                    label: '按天重复'
	                },
	                {
	                	value: 2,
	                	label: '按周重复'
	                }
	            ]
    		}
    	},
    	methods: {
    		isActive(num) {
    			return this.repeatDays.indexOf(num) > -1;
    		},
            checkRepeatInfo() {
                if (this.repeatType === 0) {
                    return true;
                }
                if (this.repeatType === 1) {
                    if (isNaN(this.repeatDayCounts) || this.repeatDayCounts == null 
                        || this.repeatDayCounts <= 0 || isNaN(this.grepDayNum)
                        || this.grepDayNum == null || this.grepDayNum <= 0) 
                    {
                        toast('重复设置不正确', 'error'); 
                        return false;
                    }
                    if (parseInt(this.repeatDayCounts) > 99) {
                        toast('重复次数不能大于99次', 'error'); 
                        return false;
                    }
                    if (parseInt(this.repeatDayCounts) != this.repeatDayCounts
                        || parseInt(this.grepDayNum) != this.grepDayNum) {
                        
                        toast('请输入整数', 'error'); 
                        return false;
                    }
                    return true;
                }
                if (this.repeatType === 2) {
                    if (isNaN(this.repeatWeekCounts) || this.repeatWeekCounts == null 
                        || this.repeatWeekCounts <= 0 || isNaN(this.grepWeekNum)
                        || this.grepWeekNum == null || this.grepWeekNum <= 0
                        || this.repeatDays.length === 0) 
                    {
                        toast('重复设置不正确', 'error'); 
                        return false;
                    }
                    if (parseInt(this.repeatWeekCounts) > 99) {
                        toast('重复次数不能大于99次', 'error'); 
                        return false;
                    }
                    if (parseInt(this.repeatWeekCounts) != this.repeatWeekCounts
                        || parseInt(this.grepWeekNum) != this.grepWeekNum) {
                        
                        toast('请输入整数', 'error'); 
                        return false;
                    }
                    return true;
                }  
            },
            getRepeatInfo() {
                if (this.checkRepeatInfo()) {
                    return {
                        repeatType: this.repeatType,
                        grepDayNum: this.grepDayNum,
                        grepWeekNum: this.grepWeekNum,
                        repeatWeekCounts: this.repeatWeekCounts,
                        repeatDayCounts: this.repeatDayCounts,
                        repeatDays: this.repeatDays
                    }
                } else {
                    return null;
                }
            },
    		toggleSet(event, num) {
    			let index = this.repeatDays.indexOf(num);
    			if (index > -1) {
    				this.repeatDays.splice(index, 1);
    			} else {
    				this.repeatDays.push(num);
    			}
                this.repeatDays.sort((a, b) => {
                    return a.value > b.value;
                })
            },
            clickOption (event) {
                event.stopPropagation();
            }
    	}
    }
</script>

<style lang="scss">
    .set-repeat-wrap {
        > .top {
            padding: 10px 12px;
            border-bottom: 1px solid #ddd;
            .btn-content {
                color: #333;
            }
            .el-select {
                display: inline-block;
            }
        }
        .btn-group {
            > button {
                height: 33px;
                &.btn-default {
                    background: none;
                    &:focus,
                    &:active {
                        box-shadow: none;
                        background: none;
                        border: 1px solid #ddd;
                    }
                }
            }
        }
        > .center {
            padding: 15px 15px 3px 15px;
            > div {
                margin-bottom: 10px;
            }
            .week {
                span {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    border-left: 1px solid #ddd;
                    cursor: pointer;
                    &:last-child {
                        border-right: 1px solid #ddd;
                    }
                    &.active {
                        position: relative;
                        color: #fff;
                        &::before {
                            content: attr(data-text);
                            background: #00a7ff;
                            position: absolute;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            right: 0;
                        }
                    }
                }
            }
            input[type="text"] {
                width: 120px;
                border: 1px solid #ddd;
                outline: none;
                padding: 3px 10px;
                height: 30px;
                box-sizing: border-box;
                // border-radius: 3px;
            }
        }
    }
</style>