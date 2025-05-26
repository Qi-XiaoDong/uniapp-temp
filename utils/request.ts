import { getToken, removeToken } from "@/utils/auth";
import { showToast } from "@/utils/feedback";
import { RequestOptions, RequestMethods } from "@/types/request";

// 基础配置
const baseConfig = {
	// #ifdef H5
	baseURL: import.meta.env.VITE_APP_BASE_API,
	// #endif
	// #ifndef H5
	baseURL: import.meta.env.VITE_APP_API,
	// #endif
	timeout: 10000,
	header: {
		"Content-Type": "application/json;charset=UTF-8",
	},
};

// 请求拦截器
const requestInterceptors = (config : {
	header : { Authorization : string };
	isAuth : boolean;
}) => {
	// 不需要token
	if (config.isAuth === false) return config;
	// 添加token
	const token = getToken();
	if (token) {
		config.header.Authorization = `Bearer ${token}`;
	}
	return config;
};

// 响应拦截器
const responseInterceptors = {
	success: (response : { data : { code : any; msg : any; data : any } }) => {
		const { code, msg } = response.data;
		// 根据后端返回状态码处理
		switch (code) {
			case 200:
				return response.data;
			case 401:
				removeToken();
				showToast(msg || "请求失败", 'none');
				uni.navigateTo({
					url: "/pages/loginView/loginView",
				});
				return Promise.reject(new Error("未登录或登录已过期"));
			default:
				showToast(msg || "请求失败", 'error');
				return Promise.reject(new Error(msg || "请求失败"));
		}
	},
	fail: (error : { errMsg : string | string[] }) => {
		let message = "网络连接错误";
		if (error.errMsg.includes("timeout")) {
			message = "请求超时";
		}
		showToast(message, error);
		return Promise.reject(error);
	},
};

/**
 * 封装uni.request
 * @param {Object} options - 请求配置
 * @param {string} options.url - 请求地址
 * @param {string} [options.method='GET'] - 请求方法
 * @param {Object} [options.data] - 请求数据
 * @returns {Promise}
 */
function _request(options : RequestOptions) : Promise<any> {
	return new Promise((resolve, reject) => {
		// 合并配置
		const config = {
			...baseConfig,
			...options,
			url: baseConfig.baseURL + options.url,
			success: (response : any) => {
				try {
					resolve(responseInterceptors.success(response));
				} catch (error) {
					reject(error);
				}
			},
			fail: (error : { errMsg : string | string[] }) => {
				reject(responseInterceptors.fail(error));
			},
		};

		// 处理请求拦截器
		const interceptedConfig = requestInterceptors(config as any);

		// 发送请求
		uni.request(interceptedConfig as any);
	});
}

// 常用请求方法封装，添加类型注解
const appRequert : RequestMethods = {
	get: (url : any, params = {}, config = {}) =>
		_request({
			url,
			method: "GET",
			data: params,
			...config,
			isAuth: config.isAuth !==  false ? true : config.isAuth,
		}),

	post: (url : any, data = {}, config = {}) =>
		_request({
			url,
			method: "POST",
			data,
			...config,
			isAuth: config.isAuth !==  false ? true : config.isAuth,
		}),

	put: (url : any, data = {}, config = {}) =>
		_request({
			url,
			method: "PUT",
			data,
			...config,
			isAuth: config.isAuth !==  false ? true : config.isAuth,
		}),

	del: (url : any, data = {}, config = {}) =>
		_request({
			url,
			method: "DELETE",
			data,
			...config,
			isAuth: config.isAuth !==  false ? true : config.isAuth,
		}),
};

export default appRequert