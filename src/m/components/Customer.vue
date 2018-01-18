<template>
    <router-view></router-view>
</template>

<script>
    import { Indicator } from 'mint-ui';
    
    export default {
        created () {
            if (this.$route.path === '/') {
                this.$router.push('/center');
            }
        }
    }
</script>

<style lang="scss">
    @import '../customer.scss';
</style>

