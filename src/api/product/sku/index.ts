import request from '@/utils/request'
import { HasSkuResponseData } from './type'

enum API {
  //获取SKU数据的url
  GETSKU_URL = '/admin/product/list/',
  //获取SKU数据详情的url
  GETSKUINFO_URL = '/admin/product/getSkuInfo/',
  //商品上架url
  SKUONSALE_URL = '/admin/product/onSale/',
  //商品下架url
  SKUCANCELSALE_URL = '/admin/product/cancelSale/',
  //删除所选商品url
  SKUDELETE_URL = '/admin/product/deleteSku/',
}

//展示SKU数据的接口
export const reqSku = (page: number, limit: number) =>
  request.get<any, HasSkuResponseData>(API.GETSKU_URL + `${page}/${limit}`)

//获取SKU数据详情的接口
export const reqSkuInfo = (skuId: number) =>
  request.get<any, any>(API.GETSKUINFO_URL + skuId)

//商品上架的接口
export const reqOnSale = (skuId: number) =>
  request.get<any, any>(API.SKUONSALE_URL + skuId)

//商品下架的接口
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.SKUCANCELSALE_URL + skuId)

//商品删除的接口
export const reqSkuDelete = (skuId: number) =>
  request.delete<any, any>(API.SKUDELETE_URL + skuId)
