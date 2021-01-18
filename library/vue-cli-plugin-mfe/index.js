module.exports = (api, options) => {
  const projectName = require(api.resolve('package.json')).name;
  options.css.extract = false
  api.chainWebpack(webpackConfig => {
    webpackConfig.devServer.
      headers({
        'Access-Control-Allow-Origin': '*',
      }).
      set('port', 6060).
      set('disableHostCheck', true)

    webpackConfig.optimization.delete('splitChunks')

    webpackConfig.output.library(projectName)
    webpackConfig.output.libraryTarget('umd')

    webpackConfig.set('devtool', 'sourcemap')
  })
}