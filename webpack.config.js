module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }]
    },
    devtool: 'source-map'
}
