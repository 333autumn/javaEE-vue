<template>
  <div>
    <h1>水果网络销售平台</h1>
    <!--导航栏部分-->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width: 450px"
    >
      <el-menu-item index="1" @click="goToGoodsManage">货物管理</el-menu-item>
      <el-menu-item index="2" @click="goToRetailerManage"
        >零售商管理</el-menu-item
      >
      <el-menu-item index="3" @click="goToContract">购销合同</el-menu-item>
      <el-menu-item index="4" @click="goToUser">用户设置</el-menu-item>
    </el-menu>
    <h3>欢迎您,{{ user.name }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      user: {},
    };
  },

  mounted() {
    if (this.$route.params.user == null) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = this.$route.params.user;
      //浏览器设置缓存
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  },
  methods: {
    goToGoodsManage() {
      this.$router.push({ path: "/home/goodsManage" });
    },
    goToRetailerManage() {
      this.$router.push({ path: "/home/retailerManage" });
    },
    goToContract() {
      this.$router.push({ path: "/home/contract" });
    },
    goToUser() {
      this.$router.push({ path: "/home/user" });
    },
  },
};
</script>

<style lang="css" scoped></style>
