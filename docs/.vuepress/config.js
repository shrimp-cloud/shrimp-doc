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
                    { text: '后端架构', link: '/backend/framework/' },
                    { text: '后端模块', link: '/backend/modules/' },
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
                    { text: 'VUE', link: '/front/vue/' },
                    { text: '规范', link: '/front/standard/' },
                    { text: '客户端', link: '/front/client/' },
                ]
            },
        ],
        sidebarDepth: 3, // 侧边栏显示2级
        sidebar: {
            '/backend/framework/': [
                '',
                'repo',
                'parent',
                'sdk',
                'starter',
                'standard',
                'cicd',
                'trace',
                'core',
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
                'emqx',
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
