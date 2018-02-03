<template>
    <div class="share-wrap coupon-result" v-if="info">
        <div class="envelope" v-if="!info.hasGetCoupon">
            <img
            class="org-logo" 
            src="../../assets/img/orgLogo.png"
            width="177">
            <div>
            <img 
                :src="'http://m.genshuixue.com/static/qrcode?url=' + info.qrCodeUrl + '&size=16'"
                height="80"
                width="80">
            </div>
            <div class="qrcode-guide">扫码进入公众号立即预约</div>
            <div class="result">
                <template v-if="getCouponResult.getCoupon">抢券成功</template>
                <template v-if="getCouponResult.overSend">太火爆了，已抢光</template>
                <template v-if="getCouponResult.expired">优惠券活动过期</template>
            </div>
        </div>
        <div class="envelope has-get-coupon" v-if="info && info.hasGetCoupon">
            <div class="logo-info">
                <img
                class="org-logo" 
                src="../../assets/img/orgLogo.png"
                width="177">
                <span>已领取</span>
            </div>
            <div class="name">{{info.couponName}}</div>
            <div class="expired">有效期{{info.expireDays}}天</div>
            <div class="qrcode-guide" style="margin-top: 25px;">扫码进入公众号立即预约</div>
            <img
                class="qrcode"
                :src="'http://m.genshuixue.com/static/qrcode?url=' + info.qrCodeUrl + '&size=16'"
                height="40"
                width="40">
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
    import { getShareCouponInfo} from 'src/modules/customer/request';
    import getUrlSearch from 'src/common/function/getUrlSearch';

    export default {
        data () {
            var search = getUrlSearch();
            var info = this.$root.info;
            var getCouponResult = this.$root.getCouponResult;
            return {
                couponId: search.couponId,
                info: info,
                getCouponResult: getCouponResult
                // getCouponResult: {
                //     'couponId': 1, 
                //     'getCoupon': false, 
                //     'expired':false,
                //     'overSend': false
                // },
            }
        },
        mounted () {
        },
        methods: {
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