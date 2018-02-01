<template>
    <div>
        <ul class="tabs">
            <li :class="{active: activeTab === 1}" @click="changeTab(1)">
                <div>
                    <span>未使用<template v-if="effectCnt">({{effectCnt}})</template></span>
                </div>
            </li>
            <li @click="changeTab(2)" :class="{active: activeTab === 2}">
                <div>
                    <span>已使用<template v-if="usedCnt">({{usedCnt}})</template></span>
                </div>
            </li>
            <li @click="changeTab(3)" :class="{active: activeTab === 3}">
                <div>
                    <span>已过期<template v-if="expireCnt">({{expireCnt}})</template></span>
                </div>
            </li>
        </ul>
        <loadmore :auto-fill="false"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="coupon-list" v-if="list && list.length">
                <div class="coupon" 
                    v-for="item, index in list" 
                    :key="item.id">
                    <span class="circle-solid left"></span>
                    <span class="circle-solid right"></span>
                    <h1 class="hospotial">欧若拉医疗美容医院</h1>
                    <div>   
                        <ul class="coupon-detail">
                            <h1 class="title">{{item.couponName}}</h1>
                            <li>
                                <label>有效期</label>
                                <div>{{item.beginTime|date('yyyy/MM/dd')}}-{{item.endTime|date('yyyy/MM/dd')}}</div>    
                            </li>
                            <li>
                                <label>使用规则</label>
                                <pre>{{item.ruleDesc}}</pre>
                            </li>
                            <li>
                                <label>使用方法</label>
                                <div><pre>{{item.ruleDesc}}</pre></div>
                            </li>
                            <div class="opt-group" v-if="item.canShare">
                                再送你{{item.shareCount}}张好友专用券，快去分享吧~<span class="btn-share" @click="shareWechat(item)">分享</span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </loadmore>
        <div v-if="!list.length" class="none-list">
            <span>暂没有找到优惠卷信息</span>
        </div>
    </div>
</template>

<script>

    import setTitle from '../../common/function/setTitle';
    import wechatJsSignMixin from '../../common/mixin/wechatJsSignMixin';
    import { Indicator, Loadmore} from 'mint-ui';
    import { couponList, getPatientCouponStatistics, generateShareInfo} from 'src/modules/customer/request';
    
    export default {
        mixins: [wechatJsSignMixin],
        data () {
            return {
                activeTab: 1,
                expireCnt: 0,
                usedCnt: 0,
                effectCnt: 0,
                pageNum: 1,
                pageSize: 20,
                allLoaded: false,
                list: []
            }
        },
        created () {
            setTitle('优惠券');
            this.getWechatJsSign();
            document.body.style.backgroundColor = '#f5f5f5';
        },
        mounted() {
            this.fetchList();
            this.getPatientCouponStatistics();
        },
        methods: {
            /**
             * 获取用户优惠券使用情况统计 
             */
            getPatientCouponStatistics () {
                getPatientCouponStatistics()
                    .then((res)=> {
                        var data = res.data;
                        this.usedCnt = data.usedCnt;
                        this.expireCnt = data.expireCnt;
                        this.effectCnt = data.expireCnt;
                    });
            },
            /**
             * 获取列表 
             */
            fetchList (mid) {
                Indicator.open('加载中…');
                var params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                if (this.activeTab == 2) {
                    params.used = true;
                } else if (this.activeTab == 3) {
                    params.expired = true;
                }
                couponList(params)
                    .then((res)=> {
                        Indicator.close();
                        this.$refs.loadmore.onBottomLoaded(mid);
                        this.list = this.list.concat(res.data.list);
                        var pageInfo = res.pageInfo;
                        if (pageInfo.pageNum < Math.ceil(pageInfo.count / pageInfo.pageSize)) {
                            this.allLoaded = false;
                        } else {
                            this.allLoaded = true;
                        } 
                    }, ()=> {
                        Indicator.close();
                        this.$refs.loadmore.onBottomLoaded(mid);
                    });
            },
            /**
             * 获取更多优惠券 
             */
            loadBottom (mid) {
                this.pageNum ++;
                this.fetchList(mid);
            },
            /**
             * 切换tab 
             */
            changeTab (type) {
                this.activeTab = type;
                this.list = [];
                this.fetchList();
            },
            /**
             * 分享 
             */
            shareWechat (item) {
                generateShareInfo({
                    couponId: item.id
                })
                    .then((res)=> {
                        var data = res.data;
                        this.share({
                            imgUrl: data.orgAvatar,
                            link: data.shareUrl,
                            title: '在' + data.orgName + '领了' + data.shareCount + '个卡券红包分享给你，就要你美！',
                            desc: data.orgAvatar + '卡券等你来抢，手快有，手慢无~'
                        });
                });
               
            }
        },
        beforeDestroy () {
            document.body.style.backgroundColor = '#fff';
        },
        components: {
            Loadmore
        }
    }
</script>

<style lang="scss">
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
                background: #F5F5F5;;
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
