const path = require('path');

module.exports = {
    entry: "./src/assets/js/Index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "src/dist")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react",]
                    }
                }
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            }
        ]
    }
}