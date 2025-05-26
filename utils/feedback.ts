/**
 * 显示提示框
 * @param {string} title - 提示文字
 * @param {string} [icon='none'] - 图标
 */
export function showToast(title : string, icon : any = "none") {
	uni.showToast({
		title,
		icon,
		duration: 2000,
	});
}

/**
 * 显示模态弹窗
 * @param {Object} param0 - 参数对象
 * @param {string} param0.content - 弹窗内容
 */
export function showConfirm({ content } : { content : string }) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: "提示",
			content: content,
			cancelText: "取消",
			confirmText: "确定",
			success: (res) => resolve(res),
			fail: (err) => reject(err),
		});
	});
}