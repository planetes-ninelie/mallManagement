<template>
  <div>
    <header>
      <el-radio-group v-model="level">
        <el-radio-button
          :value="index + 1"
          v-for="(item, index) in levelOptions"
          @click="changeLevel(index)"
        >
          {{ item }}
        </el-radio-button>
      </el-radio-group>
      <el-button
        type="primary"
        @click="addCategory(null)"
        v-show="level === 1 && hasAddCategory"
      >
        添加一级分类
      </el-button>
    </header>
    <el-card>
      <el-table
        :data="category"
        style="width: 100%; margin-bottom: 10px"
        row-key="id"
        border
      >
        <el-table-column prop="name" label="分类名称" min-width="300" />
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="level" label="等级" width="100" align="center" />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="200"
          align="center"
        />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="300"
          align="center"
        >
          <template #="{ row }">
            <el-button
              type="success"
              @click="addCategory(row)"
              size="small"
              v-if="row.level !== 3 && hasAddCategoryChildren"
            >
              添加子分类
            </el-button>
            <el-button
              type="primary"
              @click="editCategory(row)"
              size="small"
              v-if="hasEditCategory"
            >
              编辑分类
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.name}吗?`"
              width="250px"
              @confirm="deleteCategoryById(row.id)"
              v-if="hasDeleteCategory"
            >
              <template #reference>
                <el-button type="warning" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加或者更新分类的对话框 -->

    <el-dialog v-model="dialogVisible" :title="formTitle">
      <el-form>
        <el-form-item label="名称">
          <el-input
            placeholder="请输入分类名称"
            v-model="categoryForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import {
  findByLevelCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/api/product/category'
import { ElMessage } from 'element-plus'
import type {
  CategoryResponse,
  CategoryData,
  CategoryDto,
} from '@/api/product/category/type'
//获取用户相关的小仓库内部token数据
import useUserStore from '@/store/modules/user'
//引入大仓库
import pinia from '@/store'
//使用user仓库
const userStore = useUserStore(pinia)
//分类等级
let level = ref<number>(1)
const levelOptions = ['一级分类', '二级分类', '三级分类']
//表格数据
let category = ref<CategoryData[]>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//添加表单数据
let categoryForm = reactive<CategoryDto>({
  level: 0,
  name: '',
  pid: 0,
})
//表单标题
let formTitle = ref<string>('')
//初始化数据
onMounted(() => {
  getCategory(level.value)
})

//监视分类等级的变化
const changeLevel = (index: number) => {
  getCategory(index + 1)
}

//获取分类数据
const getCategory = async (level: number) => {
  const res: CategoryResponse = await findByLevelCategory(level)
  if (res.code === 200) {
    category.value = res.data
  } else {
    ElMessage({
      type: 'error',
      message: res.message || '获取失败',
    })
  }
}

//添加目录
const addCategory = (row: CategoryDto | null) => {
  Object.assign(categoryForm, {
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  if (row !== null) {
    formTitle.value = '添加子分类'
    categoryForm.level = (row.level as number) + 1
    categoryForm.pid = row.id as number
  } else {
    formTitle.value = '添加一级分类'
    categoryForm.level = level.value
    categoryForm.pid = 0
  }
}

//编辑分类
const editCategory = (row: CategoryData) => {
  formTitle.value = '编辑分类'
  dialogVisible.value = true
  Object.assign(categoryForm, {
    id: row.id,
    level: row.level,
    name: row.name,
    pid: row.pid,
  })
}

//删除分类
const deleteCategoryById = async (id: number) => {
  let result = await deleteCategory(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getCategory(level.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message || '获取失败',
    })
  }
}

//保存分类
const save = async () => {
  let result = categoryForm.id
    ? await updateCategory(categoryForm)
    : await createCategory(categoryForm)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: categoryForm.id ? '更新成功' : '添加成功',
    })
    getCategory(level.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message || (categoryForm.id ? '更新失败' : '添加失败'),
    })
  }
}

// 辅助函数用于检查权限按钮是否存在
const hasButton = (code: string) => {
  return computed(() => userStore.buttons.includes(code))
}
//计算是否有权限（不用v-has，有bug）
const hasAddCategory = hasButton('btn.Category.add')
const hasAddCategoryChildren = hasButton('btn.Category.addChildren')
const hasEditCategory = hasButton('btn.Category.update')
const hasDeleteCategory = hasButton('btn.Category.remove')
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .custom-style .el-segmented {
    --el-segmented-item-selected-color: var(--el-text-color-primary);
    --el-segmented-item-selected-bg-color: #ffd100;
    --el-border-radius-base: 16px;
  }
}
</style>
