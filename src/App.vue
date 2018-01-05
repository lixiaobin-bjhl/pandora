<template>
    <div>
        <side-bar></side-bar>
        <top-header></top-header>
        <section id="main" class="main">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    import SideBar from './common/components/SideBar.vue';
    import TopHeader from './common/components/TopHeader.vue';

    export default {
        components: {
            SideBar,
            TopHeader
        }
    }
</script>


<style lang="scss">

    @import './assets/scss/main';
    
</style>