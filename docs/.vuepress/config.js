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
        repo: 'lz-cloud/lz-doc',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '编辑此页面',
        nav: [
            { text: 'Home', link: '/'},
            {
                text: '基础',
                ariaLabel: '基础',
                items: [
                    { text: '基础规范', link: '/base/standard-base/' },
                    { text: '前端规范', link: '/base/standard-frontend/' },
                    { text: '后端规范', link: '/base/standard-backend/' },
                ]
            },
            {
                text: '后端',
                ariaLabel: '后端',
                items: [
                    { text: 'Spring', link: '/backend/spring/' },
                    { text: '组件', link: '/backend/component/' },
                    { text: '架构', link: '/backend/framework/' },
                    { text: '模块', link: '/backend/modules/' },
                    { text: '设计', link: '/backend/design/' },
                    { text: '服务器', link: '/backend/server/' },
                    { text: '三方集成', link: '/backend/third/' },
                    { text: '其他(未完成/未分类)', link: '/backend/others/' },
                ]
            },
            {
                text: '前端',
                ariaLabel: '前端',
                items: [
                    { text: 'VUE', link: '/front/vue/' },
                    { text: '客户端', link: '/front/client/' },
                ]
            },
        ],
        sidebarDepth: 3, // 侧边栏显示2级
        sidebar: {
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

            '/backend/spring/': [
                '',
                'reflect',
                'BeanPostProcessor',
                'ApplicationListener',
                'local_jar',
            ],
            '/backend/component/': [
                '',
                'mqtt',
                'mybatis',
                'nginx',
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
                'demo',
                'sys',
                'cas',
                'cms',
                'pms',
                'gen',
            ],
            '/backend/design/': [
                '',
                'andor',
            ],
            '/backend/server/': [
                '',
                'init',
                'kernel',
                'docker',
                'kubenetes',
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
            '/backend/others/': [
                '',
                'nginx_docker',
            ],

            '/front/vue/': [
                '',
                'node_update',
                'components',
            ],
            '/front/client/': [
                '',
                'miniapp',
            ],
        },
    },
}
