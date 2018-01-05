<template>
    <div id="sidebar">
        <h3 class="logo"></h3>
        <div class="menu">
            <ul>
                <li
                    v-for="item, index in options"
                    :class="{'active': setActiveTab(item.url)}"
                    :key="index"
                    @click="forward(item)">
                    <i :class="item.name"></i><span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            options: [
                {
                    text: '客户档案',
                    url: 'customer'
                },
                {
                    text: '活动管理',
                    url: 'discounts'
                },
                {
                    text: '提醒设置',
                    url: 'setting'
                }
            ]
        }
    },
    methods: {
        /**
         * 标注当前tab
         */
        setActiveTab (url) {
            return url.indexOf(this.currentTab) > -1;
        },

        /**
         * 前往对应模块
         */
        forward (item) {
            let url = item.url;
            this.currentTab = url;
            if (this.$router.push) {
                this.$router.push(url);
            }
        }
    }
};
</script>

<style scoped lang="scss">
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 160px;
  height: 100%;
  background-color: #393d41;
  h3 {
    height: 50px;
    background: url("//imgs.genshuixue.com/0baijiatools/cb8a1b5479723b3305e4897a3785bbb4/logo.png");
    background-size: 160px 50px;
    margin: 0;
  }
  .menu {
    position: absolute;
    top: 55px;
    bottom: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    /* scrollbar for chrome */
    &::-webkit-scrollbar {
      width: 0;
    }
    &:hover {
      // width: 155px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        background-clip: content-box;
        // border-radius: 6px;
        border-right: 5px solid transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }
  }
  li {
    display: block;
    height: 44px;
    padding: 0 15px;
    line-height: 44px;
    font-size: 13px;
    color: #99a3ae;
    cursor: pointer;
    &.custom-li {
      height: 40px;
      line-height: 40px;
      margin: 10px 0;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.07) inset,
        0 1px 0 0 rgba(255, 255, 255, 0.07);
      cursor: default;
      color: #caa851;
      &:hover {
        background-color: #393d41;
      }
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      padding: 0;
      margin-right: 15px;
      vertical-align: middle;
      background: url("//imgs.genshuixue.com/0baijiatools/84bbc25ead871de39e03c9330e57b03b/txsidebar2x.png");
      background-size: 100px 180px;

      &.consult {
        background-position: -20px 0;
      }
      &.student {
        background-position: 0 -20px;
      }
      &.course {
        background-position: -20px -20px;
      }
      &.timetable {
        background-position: 0 -40px;
      }
      &.signup {
        background-position: -20px -40px;
      }
      &.finance {
        background-position: 0px -60px;
      }
      &.statistics {
        background-position: -20px -60px;
      }
      &.kexiao {
        background-position: 0 -80px;
      }
      &.set-rule {
        background-position: -20px -80px;
      }
      &.set-campus {
        background-position: 0 -100px;
      }
      &.set-account {
        background-position: -20px -100px;
      }
      &.custom {
        background-position: -80px -25px;
      }
      &.sign {
        background-position: 0px -140px;
      }
      &.vip-icon {
        background-position: 0 -120px;
      }
      &.vip_kx_stats {
        background-position: -20px -120px;
      }
      &.points {
        background-position: -20px -140px;
      }
      &.fee {
        background-position: 0 -160px;
      }
      &.report {
        background-position: -20px -160px;
      }
    }
    &.active {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      .overview {
        background-position: -40px 0;
      }
      .consult {
        background-position: -60px 0;
      }
      .student {
        background-position: -40px -20px;
      }
      .course {
        background-position: -60px -20px;
      }
      .timetable {
        background-position: -40px -40px;
      }
      .signup {
        background-position: -60px -40px;
      }
      .finance {
        background-position: -40px -60px;
      }
      .statistics {
        background-position: -60px -60px;
      }
      .kexiao {
        background-position: -40px -80px;
      }
      .set-rule {
        background-position: -60px -80px;
      }
      .set-campus {
        background-position: -40px -100px;
      }
      .set-account {
        background-position: -60px -100px;
      }
      .sign {
        background-position: -40px -140px;
      }
      .vip-icon {
        background-position: -40px -280px;
      }
      .vip_kx_stats {
        background-position: -60px -120px;
      }
      .points {
        background-position: -60px -140px;
      }
      .fee {
        background-position: -40px -160px;
      }
      .report {
        background-position: -60px -160px;
      }
    }
    span {
      display: inline-block;
      line-height: 20px;
      vertical-align: middle;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.13);
    }
  }
}
</style>