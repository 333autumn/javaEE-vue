<template>
  <div>
    <!--新增对话框-->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-form :model="saveContract" label-width="100px">
        <el-form-item label="合同编码" prop="barcode">
          <el-input v-model="saveContract.barcode" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="saveContract.type" size="small" clearable>
            <el-option label="省外" value="1"></el-option>
            <el-option label="省内" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="零售商信息：" prop="retailerid">
          <el-select
            v-model="saveContract.retailerid"
            filterable
            clearable
            placeholder="关联"
            @change="handleRetailerSelectChange"
          >
            <el-option
              v-for="item in this.retailers"
              :key="item.retailerid"
              :label="item.name"
              :value="item.retailerid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div
          v-if="this.saveContract.retailerid != ''"
          style="margin-left: 15px"
        >
          姓名: {{ this.selectRetailer.name }} &nbsp;&nbsp;联系电话:
          {{ this.selectRetailer.telphone }} &nbsp;&nbsp;进货地址:
          {{ this.selectRetailer.address }}
        </div>
        <el-divider></el-divider>
        <span>货物信息：</span>
        <el-button size="mini" @click="addGoods">添加</el-button>
        <el-table
          v-if="this.saveContract.fruits.length > 0"
          :data="this.saveContract.fruits"
          style="width: 930px"
          stripe
        >
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
            prop="locality"
            label="数量"
            width="240"
            align="center"
          >
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.number"
                :precision="1"
                :step="0.1"
                size="mini"
              ></el-input-number
              >&nbsp;斤
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commitAdd">提交</el-button>
      </div>
      <!--添加货物对话框-->
      <el-dialog
        title="水果列表"
        :visible.sync="addGoodsDialogVisible"
        append-to-body
      >
        <el-input
          style="width: 240px; margin-right: 10px"
          size="small"
          v-model="key"
        ></el-input>
        <el-button
          type="primary"
          size="small"
          @click="searchGoods"
          style="margin-right: 40px"
          >查询</el-button
        >
        <el-table
          :data="goods"
          @selection-change="handleGoodsSelectChange"
          height="400"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120">
          </el-table-column>
          <el-table-column prop="locality" label="产地" width="240">
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="small"
          @click="commitAddGoods"
          style="margin-right: 40px"
          >确定</el-button
        >
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { findList } from "@/api/retailer";
import { insert } from "@/api/contract";
import { findFruitList, findFruitListByKey } from "@/api/commodity";
export default {
  name: "AddOrEditContract",

  data() {
    return {
      //组件是否可见
      dialogVisible: false,
      //新增合同对象信息
      saveContract: {
        barcode: "系统自动生成",
        retailerid: "",
        type: "1",
        fruits: [],
      },
      //零售商数据
      retailers: [],
      //选中的零售商数据
      selectRetailer: {},
      addGoodsDialogVisible: false,
      //货物信息
      goods: [],
      //模糊搜索key
      key: "",
    };
  },

  mounted() {},

  methods: {
    //确定提交表单
    commitAdd() {
      this.addDialogVisible = false;
      insert(this.saveContract).then((response) => {
        this.$message.success("新增购销合同成功");
        //通过触发事件让父组件实现刷新
        this.$emit("refresh");
      });
      this.dialogVisible = false;
    },
    //选中的零售商发生变化时调用
    handleRetailerSelectChange(selectid) {
      for (let i = 0; i < this.retailers.length; i++) {
        if (this.retailers[i].retailerid === selectid) {
          this.selectRetailer = this.retailers[i];
          break;
        }
      }
    },
    //点击搜索货物调用
    searchGoods() {
      findFruitListByKey(this.key).then((response) => {
        this.goods = response.data.data;
      });
    },
    //点击添加货物调用
    addGoods() {
      findFruitList().then((response) => {
        this.goods = response.data.data;
      });
      this.addGoodsDialogVisible = true;
    },
    //确定添加货物
    commitAddGoods() {
      this.addGoodsDialogVisible = false;
    },
    //选中的货物发生变化时调用
    handleGoodsSelectChange(selection) {
      this.saveContract.fruits = selection;
    },
    //父组件通过调用该方法显示该组件
    show(param) {
      this.dialogVisible = true;
      findList().then((response) => {
        this.retailers = response.data.data;
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
