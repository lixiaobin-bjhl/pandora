<template>
   <div></div> 
</template>

<script>
    import { Indicator } from 'mint-ui'
    export default {
        mounted () {
             Indicator.open('Loading...');
        }
    }
</script>