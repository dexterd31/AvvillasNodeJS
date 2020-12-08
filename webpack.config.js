const path = require('path')


module.exports = {
    entry: './public/modulos/envioForm.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'envioForm.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}