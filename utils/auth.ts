// utils/auth.js
/**
 * 获取token
 * @returns {string}
 */
export function getToken(): string {
    return uni.getStorageSync('token');
}

/**
 * 设置token
 * @param {string} token - 认证令牌
 */
export function setToken(token: string) {
    uni.setStorageSync('token', token);
}

/**
 * 移除token
 */
export function removeToken() {
    uni.removeStorageSync('token');
}    