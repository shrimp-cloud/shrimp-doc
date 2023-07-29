module.exports = {
    dest: 'dist',
    title: 'Shrimp Workstudio',
    description: 'Shrimp Workstudio',
    logo: '/favicon.svg',
    plugins: [
        'vuepress-plugin-mermaidjs'
    ],
    head: [
        ['link', { rel: 'icon', href: '/favicon.svg' }]
    ],
    themeConfig: {
        logo: '/favicon.svg',
        search: false,
        lastUpdated: '上次更新', // string | boolean
        smoothScroll: true,
        repo: 'shrimp-cloud/shrimp-doc',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '编辑此页面',
        nav: [
            { text: 'Home', link: '/'},
            {
                text: '后端',
                ariaLabel: '后端',
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
                ariaLabel: '前端',
                items: [
                    { text: 'VUE', link: '/front/vue/' },
                    { text: 'ruoyi', link: '/front/ruoyi/' },
                    { text: 'vant-wxapp', link: '/front/vant-wxapp/' },
                    { text: '客户端', link: '/front/client/' },
                ]
            },
            {
                text: '生态',
                ariaLabel: '生态',
                items: [
                    { text: 'DEMO', link: '/ecology/demo/' },
                    { text: '系统管理', link: '/ecology/sys/' },
                    { text: '代码生成', link: '/ecology/gen/' },
                    { text: '权限管理', link: '/ecology/cas/' },
                    { text: '内容管理', link: '/ecology/cms/' },
                    { text: '商城管理', link: '/ecology/pms/' },
                    { text: '报表管理', link: '/ecology/report/' },
                ]
            },
            {
                text: '运维',
                ariaLabel: '运维',
                items: [
                    { text: 'CentOS7', link: '/devops/centos7/' },
                    { text: '中间件', link: '/devops/component/' },
                    { text: 'Kubernetes', link: '/devops/k8s/' },
                    { text: '服务器运维', link: '/devops/server/' },
                ]
            },
            {
                text: '基础',
                ariaLabel: '基础',
                items: [
                    { text: '常用', link: '/base/common/' },
                    { text: '基础规范', link: '/base/standard-base/' },
                    { text: '前端规范', link: '/base/standard-frontend/' },
                    { text: '后端规范', link: '/base/standard-backend/' },
                ]
            },
            {
                text: '其他',
                ariaLabel: '其他',
                items: [
                    { text: 'GO基础', link: '/other/go/' },
                    { text: 'Arduino', link: '/other/arduino/' },
                    { text: 'Python', link: '/other/python/' },
                ]
            },
        ],
        sidebarDepth: 3, // 侧边栏显示3级
        sidebar: {
            '/backend/java/': [
                '',
                'cache',
                'jvm',
                'dubbo',
            ],
            '/backend/spring/': [
                '',
                'reflect',
                'PostConstruct',
                'BeanPostProcessor',
                'IocBeanLifeCycle',
                'ApplicationListener',
                'RoutingDataSource',
                'path',
                'LocalJar',
                'NotOnlyJava',
                'OverrideSpringBean',
            ],
            '/backend/framework/': [
                '',
                'bom',
                'parent',
                'repo',
                'starter',
                'core',
                'annotation',
                'page',
            ],
            '/backend/component/': [
                '',
                'mybatis',
                'oss',
                'mqtt',
            ],
            '/backend/design/': [
                '',
                'andor',
                'trace',
                'gray_release',
            ],
            '/backend/third/': [
                '',
                'alipay',
                'database',
                'domain',
                'email',
                'miniapp',
                'oss',
                'server',
                'sms',
                'wechat',
                'wxpay',
                'mqtt',
            ],


            '/front/vue/': [
                '',
                'node_base',
                'base_image',
                'node_update',
                'components',
            ],
            '/front/ruoyi/': [
                '',
                'init',
                'env',
                'request',
                'api',
                'login',
                'iframe_login',
                'router',
                'hasPermi',
                'crud',
                'dict',
                'monaco',
                'bugs',
                'baseComponents',
                'bizComponents',
            ],
            '/front/vant-wxapp/': [
                '',
                'init',
                'env',
                'request',
                'shit',
            ],
            '/front/client/': [
                '',
                'miniapp',
            ],

            '/ecology/demo/': [
                '',
                'lectotype',
                'demo',
            ],
            '/ecology/sys/': [
                '',
                'sys',
            ],
            '/ecology/gen/': [
                '',
                'sql2code',
                'gen',
            ],
            '/ecology/cas/': [
                '',
                'cas',
            ],
            '/ecology/cms/': [
                '',
                'cms',
            ],
            '/ecology/pms/': [
                '',
                'pms',
            ],
            '/ecology/report/': [
                '',
                'report',
            ],

            '/devops/centos7/': [
                '',
                'base',
                'systemd',
            ],
            '/devops/component/': [
                '',
                'jdk',
                'redis',
                'mysql',
                'nacos',
                'mybatis',
                'mqtt',
                'rocketmq',
                'nginx',
                'samba',
                'squid',
                'sftp',
                'php',
                'cicd',
            ],
            '/devops/k8s/': [
                '',
                '01_init',
                '02_docker',
                '03_containerd',
                '04_kubelet',
                '05_node',
                '06_calico',
                '07_ingress',
                '10_yaml',
                '11_ctl',
                '12_acr',
                '13_components',
                '14_apps',
                '21_docker_image',
                '39_other_ui',
                '99_others',
            ],
            '/devops/server/': [
                '',
                'centos7',
                'kernel',
                'vuepress',
            ],


            '/base/common/': [
                '',
                'regular',
                'forwardProxy',
                'centos7',
            ],
            '/base/standard-base/': [
                '',
                'git',
                'principle',
            ],
            '/base/standard-backend/': [
                '',
                'api',
                'database',
                'named',
            ],
            '/base/standard-frontend/': [
                '',
                'framework',
            ],


            '/other/go/': [
                '',
                'init',
                'web',
            ],
            '/other/python/': [
                '',
            ],
            '/other/arduino/': [
                '',
                'base',
            ],
        },
    },
}
