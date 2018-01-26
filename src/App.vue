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
    import { getLoginUser } from './common/request';
    import BackTop from './common/components/BackTop';

    export default {
        components: {
            SideBar,
            BackTop,
            TopHeader
        },
        mounted () {
            this.getLoginUser();
        },
        methods: {
            /**
             * 获取用户的基本信息 
             */
            getLoginUser () {
                getLoginUser()
                    .then((res)=> {
                        var data = res.data;
                        this.$store.commit('SET_USER_INFO', res.data);
                    });
            }
        }
    }
</script>


<style lang="scss">

    @import './assets/scss/main';
    
</style>