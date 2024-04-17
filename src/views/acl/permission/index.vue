<template>
  <div>
    <el-table :data="menuArr" class="table" row-key="id" border>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="success" @click="addMenu(row)" size="small" v-if="row.level == 4 ? false : true">
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button type="primary" @click="editMenu(row)" size="small"
            v-if="row.level == 1 ? false : true">编辑</el-button>
          <el-popconfirm :title="`确定删除${row.name}吗?`" width="250px" @confirm="deleteMenu(row.id)">
            <template #reference>
              <el-button type="warning" size="small" v-if="row.level == 1 ? false : true">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或者更新菜单的对话框 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input placeholder="请输入权限数值" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { reqAddMenu, reqDeleteDoAssign, reqGetMenu } from "@/api/acl/menu";
import { LvList, LvOneList, getMenuResponseData } from "@/api/acl/menu/type";

//存储菜单的数据
let menuArr = ref<LvOneList[]>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//添加菜单表单数据
let menuData = reactive<LvList>({
  code: "",
  level: 0,
  name: "",
  pid: 0,
})
//组件挂载完毕
onMounted(() => {
  getHasMenu();
});
//获取菜单数据的方法
const getHasMenu = async () => {
  let result: getMenuResponseData = await reqGetMenu();
  if (result.code == 200) {
    menuArr.value = result.data;
  }
}

//添加菜单按钮
const addMenu = (row: LvList) => {
  Object.assign(menuData, {
    id: 0,
    code: "",
    level: 0,
    name: "",
    pid: 0,
  })
  dialogVisible.value = true;
  menuData.level = (row.level as number) + 1;
  menuData.pid = (row.id as number);
}

//编辑已有的菜单
const editMenu = (row: LvList) => {
  dialogVisible.value = true;
  Object.assign(menuData, row);
}

//确定按钮的回调
const save = async () => {
  let result: any = await reqAddMenu(menuData);
  if (result.code == 200) {
    dialogVisible.value = false;
    ElMessage({ 
      type: 'success', 
      message: menuData.id ? '更新成功' : '添加成功' 
    })
    getHasMenu();
  }
}

//删除菜单
const deleteMenu = async (id: number) => {
  let result = await reqDeleteDoAssign(id);
  if (result.code == 200) {
    ElMessage({ 
      type: 'success', 
      message: '删除成功' 
    });
    getHasMenu();
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
}
</style>
