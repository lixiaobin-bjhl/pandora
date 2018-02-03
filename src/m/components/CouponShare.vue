<template>
    <div class="share-wrap" v-if="info">
        <div class="share-info">
            <img 
            width="68"
            height="68"
            src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_68h_68w_1c_0i_1o_90Q_1x.jpg">
            <div>周小红</div>
            <div>送给大家{{info.shareCount}}个卡券红包</div>
        </div>
        <div class="envelope">
            <img
            class="org-logo" 
            src="../../assets/img/orgLogo.png"
            width="177">
            <div class="name">{{info.couponName}}</div>
            <div class="expired">有效期{{info.expireDays}}天</div>
            <div class="coupon-btn-wrap">
                <img @click="getCoupon" src="../../assets/img/getCoupon.svg">
            </div>
        </div>
        <div class="coupon-person-list" v-if="info.receiveCouponUsers.length && !info.expired">
            <h1 class="coupon">还有哪些人领了红包</h1>
            <ul>
                <li v-for="item, index in info.receiveCouponUsers" 
                    :key="index">
                    <img 
                    width="50"
                    height="50"
                    v-if="item.avatar"
                    :src="item.avatar|compressImage(50, 50)">
                    <div>{{item.name}}</div>
                </li>
            </ul>
        </div>
        <div class="first-tip" v-if="!info.receiveCouponUsers.length && !info.expired">
            快去戳，您就是第一个~
        </div>
        <div class="rule">
            <h1>活动规则</h1>
            <ul>
                <li>1. 每人在同一活动中只能领取一张券；</li>
                <li>2. 领取成功后，规定时间关注机构公众号后卡券生效，否则卡券作废；</li>
                <li>3. 卡券以及使用规则可在机构公众号【我的卡券】中查看；</li>
                <li>4. 使用前请提前联系机构预约，并在付款时出示本券；</li>
                <li>5. 预约咨询热线：027-83778008；</li>
            </ul>
        </div>
    </div>
</template>

<script>

    import { getShareCouponInfo, getCoupon } from 'src/modules/customer/request';
    import getUrlSearch from 'src/common/function/getUrlSearch';

    export default {
        data () {
            var search = getUrlSearch();
            return {
                couponId: search.couponId,
                info: null
            }
        },
        mounted () {
            this.getShareCouponInfo();
        },
        methods: {
            /**
             * 获取优惠券 
             */
            getCoupon () {
                getCoupon({
                    id: this.couponId
                })
                    .then((res)=> {
                        this.$root.info = this.info;
                        this.$root.getCouponResult = res.data;
                        this.$router.push('result');
                    });
            },
            /**
             * 获取优惠券信息
             */
            getShareCouponInfo () {
                getShareCouponInfo({
                    id: this.couponId
                })
                .then((res)=> {
                    this.info = res.data;
                });
            }
        }
    }
</script>