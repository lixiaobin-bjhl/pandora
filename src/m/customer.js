/**
 * @file 个人中心
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/style.css';
import router from './customerRouter';

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);  

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
