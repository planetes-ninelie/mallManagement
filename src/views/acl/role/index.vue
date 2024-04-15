<template>
  <!-- 上部卡片内容 -->
  <el-card style="margin-bottom: 10px; height: 75px">
    <el-form :inline="true" class="form-top">
      <el-form-item label="角色名称：">
        <el-input type="text" placeholder="请输入用户昵称" v-model="roleNameSearch" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="Search" style="margin-right: 15px" @click="search()">
          搜索
        </el-button>
        <el-button type="default" icon="Refresh" @click="reset()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 下部卡片内容 -->
  <el-card>
    <el-button type="primary" icon="Plus" @click="addRole()">添加</el-button>
    <el-popconfirm :title="`确定删除所选的角色数据吗？`" @confirm="deleteUsers()" width="250">
      <template #reference>
        <el-button type="warning" icon="Delete" :disabled="!selectUsersId.length">
          批量删除
        </el-button>
      </template>
    </el-popconfirm>

    <!-- 新增角色或修改角色对话框 -->
    <el-dialog v-model="dialogVisible" :title="isUpdate ? '修改角色职位' : '添加角色职位'" width="500">
      <el-form :model="addRoleForm" :rules="rules" ref="formRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请填写角色名称" v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelRoleDialog">取消</el-button>
          <el-button type="primary" @click="confirmRoleAddOrUpdate()">提交</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分配权限抽屉 -->
    <!-- <el-drawer v-model="drawerRole" direction="rtl">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form :model="roleForm">
          <el-form-item label="用户姓名">
            <el-input placeholder="请填写用户名字" v-model="roleFormUserData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="allSelect" size="large" :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="roleArr" @change="handleCheckedRolesChange">
              <el-checkbox v-for="item in roleForm" :key="item.id" v-model="item.remark" :value="item.roleName"
                size="large">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelRoleDrawer">取消</el-button>
          <el-button type="primary" @click="confirmRole()">提交</el-button>
        </div>
      </template>
    </el-drawer> -->

    <!-- 表格数据 -->
    <el-table border :data="rolesData" style="width: 100%; margin: 10px 0" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column type="index" align="center" width="75" label="#" />
      <el-table-column property="id" align="center" label="id" width="100" />
      <el-table-column property="roleName" label="角色名称" align="center" show-overflow-tooltip />
      <el-table-column property="createTime" label="创建时间" align="center" show-overflow-tooltip />
      <el-table-column property="updateTime" label="更新时间" align="center" show-overflow-tooltip />
      <el-table-column label="操作" align="center" width="300">
        <template #="{ row }">
          <el-button type="success" size="small" icon="User" @click="setPower(row)">
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="editRole(row)">
            编辑
          </el-button>
          <el-popconfirm :title="`确定删除${row.roleName}吗？`" @confirm="deleteRole(row)" width="250">
            <template #reference>
              <el-button type="warning" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="changeSize" @current-change="getHasRole()" :pager-count="9"
      v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total" />
  </el-card>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { GetRoleResponseData, RoleRecord, RoleRecords } from '@/api/acl/role/type'
import { getRolesData, reqAddOrUpdateRoleData, reqDeleteRoleData } from '@/api/acl/role/index'

//当前页数
let pageNo = ref<number>(1)
//每页最大页数
let pageSize = ref<number>(5)
//数据总数
let total = ref<number>(0)
//角色数据
let rolesData = ref<RoleRecords>([])
//搜索角色昵称输入
let roleNameSearch = ref<string>('')
//控制新增角色或更新角色的对话框显示与隐藏
let dialogVisible = ref<boolean>(false)
//控制抽屉表单是新增用户或更新用户
let isUpdate = ref<boolean>(false)
//新增角色表单数据
let addRoleForm = reactive<RoleRecord>({
  roleName: ''
})
//获取新增form组件实例
let formRef = ref<any>()
//控制分配角色的抽屉显示与隐藏
let drawerRole = ref<boolean>(false)
//分配角色表单
let roleForm = ref<RoleRecords>([])
//分配角色表单用户表单
let roleFormUserData = reactive<record>({})
//用户分配到的角色数组
let roleArr = ref()
//分配角色是否为全选
let allSelect = ref(false)
//设置分配角色多选框不确定状态，仅负责样式控制
const isIndeterminate = ref(true)
//用户管理表单多选框选择数据
const multipleSelection = ref<RoleRecords[]>([])
//所选的用户id列表
let selectUsersId = ref<number[]>([])

//组件挂载初始化
onMounted(() => {
  getHasRole()
})

//监视所选中角色id列表
watch(
  () => multipleSelection.value,
  () => {
    multipleSelection.value.forEach((item) => {
      selectUsersId.value.push(item.id)
    })
  },
)

//获取用户数据
const getHasRole = async () => {
  let result: GetRoleResponseData = await getRolesData(pageNo.value, pageSize.value, '')
  if (result.code == 200) {
    total.value = result.data.total
    rolesData.value = result.data.records
  }
}

//改变当前页数大小
const changeSize = () => {
  pageNo.value = 1
  getHasRole()
}

//搜索用户
const search = async () => {
  let result: GetRoleResponseData = await getRolesData(
    1,
    pageSize.value,
    roleNameSearch.value,
  )
  if (result.code == 200) {
    rolesData.value = result.data.records
    total.value = result.data.total
  }
}

//重置列表
const reset = () => {
  roleNameSearch.value = ''
  changeSize()
}

//分配角色按钮
// const setRole = async (row: record) => {
//   drawerRole.value = true
//   roleFormUserData = row
//   let result2: GetRoleResponseData = await getRolesData(1, 999,'')
//   if (result2.code == 200) {
//     roleForm.value = result2.data.records
//     //获取用户的角色
//     roleArr.value = row.roleName?.split(',')
//     //标记角色列表中哪些是用户所拥有的角色
//     roleForm.value.forEach((item) => {
//       item.remark = roleArr.value.includes(item.roleName)
//     })
//   } else {
//     ElMessage({
//       type: 'error',
//       message: '获取分配角色信息失败！',
//     })
//   }
// }

//关闭分配角色抽屉
// const cancelRoleDrawer = () => {
//   drawerRole.value = false
// }

//控制分配角色全选框
// const handleCheckAllChange = (val: boolean) => {
//   roleArr.value = val ? roleForm.value?.map((item) => item.roleName) : []
//   isIndeterminate.value = false
// }

//控制分配角色多选框
// const handleCheckedRolesChange = (value: string[]) => {
//   const checkedCount = value.length
//   allSelect.value = checkedCount === roleForm.value?.length
//   isIndeterminate.value =
//     checkedCount > 0 && checkedCount < roleForm.value?.length
// }

//提交分配角色信息
// const confirmRole = async () => {
//   let data = reactive({
//     userId: roleFormUserData.id,
//     roleIdList: [],
//   })
//   roleForm.value.forEach((item) => {
//     if (roleArr.value.includes(item.roleName)) data.roleIdList.push(item.id)
//   })
//   let result: any = await reqToAssign(data)

//   if (result.code == 200) {
//     ElMessage({
//       type: 'success',
//       message: `已为${roleFormUserData.name}分配角色`,
//     })
//     drawerRole.value = false
//     changeSize()
//   } else {
//     ElMessage({
//       type: 'error',
//       message: `为${roleFormUserData.name}分配角色失败`,
//     })
//     changeSize()
//   }
// }

//删除用户
const deleteRole = async (row: any) => {
  let result: any = await reqDeleteRoleData(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `删除角色名称${row.roleName}成功!`,
    })
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: `删除角色名称${row.roleName}失败!`,
    })
  }
}

//添加角色按钮
const addRole = () => {
  dialogVisible.value = true
  isUpdate.value = false
  Object.assign(addRoleForm, {
    roleName: ''
  })
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}

//编辑角色
const editRole = (row: any) => {
  dialogVisible.value = true
  isUpdate.value = true
  Object.assign(addRoleForm, {
    id:row.id,
    roleName: row.roleName,
  })
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}

//关闭新增角色对话框
const cancelRoleDialog = () => {
  dialogVisible.value = false
}

//提交新增或修改的角色信息
const confirmRoleAddOrUpdate = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateRoleData(addRoleForm)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `${addRoleForm.id ? '修改' : '添加'}用户昵称${addRoleForm.roleName}成功!`,
    })
    dialogVisible.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: `${addRoleForm.id ? '修改' : '添加'}用户昵称${addRoleForm.roleName}失败!`,
    })
  }
}

//校验用户姓名回调函数
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) callBack()
  else callBack(new Error('角色名称至少为两位'))
}

//新增用户表单校验
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }]
}

//批量删除用户
// const deleteUsers = async () => {
//   let result: any = await reqDeleteByIdArr(selectUsersId.value)
//   let usernameList: any = multipleSelection.value
//     .map((item) => item.username)
//     .toString()
//   if (result.code == 200) {
//     ElMessage({
//       type: 'success',
//       message: `删除${usernameList}成功！`,
//     })
//     getHasUser()
//   } else {
//     ElMessage({
//       type: 'error',
//       message: `删除${usernameList}失败！`,
//     })
//   }
// }

//用户列表多选框选项变化
const handleSelectionChange = (val: RoleRecords[]) => {
  multipleSelection.value = val
}
</script>

<style scoped>
.form-top {
  display: flex;
  justify-content: space-between;
}
</style>
