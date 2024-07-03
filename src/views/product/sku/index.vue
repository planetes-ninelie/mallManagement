<template>
  <el-card>
    <el-table border :data="records" class="table">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" width="200px" prop="skuName"></el-table-column>
      <el-table-column label="描述" width="250px" prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" :alt="`暂无图片-${row.skuName}`" height="100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{ row }">
          <el-button :icon="row.isSale == 1 ? 'Bottom' : 'Top'" :type="row.isSale == 1 ? '' : 'success'"
            v-has="`btn.Sku.updown`" @click="sale(row)"></el-button>
          <el-button icon="Edit" type="primary" @click="edit(row)" v-has="`btn.Sku.update`"></el-button>
          <el-button icon="InfoFilled" type="info" @click="getInfo(row)" v-has="`btn.Sku.detail`"></el-button>
          <el-popconfirm :title="`确定删除${row.skuName}吗？`" width="200px" @confirm="deleteSku(row)"
            v-has="`btn.Sku.remove`">
            <template #reference>
              <el-button icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="changeSize"
      @current-change="getSku()" />
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h2>查看商品详情</h2>
      </template>
      <template #default>
        <el-form :data="skuInfo">
          <el-form-item>
            <el-col :span="4">名称</el-col>
            <el-col :span="20">
              <text v-if="drawerShift">{{ skuInfo.skuName }}</text>
              <el-input v-else v-model="skuInfo.skuName" placeholder="请填写名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="4">描述</el-col>
            <el-col :span="20">
              <text v-if="drawerShift">{{ skuInfo.skuDesc }}</text>
              <el-input v-else v-model="skuInfo.skuDesc" placeholder="请填写描述"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="4">价格</el-col>
            <el-col :span="20">
              <text v-if="drawerShift">{{ skuInfo.price }}</text>
              <el-input v-else v-model="skuInfo.price" placeholder="请填写价格"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="4">平台属性</el-col>
            <el-col :span="20">
              <el-tag type="info" v-for="item in skuInfo.skuAttrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="4">销售属性</el-col>
            <el-col :span="20">
              <el-tag type="info" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
                {{ item.saleAttrValueName }}
              </el-tag>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="4">商品图片</el-col>
            <el-col :span="20">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" height="100%" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <h6>创建时间：{{ skuInfo.createTime }}</h6>
        <h6>更新时间：{{ skuInfo.updateTime }}</h6>
        <el-button type="success" v-if="!drawerShift" @click="saveSkuInfo">
          保存
        </el-button>
        <el-button type="default" @click="cancelDrawer">取消</el-button>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqCancelSale,
  reqOnSale,
  reqSku,
  reqSkuDelete,
  reqSkuInfo,
} from '@/api/product/sku/index'
import {
  HasSkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

//分页器当前页数
let pageNo = ref(1)
//每页展示最大数据的数量
let pageSize = ref<number>(3)
//总数据量
let total = ref<number>(0)
//Sku数据
let records = ref<SkuData[]>([])
//控制抽屉显示与隐藏
let drawer = ref<boolean>(false)
//控制抽屉显示编辑或查看，true为编辑，false为查看
let drawerShift = ref<boolean>(true)
//抽屉里的数据
let skuInfo = ref<SkuData>({})

//组件挂载完毕
onMounted(() => {
  getSku()
})

//获取SKU数据
const getSku = async () => {
  let result: HasSkuResponseData = await reqSku(pageNo.value, pageSize.value)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//改变当前页数最大展示的数据
const changeSize = () => {
  pageNo.value = 1
  getSku()
}

//商品上架下架
const sale = async (row: any) => {
  let result: any = await (row.isSale == 1
    ? reqCancelSale(row.id)
    : reqOnSale(row.id))
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: row.isSale == 1 ? '下架成功！' : '上架成功',
    })
    getSku()
  } else {
    ElMessage({
      type: 'error',
      message: '下架失败！',
    })
  }
}

//编辑sku数据
const edit = async (_row: any) => {
  drawer.value = true
  drawerShift.value = false
}

//查看sku数据详情
const getInfo = async (row: any) => {
  drawer.value = true
  drawerShift.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id)
  if (result.code == 200) {
    skuInfo.value = result.data
    console.log(skuInfo.value)
  }
}

//关闭抽屉窗口
const cancelDrawer = () => {
  drawer.value = false
}

//保存sku信息数据
const saveSkuInfo = () => { }

//删除对应的SKU的数据
const deleteSku = async (row: any) => {
  let result: any = await reqSkuDelete(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSku()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped lang="scss">
.table {
  margin: 15px 0;
}

.el-row {
  margin: 10px 0;
}

.el-tag {
  margin: 0 5px 5px 5px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

h6 {
  margin: 10px 0;
}
</style>
