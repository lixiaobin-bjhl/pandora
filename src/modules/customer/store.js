/**
 * @file 客户管理 store
 */

const state = {
    showDetailState: false,
    id: null
};

const mutations = {

    'SHOW_CUSTOMER_DETAIL' (state, id) {
        state.showDetailState = true;
        state.id = id;
    },
    'HIDE_CUSTOMER_DETAIL' (state) {
        state.showDetailState = false;
        state.id = null;
    }
};

export default {
    state,
    mutations
};