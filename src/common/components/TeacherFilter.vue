<template>
    <el-select 
        v-model="teacherId"
        clearable
        filterable
        remote
        @clear="clear"
        @change="changeTeacher"
        :loading="loading"
        :remote-method="fetchList"
        placeholder="请输入老师名称查询"  
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
            teacherId: ''
        };
    },
    mounted () {
        this.getDefaultOption();
        this.defaultTeacher();
    },
    methods: {
         /**
         * 设置默认老师
         */
        defaultTeacher () {
            var id = this.value;
            var name = this.name;
            if (id && name) {
                this.teacherId = id;
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
                post('/teacher/list.json', {
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
         * 改变校区 
         */
        changeTeacher (teacherId) {
            this.$emit('input', teacherId);
        },
        /**
         * 获取默认选项
         */
        getDefaultOption () {
            this.loading = true;
            post('/teacher/list.json', {
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
