const path = require('path');

const commonConfig = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                type: 'asset/source',
                include: [
                    path.resolve(__dirname, 'third-party/w3.css'),
                    path.resolve(__dirname, 'src/template'),
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.css' ]
    }
};

const contentScriptConfig = Object.assign({}, commonConfig, {
    entry: './src/content-script.ts',
    output: {
        filename: 'content-compiled.js',
        path: path.resolve(__dirname, 'dist')
    }
});

const backgroundScriptConfig = Object.assign({}, commonConfig, {
    entry: './src/background-script.ts',
    output: {
        filename: 'background-compiled.js',
        path: path.resolve(__dirname, 'dist')
    }
});

module.exports = [
    contentScriptConfig, backgroundScriptConfig
];
