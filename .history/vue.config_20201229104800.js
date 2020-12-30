const path = require('path')
const title = '流程平台'
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/unifaFont',
    configureWebpack: {
        name: title
    },
    devServer: {
        proxy: {
            // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
            [process.env.VUE_APP_BASE_API]: {
                // target: `http://10.210.9.218/uniflowApi`,
                target:'http://192.168.3.22:8800/uniflowApi', // 代理健镇本地
                changeOrigin: true,
                pathRewrite: {
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        },
    },
    lintOnSave: false,
    chainWebpack(config) {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}