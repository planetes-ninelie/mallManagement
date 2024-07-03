<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handler1"
          class="select"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="handler2"
          class="select"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
          class="select"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入组件挂载完毕的方法
import { onMounted } from 'vue'
//引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

//组件挂载完毕
onMounted(() => {
  //获取一级分类的数据
  getC1()
})
//获取一级分类的数据方法
const getC1 = async () => {
  categoryStore.getC1()
}
//此方法即为一级分类下拉菜单的change事件
const handler1 = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
//此方法即为二级分类下拉菜单的change事件
const handler2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

//接收父组件传递的scene
defineProps(['scene'])
</script>

<style scoped>
.select {
  width: 240px;
}
</style>
