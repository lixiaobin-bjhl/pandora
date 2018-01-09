/**
 * @file store
 */

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import account from './modules/account/store';
import teacher from './modules/teacher/store';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        orgInfo: {}
    },
    strict: false,
    mutations,
    actions,
    modules: {
        account,
        teacher
    }
});