<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        class="widthStyle"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select class="widthStyle" v-model="SpuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :headers="headers"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单-->
      <el-select
        v-model="saleAttrIdAndValueName"
        class="widthStyle"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.attrName"
          :value="JSON.stringify(item)"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!saleAttrIdAndValueName"
        @click="addSaleAttr"
      >
        添加属性值
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 0px 5px"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-select
              v-model="row.saleAttrValue"
              class="widthStyle"
              v-if="row.flag"
              @blur="toLook(row)"
              :placeholder="
                row.unSelectSaleAttrValue.length
                  ? `还未选择${row.unSelectSaleAttrValue.length}个`
                  : '无'
              "
            >
              <el-option
                v-for="item in row.unSelectSaleAttrValue"
                :key="item.id"
                :label="item.valueName"
                :value="JSON.stringify(item)"
              ></el-option>
            </el-select>
            <el-button
              v-else
              type="primary"
              size="small"
              @click="toEdit(row)"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateSpu,
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '@/api/product/spu'
import type {
  // SaleAttrValue,
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  Trademark,
  SaleAttr,
  HasSaleAttr,
  HasSaleAttrResponseData,
  imgList,
  SaleAttrValue,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { GET_TOKEN } from '@/utils/token.ts'
//获取分类的仓库
// import useCategoryStore from '@/store/modules/category'
import { deleteFileByUrl } from '@/api/product/file'

//存储已有的SPU数据
let allTradeMark = ref<Trademark[]>([])
let imgList = ref<imgList[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])

//控制对话框显示与隐藏
let dialogVisible = ref<boolean>(false)

//存储已有的SPU对象
let SpuParams = ref<SpuData>({
  categoryId: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  attrs: [],
  attrValues: [],
})

//存储预览图片地址
let dialogImageUrl = ref<string>('')

//将收集还未选择的销售属性ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')

//获取token
let headers = ref<any>()

let $emit = defineEmits(['changeScene'])

//照片墙点击预览按钮的触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

//照片墙删除文件钩子
const handleRemove = async (file: any) => {
  const url = file.response.data
  const res = await deleteFileByUrl(url)
  if (!(res.code === 200 || res.code === 201)) {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//当组件取消挂载时，对未保存的图片进行删除
onUnmounted(async () => {
  await deleteImageList()
})

//点击取消按钮
const cancel = async () => {
  $emit('changeScene', { flag: 0, params: 'update' })
  await deleteImageList()
}

//删除数据库未保存的照片
const deleteImageList = async () => {
  for (const item of imgList.value) {
    if (item.response && item.response.data) {
      await deleteFileByUrl(item.response.data)
    }
  }
}

//照片墙上传成功前的钩子
const handlerUpload = (file: any) => {
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

//计算当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.attrName != item1.saleAttrName
    })
  })
  return unSelectAttr
})

//添加销售属性方法
const addSaleAttr = () => {
  const { id, attrName, attrValueList } = JSON.parse(
    saleAttrIdAndValueName.value,
  )
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId: id,
    saleAttrName: attrName,
    spuSaleAttrValueList: [],
    unSelectSaleAttrValue: [],
    allSaleAttrValue: attrValueList,
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
  row.flag = true
  // row.saleAttrValue = {}
  if (!row.allSaleAttrValue) {
    row.allSaleAttrValue = allSaleAttr.value.filter((item) => {
      return item.attrName == row.saleAttrName
    })[0].attrValueList as SaleAttrValue[]
  }
  row.unSelectSaleAttrValue = row.allSaleAttrValue.filter((allItem) => {
    return row.spuSaleAttrValueList.every((attrValue) => {
      return allItem.id != attrValue.saleAttrValueId
    })
  })
}

//表单元素失去焦点的事件回调
const toLook = (row: SaleAttr) => {
  if (row.saleAttrValue) {
    const saleAttrValue: SaleAttrValue = JSON.parse(row.saleAttrValue)
    let newSaleAttrValue: SaleAttrValue = {
      saleAttrValueId: saleAttrValue.id as number,
      saleAttrValueName: saleAttrValue.valueName as string,
    }
    if (saleAttrValue?.id) {
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.saleAttrValue = ''
    }
  }
  console.log(row)
  row.flag = false
}

//保存按钮的回调
const save = async () => {
  SpuParams.value.spuImageList = imgList.value.map((item) => {
    return (item.response && item.response.data) || item.url
  }) as string[]
  // SpuParams.value.spuSaleAttrList = saleAttr.value
  let attrValues: number[] = []
  const attrs = saleAttr.value.map((item) => {
    item.spuSaleAttrValueList.forEach((attrValue) => {
      attrValues.push(attrValue.saleAttrValueId)
    })
    return item.baseSaleAttrId as number
  })
  SpuParams.value.attrs = attrs
  SpuParams.value.attrValues = attrValues
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.message || (SpuParams.value.id ? '更新失败' : '添加失败'),
    })
  }
}

//添加新的SPU初始化
const initAddSpu = async (c3Id: number | string) => {
  Object.assign(SpuParams.value, {
    id: null,
    categoryId: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    // spuSaleAttrList: [],
    attrs: [],
    attrValues: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''

  SpuParams.value.categoryId = c3Id
  let result1: AllTradeMark = await reqAllTradeMark()
  // let categoryStore = useCategoryStore()
  // const { c1Id, c2Id } = categoryStore
  // let result2: HasSaleAttrResponseData = await reqAllSaleAttr(c1Id, c2Id, c3Id)
  let result2: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = result1.data
  allSaleAttr.value = result2.data
}

//子组件初始化数据
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  let result1: AllTradeMark = await reqAllTradeMark()
  let result2: SpuHasImg = await reqSpuImageList(spu.id as number)
  let result3: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // let categoryStore = useCategoryStore()
  // const { c1Id, c2Id, c3Id } = categoryStore
  // let result4: HasSaleAttrResponseData = await reqAllSaleAttr(c1Id, c2Id, c3Id)
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr()
  imgList.value = result2.data.map((item) => ({
    // name: item.imgName,
    url: item.url,
  })) as imgList[]
  allTradeMark.value = result1.data
  saleAttr.value = result3.data
  allSaleAttr.value = result4.data
}

onMounted(() => {
  headers.value = getToken()
})

const getToken = () => {
  return {
    token: GET_TOKEN(),
  }
}
//对外暴露的方法
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss">
.widthStyle {
  width: 250px;
}
</style>
