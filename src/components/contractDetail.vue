<template>
  <div>
    <el-dialog
      title="合同详情"
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-form :model="contract" label-width="100px">
        <el-form-item label="合同编码:" prop="barcode">
          {{ contract.barcode }}
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          {{ contract.type == 0 ? "省内" : "省外" }}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="零售商信息：" prop="retailerid"> </el-form-item>
        <div style="margin-left: 15px">
          姓名: {{ contract.retailer.name }} &nbsp;&nbsp;联系电话:
          {{ contract.retailer.telphone }} &nbsp;&nbsp;进货地址:
          {{ contract.retailer.address }}
        </div>
        <el-divider></el-divider>
        <span>货物信息：</span>
        <el-table :data="this.contract.fruits" style="width: 930px" stripe>
          <el-table-column prop="name" label="名称" width="120" align="center">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120" align="center">
          </el-table-column>
          <el-table-column
            prop="locality"
            label="产地"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="accessories"
            label="附属品"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div
                v-if="scope.row.accessories.length > 0"
                v-for="item in scope.row.accessories"
              >
                {{ item.name }}:{{ item.price }}元
              </div>
              <div v-if="scope.row.accessories.length === 0">无附属品</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="240"
            align="center"
          >
            <template slot-scope="scope"> {{ scope.row.number }}斤 </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { findDetail } from "@/api/contract";
export default {
  name: "ContractDetail",

  data() {
    return {
      //组件是否可见
      dialogVisible: false,
      //合同对象信息
      contract: {},
    };
  },

  mounted() {},

  methods: {
    //父组件通过调用该方法显示该组件
    show(contractid) {
      this.dialogVisible = true;
      findDetail(contractid).then((response) => {
        this.contract = response.data.data;
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
