<template>
  <div>
    <!-- 上部卡片内容 -->
    <el-card style="margin-bottom:10px">
      <text>用户名：</text>
      <el-input type="text" placeholder="请输入用户名" v-model="userNameSearch" style="width: 240px"></el-input>
      <el-button type="default" icon="Refresh" style="float: right;">重置</el-button>
      <el-button type="success" icon="Search" style="float: right; margin-right: 15px;">搜索</el-button>
    </el-card>
    <!-- 下部卡片内容 -->
    <el-card>
      <el-button type="primary" icon="Plus" @click="addUser">添加</el-button>
      <el-popconfirm :title="`确定删除所选的用户数据吗？`" @confirm="deleteUsers()" width="250">
        <template #reference>
          <el-button type="warning" icon="Delete">批量删除</el-button>
        </template>
      </el-popconfirm>

      <!-- 表格数据 -->
      <el-table border :data="usersData" style="width: 100%; margin: 10px 0;">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="index" align="center" width="75" label="#" />
        <el-table-column property="id" align="center" label="id" width="100" />
        <el-table-column property="roleName" label="用户名字" align="center" show-overflow-tooltip />
        <el-table-column property="remark" label="用户名称" align="center" show-overflow-tooltip />
        <el-table-column property="createTime" label="创建时间" align="center" show-overflow-tooltip />
        <el-table-column property="updateTime" label="更新时间" align="center" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300">
          <template #="{ row }">
            <el-button type="success" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.userName}吗？`" @confirm="deleteUser(row)" width="250">
              <template #reference>
                <el-button type="warning" size="small" icon="Delete">删除</el-button>
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
import { records } from '@/api/user/type';
import { reqUsersData } from '@/api/user';
import { UsersData } from '@/api/user/type';
import { onMounted, ref } from 'vue';

//当前页数
let pageNo = ref<number>(1)
//每页最大页数
let pageSize = ref<number>(5)
//数据总数
let total = ref<number>(20)
//用户数据
let usersData = ref<records>([])
//搜索用户名
let userNameSearch = ref<string>("")

//组件挂载初始化
onMounted(() => {
  getHasUser()
})

//获取用户数据
const getHasUser = async () => {
  let result: UsersData = await reqUsersData(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total,
    usersData.value = result.data.records
  }
}

//改变当前页数
const changeSize = () => {
  pageNo.value = 1
  getHasUser()
}

//分配角色
const setRole = (row: any) => {

}

//编辑角色
const editUser = (row: any) => {

}

//删除角色
const deleteUser = (row: any) => {

}

//添加角色
const addUser = (row: any) => {

}

//批量删除角色
const deleteUsers = () => {

}

</script>

<style scoped></style>
