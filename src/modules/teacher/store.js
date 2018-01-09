
const state = {
    showAddTeacherState: false,
    showImportTeacherState: false,
    teacher: null
};

const mutations = {
    'SHOW_ADD_TEACHER' (state, teacher) {
        state.showAddTeacherState = true;
        state.teacher = teacher;
    },
    'HIDE_ADD_TEACHER' (state) {
        state.showAddTeacherState = false;
        state.teacher = null;
    },
    'SHOW_IMPORT_TEACHER' (state) {
        state.showImportTeacherState = true;
    },
    'HIDE_IMPORT_TEACHER' (state) {
        state.showImportTeacherState = false;
    }
};

export default {
    state,
    mutations
};