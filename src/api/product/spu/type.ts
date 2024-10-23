import { UploadUserFile } from 'element-plus'

//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//SPU数据的ts类型
// export interface SpuData {
//   id?: number
//   spuName: string
//   description: string
//   category3Id: string | number
//   tmId: number | string
//   spuSaleAttrList: null | SaleAttr[]
//   spuImageList: null | SpuImg[]
// }
export interface SpuData {
  id?: number
  spuName: string
  description: string
  categoryId: string | number
  tmId: number | string
  spuImageList: null | SpuImg[] | string[]
  attrs: number[] | null
  attrValues: number[] | null
}

//数组：元素都是已有SPU数据类型
export type Records = SpuData[]

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//品牌数据的TS类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

//品牌接口返回的数据ts类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

//商品图片的ts类型
export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl?: string
  name?: string
  url?: string
}

//已有的SPU的图片墙数据类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId?: number | string
  saleAttrValueName: string
  saleAttrValueId: number
  saleAttrName?: string
  isChecked?: null
  attrId?: number
  valueName?: string
}

//销售属性对象ts类型
export interface SaleAttr {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId?: number
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValue[]
  flag?: boolean
  saleAttrValue?: string
  allSaleAttrValue: SaleAttrValue[]
  unSelectSaleAttrValue?: SaleAttrValue[]
}

//spu已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

//已有的全部SPU的返回数据类型
export interface HasSaleAttr {
  id: number
  name: string
  attrName?: string
  attrValueList?: SaleAttrValue[]
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number | number
  valueId: number | number
}

export interface saleArr {
  saleAttrId: number | number
  saleAttrValueId: number | number
}

export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}

export interface imgList extends UploadUserFile {
  response: imgResponseData
}

export interface imgResponseData {
  data: string
}
