<template>
  <div>
    <!--顶部搜索栏-->
    名称:
    <el-input v-model="fuzzy.name" style="width: 140px" size="small"></el-input>
    产地:
    <el-input
      v-model="fuzzy.locality"
      style="width: 140px"
      size="small"
    ></el-input>
    价格:
    <el-input
      v-model="fuzzy.minPrice"
      style="width: 140px"
      size="small"
    ></el-input
    >-
    <el-input
      v-model="fuzzy.maxPrice"
      style="width: 140px"
      size="small"
    ></el-input>
    创建日期:
    <el-date-picker
      v-model="fuzzy.startTime"
      type="datetime"
      placeholder="最早"
      value-format="yyyy-MM-dd HH:mm:ss"
    >
    </el-date-picker
    >-
    <el-date-picker
      v-model="fuzzy.endTime"
      type="datetime"
      placeholder="最晚"
      value-format="yyyy-MM-dd HH:mm:ss"
    >
    </el-date-picker>
    <el-button
      type="primary"
      size="small"
      @click="handleSearch"
      style="margin-left: 10px"
      >搜索</el-button
    >
    <el-button
      type="primary"
      size="small"
      @click="handleAdd"
      style="margin-left: 10px"
      >新增</el-button
    ><br />
    <!--表格-->
    <el-table :data="commodities" style="width: 930px" stripe>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center">
      </el-table-column>
      <el-table-column prop="locality" label="产地" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建日期"
        width="240"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="270" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.row.fruitid)"
          >
            <el-button
              type="danger"
              size="small"
              slot="reference"
              style="margin-right: 5px"
            >
              删除
            </el-button>
          </el-popconfirm>
          <el-button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="handleEdit(scope.row)"
          >
            附属品
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="editDialogVisible" @close="cancel">
      <el-form :model="editCommodity" label-width="70px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="editCommodity.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editCommodity.price"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="locality">
          <el-input v-model="editCommodity.locality"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" prop="createtime">
          <el-date-picker
            v-model="editCommodity.createtime"
            type="date"
            placeholder="选择创建日期"
            value-format="yyyy-MM-dd"
            readonly
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="commitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增对话框-->
    <el-dialog title="新增" :visible.sync="addDialogVisible" @close="cancel">
      <el-form :model="addCommodity" label-width="70px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="addCommodity.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addCommodity.price"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="locality">
          <el-input v-model="addCommodity.locality"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="commitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findPages, fuzzy, update, insert, deleteOne } from "@/api/commodity";
export default {
  name: "GoodsManage",

  data() {
    return {
      //模糊搜索对象
      fuzzy: {},
      //当前的页码
      pageNum: 1,
      //每页显示几条
      pageSize: 5,
      //货物数据
      commodities: [],
      //总数据条数
      total: 1,
      //记录当前是否是模糊搜索
      isFuzzy: false,
      //保存编辑
      editCommodity: {
        fruitid: "",
        name: "",
        price: "",
        locality: "",
        createtime: "",
      },
      //编辑框是否可见
      editDialogVisible: false,
      //新增框是否可见
      addDialogVisible: false,
      //保存新增
      addCommodity: {
        name: "",
        price: "",
        locality: "",
      },
    };
  },

  mounted() {
    findPages(this.pageNum, this.pageSize).then((response) => {
      this.commodities = response.data.data.rows;
      this.total = response.data.data.total;
    });
  },

  methods: {
    //点击搜索按钮调用
    handleSearch() {
      this.fuzzy.pageSize = this.pageSize;
      this.fuzzy.pageNum = this.pageNum;
      fuzzy(this.fuzzy).then((response) => {
        this.commodities = response.data.data.rows;
        this.total = response.data.data.total;
        this.isFuzzy = true;
      });
    },
    //重新搜索
    refresh() {
      if (this.isFuzzy) {
        this.fuzzy.pageSize = this.pageSize;
        this.fuzzy.pageNum = this.pageNum;
        fuzzy(this.fuzzy).then((response) => {
          this.commodities = response.data.data.rows;
          this.total = response.data.data.total;
        });
      } else {
        findPages(this.pageNum, this.pageSize).then((response) => {
          this.commodities = response.data.data.rows;
          this.total = response.data.data.total;
        });
      }
    },
    //页码改变时调用
    handleCurrentChange(newPageNum) {
      this.pageNum = newPageNum;
      this.refresh();
    },
    //点击新增按钮调用
    handleAdd() {
      this.addDialogVisible = true;
    },
    //点击删除按钮调用
    handleDelete(fruitid) {
      deleteOne(fruitid).then((response) => {
        this.$message.success("删除成功");
        this.refresh();
      });
    },
    //取消编辑
    cancel() {
      this.editDialogVisible = false;
      this.addDialogVisible = false;
    },
    //点击编辑按钮调用
    handleEdit(commodity) {
      for (let key in commodity) {
        this.editCommodity[key] = commodity[key];
      }
      this.editDialogVisible = true;
    },
    //确定编辑
    commitEdit() {
      this.editDialogVisible = false;
      update(this.editCommodity).then((response) => {
        this.$message.success("编辑成功");
        this.refresh();
      });
    },
    //确认新增
    commitAdd() {
      this.addDialogVisible = false;
      insert(this.addCommodity).then((response) => {
        this.$message.success("新增成功");
        this.refresh();
        //新增对象置空
        for (let key in this.addCommodity) {
          this.addCommodity[key] = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
