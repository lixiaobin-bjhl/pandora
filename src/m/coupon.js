/**
 * @file 优惠券
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './bindTel.scss';
import Coupon from './components/Coupon.vue';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';

window.toast = function(msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id ="app" class ="app">
                <Coupon></Coupon> 
            </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
