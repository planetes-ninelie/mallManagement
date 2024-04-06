<template>
  <el-card class="card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" @click="" icon="Plus">
      添加品牌
    </el-button>
    <!-- 表格组件，展示已有的品牌-->
    <el-table border class="table" :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称">
        <template #="{ row }">
          <pre style="color: brown">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img style="height: 100px" :src="row.logoUrl" alt="暂无图片" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark()"
      :pager-count="9"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
//当前页码
let pageNo = ref<number>(1)
//每页展示数据条数
let limit = ref<number>(3)
//存储已有品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<Records>([])
//获取已有品牌的接口封装为函数
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    //存储已有品牌
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
//组件挂载完毕钩子
onMounted(() => {
  getHasTrademark()
})

//当下拉菜单发生变化的时候触发方法
const sizeChange = () => {
  getHasTrademark()
}
</script>

<style scoped lang="scss">
.card {
  .table {
    margin: 10px 0;
  }
}
</style>
