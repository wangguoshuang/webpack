// 项目的开发配置文件

var path = require('path')

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/js/app.js')
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.scss$/, // Only .css files
                loader: 'style!sass' // Run both loaders
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=25000'
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=100000'
            }
        ]
    }
}

