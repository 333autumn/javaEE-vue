<template>
  <div class="login">
    <el-card class="card" shadow="hover">
      <h3>用户登录</h3>
      <el-form
        ref="form"
        :model="user"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="success" @click="registerDialogVisible = true"
        >注册</el-button
      >
    </el-card>
    <!--用户注册对话框-->
    <el-dialog
      title="用户注册"
      :visible.sync="registerDialogVisible"
      @close="cancel"
    >
      <el-form :model="registerUser" label-width="60px" ref="registerRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerUser.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telphone">
          <el-input v-model="registerUser.telphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
export default {
  name: "Login",

  data() {
    return {
      user: {
        username: "jack",
        password: "1234",
      },
      registerDialogVisible: false,
      registerUser: {
        username: "",
        password: "",
        name: "",
        telphone: "",
      },
    };
  },

  mounted() {},

  methods: {
    //注册提交表单
    commit() {
      register(this.registerUser)
        .then((response) => {
          const data = response.data;
          if (data.code != 200) {
            this.$message.error(data.msg);
          } else {
            this.registerDialogVisible = false;
            //重置表单
            this.$refs.registerRef.resetFields();
            this.$message.success("注册成功");
          }
        })
        .catch((error) => {
          console.log("注册请求发生错误=>", error);
        });
    },
    //取消提交表单
    cancel() {
      this.registerDialogVisible = false;
      this.$refs.registerRef.resetFields();
    },
    //登录
    login() {
      login(this.user).then((response) => {
        if (response.data.code === 200) {
          this.user = response.data.data;
          this.$router.push({ name: "Home", params: { user: this.user } });
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
/* .login {
  width: 100%;
  height: 100%;
  background: url("@/assets/login.jpg") center center / cover no-repeat;
} */
.card {
  width: 600px;
  margin: 150px auto;
}
</style>
