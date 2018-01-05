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

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        orgInfo: {}
    },
    strict: false,
    mutations,
    actions,
    modules: {
        customer
    }
});