import { login, logout, getInfo } from '@/api/system/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
export const useLogin =()=>{
	interface userInfo{
		username:string,
		password:string,
		code:string,
		uuid:string
	}
	// 登录
const	loginApi= (userInfo:userInfo)=> {
	  const username = userInfo.username.trim()
	  const password = userInfo.password
	  const code = userInfo?.code
	  const uuid = userInfo?.uuid
	  return new Promise((resolve, reject) => {
	    login(username, password, code, uuid)
	        .then((res) => {
	          const data = res.data
	          setToken(data.access_token)
	          resolve()
	        })
	        .catch((error) => {
	          reject(error)
	        })
	  })
	}
	
	const getInfoApi=()=> {
	  return new Promise((resolve, reject) => {
	    getInfo()
	        .then((res) => {
	          resolve(res)
	        })
	        .catch((error) => {
	          reject(error)
	        })
	  })
	}
	
	// 退出系统
const 	logOutApi=()=> {
	  return new Promise((resolve, reject) => {
	    logout()
	        .then(() => {
	          removeToken()
	          resolve()
	        })
	        .catch((error) => {
	          reject(error)
	        })
	  })
	}
	
	return {
		loginApi,
		getInfoApi,
		logOutApi
		
	}
}