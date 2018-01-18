/**
 * @file 登录页
 */

'use strict';

import Vue from 'vue';
import ElementUI from 'element-ui/src/index';
import Login from './Login.vue';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import toast from './common/function/toast';

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);  

window.Vue = Vue;

window.toast = toast;

Vue.use(ElementUI);

new Vue({
    el: '#app',
    store,
    template: '<Login/>',
    components: { Login }
});
