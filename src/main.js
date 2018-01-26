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
import toast from './common/function/toast';

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);
import loadingBar from 'src/common/components/loadingBar';

window.Vue = Vue;
window.toast = toast;

router.beforeEach((to, from, next) => {
	var path = from.path;
	if (path) {
		// 两个/之间的就是模块名称
		var moduleNames = /([^\/]+)/.exec(path);
		if (moduleNames && moduleNames[1]) {
			clearState(moduleNames[1]);
		}
	}
	var toPath = to.path;
	if(toPath == '/') {
		store.commit('SET_CRUMB_OPTIONS', []);
	} else {
		// 两个/之间的就是模块名称
		var moduleNames = /([^\/]+)/.exec(toPath);
		if (moduleNames && moduleNames[1]) {
			clearState(moduleNames[1]);
		}
	}
    loadingBar.start();
    next();
	store.commit('SET_ROUTER', toPath);
});

/**
 * 路由变化时，把之前的弹窗状态都清掉
 */
function clearState (module) {
	var status = store.state[module];
	if (status) {
		for (var key in status) {
			var property = status[key];
			if (status.hasOwnProperty(key) && property
				&& typeof property === 'boolean') {
				status[key] = false;
			}
		}
	}
}

router.afterEach(route => {
    loadingBar.finish();
});


// filters
require('./common/filter/date');
require('./common/filter/minuteStr');
require('./common/filter/maxDigital');
require('./common/filter/compressImage');
require('./common/filter/phone');


Vue.component('Pager', require('./common/components/Pager.vue'));

Vue.use(ElementUI);

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});
