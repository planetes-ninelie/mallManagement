import request from '@/utils/request'
enum API {
  DELETEBYURL = '/admin/product/fileUpload/delete',
  UPLOAD = '/admin/product/fileUpload',
}

//根据url删除文件
export const deleteFileByUrl = (url) => request.post(API.DELETEBYURL, { url })

//上传文件
export const upload = (file) => request.post(API.UPLOAD, file)
