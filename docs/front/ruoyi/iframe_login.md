# 单点登录-iframe


> 页面不产生跳转，在原系统中通过  iframe 的方式展示登录页面，完成登录


### 单点登录方处理
1. src/views/login.vue, 登录成功后，若在 iframe 中，不跳转页面，只调 top 的Listener
```javascript
userStore.login(loginForm.value).then((token) => {
if (window.top === window.self) {
  router.push({ path: redirect.value || "/" });
} else {
  // 不使用 * 获取不到，使用 * 会被非法站点捕获，暂无其他解决方法
  window.top.postMessage(token, '*');
}
})
```
2. src/store/modules/user.js，若登录页面要求不全局登录，则不设置 token
```javascript
const search = window.location.search;
if (!search || search.indexOf('onlySelf=true') === -1) {
  setToken(token);
}
```
3. src/permission.js，若 token 存在，并且处于 iframe 中，则校验 token 是否有效。有效就调用top 的Listener，无效就清理后再登录
```javascript
if(token && !isSelf) {
    useUserStore().getUserCode().then(res => {
        if (!!res) {
            // 不使用 * 获取不到，使用 * 会被非法站点捕获，暂无其他解决方法
            window.top.postMessage(token, '*');
        } else {
            removeToken();
            next();
        }
        NProgress.done()
    });
}
```


### 接入方系统处理
1. 登录页面, iframe 嵌套 cas 登录页面。并添加监听器，若传回去了 token, 设置到 localStorage
```html
<template>
    <div class="cas-login">
        <iframe :src="fullPath"></iframe>
    </div>
</template>
<script setup>
import { setToken } from '@/utils/auth'
import { useRoute, useRouter } from 'vue-router';
const CAS = import.meta.env.VITE_APP_CAS;
const { query } = useRoute();
const router = useRouter();
const fullPath = computed(() => {
    return `${CAS}/#/login`
});
window.addEventListener('message', function(e){
    var token=e.data;
    if (typeof token !== 'string') {
        return;
    }
    setToken(token);
    router.push({ path: query.to});
},false);
</script>
<style>
.cas-login {
    height: 100%;
}
.cas-login iframe {
    border: 0;
    width: 100%;
    height: 100%;
}
</style>
```
2. src/permission.js，若未登录，跳转到登录页面
```javascript
if (to.fullPath.indexOf('/login') < 0) {
  next(`/login?to=${from.fullPath}`)
  NProgress.done()
} else {
  next()
}
```

