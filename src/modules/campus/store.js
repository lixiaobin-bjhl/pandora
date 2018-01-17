
const state = {
    showAddCampusState: false,
    campus: null
};

const mutations = {
    'SHOW_ADD_CAMPUS' (state, account) {
        state.showAddCampusState = true;
        state.campus = account;
    },
    'HIDE_ADD_CAMPUS' (state) {
        state.showAddCampusState = false;
        state.campus = null;
    }
};

export default {
    state,
    mutations
};