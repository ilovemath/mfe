module.exports = (api, opts) => {
  const utils = require('./utils')(api)
  const pages = opts.pages.split(',')
  const appName = require(api.resolve('package.json')).name

  api.render({
    'src/main.js': './template/main.ejs',
    'src/App.vue': './template/App.vue',
    'src/router.js': './template/router.ejs',
    'src/utils/auth.js': './template/utils/auth.js',
    'src/utils/index.js': './template/utils/index.js',
    'src/utils/validate.js': './template/utils/validate.js',
    'src/plugins/element.js': './template/plugins/element.ejs',
    'src/components/Crud/index.vue': './template/components/crud.vue',
    'src/components/Search/index.vue': './template/components/search.vue',
    './jsconfig.json':'./template/jsconfig.json'
  }, {
    pages,
    appName
  })

  for (let page of pages) {
    let apiJs = `src/api/${page}.js`
    let viewJs = `src/views/${page}/index.vue`
    let Page = page.charAt(0).toUpperCase() + page.slice(1);
    api.render({ [apiJs]: './template/api/api.ejs' }, { page, Page })
    api.render({ [viewJs]: './template/views/index.vue' }, { page, Page })
  }

  api.extendPackage({
    dependencies: {
      'mfe': '*',
      'qs': '^6.9.1',
      'axios': '^0.19.0',
      'vue-router': '^3.0.3',
      'element-ui': '^2.4.5',
    }, devDependencies: {
      "stylus": "^0.54.7",
      "stylus-loader": "^3.0.2",
    }
  })

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  } else if (opts.customTheme) {
    api.render({
      './src/plugins/element-variables.scss': './template/plugins/element-variables.scss'
    })
    api.extendPackage({
      devDependencies: {
        'sass-loader': '^7.0.3',
        'node-sass': '^4.9.2'
      }
    })

    api.onCreateComplete(() => {
      if (opts.import === 'partial') {
        utils.updateBabelConfig(cfg => {
          const pluginComponent = ['component', {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }]
          cfg.plugins = cfg.plugins || []
          cfg.plugins.push(pluginComponent)
          return cfg
        })
      }
    })
  }

}
