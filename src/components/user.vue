<template>
  <div>
    <el-form :model="user" label-width="70px" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="user.username"
          disabled
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width: 300px">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" style="width: 300px">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telphone" style="width: 300px">
        <el-input v-model="user.telphone"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleEdit">修改用户信息</el-button>
  </div>
</template>

<script>
import { update } from "@/api/user";
export default {
  name: "User",

  data() {
    return {
      user: {
        userid: "",
        username: "",
        password: "",
        name: "",
        telphone: "",
      },
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  methods: {
    //点击修改按钮调用
    handleEdit() {
      update(this.user).then((resposne) => {
        this.$message.success("修改用户信息成功");
        //修改浏览器缓存
        localStorage.setItem("user", JSON.stringify(this.user));
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
