module.exports = {
  plugins: [
    // 添加 transform-runtime 插件
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
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
