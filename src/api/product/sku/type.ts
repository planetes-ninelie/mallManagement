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
  skuImageList?: skuImage[]
  skuAttrValueList?: skuAttrValueList[]
  skuSaleAttrValueList?: skuSaleAttrValueList[]
}

export interface skuImage {
  id: number | string
  imgUrl: string
}
//
export interface skuAttrValueList {
  id: number
  valueName: string | number
}
//
export interface skuSaleAttrValueList {
  id: number
  saleAttrValueName: string | number
}
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
