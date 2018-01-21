<template>
    <div>
        <side-bar></side-bar>
        <top-header></top-header>
        <section id="main" class="main">
            <router-view></router-view>
        </section>
        <back-top></back-top>
    </div>
</template>

<script>
    import SideBar from './common/components/SideBar.vue';
    import TopHeader from './common/components/TopHeader.vue';
    import BackTop from './common/components/BackTop';
    import { getUserInfo } from './common/request';

    export default {
        components: {
            SideBar,
            TopHeader,
            BackTop
        },
        mounted () {
            this.getUserInfo();
        },
        methods: {
            /**
             * 获取用户的基本信息 
             */
            getUserInfo () {
                getUserInfo()
                    .then((res)=> {
                        var data = res.data;
                        this.$store.commit('SET_USER_INFO', res.data);
                        // 如果是分校，查看一下是否有申请过报装，没有的话跳到申请引导页
                        if (data.roleType === 1) {
                            
                        }
                    });
            }
        }
    }
</script>


<style lang="scss">

    @import './assets/scss/main';
    
</style>