
const state = {
    showLessonDetailState: false,
    lessonId: null
};

const mutations = {
    'SHOW_LESSON_DETAIL' (state, lessonId) {
        state.showLessonDetailState = true;
        state.lessonId = lessonId;
    },
    'HIDE_LESSON_DETAIL' (state) {
        state.showLessonDetailState = false;
        state.lessonId = null;
    }
};

export default {
    state,
    mutations
};