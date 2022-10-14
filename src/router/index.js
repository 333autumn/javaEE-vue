import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  //设置默认打开页面
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/components/home.vue"),
    children: [
      {
        path: "goodsManage",
        component: () => import("@/components/goodsManage.vue"),
      },
      {
        path: "retailerManage",
        component: () => import("@/components/retailerManage.vue"),
      },
      {
        path: "contract",
        component: () => import("@/components/contract.vue"),
      },
      {
        path: "user",
        component: () => import("@/components/user.vue"),
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
