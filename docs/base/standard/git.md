# Git 规范

### 分支规范
- master: 最新稳定分支，上线后的功能，需要合并到 master
- release/yyyyMMdd: 历史稳定分支
- feature/user_define_feature: 特性分支，自定义名称即可

### 分支合并规范
1. 新需求：需要从 master 检出 feature分支进行开发 
2. 上线：从 master 检出 reelase/yyyyMMdd 分支，再将不同的 feature 分支全入 release 分支，发布上线
3. bug修复：从对应的 release 分支中检出 feature 分支，修复后合并到 release 中发布
4. 发布完成：从 release 分支合并到 master，完成一个周期

