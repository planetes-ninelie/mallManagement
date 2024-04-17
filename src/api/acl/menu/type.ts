//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义子孩子数据
export interface LvList {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: [] | LvLists | LvThreeList | LvTwoList
  select: boolean
}

//定义列表数据
export type LvLists = LvList[]

//定义三级数据
export interface LvThreeList extends LvList {
  children: LvLists
}

//定义二级数据
export interface LvTwoList extends LvList {
  children: LvThreeList[]
}

//定义一级数据
export interface LvOneList extends LvList {
  children: LvTwoList[]
}

//定义返回获取菜单数据
export interface getMenuResponseData extends ResponseData {
  data: LvOneList[]
}
