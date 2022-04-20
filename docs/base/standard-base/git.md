# Git 规范

### 分支命名规范
- master: 最新稳定分支，上线后的功能，需要合并到 master
- release/yyyyMMdd: 历史稳定分支
- feature/user_define_feature: 特性分支，自定义名称即可


### 分支合并规范
1. 新需求：需要从 master 检出 feature分支进行开发 
2. 上线：从 master 检出 reelase/yyyyMMdd 分支，再将不同的 feature 分支全入 release 分支，发布上线
3. bug修复：从对应的 release 分支中检出 feature 分支，修复后合并到 release 中发布
4. 发布完成：从 release 分支合并到 master，完成一个周期

### 提交记录规范
- feat：新功能的开发
- fix：bug的修复
- docs：文档格式的改动
- style：代码格式改变
- refactor：对已有的功能进行重构
- perf：性能优化
- test：增加测试
- build：改变了build工具
- revert：撤销上一次的commit提交
- chore：构建过程或辅助工具的变动

#### 示例
```shell
fix: 修复图片显示异常
```

### 代码提交过程
- <span style="color:red">使用提示：代码管理</span><span style="color:orange">-强烈推荐</span>
- 说明：为防止版本管理上，代码会错误  merge 而被覆盖的问题，需要按照以下步骤进行操作：
    1. 把不需要提交的代码还原掉
    2. 把需要提交的代码提交到本地 【commit】
    3. 拉取 gitee 上的代码 【pull】
    4. 处理冲突【按照上面步骤操作，冲突将针对是最少的】
    5. 将代码推向 gitee 【push】
