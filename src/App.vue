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

    export default {
        components: {
            SideBar,
            TopHeader,
            BackTop
        }
    }
</script>


<style lang="scss">

    @import './assets/scss/main';
    
</style>