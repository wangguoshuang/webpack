// ��Ŀ�Ŀ��������ļ�

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
                test: /\.jsx?$/, // ��������ƥ���ļ�·���������˼��ƥ�� js ���� jsx
                loader: 'babel',// ����ģ�� "babel" �� "babel-loader" ����д
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

