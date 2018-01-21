<template>
    <el-select 
        v-model="userId"
        clearable
        filterable
        remote
        @clear="clear"
        @change="changeUser"
        :loading="loading"
        :remote-method="fetchList"
        :placeholder="placehoder"  
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
        placehoder: {
            default: '请输入用户名称查询'
        },
        width: {
            default: 180
        }
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
            userId: ''
        };
    },
    mounted () {
        this.getDefaultOption();
        this.defaultUser();
    },
    methods: {
        /**
         * 设置默认校区
         */
        defaultUser () {
            var userInfo = this.userInfo;
            var value = this.value;
            var name = this.name;
            if (value && name) {
                this.userId = value;
                this.list = [{
                    id: value,
                    name: name
                }];
            }
            // 分校设置默认校区
            else if (userInfo && userInfo.roleType == 1) {
                this.userId = userInfo.id;
                this.$emit('input', this.userId);
                this.list = [{
                    id: userInfo.id,
                    name: userInfo.userName
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
                post('/user/list.json', {
                    query: query,
                    roleType: 1,
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
        changeUser (userId) {
            this.$emit('input', userId);
            this.$emit('change', userId);
        },
        /**
         * 获取默认选项
         */
        getDefaultOption () {
            this.loading = true;
            post('/user/list.json', {
                pageNum: 1,
                roleType: 1,
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
        'userInfo.id' () {
            this.defaultUser();
        },
        value () {
            this.defaultUser();
        }
    }
};
</script>
