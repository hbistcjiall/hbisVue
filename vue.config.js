const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    configureWebpack: config => {
        config.plugins.push();
        if (isProduction) {
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true,
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            )
        }
    }
}