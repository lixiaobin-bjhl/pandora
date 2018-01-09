
const state = {
    showAddAccountState: false,
    showImportAccountState: false,
    showModifyPwdState: false,
    account: null
};

const mutations = {
    'SHOW_ADD_ACCOUNT' (state, account) {
        state.showAddAccountState = true;
        state.account = account;
    },
    'HIDE_ADD_ACCOUNT' (state) {
        state.showAddAccountState = false;
        state.account = null;
    },
    'SHOW_IMPORT_ACCOUNT' (state) {
        state.showImportAccountState = true;
    },
    'HIDE_IMPORT_ACCOUNT' (state) {
        state.showImportAccountState = false;
    },
    'SHOW_MODIFY_PWD' (state) {
        state.showModifyPwdState = true;
    },
    'HIDE_MODIFY_PWD' (state) {
        state.showModifyPwdState = false;
    }
};

export default {
    state,
    mutations
};