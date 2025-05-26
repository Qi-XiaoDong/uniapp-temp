
// 存储变量名
let storageKey = "storage_data2";

const customStorage = {
  set: function(key, value) {
    let tmp = uni.getStorageSync(storageKey);
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    uni.setStorageSync(storageKey, tmp);
  },
  get: function(key) {
    let storageData = uni.getStorageSync(storageKey) || {};
    return storageData[key] || "";
  },
  remove: function(key) {
    let storageData = uni.getStorageSync(storageKey) || {};
    delete storageData[key];
    uni.setStorageSync(storageKey, storageData);
  },
  clean: function() {
    uni.removeStorageSync(storageKey);
  },
};

export default customStorage;
