/**
 * @file 提醒设置 store
 */

const state = {
    showNoticeItem: false,
    noticeItem: null
};

const mutations = {
    'SHOW_NOTICE_ITEM' (state, noticeItem) {
        state.showNoticeItem = true;
        state.noticeItem = noticeItem;
    },
    'HIDE_NOTICE_ITEM' (state) {
        state.showNoticeItem = false;
        state.noticeItem = null;
    }
};

export default {
    state,
    mutations
};