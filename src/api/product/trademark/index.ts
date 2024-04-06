//品牌管理模块接口
import request from '@/utils/request'
import { TradeMarkResponseData } from './type'

//品牌管理模块接口
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
