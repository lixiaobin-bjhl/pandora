/**
 * @file store
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

import customer from './modules/customer/store';
import notice from './modules/setting/store';
import discounts from './modules/discounts/store';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    strict: false,
    mutations,
    actions,
    modules: {
        customer,
        discounts,
        notice
    }
});