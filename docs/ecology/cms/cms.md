# CMS 内容管理模块


## 模块定位
 系统内的一些内容维护，包含：
 - article 文章（评论，点赞，收藏）
 - banner 横幅
 - blogroll 友链
 - doc 文档管理
 - 其他内容类的信息维护


## 文章分类维护
- 由 manager 端维护文章分类信息，每个租户均使用同一分类【后续再考虑自定义分类需求】
- 所有的文章，均需要有一个确切的分类
- C 端可按分类，或不按分类来查询文章

## 文章维护
- manager 端可维护文章，此类文章不绑定租户。所有租户均可读取。
- admin 可维护文章，此类文章需要绑定租户，在C 端，不能读取其他租户的文章。