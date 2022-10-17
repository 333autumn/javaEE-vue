<template>
  <div>
    <el-dialog
      title="附属品管理"
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-button
        type="primary"
        size="small"
        @click="handleAdd"
        style="margin-right: 40px"
        >添加</el-button
      >
      <el-popconfirm title="确定要删除吗？" @onConfirm="handleDelete()">
        <el-button type="danger" size="small" slot="reference">
          批量删除
        </el-button>
      </el-popconfirm>
      <el-table
        ref="tableRef"
        :data="accessories"
        @selection-change="handleSelectChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="createtime" label="创建日期" width="240">
        </el-table-column>
      </el-table>
      <!--添加附属品对话框-->
      <el-dialog
        title="添加附属品"
        :visible.sync="addDialogVisible"
        @close="cancel"
        append-to-body
      >
        <el-form :model="addAccessory" label-width="70px">
          <el-form-item label="名字" prop="name">
            <el-input v-model="addAccessory.name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="addAccessory.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="commitAdd">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { findList, insert, deleteBatch } from "@/api/accessory";
export default {
  name: "Accessory",

  data() {
    return {
      //整体是否可见
      dialogVisible: false,
      //添加附属品对话框是否可见
      addDialogVisible: false,
      //附属品数据
      accessories: [],
      //新增附属品数据
      addAccessory: {
        name: "",
        price: "",
        fruitid: "",
      },
      //产品id
      fruitid: "",
      //批量删除的数据
      ids: [],
    };
  },

  mounted() {},

  methods: {
    //点击新增时调用
    handleAdd() {
      this.addDialogVisible = true;
    },
    //点击删除时调用
    handleDelete() {
      if (this.ids.length === 0) {
        this.$message.info("未选择");
        return;
      }
      let data = [];
      console.log(this.ids);
      for (let i = 0; i < this.ids.length; i++) {
        data.push(this.ids[i].accessoryid);
      }
      console.log(data);
      deleteBatch(data).then((response) => {
        this.$message.success("批量删除成功");
        this.refresh();
      });
    },
    //点击取消新增时调用
    cancel() {
      this.addDialogVisible = false;
    },
    //确认新增
    commitAdd() {
      this.addDialogVisible = false;
      this.addAccessory.fruitid = this.fruitid;
      insert(this.addAccessory).then((response) => {
        this.refresh();
        this.$message.success("新增成功");
        //新增对象置空
        for (let key in this.addAccessory) {
          this.addAccessory[key] = "";
        }
      });
    },
    //父组件通过调用该方法显示该组件
    show(fruitid) {
      this.fruitid = fruitid;
      this.dialogVisible = true;
      this.refresh();
    },
    //刷新附属产品数据
    refresh() {
      findList(this.fruitid).then((response) => {
        this.accessories = response.data.data;
      });
    },
    //选择发生变化时调用
    handleSelectChange(selection) {
      this.ids = selection;
    },
  },
};
</script>

<style lang="css" scoped></style>
