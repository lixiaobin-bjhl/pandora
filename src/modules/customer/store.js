/**
 * @file 客户管理 store
 */

const state = {
    showDetailState: true,
    showCouponState: false,
    showAddCustomerState: false,
    showAddItemState: false,
    id: null
};

const mutations = {
    'SHOW_ADD_ITEM_DETIAL' (state, id) {
        state.showAddItemState = true;
        state.id = id;
    },
    'HIDE_ADD_ITEM_DETIAL' (state) {
        state.showAddItemState = false;
        state.id = null;
    },
    'SHOW_ADD_CUSTOMER_DETIAL' (state, id) {
        state.showAddCustomerState = true;
        state.id = id;
    },
    'HIDE_ADD_CUSTOMER_DETIAL' (state) {
        state.showAddCustomerState = false;
        state.id = null;
    },
    'SHOW_COUPON_DETIAL' (state, id) {
        state.showCouponState = true;
        state.id = id;
    },
    'HIDE_COUPON_DETIAL' (state) {
        state.showCouponState = false;
        state.id = null;
    },
    'SHOW_CUSTOMER_DETIAL' (state, id) {
        state.showDetailState = true;
        state.id = id;
    },
    'HIDE_CUSTOMER_DETIAL' (state) {
        state.showDetailState = false;
        state.id = null;
    }
};

export default {
    state,
    mutations
};