import request from '@/utils/request'
import { GetRoleResponseData, RoleRecord } from './type'

enum API {
  //获取所有角色数据url | 表格数据url
  GETROLESDATA_URL = '/admin/acl/role/',
  //新增角色url
  ADDROLE_URL = '/admin/acl/role/save',
  //修改角色url
  UPDATEROLE_URL = '/admin/acl/role/update',
  //删除角色url
  DELETEROLE_URL = '/admin/acl/role/remove/'
}

//获取所有角色数据接口 | 表格数据接口
export const getRolesData = (page: number, limit: number, roleName:string) =>
  request.get<any, GetRoleResponseData>(
    API.GETROLESDATA_URL + `${page}/${limit}/?roleName=${roleName}`,
  )

//新增或修改角色数据接口
export const reqAddOrUpdateRoleData = (roleForm: RoleRecord) => {
  if (roleForm.id) {
    return request.put<any, any>(API.UPDATEROLE_URL,roleForm)
  } else {
    return request.post<any, any>(API.ADDROLE_URL,roleForm)
  }
} 

//删除角色数据接口
export const reqDeleteRoleData = (id:number|string) => request.delete<any,any>(API.DELETEROLE_URL + id)