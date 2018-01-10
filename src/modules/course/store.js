
const state = {
    showAddCourseState: false,
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
    }
};

export default {
    state,
    mutations
};