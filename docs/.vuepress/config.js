module.exports = {
  plugins: [
    'vuepress-plugin-mermaidjs'
  ],
  head: [
    ['link', {rel: 'icon', href: '/favicon.svg'}]
  ],
  themeConfig: {
    smoothScroll: true,
    sidebarDepth: 3, // 侧边栏显示3级
  },
}
