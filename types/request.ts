export interface RequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, any>;
  isAuth?: boolean;
  timeout?: number;
  header?: Record<string, string>;
  // ...其他可选配置属性
}

export interface RequestInterceptors {
  success: (response: {
    data: { code: number; msg: string; data: any };
  }) => any;
  fail: (error: { errMsg: string | string[] }) => Promise<never>;
}

export interface IRequestConfig {
  url: string;
  params: Record<string, any>;
  config: { isAuth?: boolean } & Record<string, any>;
}

export interface RequestMethods {
  get: (
    url: string,
    params?: Record<string, any>,
    config?: { isAuth?: boolean } & Record<string, any>
  ) => Promise<any>;
  post: (
    url: string,
    data?: Record<string, any>,
    config?: { isAuth?: boolean } & Record<string, any>
  ) => Promise<any>;
  put: (
    url: string,
    data?: Record<string, any>,
    config?: { isAuth?: boolean } & Record<string, any>
  ) => Promise<any>;
  del: (
    url: string,
    data?: Record<string, any>,
    config?: { isAuth?: boolean } & Record<string, any>
  ) => Promise<any>;
}
