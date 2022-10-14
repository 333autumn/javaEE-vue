<template>
  <div>
    <!--顶部搜索栏-->
    姓名:
    <el-input v-model="fuzzy.name" style="width: 140px" size="small"></el-input>
    手机:
    <el-input
      v-model="fuzzy.telphone"
      style="width: 140px"
      size="small"
    ></el-input>
    地址:
    <el-input
      v-model="fuzzy.address"
      style="width: 140px"
      size="small"
    ></el-input>
    状态:
    <el-select v-model="fuzzy.status" placeholder="全部" size="small" clearable>
      <el-option label="启用" value="1"></el-option>
      <el-option label="停用" value="0"></el-option>
    </el-select>
    创建日期:
    <el-date-picker
      v-model="fuzzy.createtime"
      type="date"
      placeholder="选择创建日期"
      value-format="yyyy-MM-dd"
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
    <el-table :data="retailers" style="width: 930px" stripe>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center">
      </el-table-column>
      <el-table-column prop="telphone" label="手机" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="120" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" align="center">
        <template slot-scope="scope"
          ><el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(scope.row.retailerid)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建日期"
        width="240"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
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
            @onConfirm="handleDelete(scope.row.retailerid)"
          >
            <el-button type="danger" size="small" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
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
      <el-form :model="editRetailer" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editRetailer.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telphone">
          <el-input v-model="editRetailer.telphone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editRetailer.address"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="editRetailer.status"
            placeholder="请选择"
            size="small"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期" prop="createtime">
          <el-date-picker
            v-model="editRetailer.createtime"
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
      <el-form :model="addRetailer" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addRetailer.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telphone">
          <el-input v-model="addRetailer.telphone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addRetailer.address"></el-input>
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
import {
  findPages,
  change,
  deleteOne,
  update,
  fuzzy,
  insert,
} from "@/api/retailer";
export default {
  name: "RetailerManage",

  data() {
    return {
      //零销商数据
      retailers: [],
      //当前的页码
      pageNum: 1,
      //每页显示几条
      pageSize: 5,
      //数据总条数
      total: 1,
      //模糊搜索条件
      fuzzy: {
        // name: "",
        // telphone: "",
        // address: "",
        // status: "",
        // createtime: "",
        // pageNum: "",
        // pageSize: "",
      },
      //记录当前是否是模糊搜索
      isFuzzy: false,
      //保存编辑
      editRetailer: {
        retailerid: "",
        name: "",
        telphone: "",
        address: "",
        status: "",
        createtime: "",
      },
      //编辑框是否可见
      editDialogVisible: false,
      //新增框是否可见
      addDialogVisible: false,
      //保存新增
      addRetailer: {
        name: "",
        telphone: "",
        address: "",
      },
    };
  },

  mounted() {
    findPages(this.pageNum, this.pageSize).then((response) => {
      this.retailers = response.data.data.rows;
      this.total = response.data.data.total;
    });
  },

  methods: {
    //页码改变时调用
    handleCurrentChange(newPageNum) {
      this.pageNum = newPageNum;
      this.refresh();
    },
    //改变启用状态调用
    changeStatus(retailerid) {
      change(retailerid).then((response) => {
        this.$message.success("改变启用状态成功");
      });
    },
    //点击删除按钮调用
    handleDelete(retailerid) {
      deleteOne(retailerid).then((response) => {
        this.$message.success("删除成功");
        this.refresh();
      });
    },
    //点击搜索按钮调用
    handleSearch() {
      this.fuzzy.pageSize = this.pageSize;
      this.fuzzy.pageNum = this.pageNum;
      fuzzy(this.fuzzy).then((response) => {
        this.retailers = response.data.data.rows;
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
          this.retailers = response.data.data.rows;
          this.total = response.data.data.total;
        });
      } else {
        findPages(this.pageNum, this.pageSize).then((response) => {
          this.retailers = response.data.data.rows;
          this.total = response.data.data.total;
        });
      }
    },
    //点击编辑按钮调用
    handleEdit(retailer) {
      for (let key in retailer) {
        this.editRetailer[key] = retailer[key];
      }
      //转化为字符串形式,否则回显不会显示label
      this.editRetailer.status = this.editRetailer.status.toString();
      this.editDialogVisible = true;
    },
    //取消编辑
    cancel() {
      this.editDialogVisible = false;
      this.addDialogVisible = false;
    },
    //确定编辑
    commitEdit() {
      this.editDialogVisible = false;
      update(this.editRetailer).then((response) => {
        this.$message.success("编辑成功");
        this.refresh();
      });
    },
    //点击新增按钮调用
    handleAdd() {
      this.addDialogVisible = true;
    },
    //确认新增
    commitAdd() {
      this.addDialogVisible = false;
      insert(this.addRetailer).then((response) => {
        this.$message.success("新增成功");
        this.refresh();
        //新增对象置空
        for (let key in this.addRetailer) {
          this.addRetailer[key] = "";
        }
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
