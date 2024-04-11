//所有SKU接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//获取SKU展示数据的单个数据record
export interface SkuData {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  price?: number
  skuName?: string
  skuDesc?: number
  weight?: number
  tmId?: number
  category3Id?: number
  skuDefaultImg?: string
  isSale?: number
  skuImageList?: null
  skuAttrValueList?: skuAttrValueList
  skuSaleAttrValueList?: skuSaleAttrValueList
}

//
export interface skuAttrValueList {}
//
export interface skuSaleAttrValueList {}
//
export interface SkuInfoData extends ResponseData {
  data: SkuData
}

//SKU展示的数据的所有数据records
export type records = SkuData[]

//获取SKU响应数据的所有参数
export interface HasSkuResponseData extends ResponseData {
  data: {
    records: records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: true
    hitCount: false
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
