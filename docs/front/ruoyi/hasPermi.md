# 按钮及元素权限

## 现状
1. ruoyi 的权限控制，分为权限符和角色
2. ruoyi 的菜单结构是全量返回【没研究后端，但看到前端是按角色和权限重新处理了，故全量返回也能做控制】
3. ruoyi 实现了路由过滤，和元素过滤。并且写了多套权限过滤【菜单过滤，node元素过滤，为解决node元素过滤问题的 v-if过滤】
4. 按钮/页面元素级的权限符，必需全局唯一，命名好难啊，我只想做到路由下唯一就行
5. 开发过程，我需要：1. 返回菜单，2. 返回用户信息要加 permissions 和 roles， 偶合度相当大，学习难度也增大，想简化

## 目标
1. 后端已经完成路由的筛选，用户拿到的路由已经是用户权限下的路由
2. 接口权限后端会再次过滤，前端无需关心
3. 基于Jwt的用户信息获取，不再调后端，故没法（不想）做到在获取用户信息时再获取 permissions 和 roles
4. 前端移除角色的控制概念，完全由后端完成过滤即可
5. 前端按路由来辨别权限字符，只需要做到单路由下的权限字符不重复即可，命名大大简化
6. 以上逻辑需要后端配合，后端已经完成全部逻辑，并且没有使用ruoyi 的后端【或对后端感兴趣，单独讨论】

## 改装

### 移除 hasRole.js
- 用途：v-hasRole 标签的权限判断
- 移除文件：src/directive/permission/hasRole.js
- 移除与 hasRole 相关代码：src/directive/index.js

### 移除 checkRole
- 用途：在页面不支持 v-hasRole 判断时，使用 if 标签
- 位置：src/utils/permission.js
- 修改：移除 checkRole函数

### 移除 auth.js
- 用途：过滤路由使用
- 移除文件：src/plugins/auth.js
- 移除与 auth.js 相关代码：src/plugins/index.js
- 移除路由过滤相关代码：src/store/modules/permission.js: filterDynamicRoutes 整个函数，以及调用函数过滤的相关代码

### permission.js 获取菜单和按钮映射
- 用途：获取路由，并完成各种过滤处理
- 位置：src/store/modules/permission.js
1. state 添加 routeBtns: {} 用于存储 路由和按钮 的映射
2. 添加 add方法，用于维护 routeBtns
```javascript
// actions 内添加
addRouteBtns(route, btns)
{
  this.routeBtns[route] = btns
}
```
3. 增加函数，从子菜单内查询按钮
```javascript
// 从子菜单获取按钮资源
function getMenuButtons(routers) {
  const buttons = [];
  for (const router of routers) {
    if (router.resType === 'BUTTON' && router.buttonCode) {
      buttons.push(router.buttonCode);
    }
  }
  return buttons;
}
```
4. 递归转换 RuoyiTree 过程，同时维护 菜单和按钮的关系
```javascript
function tree2RuoyiTree(reses, currentRoute) {
  const menus = [];
  for (let i = 0; i < reses.length; i++) {
    const d = reses[i];
    // 只有MENU是用来展示的
    if (d.resType !== 'MENU') {
      continue;
    }
    // 【当前方法重点】当前路径 cr 预处理
    let cr = currentRoute || '';
    let p = d.routePath || '';
    cr = p.startsWith('/') ? p : cr + '/' + p;

    const menu = {};
    menu.path = p;
    menu.name = i + '-' + d.resName;
    menu.hidden = d.hidden;
    menu.redirect = (p === '' || p === '/') ? '/index': 'noRedirect';
    menu.component = d.component ? d.component : 'error/index';
    menu.alwaysShow = false;
    const meta = {};
    meta.title = d.resName;
    meta.icon = d.icon ? d.icon : 'form';
    meta.noCache = false;
    meta.link = null;
    menu.meta = meta;
    // 【当前方法重点】子菜单处理，需要继续传递 cr
    menu.children = d.children ? tree2RuoyiTree(d.children, cr) : undefined;
    menus.push(menu);

    // 【当前方法重点】按钮处理【为后面的按钮权限做数据准备】
    const btns = d.children ? getMenuButtons(d.children) : undefined;
    if (btns && btns.length > 0) {
      usePermissionStore().addRouteBtns(cr,btns);
    }
  }
  return menus.length > 0 ? menus : undefined;
}
```

### 移除 user.js 权限部分
- 用途：初始化用户的角色和权限【已被后端完成过滤，并且使用 Jwt 后此项变得麻烦】
- 位置：src/store/modules/user.js
- 修改：移除 roles，permissions 所有的定义和赋值

### 修正 路由跳转判断
- 用途：在没有获取用户权限信息时，触发调用接口，获取路由，和用途基本信息（权限和角色）
- 位置：src/permission.js
- 修改：`useUserStore().roles.length === 0` 修改为 `!useUserStore().name`, 只用用户名判断即可

### hasPermi.js 权限判断修改
- 用途：v-hasPermi 标签的权限判断
- 位置：src/directive/permission/hasPermi.js
- 代码：
```javascript
import router from "@/router";
import usePermissionStore from "@/store/modules/permission";

export default {
    mounted(el, binding, vnode) {
        const { value } = binding;
        // 所有路由和按钮的映射
        const routeBtns = usePermissionStore().routeBtns;
        // 当前路由
        const path = router?.currentRoute?._value?.path;

        if (value && value instanceof Array && value.length > 0) {
            // 若按当前路由获取按钮，不存在，或者存在按钮但不存储权限字符，将移除 el 节点
            const buttons = routeBtns[path] || [];
            const hasPermissions = buttons.some(btn => value.includes(btn));
            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`请设置操作权限标签值`);
        }
    }
}
```

### checkPermi 权限判断修改
- 用途：在页面不支持 v-hasPermi 判断时，使用 if 标签
- 位置：src/utils/permission.js
- 代码：
```javascript
import router from "@/router";
import usePermissionStore from "@/store/modules/permission";

export function checkPermi(value) {
  if (value && value instanceof Array && value.length > 0) {
    const routeBtns = usePermissionStore().routeBtns;
    const path = router?.currentRoute?._value?.path;
    
    const buttons = routeBtns[path] || [];
    const hasPermission = buttons.some(btn => value.includes(btn));
    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`)
    return false
  }
}
```

### 使用
1. 只需关心同一路由下的权限字符即可
```html
<el-button type="primary" v-hasPermi="['add']">新增</el-button>
```
2. 若遇到不支持 v-hasPermi 方式，请使用 checkPermi: [权限使用](http://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%9D%83%E9%99%90%E4%BD%BF%E7%94%A8)

