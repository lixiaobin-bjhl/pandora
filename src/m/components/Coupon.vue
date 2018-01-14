<template>
    <div>
        <ul class="tabs">
            <li :class="{active: activeTab === 1}" @click="changeTab(1)">
                <div>
                    <span>未使用(3)</span>
                </div>
            </li>
            <li @click="changeTab(2)" :class="{active: activeTab === 2}">
                <div>
                    <span>已使用(3)</span>
                </div>
            </li>
            <li @click="changeTab(3)" :class="{active: activeTab === 3}">
                <div>
                    <span>已过期(3)</span>
                </div>
            </li>
        </ul>
        <div class="coupon-list">
            <div class="coupon">
                <span class="circle-solid left"></span>
                <span class="circle-solid right"></span>
                <h1 class="hospotial">欧若拉医疗美容医院</h1>
                <div>
                    <ul class="coupon-detail">
                        <h1 class="title">脱毛免费本验券</h1>
                        <li>
                            <label>有效期</label>
                            <div>2017/12-2017/9/12</div>    
                        </li>
                        <li>
                            <label>使用规则</label>
                            <div>
                                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            </div>
                        </li>
                        <li>
                            <label>使用方法</label>
                            <div>请提前联系机构预约，并在付款时出示本券</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="coupon">
                <span class="circle-solid left"></span>
                <span class="circle-solid right"></span>
                 <span class="circle-solid left1"></span>
                <span class="circle-solid right1"></span>
                <h1 class="hospotial">欧若拉医疗美容医院</h1>
                <div>
                    <ul class="coupon-detail">
                        <h1 class="title">脱毛免费本验券</h1>
                        <li>
                            <label>有效期</label>
                            <div>2017/12-2017/9/12</div>    
                        </li>
                        <li>
                            <label>使用规则</label>
                            <div>
                                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            </div>
                        </li>
                        <li>
                            <label>使用方法</label>
                            <div>请提前联系机构预约，并在付款时出示本券</div>
                        </li>
                        <div class="opt-group">再送你3张好友专用券，快去分享吧~<span class="btn-share">分享</span></div> 
                    </ul>
                   
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeTab: 1
            }
        },
        methods: {
            changeTab (type) {
                this.activeTab = type;
            }
        }
    }
</script>

<style lang="scss">
    body {
        background: #F5F5F5;
    }
    .tabs {
        display: flex;
        background: #fff;
        align-content: center;
        li {
            flex: 1;
            text-align: center;
            position: relative;
            > div {
                border-right: 1px solid #ddd;
                margin: 10px 0;
            }
            span {
                height: 30px;
                line-height: 30px;
                display: block;
                font-size: 16px;
                color: #1F2D3D;
            }
            &.active {
                span {
                    &:after {
                        position: absolute;
                        content: '　';
                        width: 80%;
                        left: 10%;
                        bottom: 0;
                        border-bottom: 2px solid #74D5CC;
                    } 
                   
                }
            }
           
            &:last-of-type {
                > div {
                    border-right: 0;
                }
            }
        }
    }
    .coupon-list {
        margin: 20px;
        .coupon {
            border: 1px solid #D3DCE6;
            border-radius: 4px;
            position: relative;
            margin-bottom: 15px;
            .circle-solid {
                position: absolute;
                width: 5px;
                height: 10px;
               
                background: #F5F5F5;
                &.left {
                    left: -1px;
                    top: 35px;
                    border: 1px solid #D3DCE6;
                    border-left: 0;
                    border-radius: 0 100% 100% 0;
                }
                &.right {
                    right: -1px;
                    top: 35px;
                    border: 1px solid #D3DCE6;
                    border-right: 0;
                    border-radius: 100% 0  0 100%;
                }
                &.left1 {
                    left: -1px;
                    bottom: 45px;
                    border: 1px solid #D3DCE6;
                    border-left: 0;
                    border-radius: 0 100% 100% 0;
                }
                &.right1 {
                    right: -1px;
                    bottom: 45px;
                    border: 1px solid #D3DCE6;
                    border-right: 0;
                    border-radius: 100% 0  0 100%;
                }
            }
            .title {
                text-align: center;
                padding-top: 25px;
                font-size: 20px;
                margin-bottom: 25px;
            }
            &-detail {
                background: #fff;
                border-radius: 0 0  4px 4px;
                li {
                    word-break: break-all;
                    overflow: hidden;
                    label {
                        float: left;
                        width: 80px;
                        text-align: left;
                        padding-left: 20px;
                        color: #1F2D3D;
                        font-size: 13px;
                    }
                    div {
                        margin-left: 100px;
                        overflow: hidden;
                        color: #8492A6;
                        padding-right: 20px;
                    }
                    &:last-of-type {
                        padding-bottom: 20px;
                    }
                }
                .opt-group {
                    padding: 0 20px;
                    font-size: 13px;
                    color: #6BC0B8;
                    height: 50px;
                    line-height: 50px;
                    border-top: 1px dashed #D3DCE6;
                }
                .btn-share {
                    background: #6BC0B8;
                    border-radius: 4px;
                    margin-top: 10px;
                    font-size: 13px;
                    color: #FFFFFF;
                    width: 64px;
                    height: 30px;
                    text-align: center;
                    display: inline-block;
                    line-height: 30px;
                    float: right;
                }
            }
            .hospotial {
                font-weight: normal;
                line-height: 40px;
                font-size: 14px;
                background: #F9FAFC;
                color: #99A9BF;
                padding: 0 15px;
                border-radius: 4px 4px 0 0;
                border-bottom: 1px dashed #D3DCE6;
            }
        }
    }
</style>
