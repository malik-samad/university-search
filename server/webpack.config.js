const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    watch: NODE_ENV == "development",
    target: "node",
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: `.env.${NODE_ENV}` },
                ...(NODE_ENV === 'development' ? [{ from: `.env.development` }] : []),
                ...(NODE_ENV === 'production' ? [{ from: `.env.production` }] : []),
                { from: `package.json` },
            ],
        }),
        ...(NODE_ENV == "development" ?
            [new WebpackShellPluginNext({
                onBuildEnd: {
                    scripts: ['nodemon build'],
                    blocking: false,
                    parallel: true
                }
            })] :
            []
        )
    ],
    // externals: [
    //     /^[a-z\-0-9]+$/ // Ignore node_modules folder
    // ],
    output: {
        filename: 'server.js', // output file
        path: path.resolve(__dirname, "build"),
        sourceMapFilename: "server.map.js",
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        // modules: [
        //     `./node_modules`,
        //     'node_modules'
        // ],
        // webpack throws warnings and errors
        fallback: {
            "fs": false,
            "os": false,
            "path": false,
            "http": false,
            "net": false,
            "crypto": false,
            "zlib": false,
            "async_hooks": false,
            "url": false,
            "util": false,
            "stream": false,
            "buffer": false,
            string_decoder: false,
            querystring: false,
        }
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                }
            ]
        }]
    }
};