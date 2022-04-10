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
                    { text: '规范', link: '/base/standard/' },
                ]
            },
            {
                text: '后端',
                ariaLabel: '后端',
                items: [
                    { text: 'Spring', link: '/backend/spring/' },
                    { text: '组件', link: '/backend/component/' },
                    { text: '架构', link: '/backend/framework/' },
                    { text: '规范', link: '/backend/standard/' },
                    { text: '模块', link: '/backend/modules/' },
                    { text: 'nginx', link: '/backend/nginx/' },
                    { text: '服务器', link: '/backend/server/' },
                    { text: '三方集成', link: '/backend/third/' },
                ]
            },
            {
                text: '前端',
                ariaLabel: '前端',
                items: [
                    { text: 'VUE', link: '/front/vue/' },
                    { text: '规范', link: '/front/standard/' },
                    { text: '客户端', link: '/front/client/' },
                ]
            },
        ],
        sidebarDepth: 3, // 侧边栏显示2级
        sidebar: {
            '/backend/spring/': [
                '',
                'reflect',
                'BeanPostProcessor',
                'ApplicationListener',
            ],
            '/backend/component/': [
                '',
                'mqtt',
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
            '/base/standard/': [
                '',
                'git',
            ],
            '/backend/standard/': [
                '',
                'principle',
                'code',
                'named',
                'api',
                'database',
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
            '/backend/nginx/': [
                '',
                'nginx_config',
                'nginx_install',
            ],
            '/backend/server/': [
                '',
                'init',
                'docker_install',
                'k8s_install',
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
                'node_update',
            ],
            '/front/standard/': [
                '',
                'standard',
            ],

            '/front/client/': [
                '',
                'miniapp',
            ],
             '/front/': [
                '',
            ]
        },
    },
}
