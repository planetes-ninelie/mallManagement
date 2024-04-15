import request from '@/utils/request'
import type { UserData, UsersData, record, toAssignData } from './type'

//项目用户相关的请求地址
enum API {
  //获取用户表单数据url
  USERSDATA_URL = '/admin/acl/user/',
  //新增用户数据url
  ADDUSERDATA_URL = '/admin/acl/user/save',
  //更新用户数据url
  UPDATEUSERDATA_URL = '/admin/acl/user/update',
  //用户分配角色url
  TOASSIGN_URL = '/admin/acl/user/doAssignRole',
  //根据id查用户数据url
  GETBYID_URL = '/admin/acl/user/get/',
  //根据id删除用户数据url
  DELETEBYID_URL = '/admin/acl/user/remove/',
  //根据id列表删除用户数据url
  DELETEBYIDARR_URL = '/admin/acl/user/batchRemove',
}

//获取用户表单数据接口
export const reqUsersData = (page: number, limit: number, username: string) =>
  request.get<any, UsersData>(
    API.USERSDATA_URL + `${page}/${limit}/?username=${username}`,
  )

//新增用户数据接口与更新用户数据接口
export const reqAddOrUpdateUserData = (data: record) => {
  if (data.id) return request.put<any, any>(API.UPDATEUSERDATA_URL, data)
  else return request.post<any, any>(API.ADDUSERDATA_URL, data)
}

//用户分配角色接口
export const reqToAssign = (data: toAssignData) =>
  request.post<any, any>(API.TOASSIGN_URL, data)

//根据id查用户数据接口
export const reqGetById = (id: number | string) =>
  request.get<any, UserData>(API.GETBYID_URL + id)

//根据id删除用户信息接口
export const reqDeleteById = (id: number | string) =>
  request.delete<any, any>(API.DELETEBYID_URL + id)

//根据id列表删除用户信息接口
export const reqDeleteByIdArr = (idList: number[]) =>
  request.delete<any, any>(API.DELETEBYIDARR_URL, { data: idList })
