/**
 * @file 主页 
 */

'use strict';

import Vue from 'vue';
import ElementUI from 'element-ui/src/index';
import App from './App';
import router from './router';
import store from './store';
import 'assets/scss/element-variables.scss';
import toast from './common/function/toast';
import loadingBar from 'src/common/components/loadingBar';
import Icon from 'vue-svg-icon/Icon.vue';
import auth from 'src/common/mixin/auth';

Vue.component('icon', Icon);

router.beforeEach((to, from, next) => {
    loadingBar.start();
    next();
});

router.afterEach(route => {
    loadingBar.finish();
});

window.Vue = Vue;

window.toast = toast;


// filters
require('./common/filter/date');
require('./common/filter/minuteStr');
require('./common/filter/maxDigital');
require('./common/filter/compressImage');
require('./common/filter/phone');
require('./common/filter/minute');
require('./common/filter/week');

Vue.component('Pager', require('./common/components/Pager.vue'));

Vue.use(ElementUI);

new Vue({
    el: '#app',
    mixins: [auth],
    store,
    router,
    template: '<App/>',
    components: { App }
});
