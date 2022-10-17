<template>
  <div>
    <!--顶部搜索栏-->
    合同号:
    <el-input
      v-model="fuzzy.barcode"
      style="width: 140px"
      size="small"
    ></el-input>
    零售商:
    <el-input v-model="fuzzy.name" style="width: 140px" size="small"></el-input>
    类型:
    <el-select v-model="fuzzy.type" placeholder="全部" size="small" clearable>
      <el-option label="省外" value="1"></el-option>
      <el-option label="省内" value="0"></el-option>
    </el-select>
    创建日期:
    <el-date-picker
      v-model="fuzzy.startTime"
      type="date"
      placeholder="最早"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker
    >-
    <el-date-picker
      v-model="fuzzy.endTime"
      type="date"
      placeholder="最晚"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>
    <br />
    <el-button
      type="primary"
      size="medium"
      @click="handleSearch"
      style="margin-left: 10px"
      >搜索</el-button
    >
    <el-button
      type="primary"
      size="medium"
      @click="handleAdd"
      style="margin-left: 10px"
      >新增</el-button
    ><br />
    <!--表格-->
    <el-table :data="contracts" style="width: 930px" stripe>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="合同编号"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <div
            @click="handleShowDetail(scope.row.contractid)"
            style="cursor: pointer"
          >
            {{ scope.row.barcode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="零售商" width="120" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.type == 0 ? "省内" : "省外" }}
        </template>
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
            title="确定要删除吗？"
            @onConfirm="handleDelete(scope.row.contractid)"
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
    <!--新增和编辑对话框-->
    <AddOrEditContract
      ref="AddOrEditDailogRef"
      @refresh="refresh"
    ></AddOrEditContract>
    <!--合同详情-->
    <ContractDetail ref="ContractDetailRef"></ContractDetail>
  </div>
</template>

<script>
import { findPages, deleteOne, fuzzy } from "@/api/contract";
import AddOrEditContract from "@/components/addOrEditContract.vue";
import ContractDetail from "@/components/contractDetail.vue";
export default {
  name: "Contract",
  components: { AddOrEditContract, ContractDetail },

  data() {
    return {
      //模糊搜索查询条件
      fuzzy: {},
      //当前的页码
      pageNum: 1,
      //每页显示几条
      pageSize: 5,
      //合同数据
      contracts: [],
      //数据总数
      total: 1,
      //记录当前是否是模糊搜索
      isFuzzy: false,
    };
  },

  mounted() {
    findPages(this.pageNum, this.pageSize).then((response) => {
      this.contracts = response.data.data.rows;
      this.total = response.data.data.total;
    });
  },

  methods: {
    //点击编辑按钮调用
    handleEdit() {
      this.$refs.AddOrEditDailogRef.show("edit");
    },
    //确认删除
    handleDelete(contractid) {
      deleteOne(contractid).then((resposne) => {
        this.$message.success("删除合同成功");
        this.refresh();
      });
    },
    //页码改变时调用
    handleCurrentChange(newPageNum) {
      this.pageNum = newPageNum;
      this.refresh();
    },
    //点击搜索按钮调用
    handleSearch() {
      this.fuzzy.pageSize = this.pageSize;
      this.fuzzy.pageNum = this.pageNum;
      fuzzy(this.fuzzy).then((response) => {
        this.contracts = response.data.data.rows;
        this.total = response.data.data.total;
      });
    },
    //点击新增按钮调用
    handleAdd() {
      this.$refs.AddOrEditDailogRef.show();
    },
    //刷新页面
    refresh() {
      if (this.isFuzzy) {
        this.fuzzy.pageSize = this.pageSize;
        this.fuzzy.pageNum = this.pageNum;
        fuzzy(this.fuzzy).then((response) => {
          this.contracts = response.data.data.rows;
          this.total = response.data.data.total;
        });
      } else {
        findPages(this.pageNum, this.pageSize).then((response) => {
          this.contracts = response.data.data.rows;
          this.total = response.data.data.total;
        });
      }
    },
    //点击合同编号调用
    handleShowDetail(contractid) {
      this.$refs.ContractDetailRef.show(contractid);
    },
  },
};
</script>

<style lang="css" scoped></style>
