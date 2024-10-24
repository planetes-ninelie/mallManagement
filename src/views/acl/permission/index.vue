<template>
  <div>
    <el-card>
      <el-table :data="menuArr" class="table" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button
              type="success"
              @click="addMenu(row)"
              size="small"
              v-if="row.level !== 4 && hasAddPermission"
            >
              {{ row.level == 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button
              type="primary"
              @click="editMenu(row)"
              size="small"
              v-if="row.level !== 1 && hasEditPermission"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.name}吗?`"
              width="250px"
              @confirm="deleteMenu(row.id)"
              v-if="row.level !== 1 && hasDeletePermission"
            >
              <template #reference>
                <el-button type="warning" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加或者更新菜单的对话框 -->
      <el-dialog v-model="dialogVisible" :title="formTitle">
        <el-form>
          <el-form-item label="名称">
            <el-input
              placeholder="请输入菜单名称"
              v-model="menuData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input
              placeholder="请输入权限数值"
              v-model="menuData.code"
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
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { reqAddMenu, reqDeleteDoAssign, reqGetMenu } from '@/api/acl/menu'
import { LvList, LvOneList, getMenuResponseData } from '@/api/acl/menu/type'
//获取用户相关的小仓库内部token数据
import useUserStore from '@/store/modules/user'
//引入大仓库
import pinia from '@/store'
//使用user仓库
const userStore = useUserStore(pinia)
//存储菜单的数据
let menuArr = ref<LvOneList[]>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//添加菜单表单数据
let menuData = reactive<LvList>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
let formTitle = ref<string>('')
//组件挂载完毕
onMounted(() => {
  getHasMenu()
})
//获取菜单数据的方法
const getHasMenu = async () => {
  let result: getMenuResponseData = await reqGetMenu()
  if (result.code == 200) {
    menuArr.value = result.data
  }
}

//添加菜单按钮
const addMenu = (row: LvList) => {
  formTitle.value = row.level == 3 ? '添加功能' : '添加菜单'
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.level = (row.level as number) + 1
  menuData.pid = row.id as number
}

//编辑已有的菜单
const editMenu = (row: LvList) => {
  formTitle.value = row.level == 4 ? '更新功能' : '更新菜单'
  dialogVisible.value = true
  Object.assign(menuData, row)
}

//确定按钮的回调
const save = async () => {
  let result: any = await reqAddMenu(menuData)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    getHasMenu()
    await userStore.userInfo()
  } else {
    ElMessage({
      type: 'error',
      message: result.message || (menuData.id ? '更新失败' : '添加失败'),
    })
  }
}

//删除菜单
const deleteMenu = async (id: number) => {
  let result = await reqDeleteDoAssign(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasMenu()
  }
}

// 辅助函数用于检查权限按钮是否存在
const hasButton = (code: string) => {
  return computed(() => userStore.buttons.includes(code))
}
//计算是否有权限（不用v-has，有bug）
const hasAddPermission = hasButton('btn.Permission.add')
const hasEditPermission = hasButton('btn.Permission.update')
const hasDeletePermission = hasButton('btn.Permission.remove')
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
}
</style>
