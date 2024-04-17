import request from "@/utils/request";
import { getMenuResponseData } from "./type";

enum API {
  //获取菜单数据url
  GETMENU_URL = '/admin/acl/permission',
  //获取角色分配权限url
  GETDOASSIGN_URL = '/admin/acl/permission/toAssign/{roleId}',
  //给角色分配权限url
  SETDOASSIGN_URL = '/admin/acl/permission/doAssignAcl',
  //根据角色id返回菜单列表url
  GETDOASSIGNBYROLE_URL = '/admin/acl/permission/toAssign/'

}

//获取菜单数据接口
export const reqGetMenu = () => request.get<any, getMenuResponseData>(API.GETMENU_URL)

//根据角色id返回菜单列表接口
export const reqGetMenuByRole = (id?: number) => request.get<any, getMenuResponseData>(API.GETDOASSIGNBYROLE_URL + id)

//给角色分配权限接口
export const reqSetDoAssign = (roleId: number, permissionIdList: number[]) => request.post<any,any>(API.SETDOASSIGN_URL,{roleId,permissionIdList})