# 路由

### 说明

此章节为路由的动态获取，以及改造方法。若对路由没有强烈的动态配置需求，请直接使用 mock 数据即可

### Mock
1. 将 Ruoyi官方的菜单 Json 离线保存，并完善成为自己的 Router 数据
2. src/store/modules/permission.js 的getRouters 更换为 mock 数据。使用json字义菜单

### 动态请求菜单
1. 将src/store/modules/permission.js 的getRouters更换成自己的菜单接口，获取到菜单数据
2. 将获取到的自定义菜单数据，递归成ruoyi要求的菜单树格式。同时移除 router.js 中的dynamicRoutes定义(Ruoyi的私货)
```javascript
const usePermissionStore = defineStore('permission', {
    state: () => ({
        // 省略
    }),
    actions: {
        // 省略
        generateRoutes(roles) {
            return new Promise(resolve => {
                // 向后端请求路由数据
                userMenuList().then(res => {
                    // console.log('router.res', res);
                    // 将原始资源列表转换成资源树
                    const tree = handleTree(res.data, 'resCode', 'pcode');
                    // console.log('router.tree', tree);
                    // 将资源树，转换成 ruoyi 所要求的资源树
                    const ruoyiTree = tree2RuoyiTree(tree);
                    // console.log('router.ruoyiTree', ruoyiTree);

                    const sdata = JSON.parse(JSON.stringify(ruoyiTree))
                    const rdata = JSON.parse(JSON.stringify(ruoyiTree))
                    const defaultData = JSON.parse(JSON.stringify(ruoyiTree))
                    const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                    const defaultRoutes = filterAsyncRouter(defaultData)
                    this.setRoutes(rewriteRoutes)
                    this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
                    this.setDefaultRoutes(sidebarRoutes)
                    this.setTopbarRoutes(defaultRoutes)
                    resolve(rewriteRoutes)
                })
            })
        }
    }
})

```
- 将资源树转换成 Ruoyi 的资源树
```javascript
function tree2RuoyiTree(reses) {
  const menus = [];
  for (let i = 0; i < reses.length; i++) {
    const d = reses[i];
    const menu = {};
    menu.path = !!d.routePath ? d.routePath : '';
    menu.name = i + '-' + d.resName + menu.path;
    menu.hidden = d.hidden;
    menu.redirect = 'noRedirect';
    menu.component = d.component ? d.component : 'error/index';
    menu.alwaysShow = false;
    const meta = {};
    meta.title = d.resName;
    meta.icon = d.icon ? d.icon : 'form';
    meta.noCache = false;
    meta.link = null;
    menu.meta = meta;
    const children = d.children;
    if (children) {
      menu.children = tree2RuoyiTree(children);
    }
    menus.push(menu);
  }
  return menus;
}
```


7. src/store/modules/permission.js 的filterAsyncRouter，增强component适配。
8. src/permission.js 所有的 isRelogin.show 都赋值 false, 框架bug,在登录失效后页面刷新不跳转登录页面

