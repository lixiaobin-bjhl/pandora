/**
 * @file 主页 
 */

'use strict';

import Vue from 'vue';
import ElementUI from 'element-ui/src/index';
import App from './App';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';


window.Vue = Vue;


// filters
require('./common/filter/date');
require('./common/filter/minuteStr');
require('./common/filter/maxDigital');
require('./common/filter/compressImage');


Vue.component('Pager', require('./common/components/Pager.vue'));

Vue.use(ElementUI);

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});
