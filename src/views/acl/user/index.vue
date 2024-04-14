<template>
  <div>
    <!-- 上部卡片内容 -->
    <el-card style="margin-bottom: 10px; height:75px">
      <el-form :inline="true" class="form-top">
        <el-form-item label="用户昵称：">
          <el-input type="text" placeholder="请输入用户昵称" v-model="userNameSearch" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="Search" style="margin-right: 15px" @click="search()">搜索</el-button>
          <el-button type="default" icon="Refresh" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <!-- 下部卡片内容 -->
    <el-card>
      <el-button type="primary" icon="Plus" @click="addUser()">添加</el-button>
      <el-popconfirm :title="`确定删除所选的用户数据吗？`" @confirm="deleteUsers()" width="250">
        <template #reference>
          <el-button type="warning" icon="Delete" :disabled="!(selectUsersId.length)">批量删除</el-button>
        </template>
      </el-popconfirm>

      <!-- 新增用户或修改用户抽屉 -->
      <el-drawer v-model="drawerUser" direction="rtl">
        <template #header>
          <h4>{{ isUpdate ? '修改用户' : '添加用户' }}</h4>
        </template>
        <template #default>
          <el-form :model="addUserForm" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="name">
              <el-input placeholder="请填写用户名字" v-model="addUserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input placeholder="请填写用户昵称" v-model="addUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="!isUpdate">
              <el-input placeholder="请填写用户密码" v-model="addUserForm.password"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelUserDrawer">取消</el-button>
            <el-button type="primary" @click="confirmUserAdd()">提交</el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 分配角色抽屉 -->
      <el-drawer v-model="drawerRole" direction="rtl">
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
                @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="roleArr" @change="handleCheckedRolesChange">
                <el-checkbox v-for="item in roleForm " :key="item.id" v-model="item.remark" :value="item.roleName"
                  size="large">{{ item.roleName }}</el-checkbox>
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
      </el-drawer>

      <!-- 表格数据 -->
      <el-table border :data="usersData" style="width: 100%; margin: 10px 0" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="index" align="center" width="75" label="#" />
        <el-table-column property="id" align="center" label="id" width="100" />
        <el-table-column property="username" label="用户名字" align="center" show-overflow-tooltip />
        <el-table-column property="name" label="用户名称" align="center" show-overflow-tooltip />
        <el-table-column property="roleName" label="用户角色" align="center" show-overflow-tooltip />
        <el-table-column property="createTime" label="创建时间" align="center" show-overflow-tooltip />
        <el-table-column property="updateTime" label="更新时间" align="center" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300">
          <template #="{ row }">
            <el-button type="success" size="small" icon="User" @click="setRole(row)">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">
              编辑
            </el-button>
            <el-popconfirm :title="`确定删除${row.userName}吗？`" @confirm="deleteUser(row)" width="250">
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
      <el-pagination @size-change="changeSize" @current-change="getHasUser()" :pager-count="9"
        v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total" :total="total" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { reqAddOrUpdateUserData, reqToAssign, reqUsersData, reqDeleteById, reqDeleteByIdArr } from '@/api/acl/user/index'
import { UsersData, record, records } from '@/api/acl/user/type'
import { ElMessage, ElTable } from 'element-plus'
import { GetRoleResponseData, RoleRecords } from '@/api/acl/role/type'
import { getRolesData } from '@/api/acl/role/index'


//当前页数
let pageNo = ref<number>(1)
//每页最大页数
let pageSize = ref<number>(5)
//数据总数
let total = ref<number>(0)
//用户数据
let usersData = ref<records>([])
//搜索用户id
let userNameSearch = ref<string>('')
//控制新增用户或更新用户的抽屉显示与隐藏
let drawerUser = ref<boolean>(false)
//控制抽屉表单是新增用户或更新用户
let isUpdate = ref<boolean>(false)
//新增用户表单数据
let addUserForm = reactive<record>({
  name: '',
  username: '',
  password: '',
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
const multipleSelection = ref<records[]>([])
//所选的用户id列表
let selectUsersId = ref<number[]>([])

//组件挂载初始化
onMounted(() => {
  getHasUser()
})

//监视所选中用户id列表
watch(
  () => multipleSelection.value,
  () => {
    multipleSelection.value.forEach((item) => {
      selectUsersId.value.push(item.id)
    })    
  }
)

//获取用户数据
const getHasUser = async () => {
  let result: UsersData = await reqUsersData(pageNo.value, pageSize.value,'')
  if (result.code == 200) {
    total.value = result.data.total
    usersData.value = result.data.records
  }
}

//改变当前页数
const changeSize = () => {
  pageNo.value = 1
  getHasUser()
}

//搜索用户
const search = async () => {
  let result: UsersData = await reqUsersData(1, pageSize.value,userNameSearch.value)
  if (result.code == 200) {
    usersData.value = result.data.records
  }
}

//重置列表
const reset = () => {
  userNameSearch.value = ""
  changeSize()
}

//分配角色按钮
const setRole = async (row: record) => {
  drawerRole.value = true
  roleFormUserData = row
  let result2: GetRoleResponseData = await getRolesData(1, 999)
  if (result2.code == 200) {
    roleForm.value = result2.data.records
    //获取用户的角色
    roleArr.value = (row.roleName)?.split(',')
    //标记角色列表中哪些是用户所拥有的角色
    roleForm.value.forEach(item => {
      item.remark = roleArr.value.includes(item.roleName)
    })
  } else {
    ElMessage({
      type: 'error',
      message: '获取分配角色信息失败！'
    })
  }
}

//关闭分配角色抽屉
const cancelRoleDrawer = () => {
  drawerRole.value = false
}

//控制分配角色全选框
const handleCheckAllChange = (val: boolean) => {
  roleArr.value = (val ? roleForm.value?.map(item => item.roleName) : [])
  isIndeterminate.value = false
}

//控制分配角色多选框
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length
  allSelect.value = checkedCount === roleForm.value?.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roleForm.value?.length
}

//提交分配角色信息
const confirmRole = async () => {
  let data = reactive({
    userId: roleFormUserData.id,
    roleIdList: []
  })
  roleForm.value.forEach(item => {
    if (roleArr.value.includes(item.roleName)) data.roleIdList.push(item.id)
  })
  let result: any = await reqToAssign(data)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `已为${roleFormUserData.name}分配角色`
    })
    drawerRole.value = false
    changeSize()
  } else {
    ElMessage({
      type: 'error',
      message: `为${roleFormUserData.name}分配角色失败`
    })
    changeSize()
  }
}

//编辑用户
const editUser = (row: any) => {
  drawerUser.value = true
  isUpdate.value = true
  Object.assign(addUserForm, {
    id: row.id,
    name: row.name,
    username: row.username
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

//删除用户
const deleteUser = async (row: any) => {
  let result: any = await reqDeleteById(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `删除用户昵称${row.username}成功!`
    })
    getHasUser()
  } else {
    ElMessage({
      type: 'error',
      message: `删除用户昵称${row.username}失败!`
    })
  }
}

//添加用户按钮
const addUser = () => {
  drawerUser.value = true
  isUpdate.value = false
  Object.assign(addUserForm, {
    name: '',
    username: '',
    password: ''
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

//关闭新增用户抽屉
const cancelUserDrawer = () => {
  drawerUser.value = false
}

//提交新增或修改的用户信息
const confirmUserAdd = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUserData(addUserForm)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `${addUserForm.id ? '修改' : '添加'}用户昵称${addUserForm.username}成功!`
    })
    drawerUser.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: `${addUserForm.id ? '修改' : '添加'}用户昵称${addUserForm.username}失败!`
    })
  }
}

//校验用户姓名回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) callBack()
  else callBack(new Error('用户姓名至少为五位'))
}

//校验用户昵称回调函数
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) callBack()
  else callBack(new Error('用户昵称至少为五位'))
}

//校验用户密码回调函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) callBack()
  else callBack(new Error('用户密码至少为六位'))
}

//新增用户表单校验
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }]
}

//批量删除用户
const deleteUsers = async() => { 
  let result: any = await reqDeleteByIdArr(selectUsersId.value)
  let usernameList: any = multipleSelection.value.map(item => item.username).toString()
  if (result.code == 200) {
    ElMessage({
      type:'success',
      message: `删除${usernameList}成功！`
    })
    getHasUser()
  } else {
    ElMessage({
      type: 'error',
      message: `删除${usernameList}失败！`
    })
  }
  
}

//用户列表多选框选项变化
const handleSelectionChange = (val: records[]) => {
  multipleSelection.value = val
}
</script>

<style scoped>
.form-top {
  display: flex;
  justify-content: space-between;
}
</style>
