module.exports = {
  plugins: [
    // 添加 transform-runtime 插件
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // 指定样式路径
        style: (name) => `${name}/style/less`
      },
      'vant'
    ]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        // 关闭 @babel/preset-env 默认的 Polyfill 注入
        useBuiltIns: false,
        modules: false
      }
    ]
  ]
}
