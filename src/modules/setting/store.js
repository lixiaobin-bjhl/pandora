/**
 * @file 提醒设置 store
 */

const state = {
    showNoticeItem: false,
    projectItem: null
};

const mutations = {
    'SHOW_NOTICE_ITEM' (state, projectItem) {
        state.showNoticeItem = true;
        state.projectItem = projectItem;
    },
    'HIDE_NOTICE_ITEM' (state) {
        state.showNoticeItem = false;
        state.projectItem = null;
    }
};

export default {
    state,
    mutations
};