<template>
  <div>
    <!-- 上部卡片内容 -->
    <el-card style="margin-bottom: 10px; height: 75px">
      <el-form class="form-top" :data="searchForm">
        <el-form-item label="角色名称：">
          <el-input
            type="text"
            placeholder="请输入角色名称"
            v-model="searchForm.roleName"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            icon="Search"
            style="margin-right: 15px"
            @click="search()"
          >
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
      <el-button
        type="primary"
        icon="Plus"
        @click="addRole()"
        v-has="`btn.Role.add`"
      >
        添加
      </el-button>
      <el-popconfirm
        :title="`确定删除所选的角色数据吗？`"
        @confirm="deleteRoles()"
        width="250"
      >
        <template #reference>
          <el-button
            type="warning"
            icon="Delete"
            :disabled="!selectRolesId.length"
            v-has="`btn.Role.remove`"
          >
            批量删除
          </el-button>
        </template>
      </el-popconfirm>

      <!-- 新增角色或修改角色对话框 -->
      <el-dialog
        v-model="dialogVisible"
        :title="isUpdate ? '修改角色职位' : '添加角色职位'"
        width="500"
      >
        <el-form :model="addRoleForm" :rules="rules" ref="formRef">
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              placeholder="请填写角色名称"
              v-model="addRoleForm.roleName"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancelRoleDialog">取消</el-button>
            <el-button type="primary" @click="confirmRoleAddOrUpdate()">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 分配权限抽屉 -->
      <el-drawer v-model="drawerPower" direction="rtl">
        <template #header>
          <h4>分配权限</h4>
        </template>
        <template #default>
          <el-tree-v2
            :data="powerForm"
            :height="500"
            :props="props"
            show-checkbox
            :default-checked-keys="checkedKeys"
            :default-expanded-keys="expanedKeys"
            node-key="id"
            ref="tree"
          />
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelPowerDrawer">取消</el-button>
            <el-button type="primary" @click="confirmPower">提交</el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 表格数据 -->
      <el-table
        border
        :data="rolesData"
        style="width: 100%; margin: 10px 0"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="index" align="center" width="75" label="#" />
        <el-table-column property="id" align="center" label="id" width="100" />
        <el-table-column
          property="roleName"
          label="角色名称"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          property="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          property="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" width="300">
          <template #="{ row }">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click="setPower(row)"
              v-has="`btn.Role.assgin`"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editRole(row)"
              v-has="`btn.Role.update`"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.roleName}吗？`"
              @confirm="deleteRole(row)"
              width="250"
            >
              <template #reference>
                <el-button
                  type="warning"
                  size="small"
                  icon="Delete"
                  v-has="`btn.Role.remove`"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="changeSize"
        @current-change="getHasRole()"
        :pager-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import {
  GetRoleResponseData,
  RoleRecord,
  RoleRecords,
} from '@/api/acl/role/type'
import {
  getRolesData,
  reqAddOrUpdateRoleData,
  reqDeleteRoleData,
  reqDeleteRoleListData,
} from '@/api/acl/role/index'
import { reqGetMenuByRole, reqSetDoAssign } from '@/api/acl/menu/index'
import { LvList, LvOneList, getMenuResponseData } from '@/api/acl/menu/type'

//当前页数
let pageNo = ref<number>(1)
//每页最大页数
let pageSize = ref<number>(5)
//数据总数
let total = ref<number>(0)
//角色数据
let rolesData = ref<RoleRecords>([])
//搜索角色昵称输入
let searchForm = reactive<RoleRecord>({
  roleName: '',
  id: 0,
})
//控制新增角色或更新角色的对话框显示与隐藏
let dialogVisible = ref<boolean>(false)
//控制抽屉表单是新增用户或更新用户
let isUpdate = ref<boolean>(false)
//新增角色表单数据
let addRoleForm = reactive<RoleRecord>({
  roleName: '',
  id: 0,
})
//获取新增form组件实例
let formRef = ref<any>()

//控制分配权限的抽屉显示与隐藏
let drawerPower = ref<boolean>(false)
//分配权限表单
let powerForm = reactive<LvOneList[]>([])
//分配权限表单角色表单
let powerFormRoleData = reactive<RoleRecord>({
  id: 0,
})
//获取tree组件实例
let tree = ref<any>()

//用户管理表单多选框选择数据
const multipleSelection = ref<RoleRecords>([])
//所选的用户id列表
let selectRolesId = ref<number[]>([])

//分配权限虚拟化树形控件props
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
}
//目前勾选的节点
let checkedKeys = ref<number[]>([])
//展开指定节点
let expanedKeys = ref<number[]>([])

//组件挂载初始化
onMounted(() => {
  getHasRole()
})

//监视所选中角色id列表
watch(
  () => multipleSelection.value,
  () => {
    multipleSelection.value.forEach((item) => {
      selectRolesId.value.push(item.id!)
    })
  },
)

//获取用户数据
const getHasRole = async () => {
  let result: GetRoleResponseData = await getRolesData(
    pageNo.value,
    pageSize.value,
    '',
  )
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
    searchForm.roleName as string,
  )
  if (result.code == 200) {
    rolesData.value = result.data.records
    total.value = result.data.total
  }
}

//重置列表
const reset = () => {
  searchForm.roleName = ''
  changeSize()
}

//分配权限按钮
const setPower = async (row: RoleRecord) => {
  powerFormRoleData = row
  let result: getMenuResponseData = await reqGetMenuByRole(row.id)
  if (result.code == 200) {
    Object.assign(powerForm, result.data)
    powerForm = result.data
    //设置勾选的节点和展开指定节点
    function isSelect(arr: LvList[]) {
      arr.forEach((item) => {
        if (item.select) {
          expanedKeys.value.push(item.id!)
          if ((item.children as LvList[]).length == 0) {
            checkedKeys.value.push(item.id!)
            expanedKeys.value.pop()
          }
          isSelect(item.children as LvList[])
        }
      })
    }
    await nextTick(() => {
      drawerPower.value = true
    })
    expanedKeys.value.length = 0
    checkedKeys.value.length = 0
    isSelect(powerForm)
    tree.value.setCheckedKeys(checkedKeys.value)
    tree.value.setExpandedKeys(expanedKeys.value)
  } else {
    ElMessage({
      type: 'error',
      message: '获取分配权限信息失败！',
    })
  }
}

//关闭分配权限抽屉
const cancelPowerDrawer = () => {
  drawerPower.value = false
}

//提交分配权限信息
const confirmPower = async () => {
  //选中节点的ID
  let arr = tree.value.getCheckedKeys()
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  let result: any = await reqSetDoAssign(
    powerFormRoleData.id as number,
    permissionId,
  )

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `已为${powerFormRoleData.roleName}分配权限`,
    })
    cancelPowerDrawer()
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: `为${powerFormRoleData.roleName}分配角色失败`,
    })
  }
}

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
    roleName: '',
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
    id: row.id,
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
const validatorRoleName = (value: any, callBack: any) => {
  if (value.trim().length >= 2) callBack()
  else callBack(new Error('角色名称至少为两位'))
}

//新增用户表单校验
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

//批量删除用户
const deleteRoles = async () => {
  let result: any = await reqDeleteRoleListData(selectRolesId.value)
  let roleNameList: any = multipleSelection.value
    .map((item) => item.roleName as string)
    .toString()
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `删除${roleNameList}成功！`,
    })
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: `删除${roleNameList}失败！`,
    })
  }
}

//用户列表多选框选项变化
const handleSelectionChange = (val: RoleRecords) => {
  multipleSelection.value = val
}
</script>

<style scoped>
.form-top {
  display: flex;
  justify-content: space-between;
}
</style>
