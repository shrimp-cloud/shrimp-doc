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
                text: '后端',
                ariaLabel: '后端',
                items: [
                    { text: '后端基础组件', link: '/backend_base/' },
                    { text: '后端组件', link: '/backend/' },
                    { text: '后端设计', link: '/design/' },
                    { text: 'nginx', link: '/nginx/' },
                    { text: '服务器', link: '/server/' },
                    { text: '三方集成', link: '/third/' },
                ]
            },
            {
                text: '前端',
                ariaLabel: '前端',
                items: [
                    { text: '前端功能', link: '/front/' },
                ]
            },
        ],
        sidebarDepth: 3, // 侧边栏显示2级
        sidebar: {
            '/backend_base/': [
                '',
                'repo',
                'parent',
                'sdk',
                'starter',
                'standard',
                'cicd',
            ],
            '/backend/': [
                '',
                'core',
                'demo',
                'gen',
                'sys',
                'cas',
                'trace',
            ],
            '/design/': [
                '',
                'cache',
                'gray_release',
                'jpath',
            ],
            '/nginx/': [
                '',
                'nginx_config',
                'nginx_install',
                'nginx_lua',
            ],
            '/server/': [
                '',
                'init',
                'k8s',
            ],
            '/third/': [
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
            '/front/': [
                '',
                'miniapp',
            ],
             '/': [
                '',
            ]
        },
    },
}
