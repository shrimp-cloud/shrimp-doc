import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: 'Shrimp Workstudio',
  description: 'Shrimp Workstudio',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: '最近更新',
    },
    docFooter: {
      prev: '前一篇',
      next: '后一篇'
    },
    nav: [
      { text: 'Home', link: '/'},
      {
        text: '后端',
        items: [
          { text: 'Java', link: '/backend/java/' },
          { text: 'Spring', link: '/backend/spring/' },
          { text: '框架', link: '/backend/framework/' },
          { text: '组件', link: '/backend/component/' },
          { text: '逻辑设计', link: '/backend/design/' },
          { text: '三方服务集成', link: '/backend/third/' },
        ]
      },
      {
        text: '前端',
        items: [
          { text: 'VUE', link: '/front/vue/' },
          { text: 'Ruoyi', link: '/front/ruoyi/' },
          { text: 'vant-weapp', link: '/front/vant-weapp/' },
          { text: '客户端', link: '/front/client/' },
        ]
      },
      {
        text: '生态',
        items: [
          { text: 'DEMO', link: '/ecology/demo/' },
          { text: '微模块', link: '/ecology/micro/' },
          { text: '系统管理', link: '/ecology/sys/' },
          { text: '代码生成', link: '/ecology/gen/' },
          { text: '权限管理', link: '/ecology/cas/' },
          { text: '内容管理', link: '/ecology/cms/' },
          { text: '商城管理', link: '/ecology/pms/' },
          { text: '报表管理', link: '/ecology/report/' },
          { text: '博客系统', link: '/ecology/blog/' },
        ]
      },
      {
        text: '运维',
        items: [
          { text: 'CentOS7', link: '/devops/centos/' },
          { text: '中间件', link: '/devops/component/' },
          { text: 'Kubernetes', link: '/devops/k8s/' },
          { text: '服务器运维', link: '/devops/server/' },
        ]
      },
      {
        text: '基础',
        items: [
          { text: '常用', link: '/base/common/' },
          { text: '基础规范', link: '/base/standard-base/' },
          { text: '前端规范', link: '/base/standard-frontend/' },
          { text: '后端规范', link: '/base/standard-backend/' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'GO基础', link: '/other/go/' },
          { text: 'Arduino', link: '/other/arduino/' },
          { text: 'Python', link: '/other/python/' },
          { text: 'OpenCV', link: '/other/opencv/' },
          { text: 'LM 大模型', link: '/other/lm/' },
          { text: 'WordPress', link: '/other/wordpress/' },
        ]
      },
    ],


    sidebar: {
      '/backend/java/': [
        {
          text: '后端',
          items: [
            { text: 'Java', link: '/backend/java' },
            { text: '缓存', link: '/backend/java/cache' },
            { text: 'JVM', link: '/backend/java/jvm' },
            { text: 'Dubbo', link: '/backend/java/dubbo' },
            { text: 'Camunda', link: '/backend/java/camunda' }
          ]
        }
      ],

      '/backend/spring/': [
        {
          text: 'Spring',
          items: [
            {text: 'Spring', link: '/backend/spring/'},
            {text: '反射', link: '/backend/spring/reflect'},
            {text: 'PostConstruct', link: '/backend/spring/PostConstruct'},
            {text: 'BeanPostProcessor', link: '/backend/spring/BeanPostProcessor'},
            {text: 'IocBeanLifeCycle', link: '/backend/spring/IocBeanLifeCycle'},
            {text: 'ApplicationListener', link: '/backend/spring/ApplicationListener'},
            {text: 'RoutingDataSource', link: '/backend/spring/RoutingDataSource'},
            {text: 'String路径', link: '/backend/spring/path'},
            {text: 'Spring本地Jar', link: '/backend/spring/LocalJar'},
            {text: '打包非Jara文件', link: '/backend/spring/NotOnlyJava'},
            {text: '重写Bean', link: '/backend/spring/OverrideSpringBean'},
          ]
        }
      ],
      '/backend/framework/': [
        {
          text: '框架',
          items: [
            {text: '框架', link: '/backend/framework/'},
            {text: 'Bom', link: '/backend/framework/bom'},
            {text: 'Parent', link: '/backend/framework/parent'},
            {text: '仓库', link: '/backend/framework/repo'},
            {text: '常用工具', link: '/backend/framework/common'},
            {text: '启动器', link: '/backend/framework/starter'},
            {text: '核心', link: '/backend/framework/core'},
            {text: '注解', link: '/backend/framework/annotation'},
            {text: '分页', link: '/backend/framework/page'},
          ]
        }
      ],
      '/backend/component/': [
        {
          text: '组件',
          items: [
            {text: '组件', link: '/backend/component/'},
            {text: 'Redis', link: '/backend/component/redis'},
            {text: 'Spring', link: '/backend/component/spring'},
            {text: 'Cas', link: '/backend/component/casStarter'},
            {text: 'Mybatis', link: '/backend/component/mybatis'},
            {text: 'oss', link: '/backend/component/oss'},
            {text: 'mqtt', link: '/backend/component/mqtt'},
          ]
        }
      ],
      '/backend/design/': [
        {
          text: '设计',
          items: [
            {text: '与或', link: '/backend/design/andor'},
            {text: '链路', link: '/backend/design/trace'},
            {text: '灰度发布', link: '/backend/design/gray_release'},
          ]
        }
      ],
      '/backend/third/': [
        {
          text: '三方',
          items: [
            {text: '三方', link: '/backend/third/'},
            {text: '支付宝', link: '/backend/third/alipay'},
            {text: '数据库', link: '/backend/third/database'},
            {text: '域名', link: '/backend/third/domain'},
            {text: '邮箱', link: '/backend/third/email'},
            {text: '小程序', link: '/backend/third/miniapp'},
            {text: 'OSS', link: '/backend/third/oss'},
            {text: '服务器', link: '/backend/third/server'},
            {text: '短信', link: '/backend/third/sms'},
            {text: '微信', link: '/backend/third/wechat'},
            {text: '微信支付', link: '/backend/third/wxpay'},
            {text: 'MQTT', link: '/backend/third/mqtt'},
          ]
        }
      ],


      '/front/vue/': [
        {
          text: 'Vue',
          items: [
            {text: 'Vue', link: '/front/vue/'},
            {text: 'Node基础', link: '/front/vue/node_base'},
            {text: 'Node升级', link: '/front/vue/node_update'},
            {text: 'NPM升级', link: '/front/vue/npm_update'},
            {text: 'yarn 使用', link: '/front/vue/yarn'},
            {text: '组件', link: '/front/vue/components'},
            {text: '基础镜像', link: '/front/vue/base_image'},
          ]
        }
      ],
      '/front/ruoyi/': [
        {
          text: 'Ruoyi',
          items: [
            {text: 'Ruoyi', link: '/front/ruoyi/'},
            {text: '初始化', link: '/front/ruoyi/init'},
            {text: '环境', link: '/front/ruoyi/env'},
            {text: '请求', link: '/front/ruoyi/request'},
            {text: '接口', link: '/front/ruoyi/api'},
            {text: '登录', link: '/front/ruoyi/login'},
            {text: '登录嵌入', link: '/front/ruoyi/iframe_login'},
            {text: '路由', link: '/front/ruoyi/router'},
            {text: '权限', link: '/front/ruoyi/hasPermi'},
            {text: 'CRUD', link: '/front/ruoyi/crud'},
            {text: '字典', link: '/front/ruoyi/dict'},
            {text: 'Monaco', link: '/front/ruoyi/monaco'},
            {text: 'Bugs', link: '/front/ruoyi/bugs'},
            {text: '基础组件', link: '/front/ruoyi/baseComponents'},
            {text: '业务组件', link: '/front/ruoyi/bizComponents'},
          ]
        }
      ],
      '/front/vant-weapp/': [
        {
          text: 'Weapp',
          items: [
            {text: 'Weapp', link: '/front/vant-weapp/'},
            {text: '初始化', link: '/front/vant-weapp/init'},
            {text: '环境', link: '/front/vant-weapp/env'},
            {text: '请求', link: '/front/vant-weapp/request'},
            {text: '组件', link: '/front/vant-weapp/components'},
            {text: 'Shit', link: '/front/vant-weapp/shit'},
          ]
        }
      ],
      '/front/client/': [
        {
          text: '客户端',
          items: [
            {text: '客户端', link: '/front/client/'},
            {text: '小程序', link: '/front/client/miniapp'},
          ]
        }
      ],

      '/ecology/demo/': [
        {
          text: 'Demo',
          items: [
            {text: 'Demo', link: '/ecology/demo/'},
            {text: '选型', link: '/ecology/demo/lectotype'},
            {text: '示例', link: '/ecology/demo/demo'},
          ]
        }
      ],
      '/ecology/micro/': [
        {
          text: '微模块',
          items: [
            {text: '微模块', link: '/ecology/micro/'},
            {text: '字典模块', link: '/ecology/micro/dict'},
            {text: '报表模块', link: '/ecology/micro/report'},
            {text: '文件模块', link: '/ecology/micro/file'},
            {text: '数据脱敏', link: '/ecology/micro/mask'},
            {text: '站内消息', link: '/ecology/micro/msg'},
            {text: '审计日志', link: '/ecology/micro/audit'},
          ]
        }
      ],
      '/ecology/sys/': [
        {
          text: '系统管理模块',
          items: [
            {text: 'Sys', link: '/ecology/sys/'},
            {text: '系统管理', link: '/ecology/sys/sys'},
          ]
        }
      ],
      '/ecology/gen/': [
        {
          text: 'Gen',
          items: [
            {text: 'Gen', link: '/ecology/gen/'},
            {text: 'SQL转代码', link: '/ecology/gen/sql2code'},
            {text: '代码生成', link: '/ecology/gen/gen'},
          ]
        }
      ],
      '/ecology/cas/': [
        {
          text: 'Cas',
          items: [
            {text: 'Cas', link: '/ecology/cas/'},
            {text: 'Cass模块', link: '/ecology/cas/cas'},
            {text: 'RBAC', link: '/ecology/cas/rbac'},
            {text: 'Token', link: '/ecology/cas/access_token'},
          ]
        }
      ],
      '/ecology/cms/': [
        {
          text: 'CMS',
          items: [
            {text: 'CMS', link: '/ecology/cms/'},
            {text: 'CMS设计', link: '/ecology/cms/cms'},
          ]
        }
      ],
      '/ecology/pms/': [
        {
          text: 'PMS',
          items: [
            {text: 'PMS', link: '/ecology/pms/'},
            {text: 'PMS设计', link: '/ecology/pms/pms'},
          ]
        }
      ],
      '/ecology/report/': [
        {
          text: '报表',
          items: [
            {text: '报表', link: '/ecology/report/'},
            {text: '报表设计', link: '/ecology/report/report'},
          ]
        }
      ],
      '/ecology/blog/': [
        {
          text: 'Blog',
          items: [
            {text: 'Blog', link: '/ecology/blog/'},
            {text: '服务端', link: '/ecology/blog/server'},
            {text: 'Blog', link: '/ecology/blog/blog'},
          ]
        }
      ],

      '/devops/centos/': [
        {
          text: 'Centos',
          items: [
            {text: 'Centos', link: '/devops/centos/'},
            {text: '安装', link: '/devops/centos/install'},
            {text: 'CentOS Stream9', link: '/devops/centos/centos9'},
            {text: '基础', link: '/devops/centos/base'},
            {text: 'Yum', link: '/devops/centos/yum'},
            {text: 'Systemd', link: '/devops/centos/systemd'},
          ]
        }
      ],
      '/devops/component/': [
        {
          text: '组件',
          items: [
            {text: '组件', link: '/devops/component/'},
            {text: 'JDK', link: '/devops/component/jdk'},
            {text: 'Maven', link: '/devops/component/maven'},
            {text: 'Redis', link: '/devops/component/redis'},
            {text: 'Mysql', link: '/devops/component/mysql'},
            {text: 'Nacos', link: '/devops/component/nacos'},
            {text: 'MyBatis', link: '/devops/component/mybatis'},
            {text: 'MQTT', link: '/devops/component/mqtt'},
            {text: 'Rocketmq', link: '/devops/component/rocketmq'},
            {text: 'Job', link: '/devops/component/job'},
            {text: 'nginx', link: '/devops/component/nginx'},
            {text: 'Samba', link: '/devops/component/samba'},
            {text: 'Squid', link: '/devops/component/squid'},
            {text: 'SFTP', link: '/devops/component/sftp'},
            {text: 'MinIO', link: '/devops/component/minio'},
            {text: 'PHP', link: '/devops/component/php'},
            {text: 'CI/CD', link: '/devops/component/cicd'},
            {text: 'Git', link: '/devops/component/git'},
            {text: 'Cloudreve', link: '/devops/component/cloudreve'},
            {text: 'Wiki.js', link: '/devops/component/wikijs'},
          ]
        }
      ],
      '/devops/k8s/': [
        {
          text: 'K8s',
          items: [
            {text: 'K8s', link: '/devops/k8s/'},
            {text: '初始化', link: '/devops/k8s/01_init'},
            {text: 'Docker', link: '/devops/k8s/02_docker'},
            {text: 'Containerd', link: '/devops/k8s/03_containerd'},
            {text: 'Kubelet', link: '/devops/k8s/04_kubelet'},
            {text: 'Node', link: '/devops/k8s/05_node'},
            {text: 'Calico', link: '/devops/k8s/06_calico'},
            {text: 'Ingress', link: '/devops/k8s/07_ingress'},
            {text: 'Cert', link: '/devops/k8s/08_cert'},
            {text: 'Yaml', link: '/devops/k8s/10_yaml'},
            {text: '命令', link: '/devops/k8s/11_ctl'},
            {text: '镜像服务', link: '/devops/k8s/12_acr'},
            {text: '组件', link: '/devops/k8s/13_components'},
            {text: '应用', link: '/devops/k8s/14_apps'},
            {text: '镜像', link: '/devops/k8s/21_docker_image'},
            {text: 'K8s UI', link: '/devops/k8s/39_other_ui'},
            {text: '其他', link: '/devops/k8s/99_others'},
          ]
        }
      ],
      '/devops/server/': [
        {
          text: '服务器',
          items: [
            {text: '服务器', link: '/devops/server/'},
            {text: 'Centos7', link: '/devops/server/centos7'},
            {text: '内核', link: '/devops/server/kernel'},
            {text: 'VuePress', link: '/devops/server/vuepress'},
          ]
        }
      ],

      '/base/common/': [
        {
          text: '常用',
          items: [
            {text: '常用', link: '/base/common/'},
            {text: '正则', link: '/base/common/regular'},
            {text: '代理', link: '/base/common/forwardProxy'},
            {text: 'Centos7', link: '/base/common/centos7'},
          ]
        }
      ],
      '/base/standard-base/': [
        {
          text: '基规范',
          items: [
            {text: '基规范', link: '/base/standard-base/'},
            {text: 'Git', link: '/base/standard-base/git'},
            {text: '原则', link: '/base/standard-base/principle'},
          ]
        }
      ],
      '/base/standard-backend/': [
        {
          text: '后端规范',
          items: [
            {text: '后端规范', link: '/base/standard-backend/'},
            {text: '接口', link: '/base/standard-backend/api'},
            {text: '数据库', link: '/base/standard-backend/database'},
            {text: '命名规范', link: '/base/standard-backend/named'},
          ]
        }
      ],
      '/base/standard-frontend/': [
        {
          text: '前端规范',
          items: [
            {text: '前端规范', link: '/base/standard-frontend/'},
            {text: '框架', link: '/base/standard-frontend/framework'},
          ]
        }
      ],

      '/other/go/': [
        {
          text: 'Go',
          items: [
            {text: 'Go', link: '/other/go/'},
            {text: '初始化', link: '/other/go/init'},
            {text: '网页', link: '/other/go/web'},
          ]
        }
      ],
      '/other/python/': [
        {
          text: 'Python',
          items: [
            {text: 'Python', link: '/other/python/'},
            {text: '环境', link: '/other/python/env'},
            {text: 'PyCharm', link: '/other/python/pycharm'},
            {text: 'Django', link: '/other/python/django'},
            {text: 'MicropPthon', link: '/other/python/micropython'},
          ]
        }
      ],
      '/other/arduino/': [
        {
          text: 'Arduino',
          items: [
            {text: 'Arduino', link: '/other/arduino/'},
            {text: '基础', link: '/other/arduino/base'},
          ]
        }
      ],
      '/other/opencv/': [
        {
          text: 'OpenCV',
          items: [
            {text: 'OpenCV', link: '/other/opencv/'},
            {text: '安装', link: '/other/opencv/install'},
            {text: '基础', link: '/other/opencv/base'},
            {text: '接口', link: '/other/opencv/apis'},
          ]
        }
      ],
      '/other/lm/': [
        {
          text: '大模型',
          items: [
            {text: '大模型', link: '/other/lm/'},
            {text: '设备', link: '/other/lm/equipment'},
            {text: '安装', link: '/other/lm/install'},
            {text: 'Ollama', link: '/other/lm/ollama'},
          ]
        }
      ],
      '/other/wordpress/': [
        {
          text: 'WordPress',
          items: [
            {text: 'WordPress', link: '/other/wordpress/'},
          ]
        }
      ],

    },
    editLink: {
      text: '编辑此页面',
      pattern: 'https://github.com/shrimp-cloud/shrimp-doc/edit/main/docs/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shrimp-cloud/shrimp-doc' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present Shrimp Workstudio'
    }
  }
})
