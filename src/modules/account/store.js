
const state = {
    showAddAccountState: false,
    showImportAccountState: false,
    showModifyPwdState: false,
    isModified: false,
    account: null
};

const mutations = {
    'SHOW_ADD_ACCOUNT' (state, event) {
        state.showAddAccountState = true;
        state.account = event.account;
        state.isModified = event.isModified;
    },
    'HIDE_ADD_ACCOUNT' (state) {
        state.showAddAccountState = false;
        state.account = null;
        state.isModified = null;
    },
    'SHOW_IMPORT_ACCOUNT' (state) {
        state.showImportAccountState = true;
    },
    'HIDE_IMPORT_ACCOUNT' (state) {
        state.showImportAccountState = false;
    },
    'SHOW_MODIFY_PWD' (state, account) {
        state.showModifyPwdState = true;
        state.account = account;
    },
    'HIDE_MODIFY_PWD' (state) {
        state.showModifyPwdState = false;
        state.account = null;
    }
};

export default {
    state,
    mutations
};