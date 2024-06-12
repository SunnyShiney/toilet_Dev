import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from 'nprogress'

//消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString=false) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 2000,
  });
}

//封装消息弹出框
export function showModal(content = "提示内容", type = "warning", title = "") {
  //这里一定要返回，返回一个 Promise 来处理后续响应。
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type,
  });
}

//显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

//关闭全屏loading 
export function hideFullLoading() {
  nprogress.done()
}