import mfe from 'mfe'
import router from './router'
import App from './App.vue'
import './plugins/element.js'

const mfeLifeCycle = mfe({
  name: "perbank",
  mode: "history",
  vue: {
    el: "#app",
    render: (h) => h(App),
    router
  }
})
mfeLifeCycle.start()
export const bootstrap = mfeLifeCycle.bootstrap
export const mount = mfeLifeCycle.mount
export const unmount = mfeLifeCycle.unmount
