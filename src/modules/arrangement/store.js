
const state = {
    showArrangementDetailState: false,
    arrangement: null
};

const mutations = {
    'SHOW_ARRANGEMENT_DETAIL' (state, arrangement) {
        state.showArrangementDetailState = true;
        state.arrangement = arrangement;
    },
    'HIDE_ARRANGEMENT_DETAIL' (state) {
        state.showArrangementDetailState = false;
        state.arrangement = null;
    }
};

export default {
    state,
    mutations
};