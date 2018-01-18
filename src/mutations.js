export default {
    'SET_USER_INFO' (state, userInfo) {
        state.userInfo = userInfo;
    },
    'SET_ROUTER' (state, path) {
        state.currentPath = path;
    }
}