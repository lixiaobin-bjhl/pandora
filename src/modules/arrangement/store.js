
const state = {
    showArrangementDetailState: false,
    arrangement: null,
    showAuditApplyState: false
};

const mutations = {
    'SHOW_ARRANGEMENT_DETAIL' (state, arrangement) {
        state.showArrangementDetailState = true;
        state.arrangement = arrangement;
    },
    'HIDE_ARRANGEMENT_DETAIL' (state) {
        state.showArrangementDetailState = false;
        state.arrangement = null;
    },
    'SHOW_AUDIT_APPLY' (state, arrangement) {
        state.showAuditApplyState = true;
        state.arrangement = arrangement;
    },
    'HIDE_AUDIT_APPLY' (state) {
        state.showAuditApplyState = false;
        state.arrangement = null;
    }
};

export default {
    state,
    mutations
};