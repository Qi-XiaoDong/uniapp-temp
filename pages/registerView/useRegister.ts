import { onLoad } from "@dcloudio/uni-app";
import   {getDict,getResigon} from '../../api/getDict.js'
import appRequert from "../../utils/request";
import { ref } from "vue";

export const useRegister = ()=>{
  const formData = ref({
      type: "",
      username: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyIdNumber: "",
      regision: "",
      companyAddress: "",
      legalPersonName: "",
      legalPersonIdNumber: "",
    });
	const   sys_extend_type= ref()  //企业类型字典
	const   regionOptions = ref()   //行政区划字典
	//注册
	const registerAccount = async()=>{
		let res
		try{
			const requestData = {
			   extendType: formData.value.type,
			   userName: formData.value.username,
			   cleartextPassword: formData.value.password,
			   companyName: formData.value.companyName,
			   companyCode: formData.value.companyIdNumber,
			   regionCode: formData.value.district || "0",
			   address: formData.value.companyAddress,
			   legalPeople: formData.value.legalPersonName,
			   legalIdNo: formData.value.legalPersonIdNumber,
			 };
					
			  res = await appRequert.post('/auth/extendRegister',requestData,{})
			  uni.showToast({title:res?.msg})
		}catch(e){
			    uni.showToast({ title: res?.data?.msg || '注册失败', icon: 'none' });
				throw new Error(e)
			  
		}
	}
	
	
	onLoad(async ()=>{
		sys_extend_type.value  =  await getDict('sys_extend_type')  //企业类型字典
		 regionOptions.value = await getResigon() //行政区划
		console.log(regionOptions.value,'字典')
	})
	
const rules = ref({
  // 企业类型
  type: {
    rules: [
      {
        required: true,
        errorMessage: "请选择企业类型",
      },
    ],
  },

  // 登录账号
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入登录账号",
      },
    ],
  },

  // 登录密码
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入登录密码",
      },
      {
        minLength: 8,
        maxLength: 20,
        errorMessage: "密码长度需在8~20个字符之间",
      },
    ],
  },

  // 确认密码
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请确认登录密码",
      },
      {
        validateFunction: (rule, value, data,callback) => {
			if(value !== data.password){
				callback('两次输入的密码不一致')
			}
			return true
          // return value === data.password ? Promise.resolve() : Promise.reject("两次输入的密码不一致");
        },
        errorMessage: "两次输入的密码不一致",
      },
    ],
  },

  // 企业名称
  companyName: {
    rules: [
      {
        required: true,
        errorMessage: "请输入企业名称",
      },
      // {
      //   minLength: 2,
      //   maxLength: 50,
      //   errorMessage: "企业名称长度需在2~50个字符之间",
      // },
    ],
  },

  // 证件号码（统一社会信用代码）
  companyIdNumber: {
    rules: [
      {
        required: true,
        errorMessage: "请输入统一社会信用代码",
      },
      {
        pattern: /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
        errorMessage: "请输入正确的统一社会信用代码（15/18/20位字母或数字）",
      },
    ],
  },

  // 证件地址（省市区选择）
  regision: {
    rules: [
      {
        required: true,
        errorMessage: "请选择证件地址",
      },
    ],
  },

  // 详细地址
  companyAddress: {
    rules: [
      {
        required: true,
        errorMessage: "请输入详细地址",
      },
    ],
  },

  // 法人姓名
  legalPersonName: {
    rules: [
      {
        required: true,
        errorMessage: "请输入法人姓名",
      },
      {
        pattern: /^[\u4e00-\u9fa5]{2,10}$/,
        errorMessage: "请输入有效的中文姓名（2~10个汉字）",
      },
    ],
  },

  // 法人身份证号
  legalPersonIdNumber: {
    rules: [
      {
        required: true,
        errorMessage: "请输入法人身份证号",
      },
      {
        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        errorMessage: "请输入正确的身份证号码",
      },
    ],
  },
});



	return{
		sys_extend_type,
		regionOptions,
		rules,
		formData,
		registerAccount
	}
}