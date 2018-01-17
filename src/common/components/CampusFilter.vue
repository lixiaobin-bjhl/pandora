<template>
    <el-select 
        v-model="campusId"
        clearable
        filterable
        remote
        @clear="clear"
        @change="changeCampus"
        :loading="loading"
        :remote-method="fetchList"
        placeholder="请输入校区名称查询"  
        style="width: 180px;">
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
    porps: {
        value: {}
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo;
        } 
    },
    data() {
        return {
            loading: false,
            list: [],
            campusId: ''
        };
    },
    mounted () {
        this.getDefaultOption();
        this.defaultCampus();
    },
    methods: {
        /**
         * 设置默认校区
         */
        defaultCampus () {
            var userInfo = this.userInfo;
            if (userInfo) {
                this.campusId = userInfo.campusId;
                this.list = [{
                    id: userInfo.campusId,
                    name: userInfo.campusName
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
                post('/campus/list.json', {
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
        changeCampus (campusId) {
            this.$emit('input', campusId);
        },
        /**
         * 获取默认选项
         */
        getDefaultOption () {
            this.loading = true;
            post('/campus/list.json', {
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
    },
    watch: {
        'userInfo.campusId' () {
            this.defaultCampus();
        }
    }
};
</script>
