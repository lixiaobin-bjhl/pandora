/**
 * @file 优惠活动 store
 */

const state = {
    showAddActiveState: true,
    active: null,
    showAddCouponsState: false,
    coupons: null,
};

const mutations = {
    'SHOW_ADD_ACTIVE' (state, active) {
        state.showAddActiveState = true;
        state.active = active;
    },
    'HIDE_ADD_ACTIVE' (state) {
        state.showAddActiveState = false;
        state.noticeItem = null;
    },
    'SHOW_ADD_COUPONS' (state, coupons) {
        state.showAddCouponsState = true;
        state.coupons = coupons;
    },
    'HIDE_ADD_COUPONS' (state) {
        state.showAddCouponsState = false;
        state.coupons = null;
    }
};

export default {
    state,
    mutations
};