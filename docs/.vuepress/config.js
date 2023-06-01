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
                text: '生态',
                ariaLabel: '生态',
                items: [
                    { text: '后端架构', link: '/ecology/cloud/' },
                    { text: '代码生成', link: '/ecology/gen/' },
                    { text: '权限', link: '/ecology/cas/' },
                    { text: '报表', link: '/ecology/report/' },
                    { text: 'DEMO', link: '/ecology/demo/' },
                ]
            },
            {
                text: '基础',
                ariaLabel: '基础',
                items: [
                    { text: '常用', link: '/base/common/' },
                    { text: 'CentOS7', link: '/base/centos7/' },
                    { text: '基础规范', link: '/base/standard-base/' },
                    { text: '前端规范', link: '/base/standard-frontend/' },
                    { text: '后端规范', link: '/base/standard-backend/' },
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
                text: '后端',
                ariaLabel: '后端',
                items: [
                    { text: 'Java', link: '/backend/java/' },
                    { text: 'Spring', link: '/backend/spring/' },
                    { text: '中间件安装与使用', link: '/backend/component/' },
                    { text: 'Kubernetes', link: '/backend/k8s/' },
                    { text: '架构设计', link: '/backend/framework/' },
                    { text: '模块设计', link: '/backend/modules/' },
                    { text: '逻辑设计', link: '/backend/design/' },
                    { text: '服务器运维', link: '/backend/server/' },
                    { text: '三方服务集成', link: '/backend/third/' },
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
            '/ecology/cloud/': [
                '',
                'annotation',
                'page',
            ],
            '/ecology/demo/': [
                '',
                'lectotype',
                'demo',
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
            '/ecology/report/': [
                '',
                'report',
            ],

            '/base/common/': [
                '',
                'regular',
                'forwardProxy',
                'centos7',
            ],
            '/base/centos7/': [
                '',
                'base',
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
            '/backend/component/': [
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
            ],
            '/backend/k8s/': [
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
            '/backend/framework/': [
                '',
                'repo',
                'parent',
                'sdk',
                'starter',
                'cicd',
                'trace',
                'core',
                'cache',
                'gray_release',
            ],
            '/backend/modules/': [
                '',
                'sys',
                'cms',
                'pms',
            ],
            '/backend/design/': [
                '',
                'andor',
            ],
            '/backend/server/': [
                '',
                'centos7',
                'kernel',
                'vuepress',
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

            '/front/client/': [
                '',
                'miniapp',
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
