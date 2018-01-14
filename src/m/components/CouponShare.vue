<template>
    <div class="share-wrap">
        <div class="share-info">
            <img 
            width="68"
            height="68"
            src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_285h_427w_1c_0i_1o_90Q_1x.jpg">
            <div>周小红</div>
            <div>送给大家3个卡券红包</div>
        </div>
        <div class="envelope">
            <img
            class="org-logo" 
            src="../../assets/img/orgLogo.png"
            width="177">
            <div class="name">脱毛免费体验券</div>
            <div class="expired">有效期20天</div>
            <div class="coupon-btn-wrap">
                <div></div>
            </div>
        </div>
        <div class="coupon-person-list">
            <h1 class="coupon">还有哪些人领了红包</h1>
            <ul>
                <li>
                    <img 
                    width="50"
                    height="50"
                    src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_285h_427w_1c_0i_1o_90Q_1x.jpg">
                    <div>王小帅</div>
                </li>
                 <li>
                    <img 
                    width="50"
                    height="50"
                    src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_285h_427w_1c_0i_1o_90Q_1x.jpg">
                    <div>王小帅</div>
                </li>
                <li>
                    <img 
                    width="50"
                    height="50"
                    src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_285h_427w_1c_0i_1o_90Q_1x.jpg">
                    <div>王小帅</div>
                </li>
                <li>
                    <img 
                    width="50"
                    height="50"
                    src="http://img.gsxservice.com/0baijiatools/359d4909508e312bf3bd15d3f4f8b84f/%E5%A4%B4%E5%83%8F.jpg@1e_285h_427w_1c_0i_1o_90Q_1x.jpg">
                    <div>王小帅</div>
                </li>
            </ul>
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

<style lang="scss">
    body,
    html {
        height: 100%;
    }
    .share-wrap {
        min-height: 100%;
        background-image: linear-gradient(-180deg, #FC4F39 0%, #F23A41 100%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border: 1px solid red;
    }
    .share-info {
        text-align: center;
        color: #FED799;
        font-size: 16px;
        > div {
            margin: 0 0 5px 0;
        }
        img {
            border-radius: 50%;
            margin: 30px 0 12px 0;
            border: 2px solid #fff;
        }
    }
    .envelope {
        width: 340px;
        height: 351px;
        margin: 25px auto 0 auto;
        padding: 10px;
        box-sizing: border-box;
        background: url('../../assets/img/envelope.svg') no-repeat;
        .org-logo {
            margin: 5px 0 0 10px;
        }
        .name {
            text-align: center;
            font-size: 26px;
            color: #1F2D3D;
            margin-top: 25px;
        }
        .expired {
            text-align: right;
            font-size: 12px;
            margin: 20px 5px 0 0;
            color: #99A9BF;
        }
        .coupon-btn-wrap {
            text-align: center;
            margin-top: 40px;
            > div {
                background: url("../../assets/img/getCoupon.svg");
                width: 100px;
                height: 100px;
                background-size: contain;
                margin: 0 auto;
            }
        }
    }   
    .coupon-person-list {
        overflow: hidden;
        height: auto;
        margin-top: 25px;
        h1 {
            font-size: 16px;
            text-align: center;
            color: #FED799;
            margin-bottom: 30px;
        }
        li {
            float: left;
            font-size: 12px;
            color: #FED799;
            width: 25%;
            text-align: center;
            > img {
                border-radius: 50%;
                margin: 0 auto 5px auto;
                display: block;
            }
        }
    }

    .rule {
        margin-top: 40px;
        color: #FED799;
        padding: 0 25px 50px 32px;
        line-height: 1.6;
        h1 {
            text-align: center;
            font-size: 16px;
            color: #FED799;
            margin-bottom: 20px;
        }
    }
</style>
