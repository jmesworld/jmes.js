const path = require('path');
const webpack = require('webpack');
const webConfig =  {
    entry: './build/index.js',
    devtool: 'source-map',
    mode: 'production',
    target: 'web',
    experiments: {
        asyncWebAssembly: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: {
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
        },
        alias:{
            "buffer": "buffer",
            "stream": "stream-browserify"
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'jmes',
            type: 'umd'
        },
        filename: 'jmes.min.js',
        // fixes ReferenceError: window is not defined
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    },
}

module.exports = [webConfig];
