//登录接口需要携带参数ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

//获取单个用户的数据
export interface record {
  id: number,
  createTime: string,
  updateTime: string,
  roleName:string,
  remark: string
}

//获取所有用户的数据
export type records = record[]

//获取用户表单数据
export interface UsersData extends ResponseData{
  data : {
    records: records,
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null | number,
    maxLimit: null | number,
    searchCount: boolean,
    pages: number
  }
}