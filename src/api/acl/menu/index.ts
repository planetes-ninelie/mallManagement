import request from '@/utils/request'
import { LvList, getMenuResponseData } from './type'

enum API {
  //获取菜单数据url
  GETMENU_URL = '/admin/acl/permission',
  //根据角色id返回菜单列表url
  GETDOASSIGNBYROLE_URL = '/admin/acl/permission/toAssign/',
  //获取角色分配权限url
  //GETDOASSIGN_URL = '/admin/acl/permission/toAssign/{roleId}',
  //给角色分配权限url
  SETDOASSIGN_URL = '/admin/acl/permission/doAssignAcl',
  //根据菜单id删除菜单url
  DELETEDOASSIGN_URL = '/admin/acl/permission/remove/',
  //新增菜单url
  //ADDMENU_URL = '/admin/acl/permission/save',
  //更新菜单url
  UPDATEMENU_URL = '/admin/acl/permission/update',
}

//获取菜单数据接口
export const reqGetMenu = () =>
  request.get<any, getMenuResponseData>(API.GETMENU_URL)

//根据角色id返回菜单列表接口
export const reqGetMenuByRole = (id?: number) =>
  request.get<any, getMenuResponseData>(API.GETDOASSIGNBYROLE_URL + id)

//给角色分配权限接口
export const reqSetDoAssign = (roleId: number, permissionIdList: number[]) =>
  request.post<any, any>(API.SETDOASSIGN_URL, { roleId, permissionIdList })

//根据菜单id删除接口
export const reqDeleteDoAssign = (id: number) =>
  request.delete<any, any>(API.DELETEDOASSIGN_URL + id)

//新增或更新菜单接口
export const reqAddMenu = (data: LvList) => {
  if (data.id) return request.put<any, any>(API.UPDATEMENU_URL, data)
  else return request.post<any, any>(API.ADDMENU_URL, data)
}
