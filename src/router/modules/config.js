const routerConfig = [
  {
    path: "/config",
    name: "config",
    redirect: "/config/editor",
    component: () => import("@/views/config/index.vue"),
    children: [
      {
        path: "/config/editor",
        name: "configEditor",
        meta: {
          title: "编辑器配置"
        },
        component: () => import("@/views/config/editor")
      },
      {
        path: "/config/template",
        name: "configTemplate",
        meta: {
          title: "模板管理"
        },
        component: () => import("@/views/config/template")
      },
      {
        path: "/config/query",
        name: "configQuery",
        meta: {
          title: "查询设置"
        },
        component: () => import("@/views/config/query")
      }
    ]
  }
]
export default routerConfig;