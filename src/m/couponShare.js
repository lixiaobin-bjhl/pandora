/**
 * @file 抢卡券红包
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './bindTel.scss';
import CouponShare from './components/CouponShare.vue';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';

window.toast = function(msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id ="app" class ="app">
                <CouponShare></CouponShare> 
            </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
