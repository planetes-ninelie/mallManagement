export interface CreateCategory {
  name: string
  pid: number
  level: number
}

export interface UpdateCategory {
  name: string
  id: number
}

export interface CategoryData extends CreateCategory {
  id: number
  createTime: string
  updateTime: string
  children: CategoryData[]
}

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryResponse extends ResponseData {
  data: CategoryData[]
}

export interface CategoryDto extends CreateCategory {
  id?: number
}
