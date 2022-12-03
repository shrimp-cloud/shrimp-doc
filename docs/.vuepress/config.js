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
                    { text: 'Kubenetes', link: '/backend/k8s/' },
                    { text: '架构设计', link: '/backend/framework/' },
                    { text: '模块设计', link: '/backend/modules/' },
                    { text: '逻辑设计', link: '/backend/design/' },
                    { text: '服务器运维', link: '/backend/server/' },
                    { text: '三方服务集成', link: '/backend/third/' },
                ]
            },
            {
                text: 'GO',
                ariaLabel: 'GO',
                items: [
                    { text: 'GO基础', link: '/go/' },
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
            ],
            '/backend/k8s/': [
                '',
                '01.init',

                'docker',
                'kubenetes',
                'Kuboard',
                'rancher',
                'ingress',
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
                'redirect_login',
                'iframe_login',
                'router',
                'hasPermi',
                'crud',
                'dict',
                'monaco',
                'bugs',
            ],
            '/front/client/': [
                '',
                'miniapp',
            ],
            '/go/': [
                '',
                'init',
                'web',
            ],
        },
    },
}
