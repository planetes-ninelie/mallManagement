//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//单个角色数据
export interface RoleRecord {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: boolean
}

//角色数组数据
export type RoleRecords = RoleRecord[]

//获取角色返回的数据
export interface GetRoleResponseData extends ResponseData {
  data: {
    records: RoleRecords
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
