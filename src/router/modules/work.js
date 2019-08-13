// import layout from "../../layout/index.vue";
export default {
  path: '/work',
  name: 'work',
  redirect: '/work/data_opera',
  component: () =>
    import('../../views/work/index.vue'),
  children: [
    {
      path: '/work/data_opera',
      name: 'data_opera',
      component: () =>
        import('../../views/work/two-aside/data-operation/data.tree.vue'),
      
    },
    {
      path: '/work/data_history',
      name: 'data_history',
      component: () =>
        import('../../views/work/two-aside/operation-history/history.vue'),
      
    },
    {
      path: '/work/data_import',
      name: 'data_import',
      component: () =>
        import('../../views/work/two-aside/Import-export/import.export.vue')
    },
    {
      path: '/work/data_tools',
      name: 'data_tools',
      component: () =>
        import('../../views/work/two-aside/tools/tools.vue')
    },
    {
      path: '/work/pro_man',
      name: 'pro_man',
      component: () =>
        import('../../views/work/two-aside/pro-man/pro_man.vue')
    },
    {
      path: '/work/tongji',
      name: 'tongji',
      component: () =>
        import('../../views/work/two-aside/tongji/tongji.vue')
    },
    {
      path: '/work/work_order',
      name: 'work_order',
      component: () =>
        import('../../views/work/two-aside/work-order/work_order.vue')
    },
    {
      path: '/work/time_work',
      name: 'time_work',
      component: () =>
        import('../../views/work/two-aside/time-work/time_work.vue')
    },
    {
      path: '/work/data_dictionary',
      name: 'data_dictionary',
      component: () =>
        import('../../views/work/two-aside/data-dictionary/data_dictionary.vue')
    },
    {
      path: '/work/soft_shenji',
      name: 'soft_shenji',
      component: () =>
        import('../../views/work/two-aside/soft-shenji/soft_shenji.vue')
    },
    {
      path: '/work/desensitization',
      name: 'desensitization',
      component: () =>
        import('../../views/work/two-aside/data-desensitization/data-desensitization.vue')
    },
    
  ]
};
