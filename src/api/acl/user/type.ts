//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//获取单个用户的数据
export interface record {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName?: string
  username?: string
  password?: string
  name?: string
  phone?: string
}

//获取所有用户的数据
export type records = record[]

//获取用户表单数据
export interface UsersData extends ResponseData {
  data: {
    records: records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null | number
    maxLimit: null | number
    searchCount: boolean
    pages: number
  }
}

//用户分配角色提交表单数据
export interface toAssignData {
  roleIdList: []
  userId: number
}

export interface UserData extends ResponseData {
  data: record
}
