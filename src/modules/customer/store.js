/**
 * @file 客户管理 store
 */

const state = {
    showDetailState: false,
    showCouponState: false,
    couponRule: null,
    showAddCustomerState: false,
    showAddItemState: false,
    project: null,
    id: null
};

const mutations = {
    'SHOW_ADD_ITEM_DETIAL' (state, event) {
        state.showAddItemState = true;
        state.id = event.id;
        state.project = event.project;
    },
    'HIDE_ADD_ITEM_DETIAL' (state) {
        state.showAddItemState = false;
        state.id = null;
        state.project = null;
    },
    'SHOW_ADD_CUSTOMER_DETIAL' (state, id) {
        state.showAddCustomerState = true;
        state.id = id;
    },
    'HIDE_ADD_CUSTOMER_DETIAL' (state) {
        state.showAddCustomerState = false;
        state.id = null;
    },
    'SHOW_COUPON_DETIAL' (state, couponRule) {
        state.showCouponState = true;
        state.couponRule = couponRule;
    },
    'HIDE_COUPON_DETIAL' (state) {
        state.showCouponState = false;
        state.couponRule = null;
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