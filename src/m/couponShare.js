/**
 * @file 抢卡券红包
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './couponShare.scss';
import CouponShare from './components/CouponShare.vue';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';
import router from './couponShareRouter';

require('src/common/filter/compressImage');

window.toast = function(msg) {
    Toast(msg);
}
const app = new Vue({
    router,
    render(h) {
        return (<div id ="app" class ="app">
                <router-view></router-view> 
            </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
