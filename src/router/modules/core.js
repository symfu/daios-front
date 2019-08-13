const core = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      withoutLogin: true
    },
    component: () => import("@/views/core/login")
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册",
      withoutLogin: true
    },
    component: () => import("@/views/core/register")
  }
];
export default core;
