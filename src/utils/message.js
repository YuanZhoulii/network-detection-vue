//导出全局消息显示函数
export default {
    install(Vue) {
        Vue.prototype.showMsg = function (message, type = 'success') {

            this.$message({
                showClose: true,
                message,
                type,
                duration: type === 'success' ? 500 : 1500
            });
        };
        Vue.prototype.showErrMsg = function (msg) {
            this.showMsg(msg, 'error')
        };
        Vue.prototype.showSuccessMsg = function (msg) {
            this.showMsg(msg, 'success')
        };
        Vue.prototype.showWarnMsg = function (msg) {
            this.showMsg(msg, 'warn')
        };
    }
}