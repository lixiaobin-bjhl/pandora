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
                        this.$store.commit('SET_USER_INFO', res.data);
                    });
            }
        }
    }
</script>


<style lang="scss">

    @import './assets/scss/main';
    
</style>