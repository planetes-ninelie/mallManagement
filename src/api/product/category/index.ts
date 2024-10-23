import request from '@/utils/request'
import { CreateCategory, UpdateCategory, CategoryResponse } from './type'

enum API {
  //根据分类等级查询分类以及孩子url
  FINDBYLEVELCATEGORY = '/admin/product/category/getCategoryByLevel/',
  //创建分类url
  CREATECATEGORY_URL = '/admin/product/category/create',
  //更新分类url
  UPDATECATEGORY_URL = '/admin/product/category/update',
  //删除分类url
  DELETEXATEGORY_URL = '/admin/product/category/delete/',
}

/**
 * 根据分类等级查询分类以及孩子
 * @param level 分类等级
 * @returns
 */
export const findByLevelCategory = (level: number) =>
  request.get<any, CategoryResponse>(API.FINDBYLEVELCATEGORY + level)

/**
 * 创建分类
 * @param category
 * @returns
 */
export const createCategory = (category: CreateCategory) =>
  request.post<any, any>(API.CREATECATEGORY_URL, category)

/**
 * 更新分类
 * @param category
 * @returns
 */
export const updateCategory = (category: UpdateCategory) =>
  request.put<any, any>(API.UPDATECATEGORY_URL, category)

/**
 * 删除分类
 * @param id 分类id
 * @returns
 */
export const deleteCategory = (id: number) =>
  request.delete<any, any>(API.DELETEXATEGORY_URL + id)
