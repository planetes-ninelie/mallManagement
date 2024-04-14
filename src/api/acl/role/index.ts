import request from "@/utils/request";
import { GetRoleResponseData } from "./type";

enum API {
  //获取所有角色数据url
  GETROLESDATA_URL = '/admin/acl/role/'
}

//获取所有角色数据接口
export const getRolesData = (page:number,limit:number) => 
  request.get<any, GetRoleResponseData>(API.GETROLESDATA_URL + `${page}/${limit}`)