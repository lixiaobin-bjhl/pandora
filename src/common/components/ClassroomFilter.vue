<template>
    <el-select 
        v-model="classroomId"
        clearable
        filterable
        remote
        @clear="clear"
        @change="changeClassroom"
        :loading="loading"
        :remote-method="fetchList"
        placeholder="请输入教室名称查询"  
        :style="{width: typeof width === 'number' ? (width + 'px') : '100%'}">
            <el-option 
                v-for="item, index in list"
                :label="item.name"
                :value="item.id" 
                :key="index">
            </el-option>
    </el-select>
</template>

<script>

var timer = null;
import { post } from '../service';

export default {
    props: {
        value: {},
        name: String,
        width: {
            default: 180
        }
    },
    data() {
        return {
            loading: false,
            list: [],
            classroomId: ''
        };
    },
    mounted () {
        this.getDefaultOption();
        this.defaultClassroom();
    },
    methods: {
        /**
         * 设置默认教室
         */
        defaultClassroom () {
            var id = this.value;
            var name = this.name;
            if (id && name) {
                this.classroomId = id;
                this.list = [{
                    id,
                    name
                }];
            }  
        },
        /**
         * 清除校区信息 
         */
        clear () {
            this.list = [];
            setTimeout(()=>{
                this.getDefaultOption();
            }, 500);
        },
        /**
         * 获取校区列表 
         */
        fetchList (query) {
            this.loading = true;
            timer = setTimeout(() => {
                post('/classroom/list.json', {
                    query: query,
                    pageNum: 1,
                    pageSize: 20
                })
                .then((res) => {
                    this.list = res.data;
                    this.loading = false;
                }, ()=> {
                    this.loading = false;
                });
            }, 200);
        },
        /**
         * 改变教室 
         */
        changeClassroom (classroomId) {
            this.$emit('input', classroomId);
        },
        /**
         * 获取默认选项
         */
        getDefaultOption () {
            this.loading = true;
            post('/classroom/list.json', {
                pageNum: 1,
                pageSize: 20
            })
            .then((res) => {
                this.list = res.data;
                this.loading = false;
            }, ()=> {
                this.loading = false;
            });
        }
    }
};
</script>
