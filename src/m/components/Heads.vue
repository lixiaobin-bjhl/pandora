<template>
  <section class="top">
    <img class="head" src="../../assets/default.png" />
    <span class="name">客服MM</span>
    <span class="voice"><i class="fa" aria-hidden="true" :class="vociceOpen?'icon-volume-up':'icon-volume-down'" v-on:click="vociceOpen=vociceOpen?false:true"></i></span>
    <!--fa icon-volume-off-->
  </section>
</template>

<script>
export default {
  name: 'heads',
  data () {
    return {
      vociceOpen:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    height: 60px;
    line-height: 60px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #F8F8F8;
    padding: 5px 10px;
    box-sizing: border-box;
    width: 100%;
  }
  
  .top .head {
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 100%;
  }
  
  .top .name {
    font-size: 18px;
    color: #444;
    margin-left: 10px;
  }
  
  .top .voice {
    width: 30px;
    height: 50px;
    float: right;
    text-align: center;
  }
</style>