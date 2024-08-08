<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
    <!-- 三级分类下的卡片数据-->
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          @click="addSpu"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          v-has="`btn.Spu.add`"
        >
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <!-- row:即为已有的SPU对象 -->
            <template #="{ row }">
              <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addSku(row)"
                title="添加SKU"
                v-has="`btn.Spu.addsku`"
              ></el-button>
              <el-button
                type="primary"
                size="default"
                icon="Edit"
                @click="updateSpu(row)"
                title="修改SKU"
                v-has="`btn.Spu.update`"
              ></el-button>
              <el-button
                type="primary"
                size="default"
                icon="View"
                @click="findSku(row)"
                title="查看SKU列表"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="default"
                    icon="Delete"
                    title="删除SKU"
                    v-has="`btn.Spu.delete`"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @size-change="changeSize"
          @current-change="getHasSpu()"
          :pager-count="9"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        />
      </div>
      <!-- 添加SPU|修改SPU -->
      <SpuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 添加SKU的子组件 -->
      <SkuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></SkuForm>

      <!-- 展示已有SKU的图片列表 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <img :src="row.skuDefaultImg" style="width: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  HasSpuResponseData,
  Records,
  SkuData,
  SkuInfoData,
  SpuData,
} from '@/api/product/spu/type'
import { onBeforeUnmount, ref, watch } from 'vue'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
//引入相应的子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
/* 
场景数据
0：显示已有SPU
1：添加或修改已有SPU
2：添加或SKU结构 
*/
let scene = ref<number>(0)
//分页器默认页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(3)
//存储已有的SPU的数据
let records = ref<Records>([])
//存储已有SPU总个数
let total = ref<number>(0)
//获取子组件实例SpuForm
let spu = ref<any>()
//获取子组件实例SkuForm
let sku = ref<any>()
//存储全部的SKU数据
let skuArr = ref<SkuData[]>()
let show = ref<boolean>(false)

//监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
//此方法执行：可以获取某一个三级已有分类下全部已有的SPU
const getHasSpu = async () => {
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  pageNo.value = 1
  getHasSpu()
}

//添加新的SPU按钮的回调
const addSpu = () => {
  //切换场景1：添加与修改已有的SPU结构-SpuForm
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}

//子组件SpuForm绑定自定义事件
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    getHasSpu()
  } else {
    pageNo.value = 1
    getHasSpu()
  }
}

//修改已有的SPU按钮的回调
const updateSpu = async (row: SpuData) => {
  await spu.value.initHasSpuData(row)
  scene.value = 1
}

//添加SKU按钮的回调
const addSku = (row: SpuData) => {
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
  scene.value = 2
}

//查看SKU列表数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}

//删除已有的SPU数据
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSpu()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
