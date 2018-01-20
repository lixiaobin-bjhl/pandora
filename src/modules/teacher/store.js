
const state = {
    showAddTeacherState: false,
    showImportTeacherState: false,
    isModified: false,
    teacher: null
};

const mutations = {
    'SHOW_ADD_TEACHER' (state, event) {
        state.showAddTeacherState = true;
        state.isModified = event.isModified;
        state.teacher = event.teacher;
    },
    'HIDE_ADD_TEACHER' (state) {
        state.showAddTeacherState = false;
        state.isModified = false;
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