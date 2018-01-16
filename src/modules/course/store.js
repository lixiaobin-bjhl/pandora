
const state = {
    showAddCourseState: false,
    showApplyCourseState: false,
    isShowDetail: false,
    course: null
};

const mutations = {
    'SHOW_ADD_COURSE' (state, course) {
        state.showAddCourseState = true;
        state.course = course;
    },  
    'HIDE_ADD_COURSE' (state) {
        state.showAddCourseState = false;
        state.course = null;
    },
    'SHOW_APPLY_COURSE' (state, data) {
        state.showApplyCourseState = true;
        state.course = data.course;
        state.isShowDetail = data.isShowDetail;
    },  
    'HIDE_APPLY_COURSE' (state) {
        state.showApplyCourseState = false;
        state.course = null;
        state.isShowDetail = false;
    }
};

export default {
    state,
    mutations
};