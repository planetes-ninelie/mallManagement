<template>
  <div>
    <el-radio-group v-model="isPlatform" style="margin-bottom: 20px">
      <el-radio-button :value="true">平台属性管理</el-radio-button>
      <el-radio-button :value="false">销售属性管理</el-radio-button>
    </el-radio-group>
    <div v-show="showType === 'platform'">
      <!-- 三级分类全局组件 -->
      <Category :scene="scene" />
      <el-card style="margin: 10px 0px">
        <div v-show="scene == 0">
          <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addAttr"
            :disabled="categoryStore.c3Id ? false : true"
            v-has="`btn.Attr.add`"
          >
            添加平台属性
          </el-button>
          <el-table border style="margin: 10px 0px" :data="attrArr">
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="80px"
            ></el-table-column>
            <el-table-column
              label="属性名称"
              align="center"
              width="120px"
              prop="attrName"
            ></el-table-column>
            <el-table-column label="属性值名称" align="center">
              <template #="{ row }">
                <el-tag
                  v-for="item in row.attrValueList"
                  :key="item.id"
                  style="margin: 5px"
                >
                  {{ item.valueName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120px">
              <template #="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  icon="Edit"
                  @click="updateAttr(row)"
                  v-has="`btn.Attr.update`"
                ></el-button>
                <el-popconfirm
                  :title="`确定删除${row.attrName}吗？`"
                  width="200px"
                  @confirm="deleteAttr(row.id)"
                >
                  <template #reference>
                    <el-button
                      type="primary"
                      size="small"
                      icon="Delete"
                      v-has="`btn.Trademark.remove`"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="scene == 1">
          <el-form :inline="true">
            <el-form-item label="属性名称">
              <el-input
                placeholder="请输入属性名称"
                v-model="attrParams.attrName"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            @click="addAttrValue"
            :disabled="attrParams.attrName ? false : true"
            type="primary"
            size="default"
            icon="Plus"
            v-has="`btn.Trademark.add`"
          >
            添加属性值
          </el-button>
          <el-button type="primary" size="default" @click="cancel">
            取消
          </el-button>
          <el-table
            border
            style="margin: 10px 0"
            :data="attrParams.attrValueList"
          >
            <el-table-column
              label="序号"
              width="80px"
              type="index"
              align="center"
            ></el-table-column>
            <el-table-column label="属性值名称">
              <!-- row：即为当前属性值对象 -->
              <template #="{ row, $index }">
                <el-input
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                  size="small"
                  v-if="row.flag"
                  @blur="toLook(row, $index)"
                  placeholder="请输入属性值名称"
                  v-model="row.valueName"
                ></el-input>
                <div v-else @click="toEdit(row, $index)">
                  {{ row.valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="属性值操作">
              <template #="{ $index }">
                <el-button
                  type="primary"
                  size="default"
                  icon="Delete"
                  @click="attrParams.attrValueList.splice($index, 1)"
                  v-has="`btn.Trademark.remove`"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            size="default"
            @click="save"
            :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >
            保存
          </el-button>
          <el-button type="primary" size="default" @click="cancel">
            取消
          </el-button>
        </div>
      </el-card>
    </div>
    <!-- 销售属性管理 -->
    <el-card v-show="showType === 'sale'" style="margin: 10px 0px">
      <div v-show="saleScene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="addSaleAttr"
          v-has="`btn.Attr.addSale`"
        >
          添加销售属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="saleAttrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            align="center"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateSaleAttr(row)"
                v-has="`btn.Attr.update`"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.attrName}吗？`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    v-has="`btn.Trademark.remove`"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="saleScene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="saleAttrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addSaleAttrValue"
          :disabled="saleAttrParams.attrName ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          v-has="`btn.Trademark.add`"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancelSale">
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="saleAttrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row：即为当前属性值对象 -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputSaleArr[$index] = vc)"
                size="small"
                v-if="row.flag"
                @blur="toLookSale(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toEditSale(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                type="primary"
                size="default"
                icon="Delete"
                @click="saleAttrParams.attrValueList.splice($index, 1)"
                v-has="`btn.Trademark.remove`"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="saveSale"
          :disabled="saleAttrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancelSale">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//组合式API函数watch
import { ref, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性与属性值接口
import {
  reqAddOrUpdateAttr,
  reqAttr,
  reqSaleAttr,
  reqRemoveAttr,
  reqAddOrUpdateSaleAttr,
} from '@/api/product/attr'
import type { AttResponseData, Attr, AttrValue } from '@/api/product/attr/type'
//获取分类的仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
let saleAttrArr = ref<Attr[]>([])
//定义card组件内容切换变量
let scene = ref<number>(0)
//定义销售card组件内容切换变量
let saleScene = ref<number>(0)
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
let saleAttrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
})
//准备一个数组：将来存储对应的组件实例el-input
let inputArr = ref<any>([])
let inputSaleArr = ref<any>([])
//定义属性类型场景
let showType = ref<string>('platform')
//切换属性类型场景
let isPlatform = ref<boolean>(true)

//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    //获取分类的id
    if (showType.value === 'platform') getAttr()
  },
)

//监听属性类型场景变化
watch(
  () => isPlatform.value,
  () => {
    showType.value = isPlatform.value ? 'platform' : 'sale'
    if (showType.value === 'sale') getSaleAttr()
  },
)

//获取已有属性和已有属性方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}

const getSaleAttr = async () => {
  let result: AttResponseData = await reqSaleAttr()
  if (result.code == 200) {
    saleAttrArr.value = result.data
  }
}

//添加属性按钮的回调
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

//添加销售属性按钮的回调
const addSaleAttr = () => {
  Object.assign(saleAttrParams, {
    attrName: '',
    attrValueList: [],
  })
  saleScene.value = 1
}

//table表格修改已有属性按钮回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const updateSaleAttr = (row: Attr) => {
  saleScene.value = 1
  Object.assign(saleAttrParams, JSON.parse(JSON.stringify(row)))
}

//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
const cancelSale = () => {
  saleScene.value = 0
}

//添加属性添加属性值按钮的回调
const addAttrValue = () => {
  // attrParams.id = 0
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const addSaleAttrValue = () => {
  // saleAttrParams.id = 0
  saleAttrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputSaleArr.value[saleAttrParams.attrValueList.length - 1].focus()
  })
}

//保存按钮的回调
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: result.message || (attrParams.id ? '修改失败' : '添加失败'),
    })
  }
}
const saveSale = async () => {
  let result: any = await reqAddOrUpdateSaleAttr(saleAttrParams)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: saleAttrParams.id ? '修改成功' : '添加成功',
    })
    getSaleAttr()
    saleScene.value = 0
  } else {
    ElMessage({
      type: 'error',
      message: result.message || (saleAttrParams.id ? '修改失败' : '添加失败'),
    })
  }
}

//属性值表单元素失去焦点的方法
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
const toLookSale = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    saleAttrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = saleAttrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
const toEditSale = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputSaleArr.value[$index].focus()
  })
}

//删除某一个已有的属性方法回调
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    if (showType.value === 'platform') getAttr()
    else getSaleAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
