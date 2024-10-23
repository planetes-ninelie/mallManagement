<template>
  <el-dialog title="更换头像" v-model="avatarStore.dialogVisible" width="40%" height="100%" align-center>
    <div class="cropper-content">
      <div class="cropper-box">
        <div class="cropper">
          <!-- <vueCropper style="width: 100%; height: 100%;" ref="cropper" :img="option.img" :outputSize="option.outputSize"
            :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
            :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove"
            :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox"
            :infoTrue="option.infoTrue" :full="option.full" :enlarge="option.enlarge" :mode="option.mode">
          </vueCropper> -->
          <img :src="img" alt="" />
        </div>
        <footer>
          <!-- <span class="scope-btn">
            <label class="btn" for="uploads">更换头像</label>
            <input type="file" id="uploads" style="position: absolute; clip-path: rect(0 0 0 0)"
              accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)" />
          </span> -->
          <el-upload action="/api/admin/product/fileUpload" :headers="headers" :show-file-list="false"
            :before-upload="handlerUpload" :on-success="handleAvatarSuccess">
            <el-button type="primary" style="margin-right: 12px">
              更换头像
            </el-button>
          </el-upload>
          <el-button type="primary" @click="updatePhoto">确定更换</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </footer>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
// import 'vue-cropper/dist/index.css'
// import { VueCropper } from 'vue-cropper'
import { ref, onMounted, watch } from 'vue'
import useAvatarStore from '@/store/modules/avatar'
// import { options } from 'node_modules/axios/index.d.cts'
// import { upload } from '@/api/product/file/index'
import { ElMessage } from 'element-plus'
// import type { UploadProps, UploadFile } from 'element-plus'
import type { UploadProps } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { GET_TOKEN } from '@/utils/token.ts'
import { deleteFileByUrl } from '@/api/product/file'
import { reqUpdateAvatar } from '@/api/user/index'

const avatarStore = useAvatarStore()
const userStore = useUserStore()
const img = ref()

//获取token
let headers = ref<any>()
const getToken = () => {
  return {
    token: GET_TOKEN(),
  }
}

onMounted(async () => {
  headers.value = getToken()
  // const objectUrl = await urlToBase64(avatarStore.initialImg)
  img.value = avatarStore.initialImg
  // option.value.img = objectUrl
})

//监视添加品牌对话框消失时，删除未成功添加的图片（若图片引用次数为0则会删除）
watch(
  () => avatarStore.dialogVisible,
  async () => {
    if (avatarStore.dialogVisible === false) {
      await deleteFileByUrl(img.value)
    }
  },
)

//照片墙上传成功前的钩子
const handlerUpload = async (file: any) => {
  await deleteFileByUrl(img.value)
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件必须小于3MB!',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件必须为PNG|JPG|GIF',
    })
    return false
  }
}

//上传图片成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  _uploadFile,
) => {
  img.value = response.data
}

const updatePhoto = async () => {
  const id = userStore.userId
  const data = {
    avatar: img.value,
    id,
  }
  let result: any = await reqUpdateAvatar(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: result.message || '修改头像成功',
    })
    avatarStore.setDialog(false)
    await userStore.userInfo()
  } else {
    ElMessage({
      type: 'error',
      message: result.message || '修改头像失败',
    })
  }
}

const handleClose = () => {
  avatarStore.setDialog(false)
}
// const updatePhoto = async () => {
//   try {
//     // const base64 = cropper.value.getCropData((data: any) => data)
//     // const blob = base64toBlob(base64)
//     // cropper.value.getCropBlob(async (data) => {
//     //   console.log(data);
//     // });
//     const result = await upload(option.value.img)
//     ElMessage({
//       type: result.code === 200 ? 'success' : 'none',
//       message: result.message || (result.code === 200 ? '上传成功' : '上传失败')
//     })
//     await userStore.userInfo()
//     avatarStore.setDialog(false)

//   } catch (error) {
//     console.error(error);
//   }
// }

// const cropper = ref()

// let option = ref({
//   img: '', // 裁剪图片的地址 url 地址, base64, blob
//   outputSize: 1, // 裁剪生成图片的质量
//   outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
//   info: true, // 裁剪框的大小信息
//   canScale: false, // 图片是否允许滚轮缩放
//   autoCrop: false, // 是否默认生成截图框
//   // autoCropWidth: 150, // 默认生成截图框宽度
//   // autoCropHeight: 150, // 默认生成截图框高度
//   fixedBox: false, // 固定截图框大小 不允许改变
//   fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
//   fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
//   canMove: true, // 上传图片是否可以移动
//   canMoveBox: true, // 截图框能否拖动
//   original: false, // 上传图片按照原始比例渲染
//   centerBox: true, // 截图框是否被限制在图片里面
//   infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
//   full: true, // 是否输出原图比例的截图
//   enlarge: '1', // 图片根据截图框输出比例倍数
//   mode: 'contain' // 图片默认渲染方式 contain , cover, 100px, 100% auto
// })

// // 选择图片
// const selectImg = (e) => {
//   const file = e.target.files[0]
//   if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
//     this.$message({
//       message: '图片类型要求：jpeg、jpg、png',
//       type: 'error'
//     })
//     return false
//   }
//   const reader = new FileReader()
//   reader.onload = (e) => {
//     let data
//     if (typeof e.target.result === 'object') {
//       data = window.URL.createObjectURL(new Blob([e.target.result]))
//     } else {
//       data = e.target.result
//     }
//     option.value.img = data
//   }
//   reader.readAsDataURL(file);
//   // reader.readAsArrayBuffer(file)
//   console.log(objectUrl);
// }

// //将url转化成blob
// const urlToBlob = async (url) => {
//   // 使用fetch API从给定的URL获取资源
//   const response = await fetch(url);
//   // 检查响应是否成功
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   // 将响应体转换为Blob
//   const blob = await response.blob();
//   // console.log('blob', blob);
//   const objectUrl = URL.createObjectURL(blob);
//   return objectUrl
// }

// //将url转化成base64
// const urlToBase64 = async (url) => {
//   return new Promise((resolve, reject) => {
//     // 新建图片
//     let image = new Image();
//     // 解决canvas无法读取画布问题
//     image.crossOrigin = 'Anonymous'; // 注意大小写
//     // 图片加载完毕后保证快速读取
//     image.onload = () => {
//       try {
//         const base64 = getBase64Image(image);
//         resolve(base64);
//       } catch (error) {
//         reject(error);
//       }
//     };
//     // 图片加载失败时的处理
//     image.onerror = () => {
//       reject(new Error(`Failed to load image from ${url}`))
//     }
//     // 设置图片来源
//     image.src = url;
//   })
// };
// const getBase64Image = (img) => {
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0, img.width, img.height);
//   // 默认使用JPEG格式，也可以根据需要更改
//   var dataURL = canvas.toDataURL("image/jpeg");
//   return dataURL;
// }

// const base64toFile = (dataUrl, filename = "file") => {
//   let arr = dataUrl.split(",");
//   let mime = arr[0].match(/:(.*?);/)[1];
//   // suffix是该文件的后缀
//   let suffix = mime.split("/")[1];
//   // atob 对经过 base-64 编码的字符串进行解码
//   let bstr = atob(arr[1]);
//   // n 是解码后的长度
//   let n = bstr.length;
//   // Uint8Array 数组类型表示一个 8 位无符号整型数组 初始值都是 数子0
//   let u8arr = new Uint8Array(n);
//   // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   // new File返回File对象 第一个参数是 ArraryBuffer 或 Bolb 或Arrary 第二个参数是文件名
//   // 第三个参数是 要放到文件中的内容的 MIME 类型
//   return new File([u8arr], `${filename}.${suffix}`, {
//     type: mime,
//   });
// }

// 将base64转换为blob
// function base64toBlob(dataurl) {
//   let arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// }
</script>
<style lang="scss" scoped>
.cropper-content {
  display: flex;
  flex-direction: column;

  .handle-cropper {
    display: flex;
    margin-bottom: 10px;
  }

  .cropper-box {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;

    .cropper {
      width: 600px;
      height: 400px;
      display: flex;
      justify-content: center;

      img {
        height: 100%;
      }
    }

    footer {
      display: flex;
      flex-wrap: nowrap;
      margin-top: 20px;
      font-size: medium;

      .scope-btn {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding-right: 10px;

        .btn {
          outline: none;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          -webkit-appearance: none;
          text-align: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          outline: 0;
          -webkit-transition: 0.1s;
          transition: 0.1s;
          font-weight: 500;
          padding: 8px 15px;
          font-size: 15px;
          border-radius: 3px;
          color: #fff;
          background-color: #67c23a;
          border-color: #409eff;
          margin-right: 10px;

          &:hover {
            background-color: #a0cfff;
          }
        }
      }
    }
  }
}

cropper-face {
  border-radius: 50%;
}
</style>
