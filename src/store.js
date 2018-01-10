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
import equipment from './modules/equipment/store';
import course from './modules/course/store';

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
        teacher,
        equipment,
        course
    }
});