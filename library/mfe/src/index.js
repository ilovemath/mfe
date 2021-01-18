import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
setPublicPath()
Vue.use(VueRouter)
export let http = null
export default function MFE(opts) {
    if (typeof opts !== 'object') {
        throw new Error(`MFE requires a configuration object`);
    }

    if (!opts.name) {
        throw new Error(`MFE must be passed opts.name`);
    }

    if (!opts.mode) {
        throw new Error(`MFE must be passed opts.mode`);
    }

    if (!opts.vue) {
        throw new Error('MFE must be passed opts.vue');
    }

    // Just a shared object to store the mounted object state
    let mountedInstances = {};

    return {
        start: start.bind(null, opts, mountedInstances),
        mount: mount.bind(null, opts, mountedInstances),
        unmount: unmount.bind(null, opts, mountedInstances),
        bootstrap: bootstrap.bind(null, opts, mountedInstances),
    };
}

function render(opts, mountedInstances, props) {
    const baseUrl = `/${opts.name}/`
    const appOptions = { ...opts.vue }
    const mode = opts.mode
    const routes = opts.vue.router
    const base = window.__POWERED_BY_QIANKUN__ ? baseUrl : '/'
    if (Array.isArray(routes)) {
        appOptions.router = new VueRouter({ mode, base, routes })
    }
    if (!appOptions.el) {
        appOptions.el = '#app';
    }
    if (!appOptions.data) {
        appOptions.data = {}
    }
    appOptions.data = { ...appOptions.data, ...props }
    if (props && props.http) {
        const baseURL = props.http.defaults.baseURL + baseUrl;
        http = axios.create({ baseURL })
        http.interceptors.request = props.http.interceptors.request
        http.interceptors.response = props.http.interceptors.response
    } else {
        http = axios.create()
    }
    Vue.prototype.http = http
    mountedInstances.instance = new Vue(appOptions);
    if (mountedInstances.instance.bind) {
        mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
    }
}

function setPublicPath() {
    if (window.__POWERED_BY_QIANKUN__) {
        // eslint-disable-next-line no-undef
        __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
    }
}

function start(opts, mountedInstances) {
    if (!window.__POWERED_BY_QIANKUN__) {
        render(opts, mountedInstances);
    }
}

function bootstrap(opts) {
    return Promise.resolve().then(() => {
        window.console.log(`${opts.name} bootstraped`);
    })
}

function mount(opts, mountedInstances, props) {
    return Promise.resolve().then(() => {
        window.console.log('props from main framework', props);
        render(opts, mountedInstances, props)
    })
}

function unmount(opts, mountedInstances) {
    return Promise.resolve().then(() => {
        mountedInstances.instance.$destroy();
        mountedInstances.instance.$el.innerHTML = '';
        delete mountedInstances.instance;
    })
}
