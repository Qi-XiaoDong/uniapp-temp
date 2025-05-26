

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}


export function throttle(fn, delay) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

export function validateIdCard(id) {
  if (!id || id.length !== 18) return false;
  const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
  	sum += parseInt(id.charAt(i), 10) * weight[i];
  }
  if (checkCode[sum % 11] === id.charAt(17).toUpperCase()) {
  	return true;
  } else {
  	return false;
  }
}

/**
 * @description 处理文件上传图标
 * @param fileType 文件扩展名（点开头）
 * @param url 附件路径（如果是图片返回原来图片的路径，其他文件则返回对应的图标）
 * @return
 * */
const baseURL = import.meta.env.VITE_APP_BASE_FILE_API;
export function handleFileIcon(item, url) {
    let result = '';
    switch (item.fileType) {
        case "jpg":
        case "jpeg":
        case "png":
            result = baseURL + item.fileUrl;
            break;
        case "xlsx":
        case "xls":
            result = new URL("@/static/upload_icon/excel.png", import.meta.url).href;
            break;
        case "docx":
        case "doc":
            result = new URL("@/static/upload_icon/word.png", import.meta.url).href;
            break;
        case "ppt":
        case "pptx":
            result = new URL("@/static/upload_icon/ppt.png", import.meta.url).href;
            break;
        case "pdf":
            result = new URL("@/static/upload_icon/pdf.png", import.meta.url).href;
            break;
        case "zip":
            result = new URL("@/static/upload_icon/zip_.png", import.meta.url).href;
            break;
        case "txt":
            result = new URL("@/static/upload_icon/file_txt_fill.png", import.meta.url).href;
            break;
        default:
            result = new URL("@/static/upload_icon/folder.png", import.meta.url).href;
            break;
    }
    return result;
}