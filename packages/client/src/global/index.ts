import type { App } from 'vue'

export default {
  install(app: App<Element>) {
    console.log('app', app)
    // 注册全局组件
    // app.component('glo-component', GloComponent)

    // 注册全局指令
    // app.directive('glo-directive', GloDirective)

    // 注册全局过滤器
    // app.config.globalProperties.$gloFilter = () => {}

    // 注册全局方法
    // app.config.globalProperties.$gloMethod = () => {}

    // 注册全局混入
    // app.mixin(GloMixin)

    // 注册全局挂载
    // app.config.globalProperties.$gloProperty = 'gloProperty'
  }
}
