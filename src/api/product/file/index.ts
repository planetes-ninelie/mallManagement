import request from '@/utils/request'
enum API {
  DELETEBYURL = '/admin/product/fileUpload/delete',
}

//根据url删除文件
export const deleteFileByUrl = (url) => request.post(API.DELETEBYURL, { url })
