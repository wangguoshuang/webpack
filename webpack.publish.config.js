/**
 * ��Ŀ���𻷾������ļ�
 */

var path = require('path');
var webpack = require('webpack')
// ��ȡcss�ĵ��������
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// �Զ�����index.htmlҳ����
var HtmlWebpackPlugin = require('html-webpack-plugin');
// ɾ���ļ���
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        vendors: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            // ����jsx�﷨��ES6�﷨
            {
                test: /\.jsx?$/, // ��������ƥ���ļ�·���������˼��ƥ�� js ���� jsx
                loader: 'babel',// ����ģ�� "babel" �� "babel-loader" ����д
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            // 1kb=1024b 1b=8bit   25000bit~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=25000&name=images/[name].[ext]'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url'
            }

        ]
    },
    resolve: {
        // �Զ���չ�ļ���׺������ζ������requireģ�����ʡ�Բ�д��׺��
        // ע��һ��, extensions ��һ���ǿ��ַ���! ��Ӧ����Ҫ��׺�����.
        extensions: ['', '.js', '.json', '.scss', '.jsx'],
        // ģ��������壬�������ֱ�����ñ����������д�����ĵ�ַ������ֱ�� require('AppStore') ����
        // alias: {
        //     ReactJS:"node_modules/react/react.min.js",
        //    AppStore: 'js/stores/AppStores.js',
        //    ActionType: 'js/actions/ActionType.js',
        //    AppAction: 'js/actions/AppAction.js'
        // }
    },
    // ������������涨��İ��ǲ��ᱻ�����bundle��js�ļ��е�,�����Ҫ��������ԣ���������index��html������cdn
    // externals: {
    //    // �������������֮��react��react-dom��Щ�������İ������ᱻ������js�У���ô���Ǿ���Ҫͨ��cdn�����ļ���������
    //    // ǰ���������������Ŀ�������õģ��൱��import React from  ��react1���е�react��
    //    //'react1':"react",
    //    'react1':"react",
    //    'react-dom1':"react-dom",
    //     '$1':"jQuery"
    //
    // },
    plugins: [
        // ����֮ǰ��ɾ��distĿ¼������ļ���
        new CleanPlugin(['dist']),
        // ���������Ӧ�ò��,name���Ի��Զ�ָ��entry��vendros���ԣ�filename�����е��ļ����Զ�������output�е�path��������
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // ��webpackѹ�����룬���Ժ��Դ����еľ���
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // �����½����������ʽ���ļ��������Ϳ����ж��css�ļ��ˡ�
        new ExtractTextPlugin("app.css"),
        // compiling our final assets
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["vendors.js","bundle.js"]
                }
            },
            // Ч�������黳����
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({
            //ȥ��react�еľ��棬react���Լ��ж�
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    ]
}




