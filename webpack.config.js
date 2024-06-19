const path = require('path');

// 引入html插件
let HTMLWebpackPlugin = require('html-webpack-plugin');

// 引入clean插件
const { CleanWebpackPlugin }= require('clean-webpack-plugin')
module.exports = {

    // 指定入口文件, 表示从哪个文件开始执行程序
    entry: "./src/index.ts",

    // 指定打包文件的所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件
        filename: "bundle.js",

        // 告诉webpack不使用箭头函数 / const声明   目的: 兼容浏览器,防止浏览器不认箭头函数、const声明
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    mode: 'development', // 设置mode

    // 指定webpack打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [{
            // 指定的是规则生效的文件
            test: /\.ts$/,
            // 指定使用的模块
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        'chrome': '88'
                                    },
                                    "corejs": '3',
                                    "useBuiltIns": 'usage'
                                }

                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            // 排除的文件
            exclude: /node_modules/,

        },{
            // 指定的是规则生效的文件
            test: /\.less$/,
            // 指定使用的模块
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                           plugins: [
                               [
                                   'postcss-preset-env',
                                   {
                                       browsers: ['last 2 versions']
                                   }
                               ]
                           ]
                        }
                    }
                },
                'less-loader'
            ]
        } ]
    },
    // 配置webpack插件
    plugins: [

        new CleanWebpackPlugin(),//作用：每次重新打包都先清空dist文件，避免出错
        new HTMLWebpackPlugin({
            // title: '这是一个自定义title',
            template: "./src/index.html"
        })
    ],

    // 用来设置引用模块
    resolve: {
        extensions: [".ts", ".tsx", ".json", ".js",".less", ".css"]
    }
}