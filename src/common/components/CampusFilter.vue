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
        :placeholder="placeholder"  
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
        placeholder: {
            default: '请输入校区名称查询'
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
            var value = this.value;
            var name = this.name;
            if (value && name) {
                this.campusId = value;
                this.$emit('input', value);
                this.list = [{
                    id: value,
                    name: name
                }];
            }
            // 分校设置默认校区
            else if (userInfo && userInfo.roleType == 1) {
                this.campusId = userInfo.campusId
                this.$emit('input', this.campusId);
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
                post('/school/fuzzyQuery.json', {
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
            this.$emit('change', campusId);
        },
        /**
         * 获取默认选项
         */
        getDefaultOption () {
            this.loading = true;
            post('/school/list.json', {
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
        },
        value () {
            this.defaultCampus();
        },
        name () {
            this.defaultCampus();
        }
    }
};
</script>
