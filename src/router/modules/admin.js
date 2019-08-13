const routerAdmin = [
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/config",
    component: () => import("@/views/admin"),
    children: [
      {
        path: "/admin/config",
        name: "GlobalConfig",
        meta: {
          title: "全局设置",
          auth: false
        },
        component: () => import("@/views/admin/globalConfig")
      },
      {
        path: "/admin/user",
        name: "userManage",
        meta: {
          title: "用户管理",
          auth: false
        },
        component: () => import("@/views/admin/userManage")
      },
      {
        path: "/admin/importDing",
        name: "importDingding",
        meta: {
          title: "导入钉钉用户",
          auth: false
        },
        component: () => import("@/views/admin/userManage/importDing")
      }
    ]
  }
]
export default routerAdmin;
