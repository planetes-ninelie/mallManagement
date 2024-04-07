<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"/>
    <el-card style="margin:10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" @click="addAttr"
          :disabled="categoryStore.c3Id ? false : true">
          添加属性
        </el-button>
        <el-table border style="margin:10px 0px" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{ row, $index }">
              <el-tag v-for="(item, index) in row.attrValueList" :key="item.id" style="margin:5px">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr"></el-button>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin:10px 0">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default">保存</el-button>
        <el-button type="primary" size="default">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//组合式API函数watch
import { ref, watch, reactive } from 'vue';
//引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr'
import type { AttResponseData, Attr } from '@/api/product/attr/type';
//获取分类的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
//定义card组件内容切换变量
let scene = ref<number>(0)
//收集新增的属性的数据
let attrParams = reactive({
  attrName: '',
  attrValueList:[

  ],
  categoryId:'',
  categoryLevel:3
})

//监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  attrArr.value = []
  if (!categoryStore.c3Id) return;
  //获取分类的id
  getAttr()
})

//获取已有属性和已有属性方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
    console.log(result.data);
  }
}

//添加属性按钮的回调
const addAttr = () => {
  scene.value = 1
}

//table表格修改已有属性按钮回调
const updateAttr = () => {
  scene.value = 1
}

//取消按钮的回调
const cancel = () => {
  scene.value = 0
} 
</script>

<style scoped>

</style>
