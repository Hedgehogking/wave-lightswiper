module.exports = {
    entry: {
        'index': './src/index',
    },
    output: {
        path: './dist/',
        publicPath: '/dist/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        root: ['./node_modules', './src'],
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/,},
            {test: /\.vue$/, loader: 'vue'},
        ]
    },
    babel: {
        presets: ['es2015'],
        // plugins: ['transform-runtime'],
    }
}
