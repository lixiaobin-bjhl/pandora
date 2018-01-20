
const state = {
    showAddCampusState: false,
    campus: null
};

const mutations = {
    'SHOW_ADD_CAMPUS' (state, campus) {
        state.showAddCampusState = true;
        state.campus = campus;
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