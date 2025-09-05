import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: 'Shrimp Workstudio',
  description: 'Shrimp Workstudio',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    [
      'script',
      {},
      `
      window._hmt = window._hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?cb7056be83473f171c3df62495c0e664";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
  ],
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
          { text: '后端规范', link: '/backend/standard-backend/' },
          { text: '编程语言', link: '/backend/lang/' },
          { text: 'Spring', link: '/backend/spring/' },
          { text: '组件', link: '/backend/component/' },
          { text: '框架', link: '/backend/framework/' },
          { text: '逻辑设计', link: '/backend/design/' },
          { text: '三方服务集成', link: '/backend/third/' },
        ]
      },
      {
        text: '前端',
        items: [
          { text: '前端规范', link: '/front/standard-frontend/' },
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
          { text: '流程管理', link: '/ecology/flow/' },
          { text: '报表管理', link: '/ecology/report/' },
          { text: '博客系统', link: '/ecology/blog/' },
        ]
      },

      {
        text: 'Linux',
        items: [
          { text: '操作系统', link: '/linux/system/' },
          { text: '常用命令', link: '/linux/command/' },
          { text: '扩展组件', link: '/linux/component/' },
          { text: '平台化工具', link: '/linux/platform/' },
          { text: 'k8s集群安装', link: '/linux/k8s_install/' },
          { text: 'k8s相关使用', link: '/linux/k8s_guide/' },
        ]
      },

      {
        text: 'AI',
        items: [
          { text: '机器学习', link: '/ai/ml/' },
          { text: '大模型', link: '/ai/lm/' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: '常用', link: '/other/common/' },
          { text: '基础规范', link: '/other/standard-base/' },
          { text: 'OpenCV', link: '/other/opencv/' },
          { text: '其他', link: '/other/other/' },
        ]
      },
    ],


    sidebar: {

      '/backend/standard-backend/': [
        {
          text: '后端规范',
          items: [
            {text: '后端规范', link: '/backend/standard-backend/'},
            {text: '接口', link: '/backend/standard-backend/api'},
            {text: '数据库', link: '/backend/standard-backend/database'},
            {text: '命名规范', link: '/backend/standard-backend/named'},
          ]
        }
      ],

      '/backend/lang/': [
        {
          text: 'JAVA',
          items: [
            {text: 'JDK', link: '/backend/lang/java/jdk'},
            { text: 'GraalVM', link: '/backend/lang/java/GraalVM' },
            { text: 'JVM命令', link: '/backend/lang/java/jvm' },
          ]
        },
        {
          text: 'Go',
          items: [
            {text: '初始化', link: '/backend/lang/go/init'},
            {text: '网页', link: '/backend/lang/go/web'},
          ]
        },
        {
          text: 'Python',
          items: [
            {text: '环境', link: '/backend/lang/python/env'},
            {text: 'PyCharm', link: '/backend/lang/python/pycharm'},
            {text: 'Django', link: '/backend/lang/python/django'},
            {text: 'MicropPthon', link: '/backend/lang/python/micropython'},
          ]
        },
        {
          text: 'Arduino',
          items: [
            {text: '安装', link: '/backend/lang/arduino/install'},
            {text: '代码片断', link: '/backend/lang/arduino/code_snippet'},
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
            {text: '打包非Java文件', link: '/backend/spring/NotOnlyJava'},
            {text: '重写Bean', link: '/backend/spring/OverrideSpringBean'},
          ]
        }
      ],
      '/backend/component/': [
        {
          text: '组件',
          items: [
            {text: '组件', link: '/backend/component/'},
            {text: 'Maven', link: '/backend/component/maven'},
            {text: 'Redis', link: '/backend/component/redis'},
            {text: 'Spring', link: '/backend/component/spring'},
            {text: 'Cas', link: '/backend/component/casStarter'},
            {text: 'Mybatis', link: '/backend/component/mybatis'},
            {text: 'oss', link: '/backend/component/oss'},
            {text: 'mqtt', link: '/backend/component/mqtt'},
            { text: 'Dubbo', link: '/backend/component/dubbo' },
            { text: 'Camunda', link: '/backend/component/camunda' },
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
      '/backend/design/': [
        {
          text: '设计',
          items: [
            { text: '缓存', link: '/backend/design/cache' },
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
            {text: '微信公众号', link: '/backend/third/wechat'},
            {text: '微信支付', link: '/backend/third/wxpay'},
            {text: 'MQTT', link: '/backend/third/mqtt'},
          ]
        }
      ],

      '/front/standard-frontend/': [
        {
          text: '前端规范',
          items: [
            {text: '前端规范', link: '/front/standard-frontend/'},
            {text: '框架', link: '/front/standard-frontend/framework'},
          ]
        }
      ],

      '/front/vue/': [
        {
          text: 'Vue',
          items: [
            {text: 'Vue', link: '/front/vue/'},
            {text: 'Node基础', link: '/front/vue/node_base'},
            {text: 'Node升级', link: '/front/vue/node'},
            {text: 'NPM升级', link: '/front/vue/npm'},
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
            {text: '表单模块', link: '/ecology/micro/form'},
            {text: 'LiteFlow', link: '/ecology/micro/liteflow'},
            {text: '数据脱敏', link: '/ecology/micro/mask'},
            {text: '站内消息', link: '/ecology/micro/msg'},
            {text: '审计日志', link: '/ecology/micro/audit'},
            {text: '序列生成', link: '/ecology/micro/seq'},
            {text: '接口生成', link: '/ecology/micro/next'},
            {text: 'PDF模板', link: '/ecology/micro/pdf'},
            {text: '删除检查项', link: '/ecology/micro/rmckeck'},
            {text: '微信小程序', link: '/ecology/micro/wxapp'},
            {text: '微信公众号', link: '/ecology/micro/wxmp'},
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
      '/ecology/flow/': [
        {
          text: 'Flow',
          items: [
            {text: 'Flow', link: '/ecology/flow/'},
            {text: 'Camunda', link: '/ecology/flow/01_camunda'},
            {text: 'Flowable', link: '/ecology/flow/02_flowable'},
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

      '/linux/system/': [
        {
          text: '操作系统',
          items: [
            {text: 'Linux 介绍', link: '/linux/system/'},
            {text: 'Linux 内核', link: '/linux/system/kernel'},
            {text: 'RockyLinux9 安装', link: '/linux/system/rockylinux9_install'},
            {text: 'RockyLinux9 初始化', link: '/linux/system/rockylinux9_init'},

            {text: 'Centos7 初始化', link: '/linux/system/centos7_init'},
            {text: '磁盘扩容', link: '/linux/system/disk_expansion'},
          ]
        },
      ],
      '/linux/command/': [
        {
          text: '常用命令',
          items: [
            {text: '常用命令', link: '/linux/command/'},
            {text: '基础命令', link: '/linux/command/base'},
            {text: 'Dnf', link: '/linux/command/dnf'},
            {text: 'Yum', link: '/linux/command/yum'},
            {text: 'Systemd', link: '/linux/command/systemd'},
            {text: 'Firewalld', link: '/linux/command/firewalld'},
            {text: 'iptables', link: '/linux/command/iptables'},
          ]
        },
      ],
      '/linux/component/': [
        {
          text: '数据库',
          items: [
            {text: 'Redis', link: '/linux/component/redis'},
            {text: 'Mysql', link: '/linux/component/mysql'},
          ]
        },
        {
          text: '消息中间件',
          items: [
            {text: 'MQTT', link: '/linux/component/mqtt'},
            {text: 'Rocketmq', link: '/linux/component/rocketmq'},
          ]
        },
        {
          text: '存储',
          items: [
            {text: 'Samba', link: '/linux/component/samba'},
            {text: 'SFTP', link: '/linux/component/sftp'},
          ]
        },
        {
          text: '代理工具',
          items: [
            {text: 'frp', link: '/linux/component/frp'},
            {text: 'Squid', link: '/linux/component/squid'},
            {text: 'Shadowsocks', link: '/linux/component/shadowsocks'},
          ]
        },
        {
          text: 'CI/CD',
          items: [
            {text: 'Git', link: '/linux/component/git'},
            {text: 'Maven', link: '/linux/component/maven'},
            {text: 'Cert', link: '/linux/component/cert'},
            {text: '流水线', link: '/linux/component/cicd'},
          ]
        },

        {
          text: '开发平台',
          items: [
            {text: 'Nacos', link: '/linux/component/nacos'},
            {text: 'Job', link: '/linux/component/job'},
            {text: 'nginx', link: '/linux/component/nginx'},
            {text: 'PHP', link: '/linux/component/php'},
          ]
        },
      ],

      '/linux/platform/': [
        {
          text: '平台化工具，和服务',
          items: [
            {text: 'KVM', link: '/linux/platform/kvm'},
            {text: 'MinIO', link: '/linux/platform/minio'},
            {text: 'Cloudreve', link: '/linux/platform/cloudreve'},
            {text: 'Sonar', link: '/linux/platform/sonar'},
            {text: 'Wiki.js', link: '/linux/component/wikijs'},
            {text: 'VuePress', link: '/linux/component/vuepress'},
            {text: 'WordPress', link: '/linux/component/wordpress'},
          ]
        },
      ],

      '/linux/k8s_install/': [
        {
          text: 'Kubernetes 安装',
          items: [
            {text: 'K8s安装', link: '/linux/k8s_install/'},
            {text: '初始化服务器', link: '/linux/k8s_install/01_init'},
            {text: 'Docker', link: '/linux/k8s_install/02_docker'},
            {text: 'Containerd', link: '/linux/k8s_install/03_containerd'},
            {text: 'Kubelet', link: '/linux/k8s_install/04_kubelet'},
            {text: 'Node', link: '/linux/k8s_install/05_node'},
            {text: 'Calico', link: '/linux/k8s_install/06_calico'},
            {text: 'Ingress', link: '/linux/k8s_install/07_ingress'},
            {text: 'Cert', link: '/linux/k8s_install/08_cert'},
            {text: '镜像服务', link: '/linux/k8s_install/09_acr'},
            {text: 'Harbor', link: '/linux/k8s_install/10_harbor'},
            {text: 'MetricsServer', link: '/linux/k8s_install/11_metricsServer.md'},
            {text: 'Helm', link: '/linux/k8s_install/12_helm.md'},
            {text: 'UI工具', link: '/linux/k8s_install/39_other_ui'},
            {text: '境外镜像获取', link: '/linux/k8s_install/98_pull_images'},
            {text: '其他', link: '/linux/k8s_install/99_others'},
          ]
        }
      ],
      '/linux/k8s_guide/': [
        {
          text: 'Kubernetes 使用',
          items: [
            {text: 'K8s使用', link: '/linux/k8s_guide/'},
            {text: '基础命令', link: '/linux/k8s_guide/01_ctl'},
            {text: '基础镜像', link: '/linux/k8s_guide/02_docker_image'},
            {text: 'Yaml语法', link: '/linux/k8s_guide/03_yaml'},
            {text: '应用打包', link: '/linux/k8s_guide/04_apps'},
            {text: 'Ingress使用', link: '/linux/k8s_guide/05_ingress'},
            {text: 'SSL文件验证', link: '/linux/k8s_guide/06_ssl'},
            {text: '组件', link: '/linux/k8s_guide/99_components'},
          ]
        }
      ],

      '/ai/ml/': [
        {
          text: 'ML',
          items: [
            {text: '机器学习', link: '/ai/ml/'},
            {text: '数据标注', link: '/ai/ml/01_ImageLabeling'},
            {text: '标注转换为样本', link: '/ai/ml/02_Label2Samples'},
            {text: 'Yolo 参数配置', link: '/ai/ml/03_YoloConfig'},
            {text: 'Yolo 训练', link: '/ai/ml/04_YoloStudy'},
            {text: 'Yolo 图像检测', link: '/ai/ml/05_YoloLook'},
          ]
        }
      ],
      '/ai/lm/': [
        {
          text: 'LM',
          items: [
            {text: '大模型', link: '/ai/lm/'},
            {text: 'Ollama', link: '/ai/lm/ollama'},
            {text: 'Open WebUI', link: '/ai/lm/webui'},
            {text: 'Dify', link: '/ai/lm/Dify'},
            {text: 'MaxKB', link: '/ai/lm/MaxKB'},
            {text: '设备', link: '/ai/lm/equipment'},
          ]
        }
      ],

      '/other/common/': [
        {
          text: '常用',
          items: [
            {text: '常用', link: '/other/common/'},
            {text: '正则', link: '/other/common/regular'},
            {text: '代理', link: '/other/common/forwardProxy'},
          ]
        }
      ],
      '/other/standard-base/': [
        {
          text: '基规范',
          items: [
            {text: '基规范', link: '/other/standard-base/'},
            {text: 'Git', link: '/other/standard-base/git'},
            {text: '原则', link: '/other/standard-base/principle'},
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
      '/other/other/': [
        {
          text: '其他',
          items: [
            {text: '其他', link: '/other/other/'},
            {text: 'OCR', link: '/other/other/ocr'},
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
