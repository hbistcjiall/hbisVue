export default {//触发state更改
    setHeaders(state,newheader) {
        state.headers=newheader;
    },
    userStatus(state, flag) {
        state.isLogin = flag
    },
    updateCurrent(state, flag) {
        state.current = flag
    }
}